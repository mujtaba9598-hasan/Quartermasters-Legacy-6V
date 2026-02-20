/**
 * Framer Motion animation variants — "Executive Lounge" style.
 * All timings are 20% slower than standard for premium weight.
 * Motion occurs ONLY on user interaction (hover/click) or scroll-triggered entrance.
 */

import type { Variants } from "framer-motion";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Fade up on scroll into view */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease },
  },
};

/** Fade in from left */
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.72, ease },
  },
};

/** Fade in from right */
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.72, ease },
  },
};

/** Scale up from center */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease },
  },
};

/** Stagger children container */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

/** Stagger item (pair with staggerContainer) */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

/** Glass card hover lift effect */
export const cardHover = {
  rest: {
    y: 0,
    boxShadow: "0 0 0 rgba(0,0,0,0)",
    transition: { duration: 0.36, ease },
  },
  hover: {
    y: -6,
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
    transition: { duration: 0.36, ease },
  },
};

/** Glow pulse for sector hexagons on hover */
export const glowPulse = (color: string) => ({
  rest: {
    boxShadow: `0 0 0px ${color}`,
    transition: { duration: 0.36, ease },
  },
  hover: {
    boxShadow: `0 0 30px ${color}`,
    transition: { duration: 0.36, ease },
  },
});

/** Viewport trigger settings for scroll animations */
export const scrollViewport = {
  once: true,
  amount: 0.2 as const,
  margin: "-50px" as const,
};
