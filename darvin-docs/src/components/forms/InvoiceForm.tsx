"use client"

import { useCallback } from "react"
import type { Invoice, LineItem } from "@/types/invoice"
import { uid } from "@/lib/storage"

const PRESETS: { label: string; rate: number; note?: string }[] = [
  { label: "Website Build",             rate: 35000 },
  { label: "Hosting + Domain",          rate: 5000  },
  { label: "Social Media Retainer",     rate: 70000 },
  { label: "First Month Social Media",  rate: 35000 },
  { label: "Stripe Account Setup",      rate: 15000 },
  { label: "Payhere Account Setup",     rate: 10000 },
  { label: "Logo & Brand Kit",          rate: 25000 },
  { label: "Google Review Management",  rate: 8000  },
]

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
  type = "text",
  className = "",
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  className?: string
}) {
  return (
    <input
      type={type}
      className={`w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-sm text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-[#C4622D]/40 focus:border-[#C4622D] ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  )
}

const STATUS_STYLES: Record<string, string> = {
  unpaid:  "bg-stone-100 text-stone-600 border-stone-200",
  paid:    "bg-emerald-50 text-emerald-700 border-emerald-200",
  overdue: "bg-red-50 text-red-700 border-red-200",
}

export function InvoiceForm({
  initial,
  onChange,
}: {
  initial: Invoice
  onChange: (inv: Invoice) => void
}) {
  const update = useCallback(
    (patch: Partial<Invoice>) => onChange({ ...initial, ...patch }),
    [initial, onChange]
  )

  const updateItem = (i: number, item: LineItem) => {
    const next = [...initial.lineItems]
    next[i] = item
    update({ lineItems: next })
  }

  const addItem = () => {
    update({
      lineItems: [
        ...initial.lineItems,
        { id: uid(), description: "", quantity: 1, rate: 0 },
      ],
    })
  }

  const addPreset = (preset: typeof PRESETS[number]) => {
    update({
      lineItems: [
        ...initial.lineItems,
        { id: uid(), description: preset.label, quantity: 1, rate: preset.rate },
      ],
    })
  }

  const removeItem = (i: number) => {
    update({ lineItems: initial.lineItems.filter((_, j) => j !== i) })
  }

  const subtotal = initial.lineItems.reduce((s, item) => s + item.quantity * item.rate, 0)
  const tax = initial.taxPercent ? (subtotal * initial.taxPercent) / 100 : 0
  const total = subtotal + tax

  const fmt = (n: number) =>
    `${initial.currency} ${n.toLocaleString("en-LK", { minimumFractionDigits: 2 })}`

  const status = initial.status ?? "unpaid"

  return (
    <div className="space-y-6">
      {/* Invoice details */}
      <div className="rounded-xl border border-stone-200 bg-white p-5 space-y-4">
        <h2 className="text-sm font-semibold text-stone-700 uppercase tracking-wider">Invoice Details</h2>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label>Invoice Number</Label>
            <Input
              value={initial.invoiceNumber}
              onChange={(v) => update({ invoiceNumber: v })}
              placeholder="INV-001"
            />
          </div>
          <div>
            <Label>Issue Date</Label>
            <Input
              value={initial.issueDate}
              onChange={(v) => update({ issueDate: v })}
              placeholder="June 3, 2026"
            />
          </div>
          <div>
            <Label>Due Date</Label>
            <Input
              value={initial.dueDate}
              onChange={(v) => update({ dueDate: v })}
              placeholder="June 17, 2026"
            />
          </div>
          <div>
            <Label>Currency</Label>
            <Input
              value={initial.currency}
              onChange={(v) => update({ currency: v })}
              placeholder="LKR"
            />
          </div>
          <div>
            <Label>Tax %</Label>
            <Input
              type="number"
              value={String(initial.taxPercent ?? "")}
              onChange={(v) => update({ taxPercent: v === "" ? undefined : Number(v) })}
              placeholder="0"
            />
          </div>
          <div>
            <Label>Status</Label>
            <div className="flex gap-2">
              {(["unpaid", "paid", "overdue"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => update({ status: s })}
                  className={`flex-1 py-2 rounded-md border text-xs font-medium capitalize cursor-pointer transition-all ${
                    status === s
                      ? STATUS_STYLES[s] + " ring-2 ring-offset-1 ring-current"
                      : "bg-white text-stone-400 border-stone-200 hover:border-stone-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Client details */}
      <div className="rounded-xl border border-stone-200 bg-white p-5 space-y-4">
        <h2 className="text-sm font-semibold text-stone-700 uppercase tracking-wider">Billed To</h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Client Name</Label>
            <Input
              value={initial.clientName}
              onChange={(v) => update({ clientName: v })}
              placeholder="One World Mirissa"
            />
          </div>
          <div>
            <Label>Client Email</Label>
            <Input
              value={initial.clientEmail || ""}
              onChange={(v) => update({ clientEmail: v })}
              placeholder="client@email.com"
            />
          </div>
          <div className="col-span-2">
            <Label>Client Address</Label>
            <Input
              value={initial.clientAddress || ""}
              onChange={(v) => update({ clientAddress: v })}
              placeholder="Address (optional)"
            />
          </div>
        </div>
      </div>

      {/* Quick-add presets */}
      <div className="rounded-xl border border-stone-200 bg-white p-5 space-y-3">
        <h2 className="text-sm font-semibold text-stone-700 uppercase tracking-wider">Quick Add</h2>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => addPreset(preset)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 bg-stone-50 text-xs text-stone-600 hover:border-[#C4622D] hover:text-[#C4622D] hover:bg-[#C4622D]/5 transition-colors cursor-pointer"
            >
              <span className="text-[10px] text-stone-400">+</span>
              <span>{preset.label}</span>
              <span className="text-stone-400 font-medium">
                {preset.rate.toLocaleString("en-LK")}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Line items */}
      <div className="rounded-xl border border-stone-200 bg-white p-5 space-y-4">
        <h2 className="text-sm font-semibold text-stone-700 uppercase tracking-wider">Line Items</h2>

        <div className="grid grid-cols-[1fr_80px_120px_120px_32px] gap-2">
          <span className="text-xs text-stone-400 uppercase tracking-wide">Description</span>
          <span className="text-xs text-stone-400 uppercase tracking-wide text-right">Qty</span>
          <span className="text-xs text-stone-400 uppercase tracking-wide text-right">Rate</span>
          <span className="text-xs text-stone-400 uppercase tracking-wide text-right">Amount</span>
          <span />
        </div>

        <div className="space-y-2">
          {initial.lineItems.map((item, i) => (
            <div key={item.id} className="grid grid-cols-[1fr_80px_120px_120px_32px] gap-2 items-center">
              <Input
                value={item.description}
                onChange={(v) => updateItem(i, { ...item, description: v })}
                placeholder="Service description"
              />
              <input
                type="number"
                className="w-full rounded-md border border-stone-200 bg-white px-2 py-2 text-sm text-stone-800 text-right focus:outline-none focus:ring-2 focus:ring-[#C4622D]/40 focus:border-[#C4622D]"
                value={item.quantity}
                min={0}
                onChange={(e) => updateItem(i, { ...item, quantity: Number(e.target.value) })}
              />
              <input
                type="number"
                className="w-full rounded-md border border-stone-200 bg-white px-2 py-2 text-sm text-stone-800 text-right focus:outline-none focus:ring-2 focus:ring-[#C4622D]/40 focus:border-[#C4622D]"
                value={item.rate}
                min={0}
                onChange={(e) => updateItem(i, { ...item, rate: Number(e.target.value) })}
              />
              <div className="text-sm text-stone-700 text-right font-medium pr-1">
                {(item.quantity * item.rate).toLocaleString("en-LK")}
              </div>
              <button
                type="button"
                className="text-stone-300 hover:text-red-500 text-xs cursor-pointer"
                onClick={() => removeItem(i)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="w-full py-2.5 rounded-lg border-2 border-dashed border-stone-200 text-sm text-stone-400 hover:border-[#C4622D] hover:text-[#C4622D] transition-colors cursor-pointer"
          onClick={addItem}
        >
          + Add line item
        </button>

        <div className="flex justify-end">
          <div className="w-64 space-y-2 pt-2 border-t border-stone-200">
            <div className="flex justify-between text-sm text-stone-500">
              <span>Subtotal</span>
              <span>{fmt(subtotal)}</span>
            </div>
            {(initial.taxPercent ?? 0) > 0 && (
              <div className="flex justify-between text-sm text-stone-500">
                <span>Tax ({initial.taxPercent}%)</span>
                <span>{fmt(tax)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-200">
              <span>Total Due</span>
              <span className="text-[#C4622D]">{fmt(total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes & bank */}
      <div className="rounded-xl border border-stone-200 bg-white p-5 space-y-4">
        <h2 className="text-sm font-semibold text-stone-700 uppercase tracking-wider">Notes & Payment Details</h2>
        <div>
          <Label>Notes</Label>
          <textarea
            className="w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-sm text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-[#C4622D]/40 focus:border-[#C4622D] resize-none"
            value={initial.notes || ""}
            onChange={(e) => update({ notes: e.target.value })}
            placeholder="Payment terms, thank you note, etc."
            rows={2}
          />
        </div>
        <div>
          <Label>Bank / Payment Details</Label>
          <textarea
            className="w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-sm text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-[#C4622D]/40 focus:border-[#C4622D] resize-none"
            value={initial.bankDetails || ""}
            onChange={(e) => update({ bankDetails: e.target.value })}
            placeholder="Bank name, account number, etc."
            rows={3}
          />
        </div>
      </div>
    </div>
  )
}
