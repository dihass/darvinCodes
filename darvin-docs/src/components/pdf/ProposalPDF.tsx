"use client"

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer"
import type { Proposal, ProposalSection, SectionBlock } from "@/types/proposal"
import { registerPdfFonts } from "@/lib/pdfFonts"

registerPdfFonts()

// ── Brand tokens ──────────────────────────────────────────────────────────────
const C = {
  pageBg:       "#f8f4f0",
  panelBg:      "#ede8e3",
  coral:        "#C4622D",
  coralLight:   "#D4956A",
  dark:         "#1A1A1A",
  mid:          "#666666",
  muted:        "#9E9189",
  rule:         "#D5CEC8",
  white:        "#FFFFFF",
  border:       "#E0D8D0",
}

// ── Cover page styles ─────────────────────────────────────────────────────────
const sC = StyleSheet.create({
  page: {
    backgroundColor: C.pageBg,
    position: "relative",
  },
  topBar: {
    height: 5,
    backgroundColor: C.coral,
  },
  body: {
    flex: 1,
    flexDirection: "row",
  },

  // Left side
  leftSide: {
    flex: 1,
    flexDirection: "column",
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 44,
    paddingTop: 22,
    paddingBottom: 0,
  },
  logoCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: C.coral,
    alignItems: "center",
    justifyContent: "center",
  },
  logoCircleText: {
    color: C.white,
    fontSize: 9,
    fontFamily: "Urbanist-Bold",
  },
  logoBrand: {
    fontSize: 13,
    color: C.dark,
    fontFamily: "Urbanist-Bold",
  },

  // Main centred block
  mainContent: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 44,
    paddingBottom: 56,
  },
  proposalLabel: {
    fontSize: 7.5,
    color: C.muted,
    fontFamily: "Urbanist-Light",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  thinRule: {
    height: 0.75,
    backgroundColor: C.rule,
    marginBottom: 18,
  },
  coverTitle: {
    fontSize: 48,
    color: C.dark,
    fontFamily: "Urbanist-ExtraBold",
    lineHeight: 1.05,
    marginBottom: 6,
  },
  coverSubtitle: {
    fontSize: 46,
    color: C.coral,
    fontFamily: "Spectral-LightItalic",
    lineHeight: 1.1,
    marginBottom: 16,
  },
  coralRule: {
    height: 1.5,
    backgroundColor: C.coral,
    marginBottom: 30,
  },
  metaGrid: {
    flexDirection: "row",
    gap: 52,
  },
  metaCol: {
    gap: 20,
  },
  metaItem: {},
  metaLabel: {
    fontSize: 7,
    color: C.muted,
    fontFamily: "Urbanist-Medium",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 3,
  },
  metaValue: {
    fontSize: 11,
    color: C.dark,
    fontFamily: "Urbanist-SemiBold",
  },

  // Right panel
  rightPanel: {
    width: 165,
    backgroundColor: C.panelBg,
    borderLeftWidth: 3,
    borderLeftColor: C.coral,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  decorCircle: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: C.coral,
    alignItems: "center",
    justifyContent: "center",
  },
  decorCircleText: {
    color: C.white,
    fontSize: 28,
    fontFamily: "Urbanist-Bold",
  },
  taglineWrapper: {
    position: "absolute",
    bottom: 52,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  taglineText: {
    fontSize: 6,
    color: C.coralLight,
    fontFamily: "Urbanist-Light",
    letterSpacing: 3,
    transform: "rotate(-90deg)",
  },

  // Footer
  coverFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  coverFooterRule: {
    height: 0.75,
    backgroundColor: C.rule,
    marginHorizontal: 44,
    marginBottom: 10,
  },
  coverFooterText: {
    fontSize: 7,
    color: C.muted,
    fontFamily: "Urbanist-Light",
    textAlign: "center",
    marginBottom: 14,
  },
})

