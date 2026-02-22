"use client";

import React from "react";
import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import ServiceHeroVisual from "@/components/ui/ServiceHeroVisual";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  scrollViewport,
} from "@/lib/animations";
import { useSector } from "@/lib/SectorContext";
import type { SectorKey } from "@/lib/design-tokens";
import ClickSpark from "@/components/ui/ClickSpark";

interface ServiceCapability {
  title: string;
  description: string;
}

interface ServicePageProps {
  overline: string;
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  glow: string;
  icon: LucideIcon;
  metaphor: string;
  capabilities: ServiceCapability[];
  disclaimer?: string;
  CardWrapper?: React.ComponentType<{ children: React.ReactNode }>;
  backgroundPattern?: React.ReactNode;
  sectorKey?: SectorKey;
  visualType?: 'financial' | 'management' | 'tech' | 'hr' | 'events' | 'it';
}

export function ServicePageLayout({
  overline,
  title,
  subtitle,
  description,
  accent,
  glow,
  icon: Icon,
  metaphor,
  capabilities,
  disclaimer,
  CardWrapper,
  backgroundPattern,
  sectorKey,
  visualType,
}: ServicePageProps) {
  const { setActiveSector } = useSector();

  React.useEffect(() => {
    if (sectorKey) setActiveSector(sectorKey);
    return () => setActiveSector(null);
  }, [sectorKey, setActiveSector]);

  const Wrapper = CardWrapper ?? (({ children }: { children: React.ReactNode }) => (
    <motion.div
      className="glass glass-hover rounded-xl p-6 transition-all"
      style={{ borderColor: "transparent", borderWidth: 1, borderStyle: "solid" }}
      whileHover={{ y: -4, boxShadow: `0 16px 40px ${glow}` }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = accent; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "transparent"; }}
    >
      {children}
    </motion.div>
  ));

  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <section className="relative py-24">
          {backgroundPattern && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.03]">
              {backgroundPattern}
            </div>
          )}
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column: Text Content */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  variants={staggerItem}
                  className="mb-6 flex items-center gap-4"
                >
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-xl"
                    style={{ background: glow, color: accent }}
                  >
                    <Icon size={28} />
                  </div>
                  <span
                    className="text-xs font-medium uppercase tracking-widest"
                    style={{ fontFamily: "var(--font-body)", color: accent, opacity: 0.7 }}
                  >
                    {metaphor}
                  </span>
                </motion.div>

                <motion.p variants={staggerItem} className="text-overline mb-4" style={{ color: accent }}>
                  {overline}
                </motion.p>

                <motion.h1 variants={staggerItem} className="heading-1 mb-4">
                  {title}
                </motion.h1>

                <motion.p
                  variants={staggerItem}
                  className="heading-4 mb-6"
                  style={{ color: "var(--text-muted)" }}
                >
                  {subtitle}
                </motion.p>

                <motion.p
                  variants={staggerItem}
                  className="max-w-2xl text-base leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {description}
                </motion.p>

                {disclaimer && (
                  <motion.p
                    variants={staggerItem}
                    className="mt-6 text-xs"
                    style={{ color: "var(--text-light)", opacity: 0.7 }}
                  >
                    {disclaimer}
                  </motion.p>
                )}

                <motion.div variants={staggerItem} className="mt-10">
                  <ClickSpark sparkColor={accent}>
                    <a
                      href="/contact"
                      className="btn-glow-line inline-block rounded-lg px-8 py-3.5 text-sm font-semibold"
                      style={{
                        fontFamily: "var(--font-body)",
                        background: accent,
                        color: "var(--color-white)",
                      }}
                    >
                      Get Started
                    </a>
                  </ClickSpark>
                </motion.div>
              </motion.div>

              {/* Right Column: Animated Visual */}
              {visualType && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="hidden lg:flex items-center justify-center"
                >
                  <div className="w-full max-w-[500px] h-[350px] relative">
                    <div className="absolute inset-0 rounded-2xl" style={{ background: glow, filter: 'blur(40px)' }} />
                    <div className="relative w-full h-full flex items-center justify-center">
                      <ServiceHeroVisual type={visualType} accent={accent} />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={staggerContainer}
            >
              <motion.p variants={staggerItem} className="text-overline mb-4" style={{ color: accent }}>
                Capabilities
              </motion.p>
              <motion.h2 variants={staggerItem} className="heading-2 mb-12">
                What We Deliver.
              </motion.h2>

              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
              >
                {capabilities.map((cap, i) => (
                  <motion.div key={i} variants={staggerItem}>
                    <Wrapper>
                      <div
                        className="mb-4 flex h-8 w-8 items-center justify-center rounded-md text-sm font-bold"
                        style={{
                          fontFamily: "var(--font-body)",
                          background: glow,
                          color: accent,
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3 className="heading-4 mb-2">{cap.title}</h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {cap.description}
                      </p>
                    </Wrapper>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Band */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeInUp}
              className="glass rounded-2xl p-12 text-center"
              style={{ borderColor: accent, borderWidth: 1, borderStyle: "solid" }}
            >
              <h2 className="heading-3 mb-4">Ready to Begin?</h2>
              <p className="mb-8 text-sm" style={{ color: "var(--text-muted)" }}>
                Schedule a confidential consultation to discuss your requirements.
              </p>
              <ClickSpark sparkColor={accent}>
                <a
                  href="/contact"
                  className="btn-glow-line inline-block rounded-lg px-10 py-4 text-sm font-semibold"
                  style={{
                    fontFamily: "var(--font-body)",
                    background: accent,
                    color: "var(--color-white)",
                  }}
                >
                  Get Started
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
