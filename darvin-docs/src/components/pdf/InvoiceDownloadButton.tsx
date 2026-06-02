"use client"

import { PDFDownloadLink } from "@react-pdf/renderer"
import { InvoicePDF } from "./InvoicePDF"
import type { Invoice } from "@/types/invoice"

export function InvoiceDownloadButton({ invoice, fileName }: { invoice: Invoice; fileName: string }) {
  return (
    <PDFDownloadLink document={<InvoicePDF invoice={invoice} />} fileName={fileName}>
      {({ loading }) => (
        <button
          type="button"
          className="text-xs px-4 py-1.5 rounded bg-[#C4622D] hover:bg-[#a8531f] text-white font-medium transition-colors cursor-pointer disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Preparing…" : "↓ Download PDF"}
        </button>
      )}
    </PDFDownloadLink>
  )
}
