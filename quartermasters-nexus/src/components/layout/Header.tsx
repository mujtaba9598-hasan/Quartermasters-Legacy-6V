"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { QuartermasterLogo } from "@/components/icons/QuartermasterLogo";
import { playTick, playClick } from "@/lib/sounds";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className="glass"
        style={{ borderTop: "none", borderLeft: "none", borderRight: "none" }}
      >
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          {/* Brand Block (Left Aligned) */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3">
              <QuartermasterLogo size={40} variant="icon" />
              <span
                className="text-lg font-medium tracking-wide leading-tight whitespace-nowrap"
                style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
              >
                Quartermasters
              </span>
            </Link>
          </div>

          {/* Right Side (Desktop Nav + Mobile Toggle) */}
          <div className="flex flex-1 items-center justify-end gap-4">

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={playTick}
                  className="text-sm font-medium transition-colors text-white/50 hover:text-white/90"
                  style={{
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {link.label}
                </Link>
              ))}

              {/* CTA */}
              <Link
                href="/contact"
                onClick={playClick}
                className="btn-glow-line rounded-lg px-5 py-2 text-sm font-semibold hover:bg-opacity-90 transition-all duration-300"
                style={{
                  fontFamily: "var(--font-body)",
                  background: "var(--color-gold)",
                  color: "var(--color-white)",
                }}
              >
                Get Started
              </Link>
            </nav>

            {/* Mobile Toggle */}
            <button
              className="relative z-10 md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ color: "var(--text-primary)" }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.36, ease }}
              className="fixed inset-0 top-[72px] z-40 flex flex-col p-6 md:hidden"
              style={{ background: "rgba(0, 33, 71, 0.97)", backdropFilter: "blur(20px)" }}
            >
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => { playTick(); setMobileOpen(false); }}
                    className="rounded-lg px-4 py-3 text-lg font-medium transition-colors"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {link.label}
                  </Link>
                ))}



                <div className="mt-6">
                  <Link
                    href="/contact"
                    onClick={() => { playClick(); setMobileOpen(false); }}
                    className="btn-glow-line block w-full rounded-lg py-3 text-center text-sm font-semibold"
                    style={{
                      fontFamily: "var(--font-body)",
                      background: "var(--color-gold)",
                      color: "var(--color-white)",
                    }}
                  >
                    Get Started
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
