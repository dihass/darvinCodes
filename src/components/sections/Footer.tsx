"use client";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[oklch(15%_0.010_55)]">
      {/* Main footer body */}
      <div className="px-[clamp(1.5rem,4vw,4rem)] pt-16 pb-12 border-b border-[oklch(25%_0.008_55)]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

          {/* Brand column */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-[oklch(71%_0.105_42)] flex items-center justify-center shrink-0">
                <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                  <path d="M7 6.5L4 10l3 3.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13 6.5L16 10l-3 3.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11.5 5l-3 10" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </span>
              <span
                className="font-[700] text-[1rem] tracking-[-0.02em] text-[oklch(92%_0.006_58)]"
                style={{ fontFamily: "var(--font-urbanist)" }}
              >
                Darvin Code
              </span>
            </div>
            <p className="text-[0.875rem] leading-[1.75] text-[oklch(48%_0.008_55)] max-w-[320px]">
              A boutique software studio building digital products for the hospitality industry. Precision-crafted experiences that elevate every guest touchpoint.
            </p>
            <a
              href="mailto:info.darvincode@gmail.com"
              className="inline-flex items-center gap-2 text-[0.8125rem] text-[oklch(71%_0.105_42)] hover:text-[oklch(82%_0.090_42)] transition-colors duration-300 group w-fit"
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="3.5" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M1.5 4.5L8 9.5l6.5-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              info.darvincode@gmail.com
            </a>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 md:col-start-7 flex flex-col gap-5">
            <span className="text-[0.6875rem] font-[600] tracking-[0.14em] uppercase text-[oklch(38%_0.007_55)]">
              Navigation
            </span>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[0.875rem] text-[oklch(55%_0.008_55)] hover:text-[oklch(92%_0.006_58)] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-urbanist)" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Team / Contact */}
          <div className="md:col-span-3 flex flex-col gap-5">
            <span className="text-[0.6875rem] font-[600] tracking-[0.14em] uppercase text-[oklch(38%_0.007_55)]">
              Founders
            </span>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-[0.875rem] font-[600] text-[oklch(72%_0.008_55)]" style={{ fontFamily: "var(--font-urbanist)" }}>
                  Dihas Sathnindu
                </span>
                <span className="text-[0.75rem] text-[oklch(40%_0.007_55)]">Co-founder</span>
              </div>
              <div className="w-px h-4 bg-[oklch(28%_0.007_55)] ml-0" />
              <div className="flex flex-col gap-0.5">
                <span className="text-[0.875rem] font-[600] text-[oklch(72%_0.008_55)]" style={{ fontFamily: "var(--font-urbanist)" }}>
                  Tashen Dinal
                </span>
                <span className="text-[0.75rem] text-[oklch(40%_0.007_55)]">Co-founder</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-[clamp(1.5rem,4vw,4rem)] py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <span className="text-[0.75rem] text-[oklch(32%_0.006_55)] tracking-[0.03em]">
          &copy; {year} Darvin Code. All rights reserved.
        </span>
        <span className="text-[0.75rem] text-[oklch(28%_0.006_55)] tracking-[0.03em]">
          Built for hospitality.
        </span>
      </div>
    </footer>
  );
}
