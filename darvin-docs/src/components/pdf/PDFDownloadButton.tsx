"use client"

import { PDFDownloadLink } from "@react-pdf/renderer"
import { ProposalPDF } from "./ProposalPDF"
import type { Proposal } from "@/types/proposal"

export function PDFDownloadButton({ proposal, fileName }: { proposal: Proposal; fileName: string }) {
  return (
    <PDFDownloadLink document={<ProposalPDF proposal={proposal} />} fileName={fileName}>
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