// ── Content page styles (built-in PDF fonts, no network) ──────────────────────
const s = StyleSheet.create({
  page: {
    backgroundColor: C.pageBg,
    fontFamily: "Helvetica",
    paddingTop: 0,
    paddingBottom: 28,
    paddingLeft: 0,
    paddingRight: 0,
    position: "relative",
  },
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: C.coral,
  },
  sidebar: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 28,
    borderLeftWidth: 2,
    borderLeftColor: C.coral,
    borderLeftStyle: "solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  sidebarText: {
    fontSize: 6,
    color: "#BBBBBB",
    letterSpacing: 2,
    transform: "rotate(90deg)",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerLogo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  logoCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: C.coral,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    color: C.white,
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
  },
  headerBrand: {
    fontSize: 11,
    color: C.dark,
    fontFamily: "Helvetica-Bold",
  },
  headerMeta: {
    fontSize: 8,
    color: C.mid,
  },
  headerPageNum: {
    fontSize: 8,
    color: C.mid,
  },
  footer: {
    position: "absolute",
    bottom: 10,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  footerText: {
    fontSize: 7,
    color: "#BBBBBB",
  },
  footerDot: {
    fontSize: 7,
    color: "#BBBBBB",
  },
  contentBody: {
    paddingHorizontal: 40,
    paddingTop: 8,
    flex: 1,
  },
  sectionTagWrapper: {
    backgroundColor: C.coral,
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 2,
    marginBottom: 8,
  },
  sectionTag: {
    fontSize: 7,
    color: C.white,
    letterSpacing: 1,
    fontFamily: "Helvetica-Bold",
  },
  sectionTitle: {
    fontSize: 22,
    color: C.dark,
    fontFamily: "Helvetica-Bold",
    marginBottom: 6,
  },
  divider: {
    height: 1.5,
    backgroundColor: C.coral,
    marginBottom: 18,
  },
  flowGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  flowCard: {
    width: "48%",
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 6,
    padding: 14,
    backgroundColor: C.white,
  },
  flowBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: C.coral,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  flowBadgeText: {
    color: C.white,
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
  },
  flowTitle: {
    fontSize: 9,
    color: C.dark,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  flowDesc: {
    fontSize: 8,
    color: C.mid,
    lineHeight: 1.4,
  },
  pricingHeader: {
    fontSize: 14,
    color: C.dark,
    fontFamily: "Helvetica-Bold",
    marginBottom: 10,
  },
  pricingCard: {
    backgroundColor: C.dark,
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    marginBottom: 10,
  },
  pricingItem: {
    flex: 1,
  },
  pricingItemLabel: {
    fontSize: 7,
    color: "#AAAAAA",
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  pricingItemPrice: {
    fontSize: 18,
    color: C.white,
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  pricingItemPriceHighlight: {
    fontSize: 18,
    color: C.coral,
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  pricingItemNote: {
    fontSize: 7,
    color: "#AAAAAA",
  },
  pricingItemHighlight: {
    fontSize: 7,
    color: C.coral,
    fontFamily: "Helvetica-Bold",
  },
  pricingItemBox: {
    flex: 1,
    backgroundColor: C.coral,
    borderRadius: 6,
    padding: 12,
    justifyContent: "center",
  },
  pricingItemBoxLabel: {
    fontSize: 7,
    color: "rgba(255,255,255,0.75)",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  pricingItemBoxPrice: {
    fontSize: 18,
    color: C.white,
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  pricingItemBoxNote: {
    fontSize: 7,
    color: "rgba(255,255,255,0.85)",
  },
  addOnsLabel: {
    fontSize: 7,
    color: C.coral,
    fontFamily: "Helvetica-Bold",
    backgroundColor: "#F5E6DE",
    alignSelf: "flex-start",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  addOnsRow: {
    flexDirection: "row",
    gap: 8,
  },
  addOnCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 6,
    padding: 10,
    borderLeftWidth: 3,
    borderLeftColor: C.coral,
  },
  addOnTitle: {
    fontSize: 9,
    color: C.dark,
    fontFamily: "Helvetica-Bold",
    marginBottom: 3,
  },
  addOnPrice: {
    fontSize: 11,
    color: C.dark,
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  addOnNote: {
    fontSize: 7,
    color: C.mid,
  },
  platformsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
  },
  platformCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 6,
    padding: 10,
    alignItems: "center",
    backgroundColor: C.white,
  },
  platformAbbrevWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F5E6DE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
    borderTopWidth: 2,
    borderTopColor: C.coral,
  },
  platformAbbrev: {
    fontSize: 8,
    color: C.coral,
    fontFamily: "Helvetica-Bold",
  },
  platformName: {
    fontSize: 9,
    color: C.dark,
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
    textAlign: "center",
  },
  platformDesc: {
    fontSize: 7,
    color: C.mid,
    textAlign: "center",
  },
  servicesRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
  },
  serviceCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 6,
    padding: 10,
    borderLeftWidth: 3,
    borderLeftColor: C.coral,
  },
  serviceTitle: {
    fontSize: 9,
    color: C.dark,
    fontFamily: "Helvetica-Bold",
    marginBottom: 3,
  },
  serviceDesc: {
    fontSize: 7,
    color: C.mid,
  },
  nextStepsHeader: {
    fontSize: 14,
    color: C.dark,
    fontFamily: "Helvetica-Bold",
    marginBottom: 10,
  },
  nextStepsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  nextStepCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 6,
    padding: 10,
    alignItems: "center",
    backgroundColor: C.white,
  },
  nextStepNum: {
    fontSize: 18,
    color: C.coral,
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
    borderTopWidth: 2,
    borderTopColor: C.coral,
    width: "100%",
    textAlign: "center",
    paddingTop: 4,
  },
  nextStepTitle: {
    fontSize: 8,
    color: C.dark,
    fontFamily: "Helvetica-Bold",
    marginBottom: 3,
    textAlign: "center",
  },
  nextStepDesc: {
    fontSize: 7,
    color: C.mid,
    textAlign: "center",
  },
  ctaCard: {
    backgroundColor: C.dark,
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginTop: 8,
  },
  ctaLogoCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: C.coral,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaLogoText: {
    color: C.white,
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
  },
  ctaTextGroup: {
    flex: 1,
  },
  ctaHeadline: {
    fontSize: 11,
    color: C.white,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  ctaEmail: {
    fontSize: 8,
    color: C.coral,
    marginBottom: 2,
  },
  ctaWebsite: {
    fontSize: 8,
    color: "#AAAAAA",
  },
  textBlock: {
    fontSize: 9,
    color: C.mid,
    lineHeight: 1.6,
    marginBottom: 14,
  },
})

// ── Content page components ───────────────────────────────────────────────────

function ContentFooter() {
  return (
    <View style={s.footer}>
      <Text style={s.footerText}>Darvin Code</Text>
      <Text style={s.footerDot}>·</Text>
      <Text style={s.footerText}>info.darvincode@gmail.com</Text>
      <Text style={s.footerDot}>·</Text>
      <Text style={s.footerText}>darvincode.com</Text>
    </View>
  )
}

function Sidebar({ text }: { text: string }) {
  return (
    <View style={s.sidebar}>
      <Text style={s.sidebarText}>{text}</Text>
    </View>
  )
}

function ContentHeader({ clientName, pageNum, total }: { clientName: string; pageNum: number; total: number }) {
  return (
    <View style={s.header}>
      <View style={s.headerLogo}>
        <View style={s.logoCircle}>
          <Text style={s.logoText}>{"</>"}</Text>
        </View>
        <Text style={s.headerBrand}>Darvin Code</Text>
      </View>
      <Text style={s.headerMeta}>{clientName} · Proposal</Text>
      <Text style={s.headerPageNum}>{pageNum} / {total}</Text>
    </View>
  )
}

function BlockRenderer({ block }: { block: SectionBlock }) {
  switch (block.type) {
    case "flow":
      return (
        <View style={s.flowGrid}>
          {block.steps.map((step, i) => (
            <View key={i} style={s.flowCard}>
              <View style={s.flowBadge}>
                <Text style={s.flowBadgeText}>{String(i + 1).padStart(2, "0")}</Text>
              </View>
              <Text style={s.flowTitle}>{step.title}</Text>
              <Text style={s.flowDesc}>{step.description}</Text>
            </View>
          ))}
        </View>
      )

    case "pricing":
      return (
        <View>
          <Text style={s.pricingHeader}>Pricing</Text>
          {block.items.length > 0 && (
            <View style={s.pricingCard}>
              {block.items.map((item, i) =>
                item.highlightBox ? (
                  <View key={i} style={s.pricingItemBox}>
                    <Text style={s.pricingItemBoxLabel}>{item.label}</Text>
                    <Text style={s.pricingItemBoxPrice}>
                      {item.price}{item.period ? ` / ${item.period}` : ""}
                    </Text>
                    {item.note && <Text style={s.pricingItemBoxNote}>{item.note}</Text>}
                    {item.highlight && <Text style={s.pricingItemBoxNote}>{item.highlight}</Text>}
                  </View>
                ) : (
                  <View key={i} style={s.pricingItem}>
                    <Text style={s.pricingItemLabel}>{item.label}</Text>
                    <Text style={item.highlight ? s.pricingItemPriceHighlight : s.pricingItemPrice}>
                      {item.price}{item.period ? ` / ${item.period}` : ""}
                    </Text>
                    {item.note && <Text style={s.pricingItemNote}>{item.note}</Text>}
                    {item.highlight && <Text style={s.pricingItemHighlight}>{item.highlight}</Text>}
                  </View>
                )
              )}
            </View>
          )}
          {block.addOns && block.addOns.length > 0 && (
            <View>
              <Text style={s.addOnsLabel}>OPTIONAL ADD-ONS</Text>
              <View style={s.addOnsRow}>
                {block.addOns.map((a, i) => (
                  <View key={i} style={s.addOnCard}>
                    <Text style={s.addOnTitle}>{a.title}</Text>
                    <Text style={s.addOnPrice}>{a.price}</Text>
                    {a.note && <Text style={s.addOnNote}>{a.note}</Text>}
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      )

    case "platforms":
      return (
        <View>
          {block.platforms.length > 0 && (
            <View style={s.platformsRow}>
              {block.platforms.map((p, i) => (
                <View key={i} style={s.platformCard}>
                  <View style={s.platformAbbrevWrapper}>
                    <Text style={s.platformAbbrev}>{p.abbrev}</Text>
                  </View>
                  <Text style={s.platformName}>{p.name}</Text>
                  <Text style={s.platformDesc}>{p.description}</Text>
                </View>
              ))}
            </View>
          )}
          {block.services && block.services.length > 0 && (
            <View style={s.servicesRow}>
              {block.services.map((sv, i) => (
                <View key={i} style={s.serviceCard}>
                  <Text style={s.serviceTitle}>{sv.title}</Text>
                  <Text style={s.serviceDesc}>{sv.description}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      )

    case "next-steps":
      return (
        <View>
          <Text style={s.nextStepsHeader}>Next Steps</Text>
          <View style={s.nextStepsRow}>
            {block.steps.map((step, i) => (
              <View key={i} style={s.nextStepCard}>
                <Text style={s.nextStepNum}>{String(i + 1).padStart(2, "0")}</Text>
                <Text style={s.nextStepTitle}>{step.title}</Text>
                <Text style={s.nextStepDesc}>{step.description}</Text>
              </View>
            ))}
          </View>
        </View>
      )

    case "cta":
      return (
        <View style={s.ctaCard}>
          <View style={s.ctaLogoCircle}>
            <Text style={s.ctaLogoText}>{"</>"}</Text>
          </View>
          <View style={s.ctaTextGroup}>
            <Text style={s.ctaHeadline}>{block.headline}</Text>
            <Text style={s.ctaEmail}>{block.email}</Text>
            <Text style={s.ctaWebsite}>{block.website}</Text>
          </View>
        </View>
      )

    case "text":
      return <Text style={s.textBlock}>{block.body}</Text>

    default:
      return null
  }
}

function SectionPage({
  section,
  clientName,
  pageNum,
  total,
  tagline,
}: {
  section: ProposalSection
  clientName: string
  pageNum: number
  total: number
  tagline?: string
}) {
  return (
    <Page size="A4" style={s.page}>
      <View style={s.topBar} />
      <Sidebar text={tagline || "HOSPITALITY · DIGITAL · STUDIO"} />
      <ContentHeader clientName={clientName} pageNum={pageNum} total={total} />
      <View style={s.contentBody}>
        <View style={s.sectionTagWrapper}>
          <Text style={s.sectionTag}>{section.tag}</Text>
        </View>
        <Text style={s.sectionTitle}>{section.title}</Text>
        <View style={s.divider} />
        {section.blocks.map((block, i) => (
          <BlockRenderer key={i} block={block} />
        ))}
      </View>
      <ContentFooter />
    </Page>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────

export function ProposalPDF({ proposal }: { proposal: Proposal }) {
  const totalPages = 1 + proposal.sections.length
  const tagline = proposal.tagline || "HOSPITALITY · DIGITAL · STUDIO"

  return (
    <Document title={`${proposal.projectName} — Proposal`} author="Darvin Code">

      {/* ── Cover page ── */}
      <Page size="A4" style={sC.page}>
        {/* Top coral bar */}
        <View style={sC.topBar} />

        {/* Two-column body */}
        <View style={sC.body}>

          {/* Left: logo + centred proposal content */}
          <View style={sC.leftSide}>
            <View style={sC.logoRow}>
              <View style={sC.logoCircle}>
                <Text style={sC.logoCircleText}>{"</>"}</Text>
              </View>
              <Text style={sC.logoBrand}>Darvin Code</Text>
            </View>

            <View style={sC.mainContent}>
              <Text style={sC.proposalLabel}>Project Proposal</Text>
              <View style={sC.thinRule} />

              <Text style={sC.coverTitle}>{proposal.projectName}</Text>
              {proposal.projectSubtitle && (
                <Text style={sC.coverSubtitle}>{proposal.projectSubtitle}</Text>
              )}
              <View style={sC.coralRule} />

              <View style={sC.metaGrid}>
                <View style={sC.metaCol}>
                  <View style={sC.metaItem}>
                    <Text style={sC.metaLabel}>Prepared by</Text>
                    <Text style={sC.metaValue}>Darvin Code</Text>
                  </View>
                  <View style={sC.metaItem}>
                    <Text style={sC.metaLabel}>Date</Text>
                    <Text style={sC.metaValue}>{proposal.date}</Text>
                  </View>
                </View>
                <View style={sC.metaCol}>
                  <View style={sC.metaItem}>
                    <Text style={sC.metaLabel}>For</Text>
                    <Text style={sC.metaValue}>{proposal.clientName}</Text>
                  </View>
                  <View style={sC.metaItem}>
                    <Text style={sC.metaLabel}>Version</Text>
                    <Text style={sC.metaValue}>{proposal.version}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Right panel: cream bg + coral border + large logomark */}
          <View style={sC.rightPanel}>
            <View style={sC.decorCircle}>
              <Text style={sC.decorCircleText}>{"</>"}</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={sC.coverFooter}>
          <View style={sC.coverFooterRule} />
          <Text style={sC.coverFooterText}>
            Darvin Code · info.darvincode@gmail.com · darvincode.com
          </Text>
        </View>
      </Page>

      {/* ── Section pages ── */}
      {proposal.sections.map((section, i) => (
        <SectionPage
          key={section.id}
          section={section}
          clientName={proposal.clientName}
          pageNum={i + 2}
          total={totalPages}
          tagline={proposal.tagline}
        />
      ))}
    </Document>
  )
}
