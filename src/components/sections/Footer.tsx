"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[oklch(19%_0.010_55)] px-[clamp(1.5rem,4vw,4rem)] py-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <span className="w-5 h-5 rounded-full bg-[oklch(71%_0.105_42)]" />
          <span
            className="font-[700] text-[0.9375rem] tracking-[-0.02em] text-[oklch(92%_0.006_58)]"
            style={{ fontFamily: "var(--font-urbanist)" }}
          >
            Darvin Code
          </span>
        </div>

        {/* Center — tagline */}
        <p
          className="text-[0.8125rem] text-[oklch(42%_0.009_55)] tracking-[0.01em] order-last md:order-none"
        >
          Digital studio for hospitality brands
        </p>

        {/* Copyright */}
        <span
          className="text-[0.75rem] text-[oklch(35%_0.007_55)] tracking-[0.04em]"
        >
          &copy; {year} Darvin Code
        </span>
      </div>
    </footer>
  );
}
