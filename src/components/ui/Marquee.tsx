"use client";

const items = [
  "Guest Experience Platforms",
  "Booking Engines",
  "Property Management",
  "Digital Brand Identity",
  "Revenue Optimization",
  "Mobile Concierge Apps",
  "PMS Integration",
  "Data Dashboards",
];

interface MarqueeProps {
  reverse?: boolean;
  accent?: boolean;
}

export default function Marquee({ reverse = false, accent = false }: MarqueeProps) {
  const track = [...items, ...items];

  return (
    <div
      className={`relative overflow-hidden py-5 border-y ${
        accent
          ? "bg-[oklch(71%_0.105_42)] border-[oklch(65%_0.100_42)]"
          : "bg-[oklch(94.5%_0.012_55)] border-[oklch(88%_0.010_60)]"
      }`}
    >
      {/* Left fade */}
      <div
        className={`absolute inset-y-0 left-0 w-24 z-10 pointer-events-none ${
          accent
            ? "bg-gradient-to-r from-[oklch(71%_0.105_42)] to-transparent"
            : "bg-gradient-to-r from-[oklch(94.5%_0.012_55)] to-transparent"
        }`}
      />
      {/* Right fade */}
      <div
        className={`absolute inset-y-0 right-0 w-24 z-10 pointer-events-none ${
          accent
            ? "bg-gradient-to-l from-[oklch(71%_0.105_42)] to-transparent"
            : "bg-gradient-to-l from-[oklch(94.5%_0.012_55)] to-transparent"
        }`}
      />

      <div
        className={`flex gap-0 whitespace-nowrap ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
        style={{ willChange: "transform" }}
      >
        {track.map((item, i) => (
          <span key={i} className="flex items-center gap-0 shrink-0">
            <span
              className={`text-[0.6875rem] font-[700] tracking-[0.14em] uppercase px-6 ${
                accent
                  ? "text-[oklch(19%_0.010_55)]"
                  : "text-[oklch(42%_0.009_55)]"
              }`}
              style={{ fontFamily: "var(--font-urbanist)" }}
            >
              {item}
            </span>
            <span
              className={`text-[0.375rem] ${
                accent ? "text-[oklch(52%_0.105_40)]" : "text-[oklch(71%_0.105_42)]"
              }`}
            >
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
