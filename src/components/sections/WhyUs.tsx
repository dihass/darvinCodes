"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import RevealText, { RevealFade } from "@/components/ui/RevealText";

const differentiators = [
  {
    number: "01",
    title: "Hospitality-native",
    body: "Our team has spent careers inside hospitality. We speak PMS, CRS, OTA, and RevPAR. We understand check-in flows, guest lifecycles, and the operational nuances that generalist studios miss.",
  },
  {
    number: "02",
    title: "No templates, ever",
    body: "Every engagement starts from a blank page. Your brand, your guests, your operational realities — not a recycled solution from a previous client.",
  },
  {
    number: "03",
    title: "Integrated by design",
    body: "We build with your ecosystem in mind from day one: PMS, CRS, POS, loyalty programs, and third-party APIs. Systems that actually communicate.",
  },
  {
    number: "04",
    title: "Long-term partnership",
    body: "We operate on a retainer model because launch day isn't the finish line. We measure success in your occupancy rate and guest satisfaction scores, not sprint velocity.",
  },
];

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="why"
      ref={sectionRef}
      className="relative bg-[oklch(19%_0.010_55)] px-[clamp(1.5rem,4vw,4rem)] py-[clamp(6rem,10vw,10rem)] overflow-hidden"
    >
      {/* Background soft glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: "-10%",
          top: "10%",
          width: "50%",
          height: "70%",
          background:
            "radial-gradient(ellipse at center, oklch(71% 0.105 42 / 0.07) 0%, transparent 70%)",
        }}
      />

      {/* Label */}
      <RevealFade>
        <span
          className="text-[0.6875rem] font-[600] tracking-[0.14em] uppercase text-[oklch(71%_0.105_42)] mb-12 block"
        >
          Why Darvin Code
        </span>
      </RevealFade>

      {/* Pull quote */}
      <div className="max-w-4xl mb-20">
        <div className="overflow-hidden">
          <motion.p
            initial={{ y: "105%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.2] tracking-[-0.025em] text-[oklch(94%_0.008_60)] italic"
            style={{ fontFamily: "var(--font-spectral)", fontWeight: 300 }}
          >
            We don't build software{" "}
            <em
              className="not-italic font-[600]"
              style={{ color: "oklch(71% 0.105 42)" }}
            >
              for
            </em>{" "}
            hospitality.
          </motion.p>
        </div>
        <div className="overflow-hidden">
          <motion.p
            initial={{ y: "105%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.2] tracking-[-0.025em] text-[oklch(60%_0.007_55)] italic"
            style={{ fontFamily: "var(--font-spectral)", fontWeight: 300 }}
          >
            We build hospitality{" "}
            <em className="not-italic" style={{ color: "oklch(71% 0.105 42)" }}>
              through
            </em>{" "}
            software.
          </motion.p>
        </div>
      </div>

      {/* Differentiators grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
        {differentiators.map((d, i) => (
          <DifferentiatorItem key={d.number} item={d} index={i} />
        ))}
      </div>

      {/* Bottom CTA row */}
      <RevealFade delay={0.5}>
        <div className="mt-20 pt-8 border-t border-[oklch(30%_0.008_55)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-[0.9375rem] text-[oklch(55%_0.007_55)] max-w-sm leading-relaxed">
            Ready to build something exceptional for your property?
          </p>
          <a
            href="#contact"
            className="group flex items-center gap-3 bg-[oklch(71%_0.105_42)] text-[oklch(19%_0.010_55)] px-7 py-4 rounded-full text-[0.875rem] font-[700] tracking-[0.01em] hover:bg-[oklch(85%_0.065_42)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0"
          >
            Let's talk
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
        </div>
      </RevealFade>
    </section>
  );
}

function DifferentiatorItem({
  item,
  index,
}: {
  item: (typeof differentiators)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: 0.1 * index,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="flex flex-col gap-3 group"
    >
      <div className="flex items-center gap-3 mb-1">
        <span
          className="text-[0.6875rem] font-[600] tracking-[0.1em] uppercase"
          style={{ color: "oklch(71% 0.105 42)", opacity: 0.8 }}
        >
          {item.number}
        </span>
        <div
          className="flex-1 h-px"
          style={{ backgroundColor: "oklch(30% 0.008 55)" }}
        />
      </div>
      <h3
        className="text-[clamp(1.125rem,2vw,1.375rem)] font-[700] tracking-[-0.02em] leading-tight"
        style={{
          fontFamily: "var(--font-urbanist)",
          color: "oklch(92% 0.006 58)",
        }}
      >
        {item.title}
      </h3>
      <p
        className="text-[0.9375rem] leading-[1.7]"
        style={{ color: "oklch(52% 0.007 55)" }}
      >
        {item.body}
      </p>
    </motion.div>
  );
}
