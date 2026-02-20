"use client";

import { motion } from "framer-motion";
import { Target, Users, Calendar } from "lucide-react";
import {
  staggerContainer,
  staggerItem,
  scrollViewport,
} from "@/lib/animations";

/*
 * COMPLIANCE NOTE (S1-07)
 * ========================
 * This section uses a forward-looking "What to Expect" format that
 * communicates service value without fabricating endorsements.
 *
 * When real, verifiable client testimonials are available, they may be
 * added back provided each one:
 *   - Names a real person (with their written consent)
 *   - Identifies a real organisation
 *   - Reflects the person's genuine experience
 *   - Includes a "results may vary" disclaimer if specific metrics are cited
 */

const expectations = [
  {
    headline: "Regulatory Clarity",
    description:
      "We work alongside your compliance and legal teams to structure financial frameworks, reducing ambiguity and accelerating regulatory alignment.",
    sector: "Financial Advisory",
    icon: Target,
    accent: "var(--sector-financial)",
  },
  {
    headline: "Talent Pipeline Design",
    description:
      "Our human capital team partners with People Operations leaders to redesign recruitment workflows, competency mapping, and onboarding processes tailored to your scale.",
    sector: "Human Capital",
    icon: Users,
    accent: "var(--sector-hr)",
  },
  {
    headline: "End-to-End Event Delivery",
    description:
      "From venue logistics and stakeholder protocol to day-of execution, we manage every detail so your team can focus on the outcomes that matter.",
    sector: "Events & Experiences",
    icon: Calendar,
    accent: "var(--sector-events)",
  },
];

export function Testimonials() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={staggerContainer}
        >
          <motion.p variants={staggerItem} className="text-overline mb-4">
            What to Expect
          </motion.p>
          <motion.h2 variants={staggerItem} className="heading-2 mb-12">
            Built for Decision-Makers.
            <br />
            <span style={{ color: "var(--text-muted)" }}>
              Designed Around Results.
            </span>
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {expectations.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="glass glass-hover relative rounded-xl p-8"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Icon
                    size={24}
                    style={{ color: item.accent, opacity: 0.6 }}
                    className="mb-4"
                  />
                  <h3
                    className="mb-3 text-base font-semibold"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {item.headline}
                  </h3>
                  <p
                    className="mb-6 text-sm leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {item.description}
                  </p>
                  <div
                    className="border-t pt-4"
                    style={{ borderColor: "var(--glass-border)" }}
                  >
                    <p
                      className="text-xs font-medium uppercase tracking-wider"
                      style={{ color: item.accent }}
                    >
                      {item.sector}
                    </p>
                  </div>
                  <div
                    className="absolute top-0 left-0 h-0.5 w-full rounded-t-xl"
                    style={{ background: item.accent, opacity: 0.3 }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
