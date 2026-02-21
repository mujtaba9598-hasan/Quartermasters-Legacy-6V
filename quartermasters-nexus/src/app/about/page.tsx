"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  staggerContainer,
  staggerItem,
  fadeInUp,
  scrollViewport,
} from "@/lib/animations";
import ClickSpark from "@/components/ui/ClickSpark";

const milestones = [
  {
    label: "Licensed Activities",
    value: "6",
    detail: "Banking, HR, Management, Events, Tech Education",
  },
  {
    label: "Location",
    value: "UAE",
    detail: "United Arab Emirates",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="max-w-3xl"
            >
              <motion.p variants={staggerItem} className="text-overline mb-4">
                About Quartermasters
              </motion.p>
              <motion.h1 variants={staggerItem} className="heading-1 mb-6">
                Built on Regulated Authority.
                <br />
                <span style={{ color: "var(--text-muted)" }}>
                  Driven by Strategic Precision.
                </span>
              </motion.h1>
              <motion.p
                variants={staggerItem}
                className="max-w-2xl text-lg leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                operating across six integrated verticals: Banking Services
                Consultancy, Human Resources Consultancy, Management Consultancies,
                Organization & Event Management, and Consulting & R&D in
                Technology Education. We deliver integrated advisory that connects
                capital, talent, and logistics into one coherent operating model.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Key Figures */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={staggerContainer}
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              {milestones.map((m) => (
                <motion.div
                  key={m.label}
                  variants={staggerItem}
                  className="glass card-hover-glow rounded-2xl p-10 text-center"
                >
                  <p
                    className="mb-4 text-5xl font-bold"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--color-gold)",
                    }}
                  >
                    {m.value}
                  </p>
                  <p
                    className="mb-3 text-lg font-semibold"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {m.label}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-light)" }}
                  >
                    {m.detail}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Leadership (SANITIZED) */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={scrollViewport}
              className="text-center text-lg italic"
              style={{ color: "var(--text-muted)" }}
            >
              Led by experienced professionals across six licensed verticals.
            </motion.p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeInUp}
              className="glass rounded-2xl p-12 text-center"
              style={{
                borderColor: "var(--color-gold)",
                borderWidth: 1,
                borderStyle: "solid",
              }}
            >
              <h2 className="heading-3 mb-4">
                Ready to Work With Us?
              </h2>
              <p
                className="mb-8 text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                Schedule a confidential consultation with our leadership team.
              </p>
              <ClickSpark sparkColor="#C8872E">
                <a
                  href="/contact"
                  className="btn-glow-line inline-block rounded-lg px-10 py-4 text-sm font-semibold"
                  style={{
                    fontFamily: "var(--font-heading)",
                    background: "var(--color-gold)",
                    color: "var(--color-white)",
                  }}
                >
                  Request Consultation
                </a>
              </ClickSpark>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
