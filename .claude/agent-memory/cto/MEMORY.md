# CTO Memory

## Initial Audit — 2026-02-12
- Stack: Next.js 16.1.6, React 19, TypeScript strict, Tailwind v4, Framer Motion 12, Three.js/R3F, Lenis
- Design system: "Sovereign Nexus" — Deep Harbor + Burnt Copper
- Critical: Homepage (page.tsx) uses "use client" — kills SSR/SEO. Must convert to Server Components.
- All 42 source files use "use client" where interactive. JsonLd and layout are server-safe.
- No backend exists yet. Contact form, search, portal are UI-only shells.
