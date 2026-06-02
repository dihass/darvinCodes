export type FlowStep = {
  title: string
  description: string
}

export type PricingItem = {
  label: string
  price: string
  period?: string
  note?: string
  highlight?: string  // e.g. "First month free" — renders as terracotta text
  highlightBox?: boolean // renders the item as a terracotta filled box (e.g. "First Month" retainer card)
}

export type AddOn = {
  title: string
  price: string
  note?: string
}

export type PlatformCard = {
  abbrev: string
  name: string
  description: string
}

export type ServiceCard = {
  title: string
  description: string
}

export type NextStep = {
  title: string
  description: string
}

export type SectionBlock =
  | { type: 'flow'; steps: FlowStep[] }
  | { type: 'pricing'; items: PricingItem[]; addOns?: AddOn[] }
  | { type: 'platforms'; platforms: PlatformCard[]; services?: ServiceCard[] }
  | { type: 'next-steps'; steps: NextStep[] }
  | { type: 'cta'; headline: string; email: string; website: string }
  | { type: 'text'; body: string }

export type ProposalSection = {
  id: string
  tag: string // e.g. "SECTION 01"
  title: string
  blocks: SectionBlock[]
}

export type Proposal = {
  id: string
  projectName: string
  projectSubtitle?: string
  clientName: string
  date: string
  version: string
  tagline?: string // vertical sidebar text, e.g. "HOSPITALITY · DIGITAL · STUDIO"
  sections: ProposalSection[]
  createdAt: string
  updatedAt: string
}
