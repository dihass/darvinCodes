import { supabase } from "./supabase"
import type { Proposal } from "@/types/proposal"
import type { Invoice } from "@/types/invoice"
import type { Contract } from "@/types/contract"

// ── Proposals ─────────────────────────────────────────────────────────────

export async function getProposals(): Promise<Proposal[]> {
  const { data, error } = await supabase
    .from("proposals")
    .select("data")
    .order("updated_at", { ascending: false })
  if (error) throw error
  return data.map((r) => r.data as Proposal)
}

export async function saveProposal(p: Proposal): Promise<void> {
  const { error } = await supabase
    .from("proposals")
    .upsert({ id: p.id, data: p, updated_at: p.updatedAt })
  if (error) throw error
}

export async function deleteProposal(id: string): Promise<void> {
  const { error } = await supabase.from("proposals").delete().eq("id", id)
  if (error) throw error
}

// ── Invoices ───────────────────────────────────────────────────────────────

export async function getInvoices(): Promise<Invoice[]> {
  const { data, error } = await supabase
    .from("invoices")
    .select("data")
    .order("updated_at", { ascending: false })
  if (error) throw error
  return data.map((r) => r.data as Invoice)
}

export async function saveInvoice(inv: Invoice): Promise<void> {
  const { error } = await supabase
    .from("invoices")
    .upsert({ id: inv.id, data: inv, updated_at: inv.updatedAt })
  if (error) throw error
}

export async function deleteInvoice(id: string): Promise<void> {
  const { error } = await supabase.from("invoices").delete().eq("id", id)
  if (error) throw error
}

// ── Contracts ─────────────────────────────────────────────────────────────

export async function getContracts(): Promise<Contract[]> {
  const { data, error } = await supabase
    .from("contracts")
    .select("data")
    .order("updated_at", { ascending: false })
  if (error) throw error
  return data.map((r) => r.data as Contract)
}

export async function saveContract(c: Contract): Promise<void> {
  const { error } = await supabase
    .from("contracts")
    .upsert({ id: c.id, data: c, updated_at: c.updatedAt })
  if (error) throw error
}

export async function deleteContract(id: string): Promise<void> {
  const { error } = await supabase.from("contracts").delete().eq("id", id)
  if (error) throw error
}

// ── Backup export / import ─────────────────────────────────────────────────

export async function exportBackup(): Promise<void> {
  const [proposals, invoices] = await Promise.all([getProposals(), getInvoices()])
  const data = {
    version: 1,
    exportedAt: new Date().toISOString(),
    proposals,
    invoices,
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `darvincode-backup-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export async function importBackup(file: File): Promise<{ proposals: number; invoices: number }> {
  const text = await file.text()
  const data = JSON.parse(text)
  const proposals: Proposal[] = Array.isArray(data.proposals) ? data.proposals : []
  const invoices: Invoice[] = Array.isArray(data.invoices) ? data.invoices : []

  await Promise.all([
    ...proposals.map((p) => saveProposal(p)),
    ...invoices.map((inv) => saveInvoice(inv)),
  ])

  return { proposals: proposals.length, invoices: invoices.length }
}

// ── Helpers ────────────────────────────────────────────────────────────────

export function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}
