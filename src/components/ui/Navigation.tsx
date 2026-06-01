"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Studio", href: "#why" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", (y) => setScrolled(y > 40));
    return unsub;
  }, [scrollY]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-600"
      >
        <div
          className={`mx-auto px-[clamp(1.5rem,4vw,4rem)] py-5 flex items-center justify-between transition-all duration-600 ${
            scrolled
              ? "bg-[oklch(97%_0.008_65/0.92)] backdrop-blur-md border-b border-[oklch(88%_0.010_60)]"
              : ""
          }`}
        >
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="Darvin Code"
          >
            <span className="w-7 h-7 rounded-full bg-[oklch(71%_0.105_42)] group-hover:scale-110 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center shrink-0">
              <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                <path d="M7 6.5L4 10l3 3.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13 6.5L16 10l-3 3.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.5 5l-3 10" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </span>
            <span
              className="font-[family-name:var(--font-urbanist)] font-700 text-[0.9375rem] tracking-[-0.02em] text-[oklch(19%_0.010_55)]"
              style={{ fontWeight: 700 }}
            >
              Darvin Code
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative font-[family-name:var(--font-urbanist)] text-[0.8125rem] font-[500] tracking-[0.04em] uppercase text-[oklch(42%_0.009_55)] hover:text-[oklch(19%_0.010_55)] transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[oklch(71%_0.105_42)] group-hover:w-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 bg-[oklch(19%_0.010_55)] text-[oklch(97%_0.008_65)] px-5 py-2.5 rounded-full text-[0.8125rem] font-[600] tracking-[0.02em] hover:bg-[oklch(71%_0.105_42)] hover:text-[oklch(19%_0.010_55)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
          >
            Start a project
          </a>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`w-5 h-px bg-[oklch(19%_0.010_55)] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[0.375rem]" : ""}`}
            />
            <span
              className={`w-5 h-px bg-[oklch(19%_0.010_55)] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`w-5 h-px bg-[oklch(19%_0.010_55)] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[0.375rem]" : ""}`}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <motion.div
        initial={false}
        animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : -12 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-0 z-40 bg-[oklch(97%_0.008_65)] flex flex-col items-center justify-center gap-8 ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {navLinks.map((link, i) => (
          <motion.a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            initial={false}
            animate={{
              opacity: menuOpen ? 1 : 0,
              y: menuOpen ? 0 : 16,
            }}
            transition={{
              duration: 0.5,
              delay: menuOpen ? i * 0.06 : 0,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="font-[family-name:var(--font-urbanist)] text-4xl font-[700] tracking-[-0.03em] text-[oklch(19%_0.010_55)] hover:text-[oklch(71%_0.105_42)] transition-colors"
          >
            {link.label}
          </motion.a>
        ))}
        <motion.a
          href="#contact"
          onClick={() => setMenuOpen(false)}
          initial={false}
          animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : 16 }}
          transition={{ duration: 0.5, delay: menuOpen ? 0.28 : 0, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 bg-[oklch(19%_0.010_55)] text-[oklch(97%_0.008_65)] px-8 py-3.5 rounded-full text-sm font-[600] tracking-[0.02em]"
        >
          Start a project
        </motion.a>
      </motion.div>
    </>
  );
}
