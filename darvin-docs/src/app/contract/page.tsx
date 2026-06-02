"use client"

import { useState, useEffect, useCallback, Suspense } from "react"
import dynamic from "next/dynamic"
import { useSearchParams, useRouter } from "next/navigation"
import type { Contract } from "@/types/contract"
import type { Proposal } from "@/types/proposal"
import { ContractForm } from "@/components/forms/ContractForm"
import { saveContract, getContracts, getProposals, uid } from "@/lib/storage"

const ContractDownloadButton = dynamic(
  () => import("@/components/pdf/ContractDownloadButton").then((m) => ({ default: m.ContractDownloadButton })),
  { ssr: false }
)
const ContractPreview = dynamic(
  () => import("@/components/pdf/ContractPreview").then((m) => ({ default: m.ContractPreview })),
  { ssr: false }
)

function scopeFromProposal(proposal: Proposal): string {
  const lines: string[] = []
  for (const section of proposal.sections) {
    lines.push(`${section.tag} — ${section.title}`)
    for (const block of section.blocks) {
      if (block.type === "pricing") {
        for (const item of block.items) {
          let line = `  • ${item.label}: ${item.price}`
          if (item.note) line += ` (${item.note})`
          if (item.period) line += `/${item.period}`
          lines.push(line)
        }
        if (block.addOns && block.addOns.length > 0) {
          lines.push("  Add-ons:")
          for (const addon of block.addOns) {
            lines.push(`    • ${addon.title}: ${addon.price}${addon.note ? ` — ${addon.note}` : ""}`)
          }
        }
      }
    }
    lines.push("")
  }
  return lines.join("\n").trim()
}

function emptyContract(contractNumber = "DC-001"): Contract {
  const now = new Date()
  return {
    id: uid(),
    contractNumber,
    contractDate: now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    projectName: "",
    scope: "",
    currency: "LKR",
    totalAmount: 0,
    depositPercent: 50,
    paymentTerms: "50% deposit is due upon signing to commence work. The remaining balance is due upon project completion and delivery.",
    revisionsIncluded: 2,
    status: "draft",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  }
}

function ContractPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const editId = searchParams.get("id")
  const proposalId = searchParams.get("proposalId")

  const [contract, setContract] = useState<Contract>(() => emptyContract())
  const [showPreview, setShowPreview] = useState(true)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (editId) {
      getContracts().then((all) => {
        const existing = all.find((c) => c.id === editId)
        if (existing) setContract(existing)
      })
      return
    }

    // Assign sequential contract number
    getContracts().then((all) => {
      const nums = all
        .map((c) => parseInt(c.contractNumber.replace(/\D/g, ""), 10))
        .filter((n) => !isNaN(n))
      const max = nums.length > 0 ? Math.max(...nums) : 0
      const next = `DC-${String(max + 1).padStart(3, "0")}`
      setContract((prev) => ({ ...prev, contractNumber: next }))
    })

    // Pre-fill from proposal if provided
    if (proposalId) {
      getProposals().then((all) => {
        const proposal = all.find((p) => p.id === proposalId)
        if (!proposal) return
        setContract((prev) => ({
          ...prev,
          proposalId: proposal.id,
          clientName: proposal.clientName || "",
          projectName: proposal.projectName
            ? `${proposal.projectName}${proposal.projectSubtitle ? " — " + proposal.projectSubtitle : ""}`
            : "",
          scope: scopeFromProposal(proposal),
        }))
      })
    }
  }, [editId, proposalId])

  const handleChange = useCallback((c: Contract) => {
    setContract({ ...c, updatedAt: new Date().toISOString() })
    setSaved(false)
  }, [])

  const handleSave = async () => {
    await saveContract(contract)
    setSaved(true)
    if (!editId) {
      router.replace(`/contract?id=${contract.id}`)
    }
  }

  const fileName = `DarvinCode_Contract_${contract.contractNumber}_${(contract.clientName || "Draft").replace(/\s+/g, "")}.pdf`

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <header className="h-14 bg-[#1A1A1A] flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="text-stone-400 hover:text-white text-sm transition-colors cursor-pointer"
          >
            ← Dashboard
          </button>
          <div className="w-px h-4 bg-stone-700" />
          <span className="text-stone-300 text-sm">
            {contract.contractNumber} — {contract.clientName || "—"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="text-stone-400 hover:text-white text-xs px-3 py-1.5 rounded border border-stone-700 hover:border-stone-500 transition-colors cursor-pointer"
          >
            {showPreview ? "Hide preview" : "Show preview"}
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="text-xs px-3 py-1.5 rounded bg-stone-700 hover:bg-stone-600 text-white transition-colors cursor-pointer"
          >
            {saved ? "✓ Saved" : "Save"}
          </button>
          <Suspense fallback={null}>
            <ContractDownloadButton contract={contract} fileName={fileName} />
          </Suspense>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div
          className={`overflow-y-auto ${showPreview ? "w-1/2" : "w-full"} transition-all`}
          style={{ scrollbarWidth: "thin" }}
        >
          <div className="max-w-2xl mx-auto px-6 py-8">
            <ContractForm initial={contract} onChange={handleChange} />
          </div>
        </div>

        {showPreview && (
          <div className="w-1/2 border-l border-stone-200 bg-stone-200 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-hidden">
              <Suspense
                fallback={
                  <div className="flex-1 flex items-center justify-center text-stone-400 text-sm h-full">
                    Loading preview…
                  </div>
                }
              >
                <ContractPreview contract={contract} />
              </Suspense>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ContractPageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-50 flex items-center justify-center text-stone-400">Loading…</div>}>
      <ContractPage />
    </Suspense>
  )
}
