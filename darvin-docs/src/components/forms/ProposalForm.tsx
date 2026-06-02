"use client"

import { useState, useCallback } from "react"
import type {
  Proposal,
  ProposalSection,
  SectionBlock,
  FlowStep,
  PricingItem,
  AddOn,
  PlatformCard,
  ServiceCard,
  NextStep,
} from "@/types/proposal"
import { uid } from "@/lib/storage"

// ── Small reusable UI ──────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-medium text-stone-500 uppercase tracking-wide mb-1">
      {children}
    </label>
  )
}

function Input({
  value,
  onChange,
  placeholder,
  className = "",
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  className?: string
}) {
  return (
    <input
      className={`w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-sm text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-[#C4622D]/40 focus:border-[#C4622D] ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  )
}

function Textarea({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
}) {
  return (
    <textarea
      className="w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-sm text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-[#C4622D]/40 focus:border-[#C4622D] resize-none"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
    />
  )
}

function Btn({
  children,
  onClick,
  variant = "ghost",
  size = "sm",
  className = "",
}: {
  children: React.ReactNode
  onClick: () => void
  variant?: "ghost" | "primary" | "danger"
  size?: "sm" | "xs"
  className?: string
}) {
  const base = "inline-flex items-center gap-1 rounded font-medium transition-colors cursor-pointer"
  const sizes = { sm: "px-3 py-1.5 text-sm", xs: "px-2 py-1 text-xs" }
  const variants = {
    ghost: "text-stone-500 hover:text-stone-800 hover:bg-stone-100",
    primary: "bg-[#C4622D] text-white hover:bg-[#a8531f]",
    danger: "text-red-500 hover:bg-red-50 hover:text-red-700",
  }
  return (
    <button
      type="button"
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border border-stone-200 bg-stone-50 p-4 ${className}`}>
      {children}
    </div>
  )
}

// ── Block editors ──────────────────────────────────────────────────────────────

function FlowEditor({
  steps,
  onChange,
}: {
  steps: FlowStep[]
  onChange: (s: FlowStep[]) => void
}) {
  return (
    <div className="space-y-3">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-2 items-start">
          <div className="mt-2 w-6 h-6 rounded-full bg-[#C4622D] flex items-center justify-center text-white text-xs flex-shrink-0">
            {String(i + 1).padStart(2, "0")}
          </div>
          <div className="flex-1 grid grid-cols-2 gap-2">
            <Input
              value={step.title}
              onChange={(v) => {
                const next = [...steps]
                next[i] = { ...step, title: v }
                onChange(next)
              }}
              placeholder="Step title"
            />
            <Input
              value={step.description}
              onChange={(v) => {
                const next = [...steps]
                next[i] = { ...step, description: v }
                onChange(next)
              }}
              placeholder="Short description"
            />
          </div>
          <button
            type="button"
            className="mt-2 text-stone-300 hover:text-red-500 text-xs cursor-pointer"
            onClick={() => onChange(steps.filter((_, j) => j !== i))}
          >
            ✕
          </button>
        </div>
      ))}
      <Btn
        variant="ghost"
        onClick={() => onChange([...steps, { title: "", description: "" }])}
      >
        + Add step
      </Btn>
    </div>
  )
}

