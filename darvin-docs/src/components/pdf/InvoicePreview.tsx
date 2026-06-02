"use client"

import { PDFViewer } from "@react-pdf/renderer"
import { InvoicePDF } from "./InvoicePDF"
import type { Invoice } from "@/types/invoice"

export function InvoicePreview({ invoice }: { invoice: Invoice }) {
  return (
    <PDFViewer width="100%" height="100%" showToolbar={false}>
      <InvoicePDF invoice={invoice} />
    </PDFViewer>
  )
}
