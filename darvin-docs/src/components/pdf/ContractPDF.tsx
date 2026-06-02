"use client"

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import type { Contract } from "@/types/contract"
import { registerPdfFonts } from "@/lib/pdfFonts"

registerPdfFonts()

const C = {
  bg:     "#f8f4f0",
  panel:  "#ede8e3",
  coral:  "#C4622D",
  dark:   "#1A1A1A",
  mid:    "#666666",
  muted:  "#9E9189",
  rule:   "#D5CEC8",
  border: "#E4DDD6",
  white:  "#FFFFFF",
}

const STATUS_COLORS: Record<string, string> = {
  draft:  "#9E9189",
  sent:   "#2D6A9F",
  signed: "#2D7A4F",
}

const s = StyleSheet.create({
  page: { backgroundColor: C.bg, paddingBottom: 48 },

  topBar:  { height: 5, backgroundColor: C.coral },
  sidebar: { position: "absolute", right: 0, top: 0, bottom: 0, width: 28, borderLeftWidth: 3, borderLeftColor: C.coral, borderLeftStyle: "solid" },

  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", paddingHorizontal: 44, paddingTop: 24, paddingBottom: 20, marginRight: 28 },
  logoRow:   { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 5 },
  logoCircle: { width: 26, height: 26, borderRadius: 13, backgroundColor: C.coral, alignItems: "center", justifyContent: "center" },
  logoText:  { color: C.white, fontSize: 9, fontFamily: "Urbanist-Bold" },
  brandName: { fontSize: 14, color: C.dark, fontFamily: "Urbanist-Bold" },
  tagline:   { fontSize: 7.5, color: C.muted, fontFamily: "Urbanist-Light", letterSpacing: 1 },

  headerRight: { alignItems: "flex-end" },
  docLabel:    { fontSize: 7, color: C.coral, fontFamily: "Urbanist-Medium", letterSpacing: 2, textTransform: "uppercase", marginBottom: 3 },
  contractNum: { fontSize: 22, color: C.dark, fontFamily: "Urbanist-ExtraBold", marginBottom: 6 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 3, alignSelf: "flex-end" },
  statusText:  { fontSize: 7, fontFamily: "Urbanist-Bold", letterSpacing: 1.5, textTransform: "uppercase", color: C.white },

  divider:   { height: 1.5, backgroundColor: C.coral, marginHorizontal: 44, marginRight: 72, marginBottom: 20 },
  lightRule: { height: 0.75, backgroundColor: C.rule, marginHorizontal: 44, marginRight: 72 },

  parties: { flexDirection: "row", paddingHorizontal: 44, marginRight: 28, marginBottom: 20, gap: 24 },
  partyBlock: { flex: 1 },
  partyBlockRight: { alignItems: "flex-end", gap: 10 },
  partyLabel: { fontSize: 6.5, color: C.muted, fontFamily: "Urbanist-Medium", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 5 },
  partyName:  { fontSize: 10.5, color: C.dark, fontFamily: "Urbanist-Bold", marginBottom: 3 },
  partyLine:  { fontSize: 8.5, color: C.mid, fontFamily: "Urbanist-Light", marginBottom: 2 },
  partyMuted: { fontSize: 8, color: C.muted, fontFamily: "Urbanist-Light" },

  metaGroup: { alignItems: "flex-end" },
  metaLabel: { fontSize: 6.5, color: C.muted, fontFamily: "Urbanist-Medium", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 3 },
  metaValue: { fontSize: 9.5, color: C.dark, fontFamily: "Urbanist-SemiBold" },

  section: { paddingHorizontal: 44, marginRight: 28, marginTop: 18, marginBottom: 4 },
  sectionTitle: { fontSize: 6.5, color: C.coral, fontFamily: "Urbanist-Medium", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 },
  bodyText: { fontSize: 8.5, color: C.mid, fontFamily: "Urbanist-Light", lineHeight: 1.7 },
  bodyLine: { fontSize: 8.5, color: C.mid, fontFamily: "Urbanist-Light", marginBottom: 3 },

  paymentRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 6, borderBottomWidth: 0.75, borderBottomColor: C.border },
  paymentLabel: { fontSize: 8.5, color: C.muted, fontFamily: "Urbanist-Light" },
  paymentValue: { fontSize: 8.5, color: C.dark, fontFamily: "Urbanist-SemiBold" },
  depositCard: { backgroundColor: C.dark, borderRadius: 6, paddingHorizontal: 14, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8, marginBottom: 10 },
  depositLabel: { fontSize: 8, color: "#AAAAAA", fontFamily: "Urbanist-Medium", letterSpacing: 1.5, textTransform: "uppercase" },
  depositValue: { fontSize: 14, color: C.white, fontFamily: "Urbanist-ExtraBold" },

  termRow: { flexDirection: "row", gap: 8, marginBottom: 8 },
  termNum: { fontSize: 7.5, color: C.coral, fontFamily: "Urbanist-Bold", width: 14, marginTop: 1 },
  termBody: { flex: 1 },
  termTitle: { fontSize: 8, color: C.dark, fontFamily: "Urbanist-Bold", marginBottom: 2 },
  termText:  { fontSize: 7.5, color: C.mid, fontFamily: "Urbanist-Light", lineHeight: 1.6 },

  sigSection: { paddingHorizontal: 44, marginRight: 28, marginTop: 20 },
  sigTitle:   { fontSize: 6.5, color: C.coral, fontFamily: "Urbanist-Medium", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 },
  sigRow:     { flexDirection: "row", gap: 32 },
  sigBlock:   { flex: 1 },
  sigLine:    { height: 0.75, backgroundColor: C.dark, marginBottom: 6 },
  sigLabel:   { fontSize: 7, color: C.muted, fontFamily: "Urbanist-Light", marginBottom: 8 },
  sigField:   { fontSize: 8, color: C.mid, fontFamily: "Urbanist-Light", marginBottom: 6 },

  footer:     { position: "absolute", bottom: 12, left: 0, right: 0 },
  footerRule: { height: 0.75, backgroundColor: C.rule, marginHorizontal: 44, marginRight: 72, marginBottom: 8 },
  footerText: { fontSize: 7, color: C.muted, fontFamily: "Urbanist-Light", textAlign: "center", marginRight: 28 },
})

