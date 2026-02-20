"use client";

import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  accent?: string;
  glow?: string;
  padding?: string;
}

export function GlassCard({
  children,
  className = "",
  accent,
  glow,
  padding = "p-6",
}: GlassCardProps) {
  return (
    <motion.div
      className={`glass glass-hover rounded-xl ${padding} ${className}`}
      style={{
        borderColor: "transparent",
        borderWidth: 1,
        borderStyle: "solid",
      }}
      whileHover={{
        y: -6,
        boxShadow: glow
          ? `0 20px 50px ${glow}`
          : "0 20px 40px rgba(27, 58, 75, 0.1)",
      }}
      transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={(e) => {
        if (accent) {
          (e.currentTarget as HTMLElement).style.borderColor = accent;
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "transparent";
      }}
    >
      {children}
    </motion.div>
  );
}
