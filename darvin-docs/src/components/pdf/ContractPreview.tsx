"use client"

import { PDFViewer } from "@react-pdf/renderer"
import { ContractPDF } from "./ContractPDF"
import type { Contract } from "@/types/contract"

export function ContractPreview({ contract }: { contract: Contract }) {
  return (
    <PDFViewer width="100%" height="100%" showToolbar={false}>
      <ContractPDF contract={contract} />
    </PDFViewer>
  )
}