function money(n: number, currency: string) {
  return `${currency} ${n.toLocaleString("en-LK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function ContractPDF({ contract }: { contract: Contract }) {
  const deposit = (contract.totalAmount * contract.depositPercent) / 100
  const balance = contract.totalAmount - deposit
  const status = contract.status ?? "draft"
  const statusColor = STATUS_COLORS[status] ?? C.muted

  const scopeLines = contract.scope.split("\n")
  const paymentLines = contract.paymentTerms.split("\n")

  const terms = [
    {
      title: "Commencement",
      text: `Work commences upon receipt of the deposit payment and written approval of this agreement.`,
    },
    {
      title: "Intellectual Property",
      text: `Upon receipt of full payment, all deliverables created by Darvin Code for this project become the sole property of the Client. Darvin Code retains the right to display the work in its portfolio unless otherwise agreed in writing.`,
    },
    {
      title: "Revisions",
      text: `${contract.revisionsIncluded} round${contract.revisionsIncluded !== 1 ? "s" : ""} of revisions ${contract.revisionsIncluded !== 1 ? "are" : "is"} included in this agreement. Additional revisions will be billed at LKR 2,500 per hour.`,
    },
    {
      title: "Confidentiality",
      text: `Both parties agree to keep confidential any proprietary or sensitive business information shared during the course of this agreement.`,
    },
    {
      title: "Termination",
      text: `Either party may terminate this agreement with 14 days written notice. All work completed up to the date of termination will be billed and due within 7 days.`,
    },
    {
      title: "Limitation of Liability",
      text: `Darvin Code shall not be liable for any indirect, incidental, or consequential damages. Total liability under this agreement shall not exceed the total contract value.`,
    },
  ]

  return (
    <Document title={`Contract ${contract.contractNumber} — Darvin Code`} author="Darvin Code">
      <Page size="A4" style={s.page}>
        <View style={s.topBar} />
        <View style={s.sidebar} />

        {/* Header */}
        <View style={s.header}>
          <View>
            <View style={s.logoRow}>
              <View style={s.logoCircle}>
                <Text style={s.logoText}>{"</>"}</Text>
              </View>
              <Text style={s.brandName}>Darvin Code</Text>
            </View>
            <Text style={s.tagline}>Hospitality · Digital · Studio</Text>
          </View>
          <View style={s.headerRight}>
            <Text style={s.docLabel}>Service Agreement</Text>
            <Text style={s.contractNum}>{contract.contractNumber}</Text>
            <View style={[s.statusBadge, { backgroundColor: statusColor }]}>
              <Text style={s.statusText}>{status}</Text>
            </View>
          </View>
        </View>

        <View style={s.divider} />

        {/* Parties + meta */}
        <View style={s.parties}>
          <View style={s.partyBlock}>
            <Text style={s.partyLabel}>Service Provider</Text>
            <Text style={s.partyName}>Darvin Code</Text>
            <Text style={s.partyLine}>info.darvincode@gmail.com</Text>
            <Text style={s.partyMuted}>darvincode.com</Text>
          </View>
          <View style={s.partyBlock}>
            <Text style={s.partyLabel}>Client</Text>
            <Text style={s.partyName}>{contract.clientName || "—"}</Text>
            {contract.clientEmail   && <Text style={s.partyLine}>{contract.clientEmail}</Text>}
            {contract.clientAddress && <Text style={s.partyMuted}>{contract.clientAddress}</Text>}
          </View>
          <View style={s.partyBlockRight}>
            <View style={s.metaGroup}>
              <Text style={s.metaLabel}>Contract Date</Text>
              <Text style={s.metaValue}>{contract.contractDate}</Text>
            </View>
            <View style={s.metaGroup}>
              <Text style={s.metaLabel}>Project</Text>
              <Text style={s.metaValue}>{contract.projectName || "—"}</Text>
            </View>
          </View>
        </View>

        <View style={s.lightRule} />

        {/* Scope */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Scope of Work</Text>
          {scopeLines.map((line, i) => (
            <Text key={i} style={s.bodyLine}>{line || " "}</Text>
          ))}
        </View>

        <View style={s.lightRule} />

        {/* Payment */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Payment Schedule</Text>
          <View style={s.paymentRow}>
            <Text style={s.paymentLabel}>Project Total</Text>
            <Text style={s.paymentValue}>{money(contract.totalAmount, contract.currency)}</Text>
          </View>
          <View style={s.paymentRow}>
            <Text style={s.paymentLabel}>Deposit ({contract.depositPercent}%) — due to commence</Text>
            <Text style={s.paymentValue}>{money(deposit, contract.currency)}</Text>
          </View>
          <View style={s.depositCard}>
            <Text style={s.depositLabel}>Balance Due on Completion</Text>
            <Text style={s.depositValue}>{money(balance, contract.currency)}</Text>
          </View>
          {paymentLines.map((line, i) => (
            <Text key={i} style={s.bodyText}>{line || " "}</Text>
          ))}
        </View>

        <View style={s.lightRule} />

        {/* Terms */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Terms & Conditions</Text>
          {terms.map((term, i) => (
            <View key={i} style={s.termRow}>
              <Text style={s.termNum}>{i + 1}.</Text>
              <View style={s.termBody}>
                <Text style={s.termTitle}>{term.title}</Text>
                <Text style={s.termText}>{term.text}</Text>
              </View>
            </View>
          ))}
        </View>

        {!!contract.additionalTerms && (
          <>
            <View style={s.lightRule} />
            <View style={s.section}>
              <Text style={s.sectionTitle}>Additional Terms</Text>
              {contract.additionalTerms.split("\n").map((line, i) => (
                <Text key={i} style={s.bodyLine}>{line || " "}</Text>
              ))}
            </View>
          </>
        )}

        {/* Signatures */}
        <View style={s.lightRule} />
        <View style={s.sigSection}>
          <Text style={s.sigTitle}>Signatures</Text>
          <View style={s.sigRow}>
            <View style={s.sigBlock}>
              <View style={s.sigLine} />
              <Text style={s.sigLabel}>Authorised Signature — Darvin Code</Text>
              <Text style={s.sigField}>Name: _______________________________</Text>
              <Text style={s.sigField}>Date:  _______________________________</Text>
            </View>
            <View style={s.sigBlock}>
              <View style={s.sigLine} />
              <Text style={s.sigLabel}>Authorised Signature — {contract.clientName || "Client"}</Text>
              <Text style={s.sigField}>Name: _______________________________</Text>
              <Text style={s.sigField}>Date:  _______________________________</Text>
            </View>
          </View>
        </View>

        <View style={s.footer}>
          <View style={s.footerRule} />
          <Text style={s.footerText}>
            Darvin Code · info.darvincode@gmail.com · darvincode.com
          </Text>
        </View>
      </Page>
    </Document>
  )
}
