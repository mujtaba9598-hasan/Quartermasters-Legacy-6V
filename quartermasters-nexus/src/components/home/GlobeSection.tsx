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
              <motion.h2 variants={staggerItem} className="heading-2 mb-6">
                California Based.
                <br />
                <span style={{ color: "var(--text-muted)" }}>
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

            {/* Globe — lazy load when in viewport */}
            <motion.div
              variants={staggerItem}
              onViewportEnter={() => setShouldLoad(true)}
              viewport={{ once: true, margin: "200px" }}
            >
              {shouldLoad ? (
                <Globe className="aspect-square w-full max-w-lg mx-auto" />
              ) : (
                <div className="flex aspect-square w-full max-w-lg items-center justify-center rounded-full mx-auto"
                  style={{ border: "1px solid var(--glass-border)" }}>
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
        </motion.div>
      </div>
    </section>
  );
}
