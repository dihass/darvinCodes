"use client"

import { useCallback } from "react"
import type { Contract } from "@/types/contract"

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
  draft:  "bg-stone-100 text-stone-600 border-stone-200",
  sent:   "bg-blue-50 text-blue-700 border-blue-200",
  signed: "bg-emerald-50 text-emerald-700 border-emerald-200",
}

export function ContractForm({
  initial,
  onChange,
}: {
  initial: Contract
  onChange: (c: Contract) => void
}) {
  const update = useCallback(
    (patch: Partial<Contract>) => onChange({ ...initial, ...patch }),
    [initial, onChange]
  )

  const deposit = (initial.totalAmount * initial.depositPercent) / 100
  const balance = initial.totalAmount - deposit

  const fmt = (n: number) =>
    `${initial.currency} ${n.toLocaleString("en-LK", { minimumFractionDigits: 2 })}`

  const status = initial.status ?? "draft"

  return (
    <div className="space-y-6">

      {/* Contract details */}
      <div className="rounded-xl border border-stone-200 bg-white p-5 space-y-4">
        <h2 className="text-sm font-semibold text-stone-700 uppercase tracking-wider">Contract Details</h2>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label>Contract Number</Label>
            <Input
              value={initial.contractNumber}
              onChange={(v) => update({ contractNumber: v })}
              placeholder="DC-001"
            />
          </div>
          <div>
            <Label>Contract Date</Label>
            <Input
              value={initial.contractDate}
              onChange={(v) => update({ contractDate: v })}
              placeholder="June 3, 2026"
            />
          </div>
          <div>
            <Label>Status</Label>
            <div className="flex gap-2">
              {(["draft", "sent", "signed"] as const).map((s) => (
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

      {/* Client */}
      <div className="rounded-xl border border-stone-200 bg-white p-5 space-y-4">
        <h2 className="text-sm font-semibold text-stone-700 uppercase tracking-wider">Client</h2>
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

      {/* Project & scope */}
      <div className="rounded-xl border border-stone-200 bg-white p-5 space-y-4">
        <h2 className="text-sm font-semibold text-stone-700 uppercase tracking-wider">Project & Scope</h2>
        <div>
          <Label>Project Name</Label>
          <Input
            value={initial.projectName}
            onChange={(v) => update({ projectName: v })}
            placeholder="Website & Social Media — One World Mirissa"
          />
        </div>
        <div>
          <Label>Scope of Work</Label>
          <textarea
            className="w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-sm text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-[#C4622D]/40 focus:border-[#C4622D] resize-none font-mono"
            value={initial.scope}
            onChange={(e) => update({ scope: e.target.value })}
            placeholder={"SECTION 01 — Website & Payment Gateways\n  • Website Build: LKR 35,000\n  • Hosting + Domain: LKR 5,000/month"}
            rows={8}
          />
        </div>
      </div>

      {/* Payment */}
      <div className="rounded-xl border border-stone-200 bg-white p-5 space-y-4">
        <h2 className="text-sm font-semibold text-stone-700 uppercase tracking-wider">Payment</h2>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label>Currency</Label>
            <Input
              value={initial.currency}
              onChange={(v) => update({ currency: v })}
              placeholder="LKR"
            />
          </div>
          <div>
            <Label>Total Amount</Label>
            <input
              type="number"
              className="w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#C4622D]/40 focus:border-[#C4622D]"
              value={initial.totalAmount || ""}
              min={0}
              onChange={(e) => update({ totalAmount: Number(e.target.value) })}
              placeholder="35000"
            />
          </div>
          <div>
            <Label>Deposit %</Label>
            <input
              type="number"
              className="w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#C4622D]/40 focus:border-[#C4622D]"
              value={initial.depositPercent}
              min={0}
              max={100}
              onChange={(e) => update({ depositPercent: Number(e.target.value) })}
            />
          </div>
        </div>

        {/* Payment breakdown */}
        {initial.totalAmount > 0 && (
          <div className="w-full space-y-2 pt-2 border-t border-stone-200">
            <div className="flex justify-between text-sm text-stone-500">
              <span>Deposit ({initial.depositPercent}%)</span>
              <span>{fmt(deposit)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-stone-900">
              <span>Balance on completion</span>
              <span className="text-[#C4622D]">{fmt(balance)}</span>
            </div>
          </div>
        )}

        <div>
          <Label>Payment Terms</Label>
          <textarea
            className="w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-sm text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-[#C4622D]/40 focus:border-[#C4622D] resize-none"
            value={initial.paymentTerms}
            onChange={(e) => update({ paymentTerms: e.target.value })}
            rows={2}
          />
        </div>

        <div>
          <Label>Revisions Included</Label>
          <input
            type="number"
            className="w-32 rounded-md border border-stone-200 bg-white px-3 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#C4622D]/40 focus:border-[#C4622D]"
            value={initial.revisionsIncluded}
            min={0}
            onChange={(e) => update({ revisionsIncluded: Number(e.target.value) })}
          />
        </div>
      </div>

      {/* Additional terms */}
      <div className="rounded-xl border border-stone-200 bg-white p-5 space-y-4">
        <h2 className="text-sm font-semibold text-stone-700 uppercase tracking-wider">Additional Terms <span className="text-stone-300 font-normal normal-case tracking-normal">— optional</span></h2>
        <textarea
          className="w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-sm text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-[#C4622D]/40 focus:border-[#C4622D] resize-none"
          value={initial.additionalTerms || ""}
          onChange={(e) => update({ additionalTerms: e.target.value || undefined })}
          placeholder="Any project-specific terms, exclusions, or special conditions…"
          rows={3}
        />
      </div>
    </div>
  )
}
