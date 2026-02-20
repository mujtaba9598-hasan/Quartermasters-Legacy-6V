"use client";

import { motion } from "framer-motion";

interface TextShimmerProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
}

export function TextShimmer({
  children,
  className = "",
  as: Tag = "span",
}: TextShimmerProps) {
  return (
    <Tag className={`relative inline-block ${className}`}>
      <span style={{ opacity: 0 }}>{children}</span>
      <motion.span
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(90deg, var(--text-primary) 0%, var(--color-gold) 50%, var(--text-primary) 100%)",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        initial={{ backgroundPosition: "200% 0" }}
        whileInView={{ backgroundPosition: "-200% 0" }}
        transition={{ duration: 2.4, ease: "easeInOut" }}
        viewport={{ once: true, amount: 0.5 }}
      >
        {children}
      </motion.span>
    </Tag>
  );
}
