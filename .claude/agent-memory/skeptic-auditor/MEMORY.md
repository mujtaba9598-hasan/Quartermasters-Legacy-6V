# Skeptic Auditor - Persistent Memory

## Project: Quartermasters
- California-based consultancy targeting US enterprise/tech market
- Next.js 16.1.6 + React 19 + Three.js 0.182 + Framer Motion 12 + TailwindCSS v4
- Planned: Supabase, Claude API RAG, Stripe + PayTabs, Redis, cold email backend
- Entire homepage is `"use client"` -- zero SSR, no ISR, no SSG
- Three.js Globe component dynamically imported with `ssr: false` (good)
- 1200ms hardcoded loading spinner before content shows (bad for LCP)
- No error boundaries, WebGL fallback, or performance monitoring
- No privacy policy, cookie banner, or legal pages
- Testimonials unverifiable (anonymous, no real names/companies)
- SearchBar UI exists but has no backend -- purely cosmetic
- Contact form discards all submitted data
- Portal login does nothing

## Full Audit Completed: 2026-02-11
- VERDICT: RED -- Do Not Proceed (1x score 25, 5x score 20)
- See `audit-findings.md` for detailed risk register
- Top risks: No legal compliance (25), AI pricing hallucination (20), scraping legality (20), email blacklisting (20), FTC AI disclosure (20), zero tests (20)

## Regulatory Knowledge
- PDPL (Federal Decree-Law 45/2021): In effect since Jan 2022, executive regs STILL pending Feb 2026
- FTC AI Disclosure: Maine (Sep 2025), California SB 243 (Jan 2026), Colorado CAIA (Jun 2026). FTC chatbot inquiry Sep 2025
- CAN-SPAM: Applies to B2B. Physical address required, unsubscribe mandatory, $50k+ per violation
- CFAA: hiQ v. LinkedIn (2022) narrowed scope but no blanket scraping right

## Technical Patterns
- `"use client"` on page.tsx kills SSR/SEO -- common Next.js antipattern
- Three.js `antialias: true` degrades mobile performance significantly
- WebGL context loss must be handled explicitly -- no auto-recovery
- Empty `next.config.ts` = no security headers, no image optimization, no CSP
- Claude API is probabilistic -- pricing MUST have deterministic server-side validation
- Anthropic AUP: Unclear re autonomous pricing negotiation -- confirm before building
- Domain blacklisting is irreversible on business timescales (6-12mo recovery)
- "Iron Grip" naming creates adversarial perception if discovered
- LLMs cannot form legal intent -- AI "closing deals" creates voidable contracts
- Cascade failure pattern: hallucinated price -> contract dispute -> FTC action -> jurisdiction mess -> no kill switch
- Budget-based client segmentation can trigger disparate impact claims (CA Unruh Act)

## Key Precedents (Updated Feb 2026)
- FTC investigating Instacart Eversight AI pricing -- direct precedent for AI-driven pricing
- FTC reversed Rytr LLC order Dec 2025 -- lighter enforcement signaled but NOT blanket approval
- California SB 243 IN EFFECT Jan 1 2026 -- AI disclosure + private right of action $1000+
- Trump AI executive order Dec 11 2025 -- proposed federal preemption of state AI laws (uncertain)
