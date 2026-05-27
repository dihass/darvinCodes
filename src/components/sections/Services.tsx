"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import RevealText, { RevealFade } from "@/components/ui/RevealText";

const services = [
  {
    number: "01",
    title: "Guest Experience Platforms",
    short: "Digital interfaces your guests actually use.",
    description:
      "End-to-end guest portals, digital check-in flows, in-stay apps, and post-stay touchpoints that reflect your brand with precision.",
    tags: ["Web Apps", "Mobile", "Design"],
  },
  {
    number: "02",
    title: "Property Management Systems",
    short: "Operations software built for the way you work.",
    description:
      "Custom PMS integrations, housekeeping dashboards, reservations engines, and back-office tools that eliminate friction across your operation.",
    tags: ["PMS", "Integrations", "Automation"],
  },
  {
    number: "03",
    title: "Booking & Revenue Optimization",
    short: "Convert browsers into confirmed reservations.",
    description:
      "Bespoke booking engines, dynamic pricing interfaces, channel management, and conversion-optimized flows that increase direct bookings.",
    tags: ["Booking Engine", "Revenue", "CRO"],
  },
  {
    number: "04",
    title: "Digital Brand & Web Design",
    short: "Presences that match the caliber of your property.",
    description:
      "Brand-led websites, campaign pages, and digital identities that communicate luxury, authenticity, and distinction across every screen.",
    tags: ["Web Design", "Branding", "CMS"],
  },
  {
    number: "05",
    title: "Data & Intelligence",
    short: "Visibility into what drives your property forward.",
    description:
      "Analytics dashboards, guest behavior insights, occupancy visualizations, and reporting systems that surface the decisions that matter.",
    tags: ["Analytics", "Dashboards", "AI"],
  },
];

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="relative bg-[oklch(97%_0.008_65)] px-[clamp(1.5rem,4vw,4rem)] py-[clamp(6rem,10vw,10rem)]"
    >
      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
        <div>
          <RevealFade>
            <span
              className="text-[0.6875rem] font-[600] tracking-[0.16em] uppercase text-[oklch(71%_0.105_42)] mb-5 block"
              style={{ fontFamily: "var(--font-urbanist)" }}
            >
              What we build
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
              Services
            </h2>
          </RevealText>
        </div>
        <RevealFade delay={0.1}>
          <p
            className="max-w-xs text-[0.9375rem] leading-[1.7] text-[oklch(42%_0.009_55)] md:text-right"
            style={{ fontFamily: "var(--font-urbanist)" }}
          >
            Full-spectrum digital services for hospitality brands that demand
            exceptional software.
          </p>
        </RevealFade>
      </div>

      {/* Services list */}
      <ul className="border-t border-[oklch(88%_0.010_60)] divide-y divide-[oklch(88%_0.010_60)]">
        {services.map((service, i) => (
          <ServiceItem
            key={service.number}
            service={service}
            index={i}
            isHovered={hovered === i}
            onHover={() => setHovered(i)}
            onLeave={() => setHovered(null)}
          />
        ))}
      </ul>

      {/* Footer link */}
      <RevealFade delay={0.2}>
        <div className="mt-14 flex items-center gap-4">
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 text-[0.8125rem] font-[700] tracking-[0.06em] uppercase text-[oklch(19%_0.010_55)] hover:text-[oklch(71%_0.105_42)] transition-colors duration-300"
            style={{ fontFamily: "var(--font-urbanist)" }}
          >
            Discuss your project
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

function ServiceItem({
  service,
  index,
  isHovered,
  onHover,
  onLeave,
}: {
  service: (typeof services)[0];
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <RevealFade delay={0.05 * index}>
      <li
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        className={`group relative cursor-default transition-colors duration-300 ${
          isHovered ? "bg-[oklch(94.5%_0.012_55)]" : ""
        }`}
      >
        {/* Accent bar on hover */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-[3px] bg-[oklch(71%_0.105_42)]"
          animate={{ scaleY: isHovered ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "top" }}
        />

        <div className="px-0 py-7 md:py-9 flex flex-col md:flex-row md:items-start gap-4 md:gap-0 pl-4">
          {/* Large number */}
          <div className="md:w-28 shrink-0 flex items-start">
            <span
              className="font-[800] leading-none tracking-[-0.05em] select-none"
              style={{
                fontFamily: "var(--font-urbanist)",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                color: isHovered
                  ? "oklch(71% 0.105 42)"
                  : "oklch(88% 0.010 60)",
                transition: "color 0.3s ease",
              }}
            >
              {service.number}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3
                  className="font-[700] tracking-[-0.025em] text-[oklch(19%_0.010_55)] leading-tight mb-1.5"
                  style={{
                    fontFamily: "var(--font-urbanist)",
                    fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)",
                  }}
                >
                  {service.title}
                </h3>
                <p className="text-[0.9375rem] text-[oklch(62%_0.007_55)]">
                  {service.short}
                </p>
              </div>

              {/* Rotate arrow */}
              <motion.div
                animate={{ rotate: isHovered ? 45 : 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-9 h-9 rounded-full border border-[oklch(82%_0.014_58)] flex items-center justify-center shrink-0 mt-1"
                style={{
                  backgroundColor: isHovered ? "oklch(87% 0.055 42)" : "transparent",
                  borderColor: isHovered ? "oklch(71% 0.105 42)" : undefined,
                  transition: "background-color 0.3s, border-color 0.3s",
                }}
              >
                <svg className="w-3.5 h-3.5 text-[oklch(42%_0.009_55)]" viewBox="0 0 14 14" fill="none">
                  <path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </div>

            {/* Expand on hover */}
            <motion.div
              initial={false}
              animate={{ height: isHovered ? "auto" : 0, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="pt-4 text-[0.9375rem] leading-[1.7] text-[oklch(42%_0.009_55)] max-w-xl">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-2.5 py-1 bg-[oklch(91%_0.016_52)] rounded-full text-[0.5625rem] font-[700] tracking-[0.10em] uppercase text-[oklch(42%_0.009_55)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </li>
    </RevealFade>
  );
}
