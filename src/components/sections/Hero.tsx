"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroCanvas from "@/components/ui/HeroCanvas";

const stats = [
  { value: "120+", label: "Properties served" },
  { value: "8 yr", label: "Hospitality focus" },
  { value: "98%", label: "Client retention" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const canvasY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[oklch(97%_0.008_65)]"
      aria-label="Hero"
    >
      {/* Canvas zone — right 50%, fills full height with minimal veil */}
      <motion.div
        style={{ y: canvasY }}
        className="absolute right-0 top-0 w-full md:w-[52%] h-[115%] pointer-events-none select-none"
      >
        {/* Only a narrow left-edge fade to blend with text column */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[oklch(97%_0.008_65)] to-transparent z-10" />
        {/* Soft bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[oklch(97%_0.008_65)] to-transparent z-10" />
        <HeroCanvas />
      </motion.div>

      {/* Warm radial glow behind canvas */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 55% at 72% 42%, oklch(87% 0.055 42 / 0.14) 0%, transparent 68%)",
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-20 flex flex-col justify-between min-h-screen px-[clamp(1.5rem,4vw,4rem)] pt-[clamp(8rem,16vw,12rem)] pb-14"
      >
        {/* Top: kicker + headline */}
        <div className="max-w-[58rem]">
          {/* Kicker */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="flex items-center gap-3 mb-10"
          >
            <span className="w-6 h-px bg-[oklch(71%_0.105_42)]" />
            <span
              className="text-[0.6875rem] font-[600] tracking-[0.16em] uppercase text-[oklch(71%_0.105_42)]"
              style={{ fontFamily: "var(--font-urbanist)" }}
            >
              Hospitality Software Studio
            </span>
          </motion.div>

          {/* Headline — two lines, different registers */}
          <div className="overflow-hidden mb-3">
            <motion.h1
              initial={{ y: "108%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
              className="font-[800] leading-[0.9] tracking-[-0.04em] text-[oklch(19%_0.010_55)]"
              style={{
                fontFamily: "var(--font-urbanist)",
                fontSize: "clamp(4rem, 9.5vw, 9rem)",
              }}
            >
              Software that
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-12">
            <motion.h1
              initial={{ y: "108%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.58 }}
              className="font-[300] leading-[0.9] tracking-[-0.03em] italic text-[oklch(19%_0.010_55)]"
              style={{
                fontFamily: "var(--font-spectral)",
                fontSize: "clamp(4rem, 9.5vw, 9rem)",
              }}
            >
              checks in.
            </motion.h1>
          </div>

          {/* Sub + CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.78 }}
            className="flex flex-col sm:flex-row sm:items-end gap-8 sm:gap-16"
          >
            <p
              className="max-w-[28rem] text-[clamp(0.9375rem,1.3vw,1.0625rem)] font-[400] leading-[1.7] text-[oklch(42%_0.009_55)]"
              style={{ fontFamily: "var(--font-urbanist)" }}
            >
              We build premium digital experiences for hotels, resorts, and
              hospitality brands. Precision-crafted software that elevates every
              guest touchpoint.
            </p>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="#work"
                className="group flex items-center gap-2.5 bg-[oklch(71%_0.105_42)] text-[oklch(19%_0.010_55)] px-6 py-3.5 rounded-full text-[0.8125rem] font-[700] tracking-[0.02em] uppercase hover:bg-[oklch(52%_0.105_40)] hover:text-[oklch(97%_0.008_65)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                View our work
                <svg className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" viewBox="0 0 12 12" fill="none">
                  <path d="M1.5 10.5L10.5 1.5M10.5 1.5H4.5M10.5 1.5v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="#contact"
                className="flex items-center gap-2 px-6 py-3.5 rounded-full text-[0.8125rem] font-[600] tracking-[0.02em] uppercase text-[oklch(42%_0.009_55)] border border-[oklch(82%_0.014_58)] hover:border-[oklch(71%_0.105_42)] hover:text-[oklch(19%_0.010_55)] transition-all duration-400"
              >
                Start a project
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
          className="flex flex-wrap items-stretch gap-x-0 mt-auto pt-12 border-t border-[oklch(88%_0.010_60)] max-w-lg"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.15 + i * 0.09 }}
              className={`flex flex-col gap-1.5 pr-10 ${i > 0 ? "pl-10 border-l border-[oklch(88%_0.010_60)]" : ""}`}
            >
              <span
                className="font-[800] tracking-[-0.04em] text-[oklch(19%_0.010_55)]"
                style={{
                  fontFamily: "var(--font-urbanist)",
                  fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                }}
              >
                {s.value}
              </span>
              <span
                className="text-[0.625rem] font-[600] tracking-[0.12em] uppercase text-[oklch(62%_0.007_55)]"
              >
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 1 }}
        className="absolute bottom-8 right-[clamp(1.5rem,4vw,4rem)] z-20 flex items-center gap-2.5"
      >
        <span
          className="text-[0.5625rem] font-[600] tracking-[0.16em] uppercase text-[oklch(70%_0.007_55)]"
        >
          Scroll
        </span>
        <div className="w-10 h-px bg-[oklch(82%_0.014_58)] relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-[oklch(71%_0.105_42)]"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.8, ease: "linear", repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
