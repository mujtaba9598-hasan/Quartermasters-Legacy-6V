"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { staggerContainer, staggerItem } from "@/lib/animations";
import ClickSpark from "@/components/ui/ClickSpark";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20 bg-transparent">
      {/* Geometric Hex Mesh Background */}
      <div className="pointer-events-none absolute inset-0" style={{ opacity: 0.03 }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hex-mesh" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
              <path d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100" fill="none" stroke="#1B3A4B" strokeWidth="0.5" />
              <path d="M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34" fill="none" stroke="#1B3A4B" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex-mesh)" />
        </svg>
      </div>

      {/* Background Deep Copper Radial Glow */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C15A2C]/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 w-full py-12 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left Column: Copy & Actions */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start text-left"
          >
            {/* Pill Badge */}
            <motion.div variants={staggerItem} className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#C15A2C]/30 bg-[#C15A2C]/10 px-4 py-1.5 text-sm font-medium text-[#C15A2C] backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-[#C15A2C] animate-pulse" />
                Premium Strategic Consulting
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={staggerItem}
              className="mb-6 text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Strategic Consulting.<br className="hidden md:block" />
              <span style={{ color: "var(--color-gold)" }}>Global Execution.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={staggerItem}
              className="mb-10 max-w-lg text-lg sm:text-xl text-white/60 leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              California-based advisory across six integrated verticals. Financial strategy, human capital, technology, events, management, and IT services.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={staggerItem} className="flex flex-wrap items-center gap-4 mb-16">
              <ClickSpark sparkColor="#C15A2C">
                <Link
                  href="/services"
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#C15A2C] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(193,90,44,0.4)] transition-all hover:bg-[#A04A24] hover:shadow-[0_0_40px_rgba(193,90,44,0.6)]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Our Verticals <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </Link>
              </ClickSpark>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white/80 transition-colors hover:text-white"
              >
                Book a Consultation <span className="opacity-60">→</span>
              </Link>
            </motion.div>

            {/* Trust Badges -> Service Verticals */}
            <motion.div variants={staggerItem} className="w-full border-t border-white/10 pt-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40">
                Six Integrated Verticals
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <span className="pill-tag pill-tag--financial">#Financial</span>
                <span className="pill-tag pill-tag--hr">#HumanCapital</span>
                <span className="pill-tag pill-tag--tech">#Technology</span>
                <span className="pill-tag pill-tag--events">#Events</span>
                <span className="pill-tag pill-tag--mgmt">#Management</span>
                <span className="pill-tag pill-tag--it">#ITServices</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Tech Stack Constellation & Floating Tags */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end w-full"
          >

            {/* Constellation Container */}
            <div className="relative w-full max-w-[450px] aspect-square mx-auto lg:ml-auto lg:mr-0 z-10 overflow-visible">

              {/* Copper Glow Behind Constellation */}
              <div className="absolute inset-0 bg-[#C15A2C]/10 blur-[80px] rounded-full pointer-events-none" />

              {/* The SVG Network Lines & Pulses */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 450 450" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="copperGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Network Lines */}
                <g stroke="rgba(193, 90, 44, 0.3)" strokeWidth="1" fill="none">
                  {/* React -> Next.js */}
                  <path id="path-re-nx" d="M225,45 L360,90" />
                  {/* React -> TS */}
                  <path id="path-re-ts" d="M225,45 L405,225" />
                  {/* Next.js -> Tailwind */}
                  <path id="path-nx-tw" d="M360,90 L360,360" />
                  {/* TS -> Tailwind */}
                  <path id="path-ts-tw" d="M405,225 L360,360" />
                  {/* Tailwind -> Node */}
                  <path id="path-tw-no" d="M360,360 L225,405" />
                  {/* Node -> Cloud */}
                  <path id="path-no-cl" d="M225,405 L90,360" />
                  {/* Cloud -> AI */}
                  <path id="path-cl-ai" d="M90,360 L45,225" />
                  {/* AI -> DB */}
                  <path id="path-ai-db" d="M45,225 L90,90" />
                  {/* DB -> React */}
                  <path id="path-db-re" d="M90,90 L225,45" />
                  {/* Cross connections */}
                  <path id="path-db-no" d="M90,90 L225,405" />
                  <path id="path-ai-ts" d="M45,225 L405,225" />
                  <path id="path-cl-nx" d="M90,360 L360,90" />
                </g>

                {/* Animated Data Pulses */}
                <circle r="3" fill="#C15A2C" filter="url(#copperGlow)">
                  <animateMotion dur="3s" repeatCount="indefinite">
                    <mpath href="#path-re-nx" />
                  </animateMotion>
                </circle>
                <circle r="3" fill="#C15A2C" filter="url(#copperGlow)">
                  <animateMotion dur="4s" repeatCount="indefinite" begin="1s">
                    <mpath href="#path-nx-tw" />
                  </animateMotion>
                </circle>
                <circle r="3" fill="#C15A2C" filter="url(#copperGlow)">
                  <animateMotion dur="3.5s" repeatCount="indefinite" begin="0.5s">
                    <mpath href="#path-tw-no" />
                  </animateMotion>
                </circle>
                <circle r="3" fill="#C15A2C" filter="url(#copperGlow)">
                  <animateMotion dur="4.5s" repeatCount="indefinite" begin="2s">
                    <mpath href="#path-no-cl" />
                  </animateMotion>
                </circle>
                <circle r="3" fill="#C15A2C" filter="url(#copperGlow)">
                  <animateMotion dur="3s" repeatCount="indefinite" begin="1.5s">
                    <mpath href="#path-cl-ai" />
                  </animateMotion>
                </circle>
                <circle r="3" fill="#C15A2C" filter="url(#copperGlow)">
                  <animateMotion dur="5s" repeatCount="indefinite">
                    <mpath href="#path-db-re" />
                  </animateMotion>
                </circle>
                <circle r="3" fill="#C15A2C" filter="url(#copperGlow)">
                  <animateMotion dur="6s" repeatCount="indefinite" begin="1s">
                    <mpath href="#path-ai-ts" />
                  </animateMotion>
                </circle>
                <circle r="3" fill="#C15A2C" filter="url(#copperGlow)">
                  <animateMotion dur="5.5s" repeatCount="indefinite" begin="0.5s">
                    <mpath href="#path-db-no" />
                  </animateMotion>
                </circle>
              </svg>

              {/* HTML Nodes Overlay */}
              {/* 1. React */}
              <div
                className="group absolute top-[10%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white font-medium shadow-lg transition-all duration-200 hover:scale-115 hover:border-[#61DAFB]"
                style={{ animation: 'breathe 4s infinite ease-in-out' }}
              >
                <span className="group-hover:hidden">Re</span>
                <span className="hidden group-hover:block text-xs text-[#61DAFB]">React</span>
              </div>

              {/* 2. Next.js */}
              <div
                className="group absolute top-[20%] left-[80%] -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white font-medium shadow-lg transition-all duration-200 hover:scale-115 hover:border-white"
                style={{ animation: 'breathe 5s infinite ease-in-out 1s' }}
              >
                <span className="group-hover:hidden">Nx</span>
                <span className="hidden group-hover:block text-xs">Next.js</span>
              </div>

              {/* 3. TypeScript */}
              <div
                className="group absolute top-[50%] left-[90%] -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white font-medium shadow-lg transition-all duration-200 hover:scale-115 hover:border-[#3178C6]"
                style={{ animation: 'breathe 3.5s infinite ease-in-out 0.5s' }}
              >
                <span className="group-hover:hidden">TS</span>
                <span className="hidden group-hover:block text-[10px] text-[#3178C6]">TypeScript</span>
              </div>

              {/* 4. Tailwind */}
              <div
                className="group absolute top-[80%] left-[80%] -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white font-medium shadow-lg transition-all duration-200 hover:scale-115 hover:border-[#06B6D4]"
                style={{ animation: 'breathe 4.5s infinite ease-in-out 2s' }}
              >
                <span className="group-hover:hidden">Tw</span>
                <span className="hidden group-hover:block text-xs text-[#06B6D4]">Tailwind</span>
              </div>

              {/* 5. Node.js */}
              <div
                className="group absolute top-[90%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white font-medium shadow-lg transition-all duration-200 hover:scale-115 hover:border-[#339933]"
                style={{ animation: 'breathe 4s infinite ease-in-out 1.5s' }}
              >
                <span className="group-hover:hidden">No</span>
                <span className="hidden group-hover:block text-xs text-[#339933]">Node.js</span>
              </div>

              {/* 6. Cloud */}
              <div
                className="group absolute top-[80%] left-[20%] -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white font-medium shadow-lg transition-all duration-200 hover:scale-115 hover:border-[#FF6F00]"
                style={{ animation: 'breathe 5s infinite ease-in-out 0.5s' }}
              >
                <span className="group-hover:hidden">Cl</span>
                <span className="hidden group-hover:block text-xs text-[#FF6F00]">Cloud</span>
              </div>

              {/* 7. AI */}
              <div
                className="group absolute top-[50%] left-[10%] -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white font-medium shadow-lg transition-all duration-200 hover:scale-115 hover:border-[#C15A2C]"
                style={{ animation: 'breathe 3.5s infinite ease-in-out 1s' }}
              >
                <span className="group-hover:hidden">AI</span>
                <span className="hidden group-hover:block text-xs text-[#C15A2C]">AI/ML</span>
              </div>

              {/* 8. DB */}
              <div
                className="group absolute top-[20%] left-[20%] -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white font-medium shadow-lg transition-all duration-200 hover:scale-115 hover:border-[#336791]"
                style={{ animation: 'breathe 6s infinite ease-in-out 0s' }}
              >
                <span className="group-hover:hidden">DB</span>
                <span className="hidden group-hover:block text-xs text-[#336791]">Database</span>
              </div>

              {/* Floating Detail Tags */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-[10%] left-[-10%] z-30 hidden sm:flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md shadow-xl"
              >
                <div className="flex flex-col">
                  <span className="text-xs text-[#C15A2C] font-semibold tracking-wide uppercase">Advisory</span>
                  <span className="text-sm text-white font-medium">Six Verticals</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[10%] right-[-10%] z-30 hidden sm:flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-md shadow-xl"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#C15A2C]/20 text-[#C15A2C]">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </span>
                <div className="flex flex-col">
                  <span className="text-xs text-white/50 font-medium">Execution</span>
                  <span className="text-sm text-white font-semibold">Global Reach</span>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes breathe {
          0% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 0 rgba(193, 90, 44, 0); }
          50% { transform: translate(-50%, -50%) scale(1.05); box-shadow: 0 0 15px rgba(193, 90, 44, 0.2); }
          100% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 0 rgba(193, 90, 44, 0); }
        }
        .hover\\:scale-115:hover {
          transform: translate(-50%, -50%) scale(1.15) !important;
        }
      `}} />
    </section>
  );
}
