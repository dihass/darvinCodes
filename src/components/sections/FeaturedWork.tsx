"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import RevealText, { RevealFade } from "@/components/ui/RevealText";

const projects = [
  {
    id: "01",
    client: "Alaya Collection",
    type: "Booking Platform",
    year: "2024",
    result: "+38% direct bookings",
    description:
      "A complete reimagination of the direct booking experience for a 14-property boutique collection.",
    accent: "oklch(71% 0.105 42)",
    bg: "oklch(91% 0.018 52)",
    pattern: "diagonal",
  },
  {
    id: "02",
    client: "The Ravi Resort",
    type: "Guest Experience App",
    year: "2024",
    result: "5-star Maldives resort",
    description:
      "Native iOS & Android app for in-stay services, digital concierge, and room controls.",
    accent: "oklch(60% 0.090 55)",
    bg: "oklch(93% 0.016 65)",
    pattern: "dots",
  },
  {
    id: "03",
    client: "Meridian Hotels",
    type: "Brand & Web Platform",
    year: "2023",
    result: "22-property group",
    description:
      "Full digital identity refresh and CMS-driven web platform for a European hotel group.",
    accent: "oklch(52% 0.085 220)",
    bg: "oklch(93% 0.010 225)",
    pattern: "grid",
  },
  {
    id: "04",
    client: "Solara Villas",
    type: "Operations Dashboard",
    year: "2023",
    result: "Real-time ops",
    description:
      "Property management dashboard unifying housekeeping, maintenance, and guest comms.",
    accent: "oklch(57% 0.110 35)",
    bg: "oklch(92% 0.020 45)",
    pattern: "wave",
  },
];

export default function FeaturedWork() {
  return (
    <section
      id="work"
      className="bg-[oklch(97%_0.008_65)] px-[clamp(1.5rem,4vw,4rem)] py-[clamp(6rem,10vw,10rem)]"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <RevealFade>
            <span
              className="text-[0.6875rem] font-[600] tracking-[0.16em] uppercase text-[oklch(71%_0.105_42)] mb-5 block"
              style={{ fontFamily: "var(--font-urbanist)" }}
            >
              Our portfolio
            </span>
          </RevealFade>
          <RevealText>
            <h2
              className="font-[800] leading-[0.92] tracking-[-0.04em] text-[oklch(19%_0.010_55)]"
              style={{
                fontFamily: "var(--font-urbanist)",
                fontSize: "clamp(2.75rem, 6vw, 5.5rem)",
              }}
            >
              Selected Work
            </h2>
          </RevealText>
        </div>
        <RevealFade delay={0.1}>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2.5 text-[0.8125rem] font-[700] tracking-[0.06em] uppercase text-[oklch(42%_0.009_55)] hover:text-[oklch(71%_0.105_42)] transition-colors duration-300 self-end"
            style={{ fontFamily: "var(--font-urbanist)" }}
          >
            All projects
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" viewBox="0 0 14 14" fill="none">
              <path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </RevealFade>
      </div>

      {/* 4-column even grid (UPQODE-inspired) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* Bottom call-to-action strip */}
      <RevealFade delay={0.3}>
        <div className="mt-16 p-8 md:p-10 rounded-2xl bg-[oklch(94.5%_0.012_55)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p
              className="font-[800] tracking-[-0.03em] text-[oklch(19%_0.010_55)] mb-1.5"
              style={{
                fontFamily: "var(--font-urbanist)",
                fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
              }}
            >
              Your property could be next.
            </p>
            <p className="text-[0.9375rem] text-[oklch(42%_0.009_55)]">
              We take on a limited number of projects each quarter.
            </p>
          </div>
          <a
            href="#contact"
            className="group flex items-center gap-3 bg-[oklch(19%_0.010_55)] text-[oklch(97%_0.008_65)] px-7 py-4 rounded-full text-[0.8125rem] font-[700] tracking-[0.04em] uppercase hover:bg-[oklch(71%_0.105_42)] hover:text-[oklch(19%_0.010_55)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0"
          >
            Start a conversation
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" viewBox="0 0 14 14" fill="none">
              <path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </RevealFade>
    </section>
  );
}

