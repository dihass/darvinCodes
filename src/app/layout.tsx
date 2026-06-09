import type { Metadata } from "next";
import { Urbanist, Spectral } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const spectral = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Darvin Code — Digital Studio for Hospitality",
  description:
    "We build premium digital experiences and software for hotels, resorts, and hospitality brands. Crafted software that elevates every guest touchpoint.",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon", sizes: "32x32" },
      { url: "/favicon.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/favicon.png", type: "image/png", sizes: "192x192" }],
  },
  openGraph: {
    title: "Darvin Code — Digital Studio for Hospitality",
    description:
      "Premium software solutions for hotels, resorts, and hospitality brands.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${urbanist.variable} ${spectral.variable}`}>
      <body className="noise-overlay antialiased">{children}</body>
    </html>
  );
}
