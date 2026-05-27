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
    description:
      "A complete reimagination of the direct booking experience for a 14-property boutique collection, driving 38% increase in direct reservations.",
    tags: ["Web Design", "Engineering", "CRO"],
    accent: "oklch(71% 0.105 42)",
    bg: "oklch(91% 0.016 52)",
    pattern: "diagonal",
    featured: true,
  },
  {
    id: "02",
    client: "The Ravi Resort",
    type: "Guest Experience App",
    year: "2024",
    description:
      "Native iOS & Android app for in-stay services, digital concierge, and room controls across a 5-star Maldives resort.",
    tags: ["Mobile", "UX Design", "API"],
    accent: "oklch(65% 0.090 55)",
    bg: "oklch(93% 0.018 65)",
    pattern: "dots",
    featured: false,
  },
  {
    id: "03",
    client: "Meridian Hotels",
    type: "Brand & Web Platform",
    year: "2023",
    description:
      "Full digital identity refresh and CMS-driven web platform for a 22-property European hotel group.",
    tags: ["Branding", "Web", "CMS"],
    accent: "oklch(55% 0.085 220)",
    bg: "oklch(93% 0.010 225)",
    pattern: "grid",
    featured: false,
  },
  {
    id: "04",
    client: "Solara Villas",
    type: "Operations Dashboard",
    year: "2023",
    description:
      "Real-time property management dashboard unifying housekeeping, maintenance, and guest communications for a luxury villa operator.",
    tags: ["Dashboard", "Real-time", "Operations"],
    accent: "oklch(60% 0.110 35)",
    bg: "oklch(92% 0.020 45)",
    pattern: "wave",
    featured: false,
  },
];

export default function FeaturedWork() {
  return (
    <section
      id="work"
      className="bg-[oklch(97%_0.008_65)] px-[clamp(1.5rem,4vw,4rem)] py-[clamp(6rem,10vw,10rem)]"
    >
      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <RevealFade>
            <span
              className="text-[0.6875rem] font-[600] tracking-[0.14em] uppercase text-[oklch(71%_0.105_42)] mb-4 block"
            >
              Selected work
            </span>
          </RevealFade>
          <RevealText>
            <h2
              className="text-[clamp(2.5rem,5.5vw,5rem)] font-[800] leading-[0.93] tracking-[-0.035em] text-[oklch(19%_0.010_55)]"
              style={{ fontFamily: "var(--font-urbanist)" }}
            >
              Featured Projects
            </h2>
          </RevealText>
        </div>
        <RevealFade delay={0.1}>
          <a
            href="#contact"
            className="group flex items-center gap-2.5 text-[0.875rem] font-[600] tracking-[0.01em] text-[oklch(42%_0.009_55)] hover:text-[oklch(19%_0.010_55)] transition-colors duration-300 self-end"
          >
            View all projects
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

      {/* Projects grid */}
      <div className="space-y-5">
        {/* Row 1: featured large + small */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <ProjectCard project={projects[0]} className="md:col-span-2" index={0} />
          <ProjectCard project={projects[1]} className="md:col-span-1" index={1} />
        </div>
        {/* Row 2: two equal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ProjectCard project={projects[2]} index={2} />
          <ProjectCard project={projects[3]} index={3} />
        </div>
      </div>
    </section>
  );
}

function ProjectPattern({ pattern, accent }: { pattern: string; accent: string }) {
  if (pattern === "diagonal") {
    return (
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="diag" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)">
            <line x1="0" y1="0" x2="0" y2="28" stroke={accent} strokeWidth="0.8" strokeOpacity="0.18" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diag)" />
        {/* Central focal element */}
        <circle cx="60%" cy="40%" r="90" fill={accent} fillOpacity="0.08" />
        <circle cx="60%" cy="40%" r="50" fill={accent} fillOpacity="0.07" />
      </svg>
    );
  }
  if (pattern === "dots") {
    return (
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1.2" fill={accent} fillOpacity="0.25" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
        <rect x="30%" y="20%" width="40%" height="60%" rx="4" fill={accent} fillOpacity="0.06" />
      </svg>
    );
  }
  if (pattern === "grid") {
    return (
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke={accent} strokeWidth="0.5" strokeOpacity="0.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <rect x="15%" y="15%" width="70%" height="70%" rx="2" fill="none" stroke={accent} strokeWidth="1" strokeOpacity="0.15" />
        <rect x="25%" y="25%" width="50%" height="50%" rx="2" fill={accent} fillOpacity="0.06" />
      </svg>
    );
  }
  /* wave */
  return (
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 300">
      <path d="M0 150 Q100 80 200 150 Q300 220 400 150 L400 300 L0 300Z" fill={accent} fillOpacity="0.09" />
      <path d="M0 170 Q100 100 200 170 Q300 240 400 170 L400 300 L0 300Z" fill={accent} fillOpacity="0.06" />
    </svg>
  );
}

function ProjectCard({
  project,
  className = "",
  index,
}: {
  project: (typeof projects)[0];
  className?: string;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.85,
        delay: 0.08 * index,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative rounded-2xl overflow-hidden cursor-pointer"
        style={{ backgroundColor: project.bg }}
      >
        {/* Visual area */}
        <div className="relative overflow-hidden" style={{ height: project.featured ? "clamp(260px,28vw,380px)" : "clamp(200px,22vw,300px)" }}>
          <ProjectPattern pattern={project.pattern} accent={project.accent} />

          {/* Client name as large type in the visual */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-[clamp(2rem,5vw,4.5rem)] font-[800] tracking-[-0.04em] select-none pointer-events-none"
              style={{
                fontFamily: "var(--font-urbanist)",
                color: project.accent,
                opacity: 0.12,
              }}
            >
              {project.client.split(" ")[0]}
            </span>
          </div>

          {/* Project number */}
          <div className="absolute top-5 left-5">
            <span
              className="text-[0.6875rem] font-[600] tracking-[0.1em] uppercase"
              style={{ color: project.accent, opacity: 0.7 }}
            >
              {project.id}
            </span>
          </div>

          {/* Year */}
          <div className="absolute top-5 right-5">
            <span
              className="text-[0.6875rem] font-[500] tracking-[0.08em]"
              style={{ color: project.accent, opacity: 0.6 }}
            >
              {project.year}
            </span>
          </div>

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: project.accent }}
            animate={{ opacity: hovered ? 0.08 : 0 }}
            transition={{ duration: 0.35 }}
          />
        </div>

        {/* Info area */}
        <div className="p-6 pb-7">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3
                className="text-[clamp(1.1rem,2vw,1.375rem)] font-[700] tracking-[-0.02em] text-[oklch(19%_0.010_55)] leading-tight"
                style={{ fontFamily: "var(--font-urbanist)" }}
              >
                {project.client}
              </h3>
              <p className="text-[0.8125rem] font-[500] text-[oklch(62%_0.007_55)] mt-0.5">
                {project.type}
              </p>
            </div>

            <motion.div
              animate={{ rotate: hovered ? 45 : 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-8 h-8 rounded-full border border-[oklch(82%_0.014_58)] flex items-center justify-center shrink-0"
            >
              <svg className="w-3 h-3 text-[oklch(42%_0.009_55)]" viewBox="0 0 12 12" fill="none">
                <path d="M1 11L11 1M11 1H4M11 1v7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </div>

          <motion.div
            initial={false}
            animate={{ height: hovered ? "auto" : 0, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pt-3.5 text-[0.875rem] leading-[1.65] text-[oklch(42%_0.009_55)]">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3.5">
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
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
