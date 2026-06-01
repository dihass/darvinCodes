"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroCanvas from "@/components/ui/HeroCanvas";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-[oklch(97%_0.008_65)] border-b border-[oklch(88%_0.010_60)]"
      aria-label="Hero"
    >
      {/* Canvas animation — right side panel, fills viewport with minimal veiling */}
      <div className="absolute right-0 top-0 w-full md:w-[58%] h-full pointer-events-none select-none">
        {/* Narrow left-edge blend so canvas doesn't clash with text column */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[oklch(97%_0.008_65)] to-transparent z-10" />
        {/* Soft bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[oklch(97%_0.008_65/0.7)] to-transparent z-10" />
        <HeroCanvas />
      </div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-20 flex flex-col justify-center flex-1 px-[clamp(1.5rem,4vw,4rem)] pt-36 pb-24"
      >
        <div className="max-w-[52rem]">
          {/* Kicker */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-8 h-px bg-[oklch(71%_0.105_42)]" />
            <span
              className="text-[0.6875rem] font-[600] tracking-[0.14em] uppercase text-[oklch(42%_0.009_55)]"
              style={{ fontFamily: "var(--font-urbanist)" }}
            >
              Hospitality Software Studio
            </span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="text-[clamp(3.5rem,8vw,7.5rem)] font-[800] leading-[0.91] tracking-[-0.04em] text-[oklch(19%_0.010_55)]"
              style={{ fontFamily: "var(--font-urbanist)" }}
            >
              Software that
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.div
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.62 }}
              className="flex items-end gap-4"
            >
              <h1
                className="text-[clamp(3.5rem,8vw,7.5rem)] font-[300] leading-[0.91] tracking-[-0.04em] text-[oklch(19%_0.010_55)] italic"
                style={{ fontFamily: "var(--font-spectral)" }}
              >
                checks in.
              </h1>
            </motion.div>
          </div>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
            className="max-w-[32rem] text-[clamp(1rem,1.4vw,1.125rem)] font-[400] leading-[1.65] text-[oklch(42%_0.009_55)] mb-10"
            style={{ fontFamily: "var(--font-urbanist)" }}
          >
            We build premium digital experiences for hotels, resorts, and
            hospitality brands. Precision-crafted software that elevates every
            guest touchpoint.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.95 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#work"
              className="group flex items-center gap-3 bg-[oklch(19%_0.010_55)] text-[oklch(97%_0.008_65)] px-7 py-4 rounded-full text-[0.875rem] font-[600] tracking-[0.01em] hover:bg-[oklch(71%_0.105_42)] hover:text-[oklch(19%_0.010_55)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              View our work
              <svg
                className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M2 12L12 2M12 2H5M12 2v7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 px-7 py-4 rounded-full text-[0.875rem] font-[600] tracking-[0.01em] text-[oklch(42%_0.009_55)] border border-[oklch(82%_0.014_58)] hover:border-[oklch(71%_0.105_42)] hover:text-[oklch(19%_0.010_55)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              Start a project
            </a>
          </motion.div>
        </div>

      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-[clamp(1.5rem,4vw,4rem)] z-20 flex items-center gap-3"
      >
        <div className="w-px h-12 bg-[oklch(82%_0.014_58)] relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 right-0 bg-[oklch(71%_0.105_42)]"
            animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
            transition={{ duration: 2, ease: "linear", repeat: Infinity }}
          />
        </div>
        <span
          className="text-[0.625rem] font-[500] tracking-[0.14em] uppercase text-[oklch(62%_0.007_55)] rotate-90 origin-left translate-x-3"
        >
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
