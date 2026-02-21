"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { TextShimmer } from "@/components/ui/TextShimmer";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Geometric Mesh Background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ opacity: 0.03 }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="hex-mesh"
              width="56"
              height="100"
              patternUnits="userSpaceOnUse"
              patternTransform="scale(2)"
            >
              <path
                d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100"
                fill="none"
                stroke="#1B3A4B"
                strokeWidth="0.5"
              />
              <path
                d="M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34"
                fill="none"
                stroke="#1B3A4B"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex-mesh)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-32">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-5xl text-center"
        >
          {/* Overline */}
          <motion.p variants={staggerItem} className="text-overline mb-6 mx-auto">
            Strategic Consulting &amp; Advisory
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={staggerItem}
            className="mb-8 flex flex-col items-center justify-center"
          >
            {/* 1. Hero Word - Dominant & Centered */}
            <span className="heading-display mb-4 block text-6xl md:text-8xl lg:text-9xl">
              <TextShimmer className="heading-display">Quartermasters</TextShimmer>
            </span>

            {/* 2. Subtitle - Smaller & Centered */}
            <span
              className="block max-w-3xl mx-auto text-xl md:text-2xl lg:text-3xl font-light tracking-wide leading-tight"
              style={{ color: "var(--text-body)" }}
            >
              Elevating businesses through{" "}
              <span style={{ color: "var(--color-gold)" }}>strategy</span>,{" "}
              <span style={{ color: "var(--color-seafoam)" }}>talent</span>, and{" "}
              <span style={{ color: "var(--text-primary)" }}>innovation</span>.
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={staggerItem}
            className="mb-10 mx-auto max-w-2xl text-lg leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            Premium consulting across Financial Advisory, Human Capital,
            Technology &amp; Innovation, Events &amp; Experiences, and Strategic
            Management. California-based, globally minded.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={staggerItem} className="flex flex-wrap items-center justify-center gap-4">
            <a href="#services" className="group">
              <span
                className="btn-glow-line group-hover:bg-opacity-90 transition-all duration-300 inline-block rounded-lg px-8 py-3.5 text-sm font-semibold"
                style={{
                  fontFamily: "var(--font-body)",
                  background: "var(--color-gold)",
                  color: "var(--color-white)",
                  letterSpacing: "0.02em",
                  "--active-glow": "rgba(200, 135, 46, 0.3)"
                } as React.CSSProperties}
              >
                Explore Services
              </span>
            </a>
            <a href="#methodology" className="group">
              <span
                className="btn-glow-line group-hover:bg-opacity-10 transition-all duration-300 inline-block rounded-lg px-8 py-3.5 text-sm font-semibold"
                style={{
                  fontFamily: "var(--font-body)",
                  background: "transparent",
                  color: "var(--text-primary)",
                  border: "1px solid var(--color-fog)",
                  "--active-glow": "rgba(27, 58, 75, 0.1)"
                } as React.CSSProperties}
              >
                Our Approach
              </span>
            </a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            variants={staggerItem}
            className="mt-16 flex flex-wrap items-center justify-center gap-6"
            style={{ borderTop: "1px solid var(--color-fog)", paddingTop: "1.5rem" }}
          >
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: "var(--color-seafoam)", boxShadow: "0 0 8px var(--color-seafoam)" }}
              />
              <span className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>
                6 Service Verticals
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="h-10 w-6 rounded-full"
          style={{ border: "1.5px solid var(--color-fog)" }}
        >
          <div
            className="mx-auto mt-2 h-2 w-1 rounded-full"
            style={{ background: "var(--color-gold)" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
