"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  staggerContainer,
  staggerItem,
  scrollViewport,
} from "@/lib/animations";

const phases = [
  {
    step: "01",
    title: "Discovery",
    description: "Initial assessment and scope definition across all five verticals.",
    pill: "#Discovery",
  },
  {
    step: "02",
    title: "Strategy",
    description: "Research-driven strategy formulation with compliance mapping.",
    pill: "#Analysis",
  },
  {
    step: "03",
    title: "Execution",
    description: "Operational deployment with real-time progress tracking.",
    pill: "#Execution",
  },
  {
    step: "04",
    title: "Review",
    description: "Post-engagement assessment, optimization, and ongoing support.",
    pill: "#Optimization",
  },
];

export function PhaseGate() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="methodology" className="py-24" ref={containerRef}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={staggerContainer}
        >
          <motion.p variants={staggerItem} className="text-overline mb-4">
            Our Approach
          </motion.p>
          <motion.h2 variants={staggerItem} className="heading-2 mb-16">
            A Proven Process.
          </motion.h2>

          {/* Progress Line */}
          <div className="relative mb-16 hidden md:block">
            <div
              className="h-0.5 w-full rounded-full"
              style={{ background: "var(--color-fog)" }}
            />
            <motion.div
              className="absolute top-0 left-0 h-0.5 rounded-full"
              style={{
                width: lineWidth,
                background: "var(--color-gold)",
                boxShadow: "0 0 16px rgba(200, 135, 46, 0.25)",
              }}
            />

            <div className="absolute top-0 left-0 flex w-full -translate-y-1/2 justify-between">
              {phases.map((phase, i) => (
                <motion.div
                  key={phase.step}
                  className="flex h-4 w-4 items-center justify-center rounded-full"
                  style={{
                    background: "var(--bg-page)",
                    border: "2px solid var(--color-gold)",
                    boxShadow: "0 0 12px rgba(200, 135, 46, 0.2)",
                  }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    delay: i * 0.15 + 0.3,
                    duration: 0.36,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  viewport={{ once: true }}
                />
              ))}
            </div>
          </div>

          {/* Phase Cards */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 gap-6 md:grid-cols-4"
          >
            {phases.map((phase) => (
              <motion.div
                key={phase.step}
                variants={staggerItem}
                className="glass glass-hover rounded-xl p-6"
              >
                <p
                  className="mb-3 text-2xl font-bold"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--color-gold)",
                  }}
                >
                  {phase.step}
                </p>
                <h3
                  className="heading-4 mb-2"
                >
                  {phase.title}
                </h3>
                <p
                  className="mb-4 text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {phase.description}
                </p>
                <span
                  className="pill-tag text-xs"
                  style={{
                    borderColor: "var(--color-gold)",
                    color: "var(--color-gold)",
                  }}
                >
                  {phase.pill}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
