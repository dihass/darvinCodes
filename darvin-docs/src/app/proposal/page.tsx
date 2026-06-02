"use client"

import { useState, useEffect, useCallback, Suspense } from "react"
import dynamic from "next/dynamic"
import { useSearchParams, useRouter } from "next/navigation"
import type { Proposal } from "@/types/proposal"
import { ProposalForm } from "@/components/forms/ProposalForm"
import { saveProposal, getProposals, uid } from "@/lib/storage"

const PDFDownloadButton = dynamic(
  () => import("@/components/pdf/PDFDownloadButton").then((m) => ({ default: m.PDFDownloadButton })),
  { ssr: false }
)
const PDFPreview = dynamic(
  () => import("@/components/pdf/PDFPreview").then((m) => ({ default: m.PDFPreview })),
  { ssr: false }
)

function emptyProposal(): Proposal {
  return {
    id: uid(),
    projectName: "",
    projectSubtitle: "",
    clientName: "",
    date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    version: "1.0",
    tagline: "HOSPITALITY · DIGITAL · STUDIO",
    sections: [
      {
        id: uid(),
        tag: "SECTION 01",
        title: "Website & Payment Gateways",
        blocks: [
          {
            type: "flow",
            steps: [
              { title: "Guest visits your website", description: "Browses rooms, packages & availability" },
              { title: "Submits an enquiry", description: "Name, dates & request captured in a form" },
              { title: "You receive it on WhatsApp", description: "Enquiry lands directly in your chat" },
              { title: "Guest pays via Payhere link", description: "You send a secure payment link to confirm" },
            ],
          },
          {
            type: "pricing",
            items: [
              { label: "Website Build", price: "LKR 35,000", note: "One-time fee" },
              { label: "Hosting + Domain", price: "LKR 5,000", period: "month", highlight: "First month free" },
            ],
            addOns: [
              { title: "Stripe Account Setup", price: "LKR 15,000", note: "One-time · Personal account" },
              { title: "Payhere Account Setup", price: "LKR 10,000", note: "One-time · Local payments" },
            ],
          },
        ],
      },
      {
        id: uid(),
        tag: "SECTION 02",
        title: "Online Presence",
        blocks: [
          {
            type: "platforms",
            platforms: [
              { abbrev: "TK", name: "TikTok", description: "Short video & reels" },
              { abbrev: "IG", name: "Instagram", description: "Posts, stories & reels" },
              { abbrev: "FB", name: "Facebook", description: "Posts & community" },
            ],
            services: [
              { title: "Google Review Management", description: "Monitor, respond & grow your rating" },
              { title: "Day-Out Package Promotions", description: "Campaigns for pool, dining & activities" },
            ],
          },
          {
            type: "pricing",
            items: [
              { label: "Monthly Retainer", price: "LKR 70,000", note: "TikTok · Instagram · Facebook · Google Reviews" },
              { label: "First Month", price: "LKR 35,000", highlight: "50% off", highlightBox: true },
            ],
            addOns: [],
          },
          {
            type: "next-steps",
            steps: [
              { title: "Review & Approve", description: "Confirm scope & pricing." },
              { title: "Sign Agreement", description: "Digital contract sent." },
              { title: "Onboarding Call", description: "30-min kick-off." },
              { title: "Build Begins", description: "Live within 3–4 weeks." },
            ],
          },
          {
            type: "cta",
            headline: "Ready to get started?",
            email: "info.darvincode@gmail.com",
            website: "www.darvincode.com",
          },
        ],
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

function ProposalPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const editId = searchParams.get("id")

  const [proposal, setProposal] = useState<Proposal>(() => emptyProposal())
  const [showPreview, setShowPreview] = useState(true)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!editId) return
    getProposals().then((all) => {
      const existing = all.find((p) => p.id === editId)
      if (existing) setProposal(existing)
    })
  }, [editId])

  const handleChange = useCallback((p: Proposal) => {
    setProposal({ ...p, updatedAt: new Date().toISOString() })
    setSaved(false)
  }, [])

  const handleSave = async () => {
    await saveProposal(proposal)
    setSaved(true)
    if (!editId) {
      router.replace(`/proposal?id=${proposal.id}`)
    }
  }

  const fileName = `DarvinCode_Proposal_${(proposal.clientName || "Draft").replace(/\s+/g, "")}.pdf`

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Topbar */}
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
            {proposal.projectName || "New Proposal"} — {proposal.clientName || "—"}
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
            onClick={() => router.push(`/contract?proposalId=${proposal.id}`)}
            className="text-xs px-3 py-1.5 rounded border border-stone-600 text-stone-400 hover:text-white hover:border-stone-400 transition-colors cursor-pointer"
          >
            Generate Contract
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="text-xs px-3 py-1.5 rounded bg-stone-700 hover:bg-stone-600 text-white transition-colors cursor-pointer"
          >
            {saved ? "✓ Saved" : "Save"}
          </button>
          <Suspense fallback={null}>
            <PDFDownloadButton proposal={proposal} fileName={fileName} />
          </Suspense>
        </div>
      </header>

      {/* Main split layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Form panel */}
        <div
          className={`overflow-y-auto ${showPreview ? "w-1/2" : "w-full"} transition-all`}
          style={{ scrollbarWidth: "thin" }}
        >
          <div className="max-w-2xl mx-auto px-6 py-8">
            <ProposalForm initial={proposal} onChange={handleChange} />
          </div>
        </div>

        {/* Preview panel */}
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
                <PDFPreview proposal={proposal} />
              </Suspense>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ProposalPageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-50 flex items-center justify-center text-stone-400">Loading…</div>}>
      <ProposalPage />
    </Suspense>
  )
}
