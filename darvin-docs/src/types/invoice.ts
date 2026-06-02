export type LineItem = {
  id: string
  description: string
  quantity: number
  rate: number
}

export type Invoice = {
  id: string
  invoiceNumber: string
  clientName: string
  clientEmail?: string
  clientAddress?: string
  issueDate: string
  dueDate: string
  currency: string
  lineItems: LineItem[]
  taxPercent?: number
  status?: "unpaid" | "paid" | "overdue"
  notes?: string
  bankDetails?: string
  createdAt: string
  updatedAt: string
}
