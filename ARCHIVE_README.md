# QUARTERMASTERS LEGACY ARCHIVE — 6-Vertical Consulting Platform

> **ARCHIVED**: 2026-02-25 | **Tag**: `v1.0-legacy-6-verticals`
> **Reason**: Company pivoted to pure Tech/AI services. This archive preserves the original 6-vertical consulting platform.
> **Active Development**: Continues at [Quarter_USA](https://github.com/mujtaba9598-hasan/Quarter_USA) (tech-only pivot)

---

## What This Is

This is a **complete, frozen snapshot** of the Quartermasters consulting website — a Next.js 16 application built across 10 sprints covering 6 consulting verticals. The company has since pivoted to tech/AI-only services. This archive exists so the original product can be resurrected or referenced at any time.

**DO NOT develop on this repo.** It is read-only archival.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.1.6 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4, Framer Motion 12, Lenis smooth scroll |
| 3D | Three.js / React Three Fiber / Drei |
| AI Chat | Claude API (Anthropic) + Vercel AI SDK v6 (streaming) |
| Database | Supabase + pgvector (RAG knowledge retrieval) |
| Cache | Upstash Redis (rate limiting + cache) |
| Email | Resend API |
| Booking | Cal.com integration |
| Payments | Stripe (code exists, not live) |
| Design System | "Sovereign Nexus" — Deep Harbor navy + Burnt Copper #C15A2C |

---

## Services (6 Verticals — as archived)

1. **Financial Advisory & Banking Services**
2. **Human Capital & Resource Management**
3. **Strategic Management Consulting**
4. **Technology & Innovation (R&D)**
5. **Organization & Event Management**
6. **IT Services (Software Dev & Web Apps)**

---

## Pages (21)

| Page | Route | Status |
|------|-------|--------|
| Homepage | `/` | Complete |
| About | `/about` | Complete |
| Contact | `/contact` | Complete |
| Services Hub | `/services` | Complete (GlassSurface grid + animated SVGs) |
| Financial Advisory | `/financial-advisory` | Complete |
| Human Capital | `/human-capital` | Complete |
| Management Consulting | `/management-consulting` | Complete |
| Technology & Innovation | `/technology-innovation` | Complete |
| Organization & Events | `/organization-events` | Complete |
| IT Services | `/it-services` | Complete |
| Knowledge Base | `/knowledge-base` | Complete (7 detailed articles) |
| KB: Design Systems | `/knowledge-base/web-dev-design-systems` | Complete |
| KB: Frontend Tech | `/knowledge-base/web-dev-frontend-tech` | Complete |
| KB: Animation & 3D | `/knowledge-base/web-dev-animation-3d` | Complete |
| KB: Realtime & Infra | `/knowledge-base/web-dev-realtime-infra` | Complete |
| KB: Integrations | `/knowledge-base/web-dev-integrations` | Complete |
| KB: Enterprise | `/knowledge-base/web-dev-enterprise` | Complete |
| KB: Service Delivery | `/knowledge-base/service-delivery-philosophy` | Complete |
| Terms of Service | `/terms` | Complete (California law) |
| Privacy Policy | `/privacy` | Complete (California law, GDPR/CCPA/PDPL) |
| Portal | `/portal` | Placeholder |
| 404 | `/not-found` | Complete |

---

## Key Features & Components

### AI Chat — "Q"
- **ChatPanel**: 3-state (collapsed FAB → expanded panel → fullscreen)
- **QAvatar3D**: Three.js animated icosahedron with 4 states (idle, thinking, speaking, celebrating)
- **QAvatar2D**: Lottie/CSS fallback for low-end devices
- **WelcomeScreen**: Typewriter greeting + 6 suggestion chips + ClickSpark
- **FABTooltip**: 5-second delayed nudge tooltip near collapsed Q bubble
- **VelvetRope**: Iron Grip pricing UI (Standard vs Premium side-by-side)
- **Magic Mirror**: Generative UI system (`[MIRROR:type:json]` tags in Q's response stream)
- **Split Screen**: Chat left, visual preview right (resizable divider)
- **useQChat**: Custom hook wrapping Vercel AI SDK `useChat` with visitor tracking, hesitation detection, `sendMessage` convenience function

### Visual Components
- **HeroSection**: AlcOS-inspired 2-column layout with Tech Stack Constellation (8 glassmorphic nodes)
- **GlassSurface**: SVG displacement filter glassmorphism effect
- **ServiceVisual**: 6 animated SVGs for service cards (Capital Flow, Decision Matrix, Circuit Board, Orbital, Timeline, Deploy Pipeline)
- **ServiceHeroVisual**: 6 hero-level animated SVGs (Vault, Helm, Observatory, Harbor, Compass, Forge)
- **Globe**: React Three Fiber globe with California HQ pin + region connection beams
- **ClickSpark**: Copper spark animation on CTA button clicks
- **GlareHover**: Glassmorphism hover effects on service cards
- **SilkBackground**: Animated gradient background
- **Morphing Backgrounds**: Context-based 3D scene changes
- **ScrollStack**: Lenis-powered scroll-pinning card stack
- **Testimonials**: 6 cards across all verticals
- **Cookie Consent Banner**: Geo-adaptive (GDPR/CCPA/PDPL) via Cloudflare `cf-ipcountry`
- **Footer Ticker**: Scrolling service hashtags

### Backend
- **Supabase Schema**: 8 tables + pgvector (conversations, messages, leads, knowledge_documents, etc.)
- **RAG Pipeline**: Ingest → Embed (Cohere v2) → Retrieve (cosine similarity via pgvector)
- **Q System Prompt**: Full personality with guardrails (commitment/price/scope scanners)
- **Iron Grip Pricing**: Deterministic state machine (initial → anchored → negotiating → floor → terminal)
- **20 Pricing Packages**: 5 services x 4 tiers (Standard, Professional, Enterprise, Executive)
- **Redis Rate Limiting**: Per-IP rate limiter with sliding window
- **Cal.com Booking**: API integration for discovery/strategy/executive calls
- **Stripe**: Service file exists with lazy init (no live keys configured at archive time)

### i18n (Sprint 10)
- next-intl with 7 languages: English, Spanish, French, German, Mandarin, Japanese, Portuguese
- Message files in `src/messages/*.json`

### Compliance (Sprint 10)
- GDPR: Article 15 (access), 17 (erasure), 20 (portability)
- CCPA: Know, Delete, Opt-Out rights
- Cookie consent geo-adaptive banner

---

## Project Structure

```
quartermasters-nexus/          ← The Next.js application
  src/
    app/                       ← App Router pages and API routes
      (pages)/                 ← Service pages, about, contact, etc.
      api/                     ← Chat, conversations, booking, analytics, contact
    components/
      avatar/                  ← QAvatar3D, QAvatar2D
      chat/                    ← ChatPanel, ChatMessage, ChatInput, VelvetRope, WelcomeScreen, FABTooltip
      chat/mirror/             ← MirrorRegistry, MirrorRenderer, CanvasPanel, SplitScreenLayout
      compliance/              ← CookieConsentBanner
      sections/                ← HeroSection, GlobeSection, Testimonials, etc.
      ui/                      ← ClickSpark, GlareHover, GlassSurface, SearchBar, etc.
    content/knowledge-base/    ← 7 markdown articles for RAG
    hooks/                     ← useQChat, useLenis, useConsent, etc.
    lib/
      ai/                      ← claude.ts (Q brain), guardrails.ts
      analytics/               ← PostHog, experiments, funnels, web vitals
      pricing/                 ← engine.ts (Iron Grip), packages.ts, currency.ts
      rag/                     ← ingest.ts, embeddings.ts, retrieve.ts
      payments/                ← stripe-service.ts
      email/                   ← booking-emails.ts
    messages/                  ← i18n JSON files (7 languages)
  supabase/migrations/         ← SQL migration files (001-009)
  public/                      ← Static assets, logo, fonts

.claude/                       ← AI agent configuration and organization docs
  organization/                ← Progress tracker, decisions, sprint plans, strategic plan
  agents/                      ← Agent role definitions
  agent-memory/                ← Per-agent persistent memory

README.md                      ← Project overview
ARCHIVE_README.md              ← This file
License.pdf                    ← Business license
```

---

## Deployment Requirements

To deploy this archived version, you would need these environment variables:

```bash
# REQUIRED — App will not function without these
NEXT_PUBLIC_SUPABASE_URL=        # Supabase project URL (https://xxxx.supabase.co)
NEXT_PUBLIC_SUPABASE_ANON_KEY=   # Supabase anon/public key
SUPABASE_SERVICE_ROLE_KEY=       # Supabase service role key (server-side only)
ANTHROPIC_API_KEY=               # Claude API key for Q chat (sk-ant-xxxx)

# REQUIRED for full functionality
UPSTASH_REDIS_REST_URL=          # Upstash Redis URL for rate limiting
UPSTASH_REDIS_REST_TOKEN=        # Upstash Redis token
RESEND_API_KEY=                  # Resend email API key for contact form
CAL_COM_API_KEY=                 # Cal.com API key for booking integration
CAL_COM_WEBHOOK_SECRET=          # Cal.com webhook verification secret
NEXT_PUBLIC_CAL_USERNAME=        # Cal.com username (e.g., "quartermasters")

# OPTIONAL — Enhanced features
NEXT_PUBLIC_POSTHOG_KEY=         # PostHog analytics (consent-gated)
NEXT_PUBLIC_POSTHOG_HOST=        # PostHog host URL
ANALYTICS_ADMIN_KEY=             # Admin key for /api/analytics endpoints
STRIPE_SECRET_KEY=               # Stripe for payments (not live at archive time)
STRIPE_PUBLISHABLE_KEY=          # Stripe publishable key
STRIPE_WEBHOOK_SECRET=           # Stripe webhook secret

# EMAIL ADDRESSES
CONTACT_EMAIL=info@quartermasters.me
CONTACT_FROM_EMAIL=contact@quartermasters.me
```

### Deployment Steps

1. Clone this repo
2. `cd quartermasters-nexus && npm install`
3. Copy `.env.local.example` to `.env.local` and fill in real values
4. Run Supabase migrations (files in `supabase/migrations/`)
5. Seed knowledge base: `npx tsx src/lib/rag/ingest.ts` (requires COHERE_API_KEY for embeddings)
6. `npm run dev` for local, or deploy to Vercel

### Build Verification

```bash
cd quartermasters-nexus
npx tsc --noEmit    # Should return 0 errors
npm run build       # Should complete successfully
```

---

## Sprint History (How This Was Built)

| Sprint | Focus | Tasks |
|--------|-------|-------|
| 1 | Foundation | Project setup, design system, page scaffolding |
| 2 | Compliance & Routes | Cookie consent (geo-adaptive), sitemap, robots.txt, 5 service pages |
| 3 | Backend | Supabase schema, RAG pipeline, Claude integration, guardrails, Iron Grip pricing, Redis |
| 4 | Frontend Chat | ChatPanel (3-state), ChatMessage, QAvatar3D/2D, VelvetRope, useQChat, AI SDK v6 migration |
| 5 | Integration | GlareHover wiring, ClickSpark on all CTAs, /it-services page, /services hub, bug fixes |
| 6 | Visual Overhaul | HeroSection redesign, GlassSurface, ServiceVisual SVGs, ServiceHeroVisual SVGs, Globe V2 |
| 7 | Polish | Logo (Monogram Q), testimonials expansion, footer ticker, California scrub (42 files) |
| 8 | Post-Deploy Fixes | SearchBar dark mode, contact form, ChatPanel transparency, QAvatar fallback, ScrollStack |
| 9 | Knowledge Base | 7 comprehensive articles covering all web dev topics for RAG |
| 10 | Final | i18n (7 languages), Q multilingual, GDPR Article 15/17/20, CCPA Know/Delete/Opt-Out |

**Detailed sprint log**: See `.claude/organization/PROGRESS_TRACKER.md`

---

## Organization & Decision Records

| Document | Path | Description |
|----------|------|-------------|
| Progress Tracker | `.claude/organization/PROGRESS_TRACKER.md` | Every task with status, files, notes |
| Decisions Log | `.claude/organization/DECISIONS.md` | Key architectural and business decisions |
| Master Execution Plan | `.claude/organization/MASTER_EXECUTION_PLAN.md` | Original 4-phase, 10-sprint plan |
| Strategic Plan V2 | `.claude/organization/STRATEGIC_PLAN_V2.md` | The tech-pivot plan (why this was archived) |
| UI Effects Checklist | `.claude/organization/UI_EFFECTS_CHECKLIST.md` | Visual effects inventory |
| Sprint Plans | `.claude/organization/SPRINT_*.md` | Individual sprint details |

---

## Known Issues at Archive Time

1. **Q Chat**: Works only if `ANTHROPIC_API_KEY` is set. Without it, Q is non-functional.
2. **RAG Embeddings**: Using Cohere API for embeddings — requires `COHERE_API_KEY` (not in `.env.local.example` — oversight). Without it, Q has no knowledge retrieval.
3. **Contact Form**: `RESEND_API_KEY` was placeholder locally. May or may not be configured in Vercel.
4. **Stripe Payments**: Code exists but no live keys were ever configured. Payment flow is non-functional.
5. **Redis**: `UPSTASH_REDIS_*` keys not in local `.env.local`. Rate limiting may fail gracefully.
6. **PostHog Analytics**: Not configured.
7. **Portal Page**: Placeholder only — no functionality.

---

## Legal Entity

- **Company**: Quartermasters
- **Location**: California, United States
- **Domain**: quartermasters.me
- **Currency**: USD primary

---

*This archive was created on 2026-02-25 as part of the company's strategic pivot from 6-vertical consulting to pure Tech/AI services.*
