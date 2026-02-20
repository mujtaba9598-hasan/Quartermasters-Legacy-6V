"use client";

import { motion } from "framer-motion";
import { scrollViewport } from "@/lib/animations";

export function FlowConnector() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={scrollViewport}
      transition={{ duration: 0.8 }}
      className="flex justify-center py-4"
    >
      <svg
        width="2"
        height="48"
        viewBox="0 0 2 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.line
          x1="1"
          y1="0"
          x2="1"
          y2="48"
          stroke="var(--color-gold)"
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0.2 }}
          whileInView={{ pathLength: 1, opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
    </motion.div>
  );
}
