"use client";

import { motion } from "framer-motion";

/**
 * Financial Advisory — "Lighthouse" glow effect.
 * Warm gold border and shadow on hover.
 */
export function VaultEffect({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="glass rounded-xl p-6"
      style={{
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "transparent",
      }}
      whileHover={{
        borderColor: "var(--sector-financial)",
        boxShadow: "0 4px 30px rgba(200, 135, 46, 0.15), inset 0 0 20px rgba(200, 135, 46, 0.03)",
      }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Human Capital — "Breathing" pulse effect.
 * Soft seafoam glow that pulses.
 */
export function BreathingEffect({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="glass rounded-2xl p-6"
      style={{
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "transparent",
        borderRadius: "1rem",
      }}
      whileHover={{
        borderColor: "var(--sector-hr)",
        boxShadow: "0 4px 30px rgba(42, 157, 143, 0.15)",
      }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Tech — "Focus" effect.
 * Clean blue border with subtle lift.
 */
export function GlitchEffect({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="glass rounded-xl p-6"
      style={{
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "transparent",
      }}
      whileHover={{
        borderColor: "var(--sector-tech)",
        boxShadow: "0 4px 25px rgba(59, 130, 196, 0.15)",
        y: -2,
      }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Events — "Ripple" effect.
 * Expanding ring from center on hover.
 */
export function RippleEffect({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="glass relative overflow-hidden rounded-xl p-6 group"
      style={{
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "transparent",
      }}
      whileHover={{
        borderColor: "var(--sector-events)",
        boxShadow: "0 4px 25px rgba(212, 118, 60, 0.12)",
      }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
      >
        <motion.div
          className="absolute rounded-full"
          style={{
            border: "1px solid var(--sector-events)",
            width: 40,
            height: 40,
          }}
          animate={{
            width: [40, 200],
            height: [40, 200],
            opacity: [0.4, 0],
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

/**
 * Management — "Panoramic" effect.
 * Slight scale-down revealing broader perspective.
 */
export function PanoramicEffect({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="glass rounded-xl p-6"
      style={{
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "transparent",
      }}
      whileHover={{
        scale: 0.97,
        borderColor: "var(--sector-mgmt)",
        boxShadow: "0 4px 40px rgba(27, 58, 75, 0.1)",
      }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
