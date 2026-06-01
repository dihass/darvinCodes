"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import RevealText, { RevealFade } from "@/components/ui/RevealText";

const project = {
  id: "01",
  client: "Seascape",
  type: "Hospitality Web Experience",
  year: "2025",
  url: "https://seascape-woad.vercel.app/",
  description:
    "A refined digital experience for a luxury coastal property — immersive visuals, seamless booking flow, and a brand identity built for the discerning traveller.",
  tags: ["Web Design", "Engineering", "Brand"],
  accent: "oklch(71% 0.105 42)",
};

export default function FeaturedWork() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

  return (
    <section
      id="work"
      className="bg-[oklch(97%_0.008_65)] px-[clamp(1.5rem,4vw,4rem)] py-[clamp(6rem,10vw,10rem)]"
    >
      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <RevealFade>
            <span className="text-[0.6875rem] font-[600] tracking-[0.14em] uppercase text-[oklch(71%_0.105_42)] mb-4 block">
              Selected work
            </span>
          </RevealFade>
          <RevealText>
            <h2
              className="text-[clamp(2.5rem,5.5vw,5rem)] font-[800] leading-[0.93] tracking-[-0.035em] text-[oklch(19%_0.010_55)]"
              style={{ fontFamily: "var(--font-urbanist)" }}
            >
              Featured Project
            </h2>
          </RevealText>
        </div>
        <RevealFade delay={0.1}>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 text-[0.875rem] font-[600] tracking-[0.01em] text-[oklch(42%_0.009_55)] hover:text-[oklch(19%_0.010_55)] transition-colors duration-300 self-end"
          >
            Visit live site
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
        </RevealFade>
      </div>

      {/* Project showcase */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="block group rounded-2xl overflow-hidden"
          style={{ backgroundColor: "oklch(91% 0.016 52)" }}
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[oklch(88%_0.012_55)]">
            <span className="w-2.5 h-2.5 rounded-full bg-[oklch(78%_0.010_55)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[oklch(78%_0.010_55)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[oklch(78%_0.010_55)]" />
            <div className="flex-1 mx-4">
              <div className="mx-auto max-w-[320px] bg-[oklch(94%_0.008_55)] rounded-md px-3 py-1 text-[0.6875rem] text-[oklch(55%_0.008_55)] font-[400] text-center truncate">
                seascape-woad.vercel.app
              </div>
            </div>
          </div>

          {/* iframe preview */}
          <div className="relative overflow-hidden" style={{ height: "clamp(320px,45vw,580px)" }}>
            <iframe
              src={project.url}
              title="Seascape — live preview"
              className="w-full h-full border-0 pointer-events-none select-none"
              style={{
                transform: "scale(1)",
                transformOrigin: "top left",
              }}
              loading="lazy"
              tabIndex={-1}
            />
            {/* Overlay to keep card clickable and add hover tint */}
            <motion.div
              className="absolute inset-0"
              animate={{ backgroundColor: hovered ? "oklch(71% 0.105 42 / 0.06)" : "oklch(0% 0 0 / 0)" }}
              transition={{ duration: 0.35 }}
            />
          </div>

          {/* Info bar */}
          <div className="px-7 py-6 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <span
                className="text-[0.6875rem] font-[600] tracking-[0.1em] uppercase"
                style={{ color: project.accent, opacity: 0.7 }}
              >
                {project.id}
              </span>
              <div>
                <h3
                  className="text-[1.25rem] font-[700] tracking-[-0.025em] text-[oklch(19%_0.010_55)] leading-tight"
                  style={{ fontFamily: "var(--font-urbanist)" }}
                >
                  {project.client}
                </h3>
                <p className="text-[0.8125rem] font-[500] text-[oklch(62%_0.007_55)] mt-0.5">
                  {project.type}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-2.5 py-1 rounded-full text-[0.625rem] font-[600] tracking-[0.08em] uppercase border"
                    style={{
                      borderColor: `${project.accent}40`,
                      color: project.accent,
                      backgroundColor: `${project.accent}0d`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <motion.div
                animate={{ rotate: hovered ? 45 : 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-9 h-9 rounded-full border border-[oklch(82%_0.014_58)] flex items-center justify-center shrink-0"
              >
                <svg className="w-3.5 h-3.5 text-[oklch(42%_0.009_55)]" viewBox="0 0 12 12" fill="none">
                  <path d="M1 11L11 1M11 1H4M11 1v7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </div>
          </div>
        </a>
      </motion.div>
    </section>
  );
}
