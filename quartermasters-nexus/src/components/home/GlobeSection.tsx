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

              {/* 4-Region Legend */}
              <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
                {/* Americas (HQ) */}
                <div className="glass rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#60A5FA]"></span>
                    <span className="text-sm font-semibold text-white">Americas</span>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed">
                    &bull; Los Angeles <span className="text-[#C15A2C]">★ HQ</span><br />
                    &bull; New York &bull; Chicago<br />
                    &bull; San Francisco<br />
                    <span className="text-white/40 italic">+ 6 more</span>
                  </p>
                </div>

                {/* Europe */}
                <div className="glass rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#A78BFA]"></span>
                    <span className="text-sm font-semibold text-white">Europe</span>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed">
                    &bull; London &bull; Zurich<br />
                    &bull; Paris &bull; Berlin<br />
                    <span className="text-white/40 italic">+ 6 more</span>
                  </p>
                </div>

                {/* Asia-Pacific */}
                <div className="glass rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#34D399]"></span>
                    <span className="text-sm font-semibold text-white">Asia-Pacific</span>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed">
                    &bull; Singapore &bull; Tokyo<br />
                    &bull; Sydney &bull; Seoul<br />
                    <span className="text-white/40 italic">+ 5 more</span>
                  </p>
                </div>
              </motion.div>

              {/* Stats Row */}
              <motion.div variants={staggerItem} className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-2xl font-bold text-[#C15A2C]" style={{ fontFamily: "var(--font-heading)" }}>3</div>
                  <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Continents</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#C15A2C]" style={{ fontFamily: "var(--font-heading)" }}>7</div>
                  <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Strategic Hubs</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#C15A2C]" style={{ fontFamily: "var(--font-heading)" }}>30+</div>
                  <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Connected Cities</div>
                </div>
              </motion.div>
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
                <div className="w-full aspect-square max-w-lg mx-auto relative cursor-pointer">
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
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
