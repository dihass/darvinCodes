"use client"

import { PDFViewer } from "@react-pdf/renderer"
import { ProposalPDF } from "./ProposalPDF"
import type { Proposal } from "@/types/proposal"

export function PDFPreview({ proposal }: { proposal: Proposal }) {
  return (
    <PDFViewer width="100%" height="100%" showToolbar={false}>
      <ProposalPDF proposal={proposal} />
    </PDFViewer>
  )
}
