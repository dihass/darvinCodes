"use client"

import { PDFDownloadLink } from "@react-pdf/renderer"
import { ContractPDF } from "./ContractPDF"
import type { Contract } from "@/types/contract"

export function ContractDownloadButton({ contract, fileName }: { contract: Contract; fileName: string }) {
  return (
    <PDFDownloadLink document={<ContractPDF contract={contract} />} fileName={fileName}>
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
