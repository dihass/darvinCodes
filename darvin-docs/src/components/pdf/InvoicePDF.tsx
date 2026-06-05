"use client"

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import type { Invoice } from "@/types/invoice"
import { registerPdfFonts } from "@/lib/pdfFonts"

registerPdfFonts()

const C = {
  bg:      "#f8f4f0",
  panel:   "#ede8e3",
  coral:   "#C4622D",
  dark:    "#1A1A1A",
  mid:     "#666666",
  muted:   "#9E9189",
  rule:    "#D5CEC8",
  border:  "#E4DDD6",
  white:   "#FFFFFF",
  rowAlt:  "#F3EDE7",
}

const STATUS_COLORS: Record<string, string> = {
  paid:    "#2D7A4F",
  overdue: "#A0290D",
  unpaid:  "#9E9189",
}

const s = StyleSheet.create({
  page: {
    backgroundColor: C.bg,
    position: "relative",
    paddingBottom: 40,
  },

  // ── Top bar ───────────────────────────────────────────────
  topBar: {
    height: 5,
    backgroundColor: C.coral,
  },

  // ── Right sidebar stripe ──────────────────────────────────
  sidebar: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 28,
    borderLeftWidth: 3,
    borderLeftColor: C.coral,
    borderLeftStyle: "solid",
  },

  // ── Header ───────────────────────────────────────────────
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 44,
    paddingTop: 24,
    paddingBottom: 20,
    marginRight: 28,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 5,
  },
  logoCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: C.coral,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    color: C.white,
    fontSize: 9,
    fontFamily: "Urbanist-Bold",
  },
  brandName: {
    fontSize: 14,
    color: C.dark,
    fontFamily: "Urbanist-Bold",
  },
  tagline: {
    fontSize: 7.5,
    color: C.muted,
    fontFamily: "Urbanist-Light",
    letterSpacing: 1,
  },
  invoiceRight: {
    alignItems: "flex-end",
  },
  invoiceWordLabel: {
    fontSize: 7,
    color: C.coral,
    fontFamily: "Urbanist-Medium",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 3,
  },
  invoiceNumber: {
    fontSize: 26,
    color: C.dark,
    fontFamily: "Urbanist-ExtraBold",
    marginBottom: 6,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 3,
    alignSelf: "flex-end",
  },
  statusText: {
    fontSize: 7,
    fontFamily: "Urbanist-Bold",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: C.white,
  },

  // ── Divider ───────────────────────────────────────────────
  divider: {
    height: 1.5,
    backgroundColor: C.coral,
    marginHorizontal: 44,
    marginRight: 72,
    marginBottom: 20,
  },
  lightRule: {
    height: 0.75,
    backgroundColor: C.rule,
    marginHorizontal: 44,
    marginRight: 72,
  },

  // ── From / To / Dates ─────────────────────────────────────
  metaSection: {
    flexDirection: "row",
    paddingHorizontal: 44,
    marginRight: 28,
    marginBottom: 24,
    gap: 32,
  },
  metaBlock: {
    flex: 1,
  },
  metaBlockRight: {
    alignItems: "flex-end",
    gap: 14,
  },
  metaSectionLabel: {
    fontSize: 6.5,
    color: C.muted,
    fontFamily: "Urbanist-Medium",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 5,
  },
  metaName: {
    fontSize: 10.5,
    color: C.dark,
    fontFamily: "Urbanist-Bold",
    marginBottom: 3,
  },
  metaLine: {
    fontSize: 8.5,
    color: C.mid,
    fontFamily: "Urbanist-Light",
    marginBottom: 2,
  },
  metaLineMuted: {
    fontSize: 8,
    color: C.muted,
    fontFamily: "Urbanist-Light",
  },
  dateGroup: {
    alignItems: "flex-end",
  },
  dateLabel: {
    fontSize: 6.5,
    color: C.muted,
    fontFamily: "Urbanist-Medium",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 3,
  },
  dateValue: {
    fontSize: 10,
    color: C.dark,
    fontFamily: "Urbanist-SemiBold",
  },
  dateValueDue: {
    fontSize: 10,
    color: C.coral,
    fontFamily: "Urbanist-Bold",
  },

  // ── Table ─────────────────────────────────────────────────
  tableWrapper: {
    paddingHorizontal: 44,
    marginRight: 28,
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1.5,
    borderBottomColor: C.coral,
    paddingBottom: 6,
    marginBottom: 2,
  },
  thText: {
    fontSize: 6.5,
    color: C.muted,
    fontFamily: "Urbanist-Medium",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  colDesc: { flex: 3 },
  colQty:  { flex: 1, alignItems: "flex-end" },
  colRate: { flex: 1, alignItems: "flex-end" },
  colAmt:  { flex: 1, alignItems: "flex-end" },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 9,
    borderBottomWidth: 0.75,
    borderBottomColor: C.border,
  },
  rowDesc: {
    flex: 3,
    fontSize: 9,
    color: C.dark,
    fontFamily: "Urbanist-SemiBold",
  },
  rowSub: {
    fontSize: 7.5,
    color: C.muted,
    fontFamily: "Urbanist-Light",
    marginTop: 2,
  },
  rowQty: {
    flex: 1,
    fontSize: 9,
    color: C.mid,
    fontFamily: "Urbanist-Light",
    textAlign: "right",
  },
  rowRate: {
    flex: 1,
    fontSize: 9,
    color: C.mid,
    fontFamily: "Urbanist-Light",
    textAlign: "right",
  },
  rowAmt: {
    flex: 1,
    fontSize: 9,
    color: C.dark,
    fontFamily: "Urbanist-SemiBold",
    textAlign: "right",
  },

  // ── Totals ────────────────────────────────────────────────
  totalsWrapper: {
    paddingHorizontal: 44,
    marginRight: 28,
    alignItems: "flex-end",
    marginBottom: 20,
  },
  totalsInner: {
    width: 240,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  totalLabel: {
    fontSize: 8.5,
    color: C.muted,
    fontFamily: "Urbanist-Light",
  },
  totalValue: {
    fontSize: 8.5,
    color: C.dark,
    fontFamily: "Urbanist-SemiBold",
  },
  grandTotalCard: {
    backgroundColor: C.dark,
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  grandLabel: {
    fontSize: 8,
    color: "#AAAAAA",
    fontFamily: "Urbanist-Medium",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  grandValue: {
    fontSize: 16,
    color: C.white,
    fontFamily: "Urbanist-ExtraBold",
  },

  // ── Payment / Notes ───────────────────────────────────────
  infoSection: {
    paddingHorizontal: 44,
    marginRight: 28,
    gap: 12,
  },
  bankCard: {
    backgroundColor: C.dark,
    borderRadius: 6,
    padding: 14,
  },
  bankLabel: {
    fontSize: 6.5,
    color: "#888888",
    fontFamily: "Urbanist-Medium",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  bankText: {
    fontSize: 8.5,
    color: C.white,
    fontFamily: "Urbanist-Light",
    lineHeight: 1.6,
  },
  notesCard: {
    borderWidth: 0.75,
    borderColor: C.border,
    borderRadius: 6,
    padding: 14,
    borderLeftWidth: 3,
    borderLeftColor: C.coral,
  },
  notesLabel: {
    fontSize: 6.5,
    color: C.muted,
    fontFamily: "Urbanist-Medium",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  notesText: {
    fontSize: 8.5,
    color: C.mid,
    fontFamily: "Urbanist-Light",
    lineHeight: 1.6,
  },

  // ── Footer ────────────────────────────────────────────────
  footer: {
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
  },
  footerRule: {
    height: 0.75,
    backgroundColor: C.rule,
    marginHorizontal: 44,
    marginRight: 72,
    marginBottom: 8,
  },
  footerText: {
    fontSize: 7,
    color: C.muted,
    fontFamily: "Urbanist-Light",
    textAlign: "center",
    marginRight: 28,
  },
})

function money(n: number, currency: string) {
  return `${currency} ${n.toLocaleString("en-LK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function InvoicePDF({ invoice }: { invoice: Invoice }) {
  const subtotal = invoice.lineItems.reduce((sum, item) => sum + item.quantity * item.rate, 0)
  const tax      = invoice.taxPercent ? (subtotal * invoice.taxPercent) / 100 : 0
  const total    = subtotal + tax
  const status   = invoice.status ?? "unpaid"
  const statusColor = STATUS_COLORS[status] ?? C.muted

  return (
    <Document title={`Invoice ${invoice.invoiceNumber} — Darvin Code`} author="Darvin Code">
      <Page size="A4" style={s.page}>
        {/* Top coral bar */}
        <View style={s.topBar} />

        {/* Right sidebar stripe */}
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

          <View style={s.invoiceRight}>
            <Text style={s.invoiceWordLabel}>Invoice</Text>
            <Text style={s.invoiceNumber}>{invoice.invoiceNumber}</Text>
            <View style={[s.statusBadge, { backgroundColor: statusColor }]}>
              <Text style={s.statusText}>{status}</Text>
            </View>
          </View>
        </View>

        {/* Coral divider */}
        <View style={s.divider} />

        {/* From / To / Dates */}
        <View style={s.metaSection}>
          {/* From */}
          <View style={s.metaBlock}>
            <Text style={s.metaSectionLabel}>From</Text>
            <Text style={s.metaName}>Darvin Code</Text>
            <Text style={s.metaLine}>info@darvincode.com</Text>
            <Text style={s.metaLineMuted}>darvincode.com</Text>
          </View>

          {/* To */}
          <View style={s.metaBlock}>
            <Text style={s.metaSectionLabel}>Billed To</Text>
            <Text style={s.metaName}>{invoice.clientName || "—"}</Text>
            {invoice.clientEmail   && <Text style={s.metaLine}>{invoice.clientEmail}</Text>}
            {invoice.clientAddress && <Text style={s.metaLineMuted}>{invoice.clientAddress}</Text>}
          </View>

          {/* Dates */}
          <View style={s.metaBlockRight}>
            <View style={s.dateGroup}>
              <Text style={s.dateLabel}>Issue Date</Text>
              <Text style={s.dateValue}>{invoice.issueDate}</Text>
            </View>
            <View style={s.dateGroup}>
              <Text style={s.dateLabel}>Due Date</Text>
              <Text style={s.dateValueDue}>{invoice.dueDate}</Text>
            </View>
          </View>
        </View>

        <View style={s.lightRule} />

        {/* Line items table */}
        <View style={[s.tableWrapper, { marginTop: 16 }]}>
          <View style={s.tableHeader}>
            <View style={s.colDesc}><Text style={s.thText}>Description</Text></View>
            <View style={s.colQty}><Text style={[s.thText, { textAlign: "right" }]}>Qty</Text></View>
            <View style={s.colRate}><Text style={[s.thText, { textAlign: "right" }]}>Rate</Text></View>
            <View style={s.colAmt}><Text style={[s.thText, { textAlign: "right" }]}>Amount</Text></View>
          </View>

          {invoice.lineItems.map((item, i) => (
            <View key={i} style={s.tableRow}>
              <View style={s.colDesc}>
                <Text style={s.rowDesc}>{item.description}</Text>
              </View>
              <View style={s.colQty}>
                <Text style={s.rowQty}>{item.quantity}</Text>
              </View>
              <View style={s.colRate}>
                <Text style={s.rowRate}>{money(item.rate, invoice.currency)}</Text>
              </View>
              <View style={s.colAmt}>
                <Text style={s.rowAmt}>{money(item.quantity * item.rate, invoice.currency)}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={s.totalsWrapper}>
          <View style={s.totalsInner}>
            <View style={[s.totalRow, { borderTopWidth: 0 }]}>
              <Text style={s.totalLabel}>Subtotal</Text>
              <Text style={s.totalValue}>{money(subtotal, invoice.currency)}</Text>
            </View>
            {!!invoice.taxPercent && (
              <View style={s.totalRow}>
                <Text style={s.totalLabel}>Tax ({invoice.taxPercent}%)</Text>
                <Text style={s.totalValue}>{money(tax, invoice.currency)}</Text>
              </View>
            )}
            <View style={s.grandTotalCard}>
              <Text style={s.grandLabel}>Total Due</Text>
              <Text style={s.grandValue}>{money(total, invoice.currency)}</Text>
            </View>
          </View>
        </View>

        {/* Bank details + Notes */}
        {(invoice.bankDetails || invoice.notes) && (
          <View style={s.infoSection}>
            {invoice.bankDetails && (
              <View style={s.bankCard}>
                <Text style={s.bankLabel}>Payment Details</Text>
                <Text style={s.bankText}>{invoice.bankDetails}</Text>
              </View>
            )}
            {invoice.notes && (
              <View style={s.notesCard}>
                <Text style={s.notesLabel}>Notes</Text>
                <Text style={s.notesText}>{invoice.notes}</Text>
              </View>
            )}
          </View>
        )}

        {/* Footer */}
        <View style={s.footer}>
          <View style={s.footerRule} />
          <Text style={s.footerText}>
            Darvin Code · info@darvincode.com · darvincode.com
          </Text>
        </View>
      </Page>
    </Document>
  )
}
