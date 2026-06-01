"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[oklch(19%_0.010_55)] px-[clamp(1.5rem,4vw,4rem)] py-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <span className="w-5 h-5 rounded-full bg-[oklch(71%_0.105_42)] flex items-center justify-center shrink-0">
            <svg viewBox="0 0 20 20" fill="none" className="w-3 h-3" aria-hidden="true">
              <path d="M7 6.5L4 10l3 3.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13 6.5L16 10l-3 3.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.5 5l-3 10" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </span>
          <span
            className="font-[700] text-[0.9375rem] tracking-[-0.02em] text-[oklch(92%_0.006_58)]"
            style={{ fontFamily: "var(--font-urbanist)" }}
          >
            Darvin Code
          </span>
        </div>

        {/* Center — email + founders */}
        <div className="flex flex-col gap-1.5 order-last md:order-none">
          <a
            href="mailto:info.darvincode@gmail.com"
            className="text-[0.8125rem] text-[oklch(71%_0.105_42)] tracking-[0.01em] hover:text-[oklch(82%_0.090_42)] transition-colors duration-300"
          >
            info.darvincode@gmail.com
          </a>
          <p className="text-[0.75rem] text-[oklch(38%_0.007_55)] tracking-[0.01em]">
            Dihas Sathnindu &amp; Tashen Dinal
          </p>
        </div>

        {/* Copyright */}
        <span className="text-[0.75rem] text-[oklch(35%_0.007_55)] tracking-[0.04em]">
          &copy; {year} Darvin Code
        </span>
      </div>
    </footer>
  );
}
