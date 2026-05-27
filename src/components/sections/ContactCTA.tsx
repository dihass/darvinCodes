"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import RevealText, { RevealFade } from "@/components/ui/RevealText";
import Lottie from "lottie-react";
import emailAnimation from "@/../public/animations/email.json";

export default function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-[oklch(97%_0.008_65)] px-[clamp(1.5rem,4vw,4rem)] py-[clamp(6rem,10vw,10rem)] overflow-hidden"
    >
      {/* Soft warm radial behind the form side */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 25% 55%, oklch(87% 0.055 42 / 0.09) 0%, transparent 70%)",
        }}
      />

      <div className="relative">
        {/* Kicker */}
        <RevealFade>
          <span className="text-[0.6875rem] font-[600] tracking-[0.14em] uppercase text-[oklch(71%_0.105_42)] mb-8 block">
            Get in touch
          </span>
        </RevealFade>

        {/* Headline */}
        <div className="mb-14">
          <RevealText>
            <h2
              className="text-[clamp(2.75rem,7vw,6.5rem)] font-[800] leading-[0.91] tracking-[-0.04em] text-[oklch(19%_0.010_55)]"
              style={{ fontFamily: "var(--font-urbanist)" }}
            >
              Let's build
            </h2>
          </RevealText>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "105%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
              className="text-[clamp(2.75rem,7vw,6.5rem)] font-[300] leading-[0.91] tracking-[-0.04em] italic"
              style={{ fontFamily: "var(--font-spectral)", color: "oklch(71% 0.105 42)" }}
            >
              something great.
            </motion.h2>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 items-center">

          {/* Left: form */}
          <RevealFade delay={0.15}>
            <div>
              <p className="text-[0.9375rem] leading-[1.7] text-[oklch(42%_0.009_55)] mb-8">
                Tell us about your property and project. We'll respond within one business day.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3.5 bg-transparent border border-[oklch(82%_0.014_58)] rounded-xl text-[0.9375rem] text-[oklch(19%_0.010_55)] placeholder:text-[oklch(70%_0.007_55)] focus:outline-none focus:border-[oklch(71%_0.105_42)] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-urbanist)" }}
                  />
                  <input
                    type="text"
                    placeholder="Your property / company"
                    className="w-full px-4 py-3.5 bg-transparent border border-[oklch(82%_0.014_58)] rounded-xl text-[0.9375rem] text-[oklch(19%_0.010_55)] placeholder:text-[oklch(70%_0.007_55)] focus:outline-none focus:border-[oklch(71%_0.105_42)] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-urbanist)" }}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    required
                    className="w-full px-4 py-3.5 bg-transparent border border-[oklch(82%_0.014_58)] rounded-xl text-[0.9375rem] text-[oklch(19%_0.010_55)] placeholder:text-[oklch(70%_0.007_55)] focus:outline-none focus:border-[oklch(71%_0.105_42)] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-urbanist)" }}
                  />
                  <textarea
                    placeholder="Tell us about your project"
                    rows={4}
                    className="w-full px-4 py-3.5 bg-transparent border border-[oklch(82%_0.014_58)] rounded-xl text-[0.9375rem] text-[oklch(19%_0.010_55)] placeholder:text-[oklch(70%_0.007_55)] focus:outline-none focus:border-[oklch(71%_0.105_42)] transition-colors duration-300 resize-none"
                    style={{ fontFamily: "var(--font-urbanist)" }}
                  />
                  <button
                    type="submit"
                    className="group mt-1 flex items-center justify-center gap-3 bg-[oklch(19%_0.010_55)] text-[oklch(97%_0.008_65)] px-7 py-4 rounded-full text-[0.875rem] font-[600] tracking-[0.01em] hover:bg-[oklch(71%_0.105_42)] hover:text-[oklch(19%_0.010_55)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  >
                    Send message
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" viewBox="0 0 14 14" fill="none">
                      <path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-3 py-8"
                >
                  <div className="w-10 h-10 rounded-full bg-[oklch(87%_0.055_42)] flex items-center justify-center">
                    <svg className="w-4 h-4 text-[oklch(52%_0.105_40)]" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l4 4 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-[1.25rem] font-[700] tracking-[-0.02em] text-[oklch(19%_0.010_55)]" style={{ fontFamily: "var(--font-urbanist)" }}>
                    Message received.
                  </h3>
                  <p className="text-[0.9375rem] text-[oklch(42%_0.009_55)] leading-relaxed">
                    We'll be in touch within one business day.
                  </p>
                </motion.div>
              )}
            </div>
          </RevealFade>

          {/* Right: Lottie envelope animation */}
          <RevealFade delay={0.2}>
            <div className="flex items-center justify-center">
              <Lottie
                animationData={emailAnimation}
                loop
                className="w-full max-w-[360px]"
              />
            </div>
          </RevealFade>
        </div>
      </div>
    </section>
  );
}
