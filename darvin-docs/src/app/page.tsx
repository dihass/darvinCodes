"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { Proposal } from "@/types/proposal"
import type { Invoice } from "@/types/invoice"
import { getProposals, getInvoices, getContracts, deleteProposal, deleteInvoice, deleteContract, exportBackup, importBackup } from "@/lib/storage"
import type { Contract } from "@/types/contract"

function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-stone-300 border-2 border-dashed border-stone-200 rounded-xl">
      <div className="text-3xl mb-2">📄</div>
      <p className="text-sm">No {label} yet</p>
    </div>
  )
}

function ProposalCard({
  p,
  onEdit,
  onDelete,
}: {
  p: Proposal
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-4 hover:border-stone-300 transition-colors group">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-[#C4622D] font-medium uppercase tracking-wide mb-0.5">Proposal</p>
          <h3 className="font-semibold text-stone-900 truncate">
            {p.projectName || "Untitled"}{p.projectSubtitle ? ` ${p.projectSubtitle}` : ""}
          </h3>
          <p className="text-sm text-stone-400 truncate">{p.clientName || "—"}</p>
        </div>
        <span className="text-xs text-stone-300 flex-shrink-0 mt-1">{p.date}</span>
      </div>
      <div className="flex items-center gap-1 text-xs text-stone-400 mb-3">
        <span>{p.sections.length} section{p.sections.length !== 1 ? "s" : ""}</span>
        <span>·</span>
        <span>v{p.version}</span>
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={onEdit}
          className="flex-1 text-xs py-1.5 rounded bg-[#C4622D] text-white hover:bg-[#a8531f] transition-colors cursor-pointer"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="text-xs px-3 py-1.5 rounded border border-stone-200 text-stone-400 hover:text-red-500 hover:border-red-200 transition-colors cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

function InvoiceCard({
  inv,
  onEdit,
  onDelete,
}: {
  inv: Invoice
  onEdit: () => void
  onDelete: () => void
}) {
  const subtotal = inv.lineItems.reduce((s, item) => s + item.quantity * item.rate, 0)
  const tax = inv.taxPercent ? (subtotal * inv.taxPercent) / 100 : 0
  const total = subtotal + tax

  const STATUS_STYLES: Record<string, string> = {
    paid:    "text-emerald-600 bg-emerald-50",
    overdue: "text-red-600 bg-red-50",
    unpaid:  "text-stone-400 bg-stone-100",
  }
  const status = inv.status ?? "unpaid"

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-4 hover:border-stone-300 transition-colors group">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="text-xs text-stone-400 font-medium uppercase tracking-wide">Invoice</p>
            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded capitalize ${STATUS_STYLES[status]}`}>
              {status}
            </span>
          </div>
          <h3 className="font-semibold text-stone-900 truncate">{inv.invoiceNumber}</h3>
          <p className="text-sm text-stone-400 truncate">{inv.clientName || "—"}</p>
        </div>
        <span className="text-xs text-stone-300 flex-shrink-0 mt-1">{inv.issueDate}</span>
      </div>
      <div className="flex items-center gap-1 text-xs mb-3">
        <span className="font-semibold text-stone-800">
          {inv.currency} {total.toLocaleString("en-LK", { minimumFractionDigits: 2 })}
        </span>
        <span className="text-stone-400">· Due {inv.dueDate}</span>
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={onEdit}
          className="flex-1 text-xs py-1.5 rounded bg-[#1A1A1A] text-white hover:bg-stone-700 transition-colors cursor-pointer"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="text-xs px-3 py-1.5 rounded border border-stone-200 text-stone-400 hover:text-red-500 hover:border-red-200 transition-colors cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

function ContractCard({
  c,
  onEdit,
  onDelete,
}: {
  c: Contract
  onEdit: () => void
  onDelete: () => void
}) {
  const STATUS_STYLES: Record<string, string> = {
    draft:  "text-stone-400 bg-stone-100",
    sent:   "text-blue-700 bg-blue-50",
    signed: "text-emerald-700 bg-emerald-50",
  }
  const status = c.status ?? "draft"

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-4 hover:border-stone-300 transition-colors group">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="text-xs text-stone-400 font-medium uppercase tracking-wide">Contract</p>
            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded capitalize ${STATUS_STYLES[status]}`}>
              {status}
            </span>
          </div>
          <h3 className="font-semibold text-stone-900 truncate">{c.contractNumber}</h3>
          <p className="text-sm text-stone-400 truncate">{c.clientName || "—"}</p>
        </div>
        <span className="text-xs text-stone-300 flex-shrink-0 mt-1">{c.contractDate}</span>
      </div>
      <p className="text-xs text-stone-400 truncate mb-3">{c.projectName || "—"}</p>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={onEdit}
          className="flex-1 text-xs py-1.5 rounded bg-[#1A1A1A] text-white hover:bg-stone-700 transition-colors cursor-pointer"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="text-xs px-3 py-1.5 rounded border border-stone-200 text-stone-400 hover:text-red-500 hover:border-red-200 transition-colors cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const router = useRouter()
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [contracts, setContracts] = useState<Contract[]>([])
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    const [p, inv, con] = await Promise.all([getProposals(), getInvoices(), getContracts()])
    setProposals(p)
    setInvoices(inv)
    setContracts(con)
    setLoading(false)
  }

  useEffect(() => {
    refresh()
  }, [])

  const handleDeleteProposal = async (id: string) => {
    if (!confirm("Delete this proposal?")) return
    await deleteProposal(id)
    refresh()
  }

  const handleDeleteInvoice = async (id: string) => {
    if (!confirm("Delete this invoice?")) return
    await deleteInvoice(id)
    refresh()
  }

  const handleDeleteContract = async (id: string) => {
    if (!confirm("Delete this contract?")) return
    await deleteContract(id)
    refresh()
  }

  const handleExport = async () => {
    await exportBackup()
  }

  const handleImport = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".json"
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      try {
        const result = await importBackup(file)
        await refresh()
        alert(`Imported ${result.proposals} proposal(s) and ${result.invoices} invoice(s).`)
      } catch {
        alert("Could not import — make sure it's a valid Darvin Code backup file.")
      }
    }
    input.click()
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-[#1A1A1A] px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#C4622D] flex items-center justify-center text-white text-xs font-bold">
            {"</>"}
          </div>
          <div>
            <h1 className="text-white font-semibold text-sm">Darvin Code</h1>
            <p className="text-stone-400 text-xs">Proposals & Invoices</p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <button
            type="button"
            onClick={handleImport}
            className="text-xs px-3 py-1.5 rounded-lg border border-stone-600 text-stone-400 hover:text-white hover:border-stone-400 transition-colors cursor-pointer"
          >
            Import
          </button>
          <button
            type="button"
            onClick={handleExport}
            className="text-xs px-3 py-1.5 rounded-lg border border-stone-600 text-stone-400 hover:text-white hover:border-stone-400 transition-colors cursor-pointer"
          >
            Export backup
          </button>
          <div className="w-px h-5 bg-stone-700" />
          <button
            type="button"
            onClick={() => router.push("/proposal")}
            className="text-sm px-4 py-2 rounded-lg bg-[#C4622D] text-white hover:bg-[#a8531f] font-medium transition-colors cursor-pointer"
          >
            + New Proposal
          </button>
          <button
            type="button"
            onClick={() => router.push("/invoice")}
            className="text-sm px-4 py-2 rounded-lg bg-stone-700 text-white hover:bg-stone-600 font-medium transition-colors cursor-pointer"
          >
            + New Invoice
          </button>
          <button
            type="button"
            onClick={() => router.push("/contract")}
            className="text-sm px-4 py-2 rounded-lg border border-stone-600 text-stone-300 hover:text-white hover:border-stone-400 font-medium transition-colors cursor-pointer"
          >
            + New Contract
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-10">
        {loading ? (
          <div className="flex items-center justify-center py-24 text-stone-300 text-sm">
            Loading…
          </div>
        ) : (
          <>
            <section className="mb-12">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-semibold text-stone-600 uppercase tracking-wider">
                  Proposals <span className="text-stone-300 font-normal ml-1">({proposals.length})</span>
                </h2>
              </div>
              {proposals.length === 0 ? (
                <EmptyState label="proposals" />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {proposals.map((p) => (
                    <ProposalCard
                      key={p.id}
                      p={p}
                      onEdit={() => router.push(`/proposal?id=${p.id}`)}
                      onDelete={() => handleDeleteProposal(p.id)}
                    />
                  ))}
                </div>
              )}
            </section>

            <section className="mb-12">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-semibold text-stone-600 uppercase tracking-wider">
                  Invoices <span className="text-stone-300 font-normal ml-1">({invoices.length})</span>
                </h2>
              </div>
              {invoices.length === 0 ? (
                <EmptyState label="invoices" />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {invoices.map((inv) => (
                    <InvoiceCard
                      key={inv.id}
                      inv={inv}
                      onEdit={() => router.push(`/invoice?id=${inv.id}`)}
                      onDelete={() => handleDeleteInvoice(inv.id)}
                    />
                  ))}
                </div>
              )}
            </section>

            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-semibold text-stone-600 uppercase tracking-wider">
                  Contracts <span className="text-stone-300 font-normal ml-1">({contracts.length})</span>
                </h2>
              </div>
              {contracts.length === 0 ? (
                <EmptyState label="contracts" />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {contracts.map((c) => (
                    <ContractCard
                      key={c.id}
                      c={c}
                      onEdit={() => router.push(`/contract?id=${c.id}`)}
                      onDelete={() => handleDeleteContract(c.id)}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  )
}
