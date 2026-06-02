export type Contract = {
  id: string
  proposalId?: string
  contractNumber: string
  contractDate: string
  clientName: string
  clientEmail?: string
  clientAddress?: string
  projectName: string
  scope: string
  currency: string
  totalAmount: number
  depositPercent: number
  paymentTerms: string
  revisionsIncluded: number
  additionalTerms?: string
  status: "draft" | "sent" | "signed"
  createdAt: string
  updatedAt: string
}
