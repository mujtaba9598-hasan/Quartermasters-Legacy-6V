"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, scrollViewport } from "@/lib/animations";

const Globe = dynamic(
  () => import("@/components/features/Globe").then((m) => m.Globe),
  {
    ssr: false,
    loading: () => (
      <div className="flex aspect-square w-full max-w-lg items-center justify-center rounded-full mx-auto"
        style={{ border: "1px solid var(--glass-border)" }}>
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="50" stroke="#1B3A4B" strokeWidth="1" opacity="0.2" />
          <circle cx="60" cy="60" r="35" stroke="#1B3A4B" strokeWidth="0.5" opacity="0.15" />
          <ellipse cx="60" cy="60" rx="50" ry="20" stroke="#1B3A4B" strokeWidth="0.5" opacity="0.15" />
          <circle cx="60" cy="60" r="4" fill="#C8872E" opacity="0.6" />
        </svg>
      </div>
    ),
  }
);

export function GlobeSection() {
  const [shouldLoad, setShouldLoad] = useState(false);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={staggerContainer}
        >
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Text */}
            <div>
              <motion.p variants={staggerItem} className="text-overline mb-4">
                Global Reach
              </motion.p>
              <motion.h2 variants={staggerItem} className="heading-2 mb-6 text-white">
                California Based.
                <br />
                <span style={{ color: "#C15A2C" }}>
                  Globally Connected.
                </span>
              </motion.h2>
              <motion.div variants={staggerItem} className="flex flex-wrap gap-3 mb-8">
                <span className="pill-tag pill-tag--financial">#Global_Markets</span>
                <span className="pill-tag pill-tag--tech">#Cross_Border_Advisory</span>
                <span className="pill-tag pill-tag--events">#Emerging_Economies</span>
                <span className="pill-tag pill-tag--hr">#Strategic_Corridors</span>
                <span className="pill-tag pill-tag--mgmt">#International_Networks</span>
              </motion.div>

              <motion.p
                variants={staggerItem}
                className="mb-8 text-base leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                Our advisory network extends across major financial and
                commercial hubs. Hover the globe to explore our operational
                footprint.
              </motion.p>
            </div>

            {/* Globe Visual Area */}
            <motion.div
              variants={staggerItem}
              className="relative w-full"
            >
              {/* Glow Ring Behind */}
              <div
                className="absolute inset-0 rounded-full blur-3xl"
                style={{
                  background: 'radial-gradient(circle, rgba(193, 90, 44, 0.15) 0%, rgba(0, 0, 0, 0) 70%)',
                  transform: 'scale(1.1)'
                }}
              />

              {/* Glassmorphic Container */}
              <div className="glass relative rounded-[2rem] p-6 md:p-8 flex flex-col items-center justify-center border border-white/5">
                <div className="w-full aspect-square max-w-[280px] md:max-w-md mx-auto relative cursor-pointer">
                  <motion.div
                    onViewportEnter={() => setShouldLoad(true)}
                    viewport={{ once: true, margin: "200px" }}
                    className="w-full h-full"
                  >
                    {shouldLoad ? (
                      <Globe className="w-full h-full" />
                    ) : (
                      <div className="flex w-full h-full items-center justify-center rounded-full"
                        style={{ border: "1px solid rgba(255,255,255,0.05)" }}>
                        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                          <circle cx="60" cy="60" r="50" stroke="#1B3A4B" strokeWidth="1" opacity="0.2" />
                          <circle cx="60" cy="60" r="35" stroke="#1B3A4B" strokeWidth="0.5" opacity="0.15" />
                          <ellipse cx="60" cy="60" rx="50" ry="20" stroke="#1B3A4B" strokeWidth="0.5" opacity="0.15" />
                          <circle cx="60" cy="60" r="4" fill="#C8872E" opacity="0.6" />
                        </svg>
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Legend */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ background: "#C15A2C", boxShadow: "0 0 10px rgba(193, 90, 44, 0.5)" }}></span>
                    <span className="text-white/80">Global HQ</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ background: "#7FDBCA", boxShadow: "0 0 10px rgba(127, 219, 202, 0.5)" }}></span>
                    <span className="text-white/80">Network Hub</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
