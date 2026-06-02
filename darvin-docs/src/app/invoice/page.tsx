"use client"

import { useState, useEffect, useCallback, Suspense } from "react"
import dynamic from "next/dynamic"
import { useSearchParams, useRouter } from "next/navigation"
import type { Invoice } from "@/types/invoice"
import { InvoiceForm } from "@/components/forms/InvoiceForm"
import { saveInvoice, getInvoices, uid } from "@/lib/storage"

const InvoiceDownloadButton = dynamic(
  () => import("@/components/pdf/InvoiceDownloadButton").then((m) => ({ default: m.InvoiceDownloadButton })),
  { ssr: false }
)
const InvoicePreview = dynamic(
  () => import("@/components/pdf/InvoicePreview").then((m) => ({ default: m.InvoicePreview })),
  { ssr: false }
)

function emptyInvoice(invoiceNumber = "INV-001"): Invoice {
  const now = new Date()
  const due = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000)
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
  return {
    id: uid(),
    invoiceNumber,
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    issueDate: fmt(now),
    dueDate: fmt(due),
    currency: "LKR",
    lineItems: [{ id: uid(), description: "", quantity: 1, rate: 0 }],
    taxPercent: 0,
    status: "unpaid",
    notes: "Thank you for choosing Darvin Code. Payment is due within 14 days of invoice date.",
    bankDetails: "Bank: [Bank Name]\nAccount Name: Darvin Code\nAccount No: [Account Number]\nBranch: [Branch Name]",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  }
}

function InvoicePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const editId = searchParams.get("id")

  const [invoice, setInvoice] = useState<Invoice>(() => emptyInvoice())
  const [showPreview, setShowPreview] = useState(true)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (editId) {
      getInvoices().then((all) => {
        const existing = all.find((inv) => inv.id === editId)
        if (existing) setInvoice(existing)
      })
    } else {
      // Assign sequential invoice number for new invoices
      getInvoices().then((all) => {
        const nums = all
          .map((inv) => parseInt(inv.invoiceNumber.replace(/\D/g, ""), 10))
          .filter((n) => !isNaN(n))
        const max = nums.length > 0 ? Math.max(...nums) : 0
        const next = `INV-${String(max + 1).padStart(3, "0")}`
        setInvoice((prev) => ({ ...prev, invoiceNumber: next }))
      })
    }
  }, [editId])

  const handleChange = useCallback((inv: Invoice) => {
    setInvoice({ ...inv, updatedAt: new Date().toISOString() })
    setSaved(false)
  }, [])

  const handleSave = async () => {
    await saveInvoice(invoice)
    setSaved(true)
    if (!editId) {
      router.replace(`/invoice?id=${invoice.id}`)
    }
  }

  const fileName = `DarvinCode_Invoice_${invoice.invoiceNumber}_${(invoice.clientName || "Draft").replace(/\s+/g, "")}.pdf`

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Topbar */}
      <header className="h-14 bg-[#1A1A1A] flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="text-stone-400 hover:text-white text-sm transition-colors cursor-pointer"
          >
            ← Dashboard
          </button>
          <div className="w-px h-4 bg-stone-700" />
          <span className="text-stone-300 text-sm">
            {invoice.invoiceNumber} — {invoice.clientName || "—"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="text-stone-400 hover:text-white text-xs px-3 py-1.5 rounded border border-stone-700 hover:border-stone-500 transition-colors cursor-pointer"
          >
            {showPreview ? "Hide preview" : "Show preview"}
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="text-xs px-3 py-1.5 rounded bg-stone-700 hover:bg-stone-600 text-white transition-colors cursor-pointer"
          >
            {saved ? "✓ Saved" : "Save"}
          </button>
          <Suspense fallback={null}>
            <InvoiceDownloadButton invoice={invoice} fileName={fileName} />
          </Suspense>
        </div>
      </header>

      {/* Split layout */}
      <div className="flex-1 flex overflow-hidden">
        <div
          className={`overflow-y-auto ${showPreview ? "w-1/2" : "w-full"} transition-all`}
          style={{ scrollbarWidth: "thin" }}
        >
          <div className="max-w-2xl mx-auto px-6 py-8">
            <InvoiceForm initial={invoice} onChange={handleChange} />
          </div>
        </div>

        {showPreview && (
          <div className="w-1/2 border-l border-stone-200 bg-stone-200 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-hidden">
              <Suspense
                fallback={
                  <div className="flex-1 flex items-center justify-center text-stone-400 text-sm h-full">
                    Loading preview…
                  </div>
                }
              >
                <InvoicePreview invoice={invoice} />
              </Suspense>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function InvoicePageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-50 flex items-center justify-center text-stone-400">Loading…</div>}>
      <InvoicePage />
    </Suspense>
  )
}
