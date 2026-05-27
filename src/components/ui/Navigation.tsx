"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScroll } from "framer-motion";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Studio", href: "#why" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", (y) => setScrolled(y > 40));
    return unsub;
  }, [scrollY]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[oklch(97%_0.008_65/0.94)] backdrop-blur-md border-b border-[oklch(88%_0.010_60)]"
            : ""
        }`}
      >
        <div className="px-[clamp(1.5rem,4vw,4rem)] h-[72px] flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 group" aria-label="Darvin Code">
            <span className="w-[7px] h-[7px] rounded-full bg-[oklch(71%_0.105_42)] group-hover:scale-125 transition-transform duration-300" />
            <span
              className="font-[700] text-[0.9375rem] tracking-[-0.015em] text-[oklch(19%_0.010_55)]"
              style={{ fontFamily: "var(--font-urbanist)" }}
            >
              Darvin Code
            </span>
          </a>

          {/* Right: CTA + menu circle */}
          <div className="flex items-center gap-5">
            <a
              href="#contact"
              className="hidden md:inline-flex text-[0.8125rem] font-[600] tracking-[0.04em] uppercase text-[oklch(42%_0.009_55)] hover:text-[oklch(71%_0.105_42)] transition-colors duration-300 relative group"
            >
              Get a proposal
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[oklch(71%_0.105_42)] group-hover:w-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </a>

            {/* Circle menu button — UPQODE-style */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="w-10 h-10 rounded-full bg-[oklch(71%_0.105_42)] flex items-center justify-center hover:bg-[oklch(52%_0.105_40)] transition-colors duration-300 relative"
            >
              <span className="sr-only">Menu</span>
              <div className="flex flex-col gap-[5px] items-center justify-center w-5 h-5">
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 4.5, width: 16 } : { rotate: 0, y: 0, width: 16 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="block h-[1.5px] bg-[oklch(97%_0.008_65)] rounded-full origin-center"
                  style={{ width: 16 }}
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -4.5, width: 16 } : { rotate: 0, y: 0, width: 10 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="block h-[1.5px] bg-[oklch(97%_0.008_65)] rounded-full origin-center"
                  style={{ width: menuOpen ? 16 : 10 }}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[oklch(19%_0.010_55)] flex flex-col"
          >
            {/* Menu header */}
            <div className="px-[clamp(1.5rem,4vw,4rem)] h-[72px] flex items-center justify-between border-b border-[oklch(30%_0.008_55)]">
              <a href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5">
                <span className="w-[7px] h-[7px] rounded-full bg-[oklch(71%_0.105_42)]" />
                <span
                  className="font-[700] text-[0.9375rem] tracking-[-0.015em] text-[oklch(92%_0.006_58)]"
                  style={{ fontFamily: "var(--font-urbanist)" }}
                >
                  Darvin Code
                </span>
              </a>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-[oklch(30%_0.008_55)] flex items-center justify-center hover:bg-[oklch(71%_0.105_42)] transition-colors duration-300"
              >
                <svg className="w-4 h-4 text-[oklch(92%_0.006_58)]" viewBox="0 0 16 16" fill="none">
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 flex flex-col justify-center px-[clamp(1.5rem,4vw,4rem)] gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-[oklch(28%_0.008_55)] last:border-b-0"
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center justify-between py-5 md:py-6"
                  >
                    <span
                      className="text-[clamp(2.5rem,7vw,5.5rem)] font-[700] leading-none tracking-[-0.04em] text-[oklch(92%_0.006_58)] group-hover:text-[oklch(71%_0.105_42)] transition-colors duration-300"
                      style={{ fontFamily: "var(--font-urbanist)" }}
                    >
                      {link.label}
                    </span>
                    <svg className="w-6 h-6 text-[oklch(42%_0.009_55)] group-hover:text-[oklch(71%_0.105_42)] transition-colors duration-300" viewBox="0 0 24 24" fill="none">
                      <path d="M5 19L19 5M19 5H9M19 5v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </motion.div>
              ))}
            </nav>

            {/* Menu footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="px-[clamp(1.5rem,4vw,4rem)] py-8 border-t border-[oklch(28%_0.008_55)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <span className="text-[0.8125rem] text-[oklch(42%_0.009_55)]">
                hello@darvincode.com
              </span>
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center gap-2 bg-[oklch(71%_0.105_42)] text-[oklch(19%_0.010_55)] px-6 py-3 rounded-full text-[0.8125rem] font-[700] tracking-[0.02em] hover:bg-[oklch(85%_0.065_42)] transition-colors duration-300"
              >
                Get a proposal
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
