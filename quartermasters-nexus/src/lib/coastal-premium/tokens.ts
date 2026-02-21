/**
 * Coastal Premium — Design Token System
 * Light mode, ocean-inspired, Arabian coastal aesthetic.
 * DM Serif Display (headings) + DM Sans (body).
 */

// ─── Core Palette ───────────────────────────────────────────
export const palette = {
  /** Ocean deep — primary brand color, used for headings & nav */
  ocean: "#1B3A4B",
  /** Warm sand — page backgrounds, card surfaces */
  sand: "#F5F0E8",
  /** Sunset gold — CTAs, accents, hover states */
  gold: "#C8872E",
  /** Seafoam — secondary accent, links, success states */
  seafoam: "#2A9D8F",
  /** Pure white — card backgrounds, elevated surfaces */
  white: "#FFFFFF",
  /** Soft cream — subtle background variation */
  cream: "#FAF8F4",
  /** Driftwood — muted text, captions */
  driftwood: "#7A7062",
  /** Slate — secondary text */
  slate: "#4A5568",
  /** Deep slate — body text */
  ink: "#2D3748",
  /** Fog — borders, dividers */
  fog: "#E2DDD5",
  /** Light fog — subtle borders */
  mist: "#EDE9E1",
} as const;

// ─── Semantic Colors ────────────────────────────────────────
export const colors = {
  background: {
    page: palette.sand,
    card: palette.white,
    elevated: palette.cream,
    nav: "rgba(255, 255, 255, 0.85)",
  },

  text: {
    primary: palette.ocean,
    body: palette.ink,
    muted: palette.driftwood,
    light: palette.slate,
    inverse: palette.white,
  },

  accent: {
    primary: palette.gold,
    primaryHover: "#B5771F",
    secondary: palette.seafoam,
    secondaryHover: "#238B7F",
  },

  border: {
    default: palette.fog,
    light: palette.mist,
    accent: palette.gold,
  },

  glass: {
    bg: "rgba(255, 255, 255, 0.7)",
    bgHover: "rgba(255, 255, 255, 0.85)",
    border: "rgba(27, 58, 75, 0.08)",
    borderHover: "rgba(27, 58, 75, 0.15)",
  },

  // Sector accents — lighter, coastal-appropriate versions
  sectors: {
    financial: {
      primary: "#C8872E",    // Sunset Gold
      secondary: "#E8C87A",  // Sand Gold
      glow: "rgba(200, 135, 46, 0.15)",
      label: "Financial Advisory",
      metaphor: "The Lighthouse",
    },
    hr: {
      primary: "#2A9D8F",    // Seafoam
      secondary: "#7ECEC4",  // Light Seafoam
      glow: "rgba(42, 157, 143, 0.15)",
      label: "Human Capital",
      metaphor: "The Harbor",
    },
    tech: {
      primary: "#3B82C4",    // Ocean Blue
      secondary: "#7BB3E0",  // Sky Blue
      glow: "rgba(59, 130, 196, 0.15)",
      label: "Technology & Innovation",
      metaphor: "The Observatory",
    },
    events: {
      primary: "#D4763C",    // Coral
      secondary: "#E8A87C",  // Light Coral
      glow: "rgba(212, 118, 60, 0.15)",
      label: "Events & Experiences",
      metaphor: "The Compass",
    },
    management: {
      primary: "#1B3A4B",    // Ocean Deep
      secondary: "#4A7A8C",  // Tidal
      glow: "rgba(27, 58, 75, 0.12)",
      label: "Strategic Management",
      metaphor: "The Helm",
    },
  },
} as const;

// ─── Typography ─────────────────────────────────────────────
export const typography = {
  heading: "var(--font-dm-serif), Georgia, 'Times New Roman', serif",
  body: "var(--font-dm-sans), system-ui, -apple-system, sans-serif",
  scale: {
    display: "clamp(3rem, 5vw, 4.5rem)",
    h1: "clamp(2.25rem, 4vw, 3.5rem)",
    h2: "clamp(1.75rem, 3vw, 2.5rem)",
    h3: "clamp(1.375rem, 2.5vw, 1.875rem)",
    h4: "clamp(1.125rem, 2vw, 1.5rem)",
    h5: "1.125rem",
    h6: "1rem",
    body: "1rem",
    bodyLg: "1.125rem",
    caption: "0.875rem",
    overline: "0.75rem",
  },
} as const;

// ─── Animation Timing ───────────────────────────────────────
export const timing = {
  fast: 0.18,
  base: 0.3,
  slow: 0.6,
  glacial: 1.2,
  easeOutExpo: [0.16, 1, 0.3, 1] as [number, number, number, number],
  easeInOut: [0.4, 0, 0.2, 1] as [number, number, number, number],
} as const;

// ─── Spacing ────────────────────────────────────────────────
export const spacing = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
  "3xl": "4rem",
  "4xl": "6rem",
} as const;

// ─── Border Radius ──────────────────────────────────────────
export const radius = {
  sm: "0.375rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.5rem",
  full: "9999px",
} as const;

// ─── Type Exports ───────────────────────────────────────────
export type SectorKey = keyof typeof colors.sectors;
export type PaletteKey = keyof typeof palette;
