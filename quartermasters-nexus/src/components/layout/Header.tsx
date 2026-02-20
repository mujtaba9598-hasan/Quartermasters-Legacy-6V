"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { QuartermasterLogo } from "@/components/icons/QuartermasterLogo";
import { playTick, playClick } from "@/lib/sounds";

const serviceArms = [
  {
    label: "Financial Advisory",
    href: "/financial-advisory",
    accent: "var(--sector-financial)",
    icon: "☀",
  },
  {
    label: "Human Capital",
    href: "/human-capital",
    accent: "var(--sector-hr)",
    icon: "⚓",
  },
  {
    label: "Technology & Innovation",
    href: "/tech-rnd",
    accent: "var(--sector-tech)",
    icon: "◎",
  },
  {
    label: "Events & Experiences",
    href: "/event-logistics",
    accent: "var(--sector-events)",
    icon: "◈",
  },
  {
    label: "Strategic Management",
    href: "/management",
    accent: "var(--sector-mgmt)",
    icon: "◇",
  },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const [servicesOpen, setServicesOpen] = useState(false);
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
                [BRAND]
              </span>
            </Link>
          </div>

          {/* Right Side (Desktop Nav + Mobile Toggle) */}
          <div className="flex flex-1 items-center justify-end gap-4">

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-8 md:flex">
              {navLinks
                .filter((link) => link.label !== "Contact")
                .map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={playTick}
                    className="text-sm font-medium transition-colors"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--text-muted)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--text-primary)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--text-muted)")
                    }
                  >
                    {link.label}
                  </Link>
                ))}

              {/* Services Dropdown Trigger */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className="text-sm font-medium transition-colors"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: servicesOpen
                      ? "var(--color-gold)"
                      : "var(--text-muted)",
                  }}
                >
                  Services
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.92, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.92, y: 8 }}
                      transition={{ duration: 0.36, ease }}
                      className="glass absolute top-full right-0 mt-3 w-80 rounded-xl p-4"
                      style={{ transformOrigin: "top center" }}
                    >
                      <div className="grid grid-cols-2 gap-2">
                        {serviceArms.map((arm, i) => (
                          <motion.div
                            key={arm.href}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: i * 0.06,
                              duration: 0.3,
                              ease,
                            }}
                          >
                            <Link
                              href={arm.href}
                              onClick={playTick}
                              className="glass-hover group flex items-center gap-3 rounded-lg p-3 transition-all"
                              style={{ border: "1px solid transparent" }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = arm.accent;
                                e.currentTarget.style.boxShadow = `0 4px 20px ${arm.accent}22`;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "transparent";
                                e.currentTarget.style.boxShadow = "none";
                              }}
                            >
                              <span
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-lg"
                                style={{
                                  background: "var(--glass-bg)",
                                  color: arm.accent,
                                }}
                              >
                                {arm.icon}
                              </span>
                              <span
                                className="text-sm font-medium"
                                style={{
                                  fontFamily: "var(--font-body)",
                                  color: "var(--text-body)",
                                }}
                              >
                                {arm.label}
                              </span>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/contact"
                onClick={playTick}
                className="text-sm font-medium transition-colors"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--text-muted)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--text-primary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-muted)")
                }
              >
                Contact
              </Link>

              {/* CTA */}
              <Link
                href="/contact"
                onClick={playClick}
                className="btn-glow-line rounded-lg px-5 py-2 text-sm font-semibold"
                style={{
                  fontFamily: "var(--font-body)",
                  background: "var(--color-gold)",
                  color: "var(--color-white)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--color-gold-hover)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "var(--color-gold)")
                }
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
              style={{ background: "rgba(255, 255, 255, 0.97)", backdropFilter: "blur(20px)" }}
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

                <div
                  className="my-3"
                  style={{
                    height: 1,
                    background: "var(--color-fog)",
                  }}
                />

                <p
                  className="px-4 pb-2 text-xs font-semibold uppercase tracking-widest"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-gold)",
                  }}
                >
                  Services
                </p>

                {serviceArms.map((arm) => (
                  <Link
                    key={arm.href}
                    href={arm.href}
                    onClick={() => { playTick(); setMobileOpen(false); }}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 transition-colors"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <span style={{ color: arm.accent }}>{arm.icon}</span>
                    <span
                      className="text-base font-medium"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {arm.label}
                    </span>
                  </Link>
                ))}

                <div className="mt-6">
                  <Link
                    href="/contact"
                    onClick={() => { playClick(); setMobileOpen(false); }}
                    className="block w-full rounded-lg py-3 text-center text-sm font-semibold"
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