function PatternSVG({ pattern, accent }: { pattern: string; accent: string }) {
  if (pattern === "diagonal") {
    return (
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id={`d-${pattern}`} width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(-38)">
            <line x1="0" y1="0" x2="0" y2="24" stroke={accent} strokeWidth="0.7" strokeOpacity="0.22" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#d-${pattern})`} />
        <circle cx="65%" cy="38%" r="70" fill={accent} fillOpacity="0.09" />
        <circle cx="65%" cy="38%" r="38" fill={accent} fillOpacity="0.07" />
      </svg>
    );
  }
  if (pattern === "dots") {
    return (
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id={`d-${pattern}`} width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="9" cy="9" r="1.2" fill={accent} fillOpacity="0.28" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#d-${pattern})`} />
      </svg>
    );
  }
  if (pattern === "grid") {
    return (
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id={`d-${pattern}`} width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke={accent} strokeWidth="0.5" strokeOpacity="0.22" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#d-${pattern})`} />
        <rect x="20%" y="20%" width="60%" height="60%" rx="2" fill={accent} fillOpacity="0.07" />
      </svg>
    );
  }
  return (
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 300 400">
      <path d="M0 200 Q75 140 150 200 Q225 260 300 200 L300 400 L0 400Z" fill={accent} fillOpacity="0.1" />
      <path d="M0 230 Q75 170 150 230 Q225 290 300 230 L300 400 L0 400Z" fill={accent} fillOpacity="0.07" />
    </svg>
  );
}

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.08 * index, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex flex-col rounded-2xl overflow-hidden cursor-pointer"
      style={{ backgroundColor: project.bg }}
    >
      {/* Visual zone */}
      <div className="relative overflow-hidden" style={{ height: "clamp(220px, 26vw, 340px)" }}>
        <PatternSVG pattern={project.pattern} accent={project.accent} />

        {/* Ghost client name */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <span
            className="font-[800] tracking-[-0.05em] leading-none select-none whitespace-nowrap"
            style={{
              fontFamily: "var(--font-urbanist)",
              fontSize: "clamp(3.5rem, 8vw, 7rem)",
              color: project.accent,
              opacity: 0.1,
            }}
          >
            {project.client.split(" ")[0]}
          </span>
        </div>

        {/* Corner labels */}
        <div className="absolute top-4 left-4">
          <span
            className="text-[0.5625rem] font-[700] tracking-[0.12em] uppercase"
            style={{ color: project.accent, opacity: 0.65 }}
          >
            {project.id}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="text-[0.5625rem] font-[500]" style={{ color: project.accent, opacity: 0.5 }}>
            {project.year}
          </span>
        </div>

        {/* Hover accent overlay */}
        <motion.div
          className="absolute inset-0"
          style={{ backgroundColor: project.accent }}
          animate={{ opacity: hovered ? 0.07 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Info zone */}
      <div className="flex flex-col flex-1 p-5">
        {/* Result pill */}
        <div className="mb-3">
          <span
            className="inline-block text-[0.5625rem] font-[700] tracking-[0.10em] uppercase px-2.5 py-1 rounded-full"
            style={{
              color: project.accent,
              backgroundColor: `${project.accent}18`,
            }}
          >
            {project.result}
          </span>
        </div>

        <div className="flex items-start justify-between gap-2">
          <div>
            <h3
              className="font-[700] tracking-[-0.02em] text-[oklch(19%_0.010_55)] leading-tight text-[1rem]"
              style={{ fontFamily: "var(--font-urbanist)" }}
            >
              {project.client}
            </h3>
            <p className="text-[0.75rem] font-[500] text-[oklch(62%_0.007_55)] mt-0.5">
              {project.type}
            </p>
          </div>

          <motion.div
            animate={{ rotate: hovered ? 45 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-7 h-7 rounded-full border border-[oklch(82%_0.014_58)] flex items-center justify-center shrink-0 mt-0.5"
            style={{
              backgroundColor: hovered ? project.accent : "transparent",
              borderColor: hovered ? project.accent : undefined,
              transition: "background-color 0.3s, border-color 0.3s",
            }}
          >
            <svg
              className="w-2.5 h-2.5"
              style={{ color: hovered ? "oklch(97% 0.008 65)" : "oklch(42% 0.009 55)" }}
              viewBox="0 0 12 12"
              fill="none"
            >
              <path d="M1.5 10.5L10.5 1.5M10.5 1.5H4.5M10.5 1.5v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>

        {/* Description on hover */}
        <motion.div
          initial={false}
          animate={{ height: hovered ? "auto" : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <p className="pt-3 text-[0.8125rem] leading-[1.65] text-[oklch(42%_0.009_55)]">
            {project.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
