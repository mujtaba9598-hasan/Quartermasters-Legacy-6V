# Frontend Lead Memory

## Initial State — 2026-02-12
- Homepage uses "use client" — entire page is client-rendered. Must split into Server + Client islands.
- Components that MUST stay client: HeroSection, BentoGrid, PhaseGate, GlobeSection, SearchBar, Testimonials, CTABanner, FlowConnector, HexLoader (all use Framer Motion or Three.js)
- Components that could be server: Header (static parts), Footer (static parts)
- Design tokens in both CSS (globals.css) and JS (design-tokens.ts) — keep in sync
- Lenis smooth scroll wraps entire page — consider if this forces client rendering
