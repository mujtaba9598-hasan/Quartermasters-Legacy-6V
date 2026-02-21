"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, ArrowLeft } from "lucide-react";
import { QuartermasterLogo } from "@/components/icons/QuartermasterLogo";
import ClickSpark from "@/components/ui/ClickSpark";

export default function PortalPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      className="flex min-h-screen items-center justify-center px-6"
      style={{ background: "var(--bg-page)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        {/* Back link */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-xs transition-colors"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--text-light)",
          }}
        >
          <ArrowLeft size={14} />
          Back to Headquarters
        </Link>

        {/* Card */}
        <div
          className="glass rounded-xl p-8 md:p-10"
          style={{
            borderColor: "var(--glass-border)",
            borderWidth: 1,
            borderStyle: "solid",
          }}
        >
          <div className="mb-8 text-center">
            <QuartermasterLogo size={44} variant="icon" className="mx-auto mb-4" />
            <h1
              className="mb-1 text-xl font-semibold"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Client Portal
            </h1>
            <p
              className="text-xs"
              style={{ color: "var(--text-light)" }}
            >
              Secure access for authorized clients
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="space-y-5"
          >
            <div>
              <label
                htmlFor="portal-email"
                className="mb-2 block text-xs font-medium uppercase tracking-widest"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--text-light)",
                }}
              >
                Email
              </label>
              <input
                id="portal-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border bg-transparent px-4 py-3 text-sm outline-none transition-colors"
                style={{
                  borderColor: "var(--glass-border)",
                  color: "var(--text-primary)",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "var(--color-gold)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "var(--glass-border)")
                }
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="portal-password"
                className="mb-2 block text-xs font-medium uppercase tracking-widest"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--text-light)",
                }}
              >
                Password
              </label>
              <input
                id="portal-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border bg-transparent px-4 py-3 text-sm outline-none transition-colors"
                style={{
                  borderColor: "var(--glass-border)",
                  color: "var(--text-primary)",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "var(--color-gold)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "var(--glass-border)")
                }
                placeholder="Enter password"
              />
            </div>

            <ClickSpark sparkColor="#C8872E">
              <button
                type="submit"
                className="btn-glow-line flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold transition-all"
                style={{
                  fontFamily: "var(--font-heading)",
                  background: "var(--color-gold)",
                  color: "var(--color-white)",
                  letterSpacing: "0.02em",
                }}
              >
                <Lock size={14} />
                Sign In
              </button>
            </ClickSpark>
          </form>

          {/* Coming Soon notice */}
          <div
            className="mt-6 rounded-lg p-4 text-center"
            style={{ background: "rgba(193, 90, 44, 0.06)" }}
          >
            <p
              className="text-xs font-medium"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-gold)",
              }}
            >
              Portal Launching Soon
            </p>
            <p
              className="mt-1 text-xs"
              style={{ color: "var(--text-light)" }}
            >
              Client portal access is currently being configured. Contact us
              directly for project updates.
            </p>
          </div>

          <p
            className="mt-6 text-center text-xs"
            style={{ color: "var(--text-light)", opacity: 0.7 }}
          >
            Quartermasters
          </p>
        </div>
      </motion.div>
    </div>
  );
}
