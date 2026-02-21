/**
 * Coastal Premium — Design Token Constants
 * Mirrors CSS variables for use in JS/TS (Framer Motion, dynamic styling).
 */

export const colors = {
  background: {
    page: "#F5F0E8",
    card: "#FFFFFF",
    elevated: "#FAF8F4",
    nav: "rgba(255, 255, 255, 0.85)",
  },

  accent: {
    gold: "#C8872E",       // Sunset Gold — primary CTAs
    goldHover: "#B5771F",  // Darker gold on hover
    seafoam: "#2A9D8F",    // Seafoam — secondary accent
  },

  text: {
    primary: "#1B3A4B",    // Ocean Deep — headings
    body: "#2D3748",       // Ink — body text
    muted: "#7A7062",      // Driftwood — captions
    light: "#4A5568",      // Slate — secondary text
    inverse: "#FFFFFF",    // White — on dark backgrounds
  },

  border: {
    default: "#E2DDD5",    // Fog
    light: "#EDE9E1",      // Mist
  },

  glass: {
    bg: "rgba(255, 255, 255, 0.7)",
    bgHover: "rgba(255, 255, 255, 0.85)",
    border: "rgba(27, 58, 75, 0.08)",
    borderHover: "rgba(27, 58, 75, 0.15)",
  },

  sectors: {
    financial: {
      primary: "#C8872E",
      secondary: "#E8C87A",
      glow: "rgba(200, 135, 46, 0.15)",
      label: "Financial Advisory",
      metaphor: "The Lighthouse",
    },
    hr: {
      primary: "#2A9D8F",
      secondary: "#7ECEC4",
      glow: "rgba(42, 157, 143, 0.15)",
      label: "Human Capital",
      metaphor: "The Harbor",
    },
    tech: {
      primary: "#3B82C4",
      secondary: "#7BB3E0",
      glow: "rgba(59, 130, 196, 0.15)",
      label: "Technology & Innovation",
      metaphor: "The Observatory",
    },
    events: {
      primary: "#D4763C",
      secondary: "#E8A87C",
      glow: "rgba(212, 118, 60, 0.15)",
      label: "Events & Experiences",
      metaphor: "The Compass",
    },
    management: {
      primary: "#1B3A4B",
      secondary: "#4A7A8C",
      glow: "rgba(27, 58, 75, 0.12)",
      label: "Strategic Management",
      metaphor: "The Helm",
    },
    it: {
      primary: "#6366F1",
      secondary: "#818CF8",
      glow: "rgba(99,102,241,0.15)",
      label: "IT Services",
      metaphor: "The Forge",
    },
  },
} as const;

export const timing = {
  fast: 0.18,
  base: 0.3,
  slow: 0.6,
  glacial: 1.2,
  easeOutExpo: [0.16, 1, 0.3, 1] as [number, number, number, number],
  easeInOut: [0.4, 0, 0.2, 1] as [number, number, number, number],
} as const;

export type SectorKey = keyof typeof colors.sectors;
