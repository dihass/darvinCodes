"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import RevealText, { RevealFade } from "@/components/ui/RevealText";

const steps = [
  {
    number: "01",
    phase: "Discovery",
    duration: "1 — 2 weeks",
    title: "We learn your world",
    description:
      "Deep-dive workshops with your operations, sales, and marketing teams. We map guest journeys, audit existing systems, and identify the pressure points that matter most.",
    deliverables: ["Brand audit", "System mapping", "Opportunity brief"],
  },
  {
    number: "02",
    phase: "Strategy & Design",
    duration: "2 — 4 weeks",
    title: "We shape the solution",
    description:
      "Architecture, UX strategy, and high-fidelity design. Every interaction mapped and pressure-tested before a single line of production code is written.",
    deliverables: ["UX flows", "Design system", "Technical spec"],
  },
  {
    number: "03",
    phase: "Engineering",
    duration: "4 — 12 weeks",
    title: "We build with precision",
    description:
      "Iterative development with weekly reviews. Tight feedback loops, rigorous QA, and integration testing against your real systems — not mock data.",
    deliverables: ["Staged builds", "Integration tests", "Performance audit"],
  },
  {
    number: "04",
    phase: "Launch & Evolve",
    duration: "Ongoing",
    title: "We stay in it with you",
    description:
      "Phased rollout with hands-on support. Post-launch, we monitor, iterate, and extend. Your platform grows as your property does.",
    deliverables: ["Launch support", "Analytics setup", "Retainer model"],
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="bg-[oklch(94.5%_0.012_55)] px-[clamp(1.5rem,4vw,4rem)] py-[clamp(6rem,10vw,10rem)]"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
        <div>
          <RevealFade>
            <span
              className="text-[0.6875rem] font-[600] tracking-[0.14em] uppercase text-[oklch(71%_0.105_42)] mb-4 block"
            >
              How we work
            </span>
          </RevealFade>
          <RevealText>
            <h2
              className="text-[clamp(2.5rem,5.5vw,5rem)] font-[800] leading-[0.93] tracking-[-0.035em] text-[oklch(19%_0.010_55)]"
              style={{ fontFamily: "var(--font-urbanist)" }}
            >
              Our Process
            </h2>
          </RevealText>
        </div>
        <RevealFade delay={0.1}>
          <p
            className="max-w-xs text-[0.9375rem] leading-[1.7] text-[oklch(42%_0.009_55)] md:text-right"
          >
            A structured engagement model that balances rigorous process with
            flexibility for complex hospitality contexts.
          </p>
        </RevealFade>
      </div>

      {/* Steps */}
      <div className="space-y-0">
        {steps.map((step, i) => (
          <ProcessStep key={step.number} step={step} index={i} isLast={i === steps.length - 1} />
        ))}
      </div>
    </section>
  );
}

function ProcessStep({
  step,
  index,
  isLast,
}: {
  step: (typeof steps)[0];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.85,
        delay: 0.08 * index,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div
        className={`grid grid-cols-1 md:grid-cols-[6rem_1fr_1fr] gap-6 md:gap-10 py-10 ${!isLast ? "border-b border-[oklch(88%_0.010_60)]" : ""}`}
      >
        {/* Number + connector */}
        <div className="flex md:flex-col items-start gap-3">
          <div className="flex items-center gap-3">
            <span
              className="text-[0.6875rem] font-[700] tracking-[0.12em] uppercase text-[oklch(71%_0.105_42)]"
            >
              {step.number}
            </span>
            <span
              className="text-[0.6875rem] font-[500] tracking-[0.06em] text-[oklch(62%_0.007_55)] md:hidden"
            >
              {step.phase}
            </span>
          </div>
          <span
            className="hidden md:inline-block text-[0.6875rem] font-[500] tracking-[0.06em] text-[oklch(62%_0.007_55)]"
          >
            {step.phase}
          </span>
          <div
            className="hidden md:block mt-2 px-2 py-1 rounded-full bg-[oklch(91%_0.016_52)] border border-[oklch(82%_0.014_58)]"
          >
            <span
              className="text-[0.5625rem] font-[600] tracking-[0.08em] uppercase text-[oklch(52%_0.105_40)]"
            >
              {step.duration}
            </span>
          </div>
        </div>

        {/* Title + description */}
        <div className="flex flex-col gap-3">
          <h3
            className="text-[clamp(1.125rem,2.2vw,1.5rem)] font-[700] tracking-[-0.025em] text-[oklch(19%_0.010_55)] leading-tight"
            style={{ fontFamily: "var(--font-urbanist)" }}
          >
            {step.title}
          </h3>
          <p className="text-[0.9375rem] leading-[1.7] text-[oklch(42%_0.009_55)] max-w-md">
            {step.description}
          </p>
          {/* Mobile: duration pill */}
          <div className="md:hidden">
            <span
              className="inline-block px-2.5 py-1 rounded-full bg-[oklch(91%_0.016_52)] border border-[oklch(82%_0.014_58)] text-[0.5625rem] font-[600] tracking-[0.08em] uppercase text-[oklch(52%_0.105_40)]"
            >
              {step.duration}
            </span>
          </div>
        </div>

        {/* Deliverables */}
        <div className="flex flex-col gap-2.5 md:justify-start md:items-start">
          <span
            className="text-[0.625rem] font-[600] tracking-[0.12em] uppercase text-[oklch(62%_0.007_55)] mb-1"
          >
            Deliverables
          </span>
          {step.deliverables.map((d) => (
            <div key={d} className="flex items-center gap-2">
              <span
                className="w-4 h-px bg-[oklch(71%_0.105_42)]"
                aria-hidden="true"
              />
              <span
                className="text-[0.875rem] font-[500] text-[oklch(42%_0.009_55)]"
              >
                {d}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
