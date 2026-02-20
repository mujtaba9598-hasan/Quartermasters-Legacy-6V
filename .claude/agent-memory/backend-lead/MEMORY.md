# Backend Lead Memory

## Initial State — 2026-02-12
- No backend exists. Zero API routes.
- Contact form (src/app/contact/page.tsx, ~443 LOC) submits to local state only.
- Search bar (SearchBar.tsx) is UI-only with hardcoded suggestions.
- Client portal (portal/page.tsx) is a "Coming Soon" placeholder.
- Future stack: Supabase (pgvector, Auth, Storage), Claude API, Resend, Stripe, Cal.com
- Pricing engine must be deterministic TypeScript, NOT LLM-generated
