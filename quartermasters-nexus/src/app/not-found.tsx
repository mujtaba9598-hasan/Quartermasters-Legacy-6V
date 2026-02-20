"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { QuartermasterLogo } from "@/components/icons/QuartermasterLogo";

export default function NotFound() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-6"
      style={{ background: "var(--bg-page)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center"
      >
        <QuartermasterLogo size={56} variant="icon" className="mx-auto mb-8" />

        <h1
          className="mb-2 text-7xl font-bold tracking-tighter"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--color-gold)",
          }}
        >
          404
        </h1>
        <p
          className="mb-2 text-lg font-medium"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Page Not Found
        </p>
        <p
          className="mb-10 max-w-sm text-sm leading-relaxed"
          style={{ color: "var(--text-light)" }}
        >
          The route you requested does not exist within our operational
          framework.
        </p>

        <Link
          href="/"
          className="btn-glow-line inline-block rounded-lg px-8 py-3.5 text-sm font-semibold"
          style={{
            fontFamily: "var(--font-heading)",
            background: "var(--color-gold)",
            color: "var(--color-white)",
            letterSpacing: "0.02em",
          }}
        >
          Return to Headquarters
        </Link>
      </motion.div>
    </div>
  );
}