function PricingEditor({
  items,
  addOns,
  onItemsChange,
  onAddOnsChange,
}: {
  items: PricingItem[]
  addOns: AddOn[]
  onItemsChange: (v: PricingItem[]) => void
  onAddOnsChange: (v: AddOn[]) => void
}) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-2">Main Pricing Cards</p>
        <div className="space-y-2">
          {items.map((item, i) => (
            <Card key={i} className="!p-3">
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <Label>Label</Label>
                  <Input
                    value={item.label}
                    onChange={(v) => {
                      const next = [...items]
                      next[i] = { ...item, label: v }
                      onItemsChange(next)
                    }}
                    placeholder="e.g. Website Build"
                  />
                </div>
                <div>
                  <Label>Price</Label>
                  <Input
                    value={item.price}
                    onChange={(v) => {
                      const next = [...items]
                      next[i] = { ...item, price: v }
                      onItemsChange(next)
                    }}
                    placeholder="e.g. LKR 35,000"
                  />
                </div>
                <div>
                  <Label>Period (optional)</Label>
                  <Input
                    value={item.period || ""}
                    onChange={(v) => {
                      const next = [...items]
                      next[i] = { ...item, period: v }
                      onItemsChange(next)
                    }}
                    placeholder="e.g. month"
                  />
                </div>
                <div>
                  <Label>Note (optional)</Label>
                  <Input
                    value={item.note || ""}
                    onChange={(v) => {
                      const next = [...items]
                      next[i] = { ...item, note: v }
                      onItemsChange(next)
                    }}
                    placeholder="e.g. One-time fee"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`highlight-${i}`}
                      checked={!!item.highlight}
                      onChange={(e) => {
                        const next = [...items]
                        next[i] = { ...item, highlight: e.target.checked ? "First month free" : undefined, highlightBox: e.target.checked ? item.highlightBox : undefined }
                        onItemsChange(next)
                      }}
                      className="accent-[#C4622D]"
                    />
                    <label htmlFor={`highlight-${i}`} className="text-xs text-stone-500">
                      Highlight badge
                    </label>
                    {item.highlight !== undefined && (
                      <Input
                        value={item.highlight}
                        onChange={(v) => {
                          const next = [...items]
                          next[i] = { ...item, highlight: v }
                          onItemsChange(next)
                        }}
                        placeholder="Highlight text"
                        className="!w-36"
                      />
                    )}
                  </div>
                  {item.highlight !== undefined && (
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`highlightBox-${i}`}
                        checked={!!item.highlightBox}
                        onChange={(e) => {
                          const next = [...items]
                          next[i] = { ...item, highlightBox: e.target.checked || undefined }
                          onItemsChange(next)
                        }}
                        className="accent-[#C4622D]"
                      />
                      <label htmlFor={`highlightBox-${i}`} className="text-xs text-stone-500">
                        Filled box style
                      </label>
                    </div>
                  )}
                </div>
                <Btn variant="danger" size="xs" onClick={() => onItemsChange(items.filter((_, j) => j !== i))}>
                  Remove
                </Btn>
              </div>
            </Card>
          ))}
        </div>
        <Btn
          variant="ghost"
          onClick={() =>
            onItemsChange([...items, { label: "", price: "", period: "", note: "" }])
          }
        >
          + Add price card
        </Btn>
      </div>

      <div>
        <p className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-2">Optional Add-ons</p>
        <div className="space-y-2">
          {addOns.map((addon, i) => (
            <div key={i} className="flex gap-2 items-end">
              <div className="flex-1">
                <Label>Title</Label>
                <Input
                  value={addon.title}
                  onChange={(v) => {
                    const next = [...addOns]
                    next[i] = { ...addon, title: v }
                    onAddOnsChange(next)
                  }}
                  placeholder="e.g. Stripe Account Setup"
                />
              </div>
              <div className="flex-1">
                <Label>Price</Label>
                <Input
                  value={addon.price}
                  onChange={(v) => {
                    const next = [...addOns]
                    next[i] = { ...addon, price: v }
                    onAddOnsChange(next)
                  }}
                  placeholder="e.g. LKR 15,000"
                />
              </div>
              <div className="flex-1">
                <Label>Note</Label>
                <Input
                  value={addon.note || ""}
                  onChange={(v) => {
                    const next = [...addOns]
                    next[i] = { ...addon, note: v }
                    onAddOnsChange(next)
                  }}
                  placeholder="e.g. One-time"
                />
              </div>
              <button
                type="button"
                className="pb-2 text-stone-300 hover:text-red-500 text-xs cursor-pointer"
                onClick={() => onAddOnsChange(addOns.filter((_, j) => j !== i))}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <Btn variant="ghost" onClick={() => onAddOnsChange([...addOns, { title: "", price: "" }])}>
          + Add add-on
        </Btn>
      </div>
    </div>
  )
}

function PlatformsEditor({
  platforms,
  services,
  onPlatformsChange,
  onServicesChange,
}: {
  platforms: PlatformCard[]
  services: ServiceCard[]
  onPlatformsChange: (v: PlatformCard[]) => void
  onServicesChange: (v: ServiceCard[]) => void
}) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-2">Platform Cards</p>
        <div className="space-y-2">
          {platforms.map((p, i) => (
            <div key={i} className="flex gap-2 items-end">
              <div className="w-20">
                <Label>Abbrev</Label>
                <Input
                  value={p.abbrev}
                  onChange={(v) => {
                    const next = [...platforms]
                    next[i] = { ...p, abbrev: v }
                    onPlatformsChange(next)
                  }}
                  placeholder="IG"
                />
              </div>
              <div className="flex-1">
                <Label>Name</Label>
                <Input
                  value={p.name}
                  onChange={(v) => {
                    const next = [...platforms]
                    next[i] = { ...p, name: v }
                    onPlatformsChange(next)
                  }}
                  placeholder="Instagram"
                />
              </div>
              <div className="flex-1">
                <Label>Description</Label>
                <Input
                  value={p.description}
                  onChange={(v) => {
                    const next = [...platforms]
                    next[i] = { ...p, description: v }
                    onPlatformsChange(next)
                  }}
                  placeholder="Posts, stories & reels"
                />
              </div>
              <button
                type="button"
                className="pb-2 text-stone-300 hover:text-red-500 text-xs cursor-pointer"
                onClick={() => onPlatformsChange(platforms.filter((_, j) => j !== i))}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <Btn
          variant="ghost"
          onClick={() => onPlatformsChange([...platforms, { abbrev: "", name: "", description: "" }])}
        >
          + Add platform
        </Btn>
      </div>

      <div>
        <p className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-2">Service Cards</p>
        <div className="space-y-2">
          {services.map((sv, i) => (
            <div key={i} className="flex gap-2 items-end">
              <div className="flex-1">
                <Label>Title</Label>
                <Input
                  value={sv.title}
                  onChange={(v) => {
                    const next = [...services]
                    next[i] = { ...sv, title: v }
                    onServicesChange(next)
                  }}
                  placeholder="e.g. Google Review Management"
                />
              </div>
              <div className="flex-1">
                <Label>Description</Label>
                <Input
                  value={sv.description}
                  onChange={(v) => {
                    const next = [...services]
                    next[i] = { ...sv, description: v }
                    onServicesChange(next)
                  }}
                  placeholder="e.g. Monitor, respond & grow your rating"
                />
              </div>
              <button
                type="button"
                className="pb-2 text-stone-300 hover:text-red-500 text-xs cursor-pointer"
                onClick={() => onServicesChange(services.filter((_, j) => j !== i))}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <Btn
          variant="ghost"
          onClick={() => onServicesChange([...services, { title: "", description: "" }])}
        >
          + Add service
        </Btn>
      </div>
    </div>
  )
}

function NextStepsEditor({
  steps,
  onChange,
}: {
  steps: NextStep[]
  onChange: (s: NextStep[]) => void
}) {
  return (
    <div className="space-y-2">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-2 items-end">
          <div className="mt-2 w-6 h-6 rounded-full bg-[#C4622D] flex items-center justify-center text-white text-xs flex-shrink-0">
            {String(i + 1).padStart(2, "0")}
          </div>
          <div className="flex-1">
            <Label>Title</Label>
            <Input
              value={step.title}
              onChange={(v) => {
                const next = [...steps]
                next[i] = { ...step, title: v }
                onChange(next)
              }}
              placeholder="e.g. Review & Approve"
            />
          </div>
          <div className="flex-1">
            <Label>Description</Label>
            <Input
              value={step.description}
              onChange={(v) => {
                const next = [...steps]
                next[i] = { ...step, description: v }
                onChange(next)
              }}
              placeholder="e.g. Confirm scope & pricing."
            />
          </div>
          <button
            type="button"
            className="pb-2 text-stone-300 hover:text-red-500 text-xs cursor-pointer"
            onClick={() => onChange(steps.filter((_, j) => j !== i))}
          >
            ✕
          </button>
        </div>
      ))}
      <Btn
        variant="ghost"
        onClick={() => onChange([...steps, { title: "", description: "" }])}
      >
        + Add step
      </Btn>
    </div>
  )
}

const BLOCK_LABELS: Record<SectionBlock["type"], string> = {
  flow: "Process Flow",
  pricing: "Pricing",
  platforms: "Platforms / Services",
  "next-steps": "Next Steps",
  cta: "CTA Card",
  text: "Text Block",
}

function BlockEditor({
  block,
  onChange,
  onRemove,
}: {
  block: SectionBlock
  onChange: (b: SectionBlock) => void
  onRemove: () => void
}) {
  return (
    <Card className="!border-stone-300">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-stone-600 uppercase tracking-wider">
          {BLOCK_LABELS[block.type]}
        </span>
        <Btn variant="danger" size="xs" onClick={onRemove}>Remove block</Btn>
      </div>

      {block.type === "flow" && (
        <FlowEditor
          steps={block.steps}
          onChange={(steps) => onChange({ ...block, steps })}
        />
      )}

      {block.type === "pricing" && (
        <PricingEditor
          items={block.items}
          addOns={block.addOns || []}
          onItemsChange={(items) => onChange({ ...block, items })}
          onAddOnsChange={(addOns) => onChange({ ...block, addOns })}
        />
      )}

      {block.type === "platforms" && (
        <PlatformsEditor
          platforms={block.platforms}
          services={block.services || []}
          onPlatformsChange={(platforms) => onChange({ ...block, platforms })}
          onServicesChange={(services) => onChange({ ...block, services })}
        />
      )}

      {block.type === "next-steps" && (
        <NextStepsEditor
          steps={block.steps}
          onChange={(steps) => onChange({ ...block, steps })}
        />
      )}

      {block.type === "cta" && (
        <div className="space-y-2">
          <div>
            <Label>Headline</Label>
            <Input
              value={block.headline}
              onChange={(v) => onChange({ ...block, headline: v })}
              placeholder="e.g. Ready to get started?"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Email</Label>
              <Input
                value={block.email}
                onChange={(v) => onChange({ ...block, email: v })}
                placeholder="info.darvincode@gmail.com"
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                value={block.website}
                onChange={(v) => onChange({ ...block, website: v })}
                placeholder="www.darvincode.com"
              />
            </div>
          </div>
        </div>
      )}

      {block.type === "text" && (
        <div>
          <Label>Body text</Label>
          <Textarea
            value={block.body}
            onChange={(v) => onChange({ ...block, body: v })}
            placeholder="Paragraph text…"
            rows={4}
          />
        </div>
      )}
    </Card>
  )
}

function newBlock(type: SectionBlock["type"]): SectionBlock {
  switch (type) {
    case "flow":
      return { type: "flow", steps: [{ title: "", description: "" }] }
    case "pricing":
      return { type: "pricing", items: [{ label: "", price: "" }], addOns: [] }
    case "platforms":
      return { type: "platforms", platforms: [], services: [] }
    case "next-steps":
      return { type: "next-steps", steps: [{ title: "", description: "" }] }
    case "cta":
      return { type: "cta", headline: "Ready to get started?", email: "info.darvincode@gmail.com", website: "www.darvincode.com" }
    case "text":
      return { type: "text", body: "" }
  }
}

function SectionEditor({
  section,
  index,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: {
  section: ProposalSection
  index: number
  onChange: (s: ProposalSection) => void
  onRemove: () => void
  onMoveUp: () => void
  onMoveDown: () => void
  isFirst: boolean
  isLast: boolean
}) {
  const [collapsed, setCollapsed] = useState(false)

  const updateBlock = (i: number, b: SectionBlock) => {
    const next = [...section.blocks]
    next[i] = b
    onChange({ ...section, blocks: next })
  }

  const removeBlock = (i: number) => {
    onChange({ ...section, blocks: section.blocks.filter((_, j) => j !== i) })
  }

  const addBlock = (type: SectionBlock["type"]) => {
    onChange({ ...section, blocks: [...section.blocks, newBlock(type)] })
  }

  return (
    <div className="rounded-xl border border-stone-200 bg-white overflow-hidden">
      {/* Section header */}
      <div className="flex items-center justify-between px-4 py-3 bg-stone-50 border-b border-stone-200">
        <div className="flex items-center gap-3 flex-1">
          <span className="text-xs bg-[#C4622D] text-white rounded px-2 py-0.5 font-medium">
            SECTION {String(index + 1).padStart(2, "0")}
          </span>
          <input
            className="flex-1 bg-transparent text-sm font-semibold text-stone-800 border-none outline-none placeholder:text-stone-300 focus:ring-0"
            value={section.title}
            onChange={(e) => onChange({ ...section, title: e.target.value })}
            placeholder="Section title…"
          />
        </div>
        <div className="flex items-center gap-1">
          {!isFirst && (
            <button type="button" onClick={onMoveUp} className="text-stone-400 hover:text-stone-700 px-1 cursor-pointer text-xs">↑</button>
          )}
          {!isLast && (
            <button type="button" onClick={onMoveDown} className="text-stone-400 hover:text-stone-700 px-1 cursor-pointer text-xs">↓</button>
          )}
          <button
            type="button"
            className="text-stone-400 hover:text-stone-700 px-1 cursor-pointer text-xs"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? "▾" : "▴"}
          </button>
          <Btn variant="danger" size="xs" onClick={onRemove}>✕</Btn>
        </div>
      </div>

      {!collapsed && (
        <div className="p-4 space-y-4">
          {/* Tag override */}
          <div>
            <Label>Section tag label</Label>
            <Input
              value={section.tag}
              onChange={(v) => onChange({ ...section, tag: v })}
              placeholder={`SECTION ${String(index + 1).padStart(2, "0")}`}
            />
          </div>

          {/* Blocks */}
          {section.blocks.map((block, i) => (
            <BlockEditor
              key={i}
              block={block}
              onChange={(b) => updateBlock(i, b)}
              onRemove={() => removeBlock(i)}
            />
          ))}

          {/* Add block menu */}
          <div>
            <p className="text-xs text-stone-400 mb-2">Add a block:</p>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(BLOCK_LABELS) as SectionBlock["type"][]).map((type) => (
                <button
                  key={type}
                  type="button"
                  className="text-xs px-2.5 py-1 rounded border border-stone-200 text-stone-500 hover:border-[#C4622D] hover:text-[#C4622D] transition-colors cursor-pointer"
                  onClick={() => addBlock(type)}
                >
                  + {BLOCK_LABELS[type]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main form ──────────────────────────────────────────────────────────────────

export function ProposalForm({
  initial,
  onChange,
}: {
  initial: Proposal
  onChange: (p: Proposal) => void
}) {
  const update = useCallback(
    (patch: Partial<Proposal>) => onChange({ ...initial, ...patch }),
    [initial, onChange]
  )

  const updateSection = (i: number, section: ProposalSection) => {
    const next = [...initial.sections]
    next[i] = section
    update({ sections: next })
  }

  const addSection = () => {
    const idx = initial.sections.length + 1
    update({
      sections: [
        ...initial.sections,
        {
          id: uid(),
          tag: `SECTION ${String(idx).padStart(2, "0")}`,
          title: "",
          blocks: [],
        },
      ],
    })
  }

  const removeSection = (i: number) => {
    update({ sections: initial.sections.filter((_, j) => j !== i) })
  }

  const moveSection = (from: number, to: number) => {
    if (to < 0 || to >= initial.sections.length) return
    const next = [...initial.sections]
    ;[next[from], next[to]] = [next[to], next[from]]
    update({ sections: next })
  }

  return (
    <div className="space-y-6">
      {/* Cover page info */}
      <div className="rounded-xl border border-stone-200 bg-white p-5 space-y-4">
        <h2 className="text-sm font-semibold text-stone-700 uppercase tracking-wider">Cover Page</h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Project Name</Label>
            <Input
              value={initial.projectName}
              onChange={(v) => update({ projectName: v })}
              placeholder="e.g. One World"
            />
          </div>
          <div>
            <Label>Project Subtitle (italic)</Label>
            <Input
              value={initial.projectSubtitle || ""}
              onChange={(v) => update({ projectSubtitle: v })}
              placeholder="e.g. Mirissa."
            />
          </div>
          <div>
            <Label>Client Name</Label>
            <Input
              value={initial.clientName}
              onChange={(v) => update({ clientName: v })}
              placeholder="e.g. One World Mirissa"
            />
          </div>
          <div>
            <Label>Date</Label>
            <Input
              value={initial.date}
              onChange={(v) => update({ date: v })}
              placeholder="e.g. June 2026"
            />
          </div>
          <div>
            <Label>Version</Label>
            <Input
              value={initial.version}
              onChange={(v) => update({ version: v })}
              placeholder="1.0"
            />
          </div>
          <div>
            <Label>Sidebar tagline</Label>
            <Input
              value={initial.tagline || ""}
              onChange={(v) => update({ tagline: v })}
              placeholder="HOSPITALITY · DIGITAL · STUDIO"
            />
          </div>
        </div>
      </div>

      {/* Sections */}
      {initial.sections.map((section, i) => (
        <SectionEditor
          key={section.id}
          section={section}
          index={i}
          onChange={(s) => updateSection(i, s)}
          onRemove={() => removeSection(i)}
          onMoveUp={() => moveSection(i, i - 1)}
          onMoveDown={() => moveSection(i, i + 1)}
          isFirst={i === 0}
          isLast={i === initial.sections.length - 1}
        />
      ))}

      <button
        type="button"
        className="w-full py-3 rounded-xl border-2 border-dashed border-stone-200 text-sm text-stone-400 hover:border-[#C4622D] hover:text-[#C4622D] transition-colors cursor-pointer"
        onClick={addSection}
      >
        + Add section
      </button>
    </div>
  )
}
