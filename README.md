# Quartermasters — Project Recovery & Status Document

> **Last Updated**: 2026-02-22 (Session 9 — Logo Integration + Card Brightness + Globe V2 Directive)
> **Git**: https://github.com/mujtaba9598-hasan/Quarter_USA
> **Purpose**: Complete project state so work can resume from ANY new session without context loss.
> **Entity**: Quartermasters | California, United States
> **Domain**: quartermasters.me
> **CEO**: AI (Claude Opus 4.6) | **Founder**: Syed Mujtaba Hasan

---

## TABLE OF CONTENTS

1. [CRITICAL — Current State & What To Do Next](#1-critical--current-state--what-to-do-next)
2. [Phase Execution Plan](#2-phase-execution-plan)
3. [Completed Work — Phase A (Sprint 2 Finish)](#3-completed-work--phase-a-sprint-2-finish)
4. [Completed Work — Phase B (Sprint 3 Backend)](#4-completed-work--phase-b-sprint-3-backend)
5. [In Progress — Knowledge Base Expansion](#5-in-progress--knowledge-base-expansion)
6. [Upcoming — Phase C (Sprint 4 Frontend)](#6-upcoming--phase-c-sprint-4-frontend)
7. [Project Structure](#7-project-structure)
8. [Tech Stack](#8-tech-stack)
9. [File Map — Complete Inventory](#9-file-map--complete-inventory)
10. [DO NOT TOUCH — Protected Files](#10-do-not-touch--protected-files)
11. [Sprint 1 — COMPLETE](#11-sprint-1--complete)
12. [Sprints 5-10 — Future](#12-sprints-5-10--future)
13. [Agent System & Communications](#13-agent-system--communications)
14. [Infrastructure & Deployment](#14-infrastructure--deployment)
15. [Key Architecture Decisions](#15-key-architecture-decisions)
16. [Revenue Model & Pricing](#16-revenue-model--pricing)
17. [Gemini Delivery Protocol](#17-gemini-delivery-protocol)
18. [How to Resume Work](#18-how-to-resume-work)

---

## 1. CRITICAL — CURRENT STATE & WHAT TO DO NEXT

### Where We Are (as of 2026-02-22, Session 8)

```
SPRINT 1:  COMPLETE (10/10)
SPRINT 2:  COMPLETE (Phase A — 6/6)
SPRINT 3:  COMPLETE (Phase B — 10/10)
KB FILES:  COMPLETE (7/7 — 2,626 lines)
SPRINT 4:  COMPLETE (Phase C — 10/10: C-01 through C-10)
SUB-PHASE D: COMPLETE (all 8 INT tasks resolved)
VISUAL OVERHAUL: COMPLETE (Hero redesign, GlassSurface, Service Visuals, Hero Visuals)
LOGO:      DONE (Monogram Q approved, integrated in Header/Footer/OG)
CARDS:     DONE (Testimonials brightness fix — CEO-applied)
GLOBE V2:  DONE (Region colors, cross-connections, 4-region legend, stats row — Gemini delivered)
BUILD:     CLEAN (0 TS errors)
```

### Session 8 Accomplishments
- Hero section fully redesigned (AlcOS-inspired 2-column layout, Tech Stack Constellation, 6 sector pills)
- GlassSurface component built (react-bits SVG displacement filter), replaced broken ScrollStack on /services
- Footer pills updated: 6 service vertical hashtags with flex-wrap
- Testimonials expanded: 3→6 cards covering all verticals
- ServiceVisual.tsx: 6 unique animated SVG thumbnails for /services card grid (200x100)
- ServiceHeroVisual.tsx: 6 unique hero-level animated SVGs for service detail pages (400x300) — Vault, Helm, Observatory, Harbor, Compass, Forge
- ServicePageLayout.tsx: 2-column hero grid with ServiceHeroVisual (500x350 container)
- All 6 client components wired with visualType prop
- Logo: 3 concepts generated, Monogram Q approved by founder, placed in public/
- Globe + Logo integration directive sent (GlobeSection enhancement + Header/Footer logo)
- CEO-Gemini Workflow SOP written to Project_Comms/CEO_GEMINI_WORKFLOW_SOP.md
- California scrub: 42 files, all location refs updated to US/California
- TypeScript: 0 errors throughout

### Immediate Next Steps

1. **Logo selection** — awaiting 3 concepts from Gemini
2. **Visual review** — founder to review all visual changes on localhost
3. **Deploy to Vercel** — full-stack (SSR + API routes + Q live)
4. **Sprint 5**: Booking (Cal.com), CRM, email automation
5. **Founder actions pending**: Vercel account, Supabase + Claude API costs, RESEND_API_KEY

---

## 2. PHASE EXECUTION PLAN

Full plan lives at: `.claude/organization/SPRINT_2_3_4_PLAN.md`

```
PHASE A ── Sprint 2 Finish (Foundation)     ── 6/6 tasks           ── COMPLETE
PHASE B ── Sprint 3 Backend (Q AI Engine)   ── 10/10 tasks         ── COMPLETE (incl. Redis + streaming)
  KB    ── Knowledge Base Expansion          ── 7/7 files           ── COMPLETE (2,626 lines)
PHASE C ── Sprint 4 Frontend (Q Chat + UI)  ── 10/10 tasks         ── COMPLETE
VISUAL  ── Hero + Service Visuals + Glass   ── ALL ACCEPTED        ── COMPLETE
```

### Delivery Protocol (ENFORCED — do not change)
1. Gemini delivers each task as a message to CEO (2000) via Aliff Comms API
2. Subject line: `DELIVERY: <task-id> <filename>`
3. Full file contents in message body
4. CEO reviews on disk → ACCEPT or IMPROVE (with specific fix instructions)
5. Gemini must report after every task, wait for verdict before proceeding
6. Gemini must print on screen: `>>> DELIVERY READY: <task> — Tell CEO to check inbox <<<`

---

## 3. COMPLETED WORK — PHASE A (Sprint 2 Finish)

> **Status**: ALL ACCEPTED. Sprint 2 is COMPLETE.

| Task | File | What Was Done | Verdict |
|------|------|---------------|---------|
| A-01 | `src/app/layout.tsx` | Wired CookieConsentBanner import + JSX into layout | ACCEPTED |
| A-02 | `quartermasters-nexus/middleware.ts` | Created geo-detection middleware (cf-ipcountry → qm_geo_mode cookie: gdpr/ccpa/pdpl/default). maxAge: 2592000 (30 days). | ACCEPTED (after IMPROVE — maxAge was 1yr, fixed to 30d) |
| A-03a | `src/app/layout.tsx` | Replaced all [BRAND]→Quartermasters, example.com→quartermasters.me, location placeholders replaced | ACCEPTED |
| A-03b | `src/app/privacy/page.tsx` | Replaced all [BRAND]→Quartermasters (11 occurrences) | ACCEPTED |
| A-04 | `src/app/sitemap.ts` | Created sitemap with all 11 public routes, correct priorities | ACCEPTED |
| A-05 | `src/app/robots.ts` | Created robots.ts — allow all, disallow /api/ and /portal/, sitemap URL | ACCEPTED |
| BUG | `src/components/compliance/CookieConsentBanner.tsx` | Fixed PDPL text swap — was showing "CCPA Compliant" for PDPL mode | ACCEPTED |

---

## 4. COMPLETED WORK — PHASE B (Sprint 3 Backend)

> **Status**: 10/10 ALL ACCEPTED. Phase B COMPLETE.

| Task | File(s) Created | What Was Done | Verdict |
|------|----------------|---------------|---------|
| B-01 | `src/lib/supabase.ts` | Supabase client singleton (server + browser). Database type defs for all 8 tables matching schema exactly. | ACCEPTED (after IMPROVE — types were too simplified, fixed to match B-02 schema) |
| B-02 | `supabase/migrations/001_initial_schema.sql` | Full SQL schema: 8 tables, pgvector extension, CHECK constraints, CASCADE deletes, 5 indexes including ivfflat. | ACCEPTED |
| B-03 | `src/lib/rag/ingest.ts` | RAG ingestion: reads .md from knowledge-base, chunks at 500 words/50 overlap, stores in Supabase with dummy embeddings. | ACCEPTED (after IMPROVE — service filename mapping was wrong for 3/6 files, fixed) |
| B-04 | `src/lib/rag/embeddings.ts` | Cohere embed-english-v3.0 wrapper via raw fetch. generateEmbedding (search_query) + generateEmbeddings (search_document). 1 retry with 1s delay. | ACCEPTED |
| B-05 | `src/lib/rag/retrieve.ts` + `supabase/migrations/002_match_documents.sql` | RAG retrieval: pgvector cosine similarity via RPC function. Top-K chunks with service filter. SQL function joins document_embeddings with documents. | ACCEPTED |
| B-06 | `src/lib/ai/claude.ts` | Claude API wrapper with Q personality. System prompt: scope-locked to 5 services, no price fabrication, no commitments, no legal advice. RAG context + pricing state injection. Model: claude-sonnet-4-6. | ACCEPTED |
| B-07 | `src/lib/ai/guardrails.ts` | Anti-hallucination: commitment scanner (regex), price scanner (1% tolerance vs PricingState), scope scanner (7 off-topic terms). Returns { valid, cleaned, flags }. | ACCEPTED |
| B-08 | `src/lib/pricing/engine.ts` + `src/lib/pricing/packages.ts` | Iron Grip pricing engine. State machine: initial→anchored→negotiating→floor→terminated/closed. Max 10% discount, 3% per step, 5% nudge at 30s. packages.ts has 20 entries (5 services × 4 tiers) with correct price ranges. | ACCEPTED (after IMPROVE — Standard/Premium/Enterprise prices were 3-5x below spec, fixed) |
| B-09 | `src/app/api/chat/route.ts` + `src/app/api/conversations/route.ts` | Chat API: POST /api/chat with streaming (Vercel AI SDK streamText), distributed Redis rate limiting, RAG context, guardrails in onFinish callback. Conversations: GET/POST. | ACCEPTED (refactored to streaming in Session 4) |
| B-10 | `src/lib/redis.ts` | Upstash Redis client: rateLimit() distributed INCR+EXPIRE, cacheGet<T>(), cacheSet(). Wired into chat route replacing in-memory Map. | ACCEPTED (CEO-built in Session 4) |

### B-08 Pricing Table (ACTUAL values on disk in packages.ts)

| Service | Express | Standard | Premium | Enterprise |
|---------|---------|----------|---------|------------|
| financial-advisory | $1,500 | $18,000 | $45,000 | $85,000 |
| human-capital | $1,200 | $14,000 | $35,000 | $72,000 |
| management | $1,800 | $22,000 | $50,000 | $95,000 |
| tech-rnd | $1,600 | $20,000 | $42,000 | $90,000 |
| event-logistics | $1,000 | $15,000 | $38,000 | $75,000 |

Tier ranges: Express $1K-$1.8K | Standard $12K-$25K | Premium $30K-$60K | Enterprise $65K-$120K

---

## 5. COMPLETE — KNOWLEDGE BASE EXPANSION (7/7, 2,626 lines)

> **Purpose**: Give Q deep expertise for enterprise-level client conversations ($100 to $120K+)
> **Location**: `quartermasters-nexus/src/content/knowledge-base/`
> **Rule**: These files feed Q via RAG pipeline (B-03 ingest.ts). Each must be 300+ lines of substantive content.

| File | Category | Status | Lines |
|------|----------|--------|-------|
| KB-01 | `web-dev-design-systems.md` — Design systems, themes, UI frameworks, component libs, CSS, tokens | ACCEPTED | 322 |
| KB-02 | `web-dev-frontend-tech.md` — Frontend frameworks, build tools, rendering, state management | ACCEPTED | 405 |
| KB-03 | `web-dev-animation-3d.md` — Animation, transitions, 3D, WebGL/WebGPU, Lottie, Rive | ACCEPTED | 501 |
| KB-04 | `web-dev-realtime-infra.md` — WebSockets, real-time, edge computing, DevOps, databases | ACCEPTED | 365 |
| KB-05 | `web-dev-integrations.md` — CMS, payments, auth, AI, analytics, notifications | ACCEPTED | 324 |
| KB-06 | `web-dev-enterprise.md` — Multi-tenancy, RBAC, SSO, security, compliance, accessibility, i18n | ACCEPTED | 352 |
| KB-07 | `service-delivery-philosophy.md` — QM delivery philosophy, consulting methodology, pricing | ACCEPTED | 357 |

### Existing KB files (from Sprint 2, Feb 13 — still on disk)
- `banking-services.md` — Banking Services Consultancy
- `human-resources.md` — Human Resources Consultancy
- `management-consultancy.md` — Management Consultancy
- `technology-education.md` — Technology Education R&D
- `organization-event.md` — Organization & Event Management
- `event-management.md` — Event Management

### Service Philosophy (KB-07 — key internal rules for Q)
- We NEVER say no to any budget ($100 to $120K+)
- Express: AI-assisted, proven templates, fast turnaround
- Standard: Custom design, dedicated PM, specialized designers
- Premium: Fully bespoke, top-tier talent, not limited to AI
- Enterprise: Full human team (senior designer, lead dev, QA, PM), AI only as accelerator
- For high-budget: source best external specialists (animation, 3D, security)
- These instructions persist regardless of future price changes

---

## 6. COMPLETE — PHASE C (Sprint 4 Frontend) — 10/10

> **Status**: COMPLETE. All 10 tasks accepted. Q chat is wired into every page.
> **MILESTONE**: Site is revenue-ready pending deployment + environment variables.

| Task | File(s) to Create | Description |
|------|-------------------|-------------|
| C-01 | `src/components/chat/ChatPanel.tsx` | Main chat container: collapsed/expanded/full-screen states |
| C-02 | `ChatMessage.tsx`, `ChatInput.tsx`, `TypingIndicator.tsx` | Message bubbles, input with Enter-to-send, typing indicator |
| C-03 | `src/hooks/useChat.ts` | Custom hook wrapping Vercel AI SDK useChat |
| C-04 | `src/components/avatar/QAvatar3D.tsx` | Three.js icosahedron with 4 states: idle/thinking/speaking/presenting |
| C-05 | `src/components/avatar/QAvatar2D.tsx` | Lottie fallback (or CSS placeholder) for non-WebGL devices |
| C-06 | `src/lib/rendering/tier-detect.ts` | WebGL detection + GPU benchmark → high/medium/low tier |
| C-07 | `src/components/chat/QChatExperience.tsx` | Orchestrator: combines chat + avatar, maps chat state to avatar state |
| C-08 | `VelvetRope.tsx`, `PricingCard.tsx`, `BookMujtaba.tsx` | Iron Grip pricing UI: Standard vs Premium comparison, floor → calendar CTA |
| C-09 | `src/lib/pricing/flow-segmentation.ts` | Express Lane vs Executive Track flow based on budget/company size |
| C-10 | `src/app/layout.tsx` (MODIFY) | Add QChatExperience to root layout with dynamic import, ssr: false |

### Phase C Dependencies
```
C-01, C-02, C-03 (parallel — chat UI)
C-04, C-05, C-06 (parallel — avatar + rendering)
    ↓
C-07 (needs C-01 through C-06)
C-08, C-09 (parallel — pricing UI)
    ↓
C-10 (needs everything)
```

---

## 7. PROJECT STRUCTURE

```
Quartermasters 3/                          ← PROJECT ROOT
├── README.md                              ← THIS FILE (recovery doc)
├── License.pdf                            ← Business license scan
├── quartermasters-logo.avif               ← Brand logo asset
│
├── quartermasters-nexus/                  ← MAIN NEXT.JS APPLICATION
│   ├── middleware.ts                      ← NEW (Phase A) — Geo-detection middleware
│   ├── src/
│   │   ├── app/                           ← Next.js App Router pages + API routes
│   │   │   ├── api/chat/route.ts          ← NEW (Phase B) — Q chat endpoint
│   │   │   ├── api/conversations/route.ts ← NEW (Phase B) — Conversation CRUD
│   │   │   ├── sitemap.ts                 ← NEW (Phase A) — Dynamic sitemap
│   │   │   ├── robots.ts                  ← NEW (Phase A) — Robots.txt
│   │   │   └── [all page routes]          ← 12 pages (see File Map)
│   │   ├── components/                    ← React components
│   │   │   ├── chat/ChatPanel.tsx         ← NEW (Phase C) — 3-state chat container
│   │   │   ├── chat/ChatMessage.tsx       ← NEW (Phase C) — Message bubbles
│   │   │   ├── chat/ChatInput.tsx         ← NEW (Phase C) — Input + send button
│   │   │   └── chat/TypingIndicator.tsx   ← NEW (Phase C) — Three-dot animation
│   │   ├── content/knowledge-base/        ← Markdown for RAG (6 existing + 7 new KB files)
│   │   ├── hooks/                         ← Custom React hooks
│   │   │   ├── useConsent.ts              ← Cookie consent hook (existing)
│   │   │   └── useQChat.ts               ← NEW (Phase C) — Streaming chat hook
│   │   └── lib/                           ← Utilities + NEW backend modules
│   │       ├── ai/claude.ts               ← NEW (Phase B) — Q + Claude integration
│   │       ├── ai/guardrails.ts           ← NEW (Phase B) — Anti-hallucination
│   │       ├── rag/ingest.ts              ← NEW (Phase B) — Document ingestion
│   │       ├── rag/embeddings.ts          ← NEW (Phase B) — Cohere embeddings
│   │       ├── rag/retrieve.ts            ← NEW (Phase B) — Semantic search
│   │       ├── pricing/engine.ts          ← NEW (Phase B) — Iron Grip state machine
│   │       ├── pricing/packages.ts        ← NEW (Phase B) — 20 pricing entries
│   │       └── supabase.ts               ← NEW (Phase B) — DB client + types
│   ├── supabase/migrations/
│   │   ├── 001_initial_schema.sql         ← NEW (Phase B) — 8 tables + pgvector
│   │   └── 002_match_documents.sql        ← NEW (Phase B) — Vector search function
│   ├── public/                            ← Static assets
│   ├── package.json                       ← Dependencies manifest
│   └── [config files]                     ← next.config.ts, tsconfig, etc.
│
├── orchestrator/                          ← Python agent orchestrator (Gemini-built)
├── planning/                              ← Original planning docs
│
└── .claude/                               ← CEO/AI organizational files
    ├── organization/
    │   ├── MASTER_EXECUTION_PLAN.md       ← Single source of truth (10 sprints)
    │   ├── SPRINT_2_3_4_PLAN.md           ← Phase A/B/C detailed task specs
    │   ├── SPRINT_2.md                    ← Sprint 2 tracker
    │   ├── DECISIONS.md                   ← Board decisions (DEC-001 to DEC-008)
    │   └── [other org files]
    └── settings.local.json                ← MCP server config (Hostinger)
```

---

## 8. TECH STACK

### Currently Installed (package.json)
| Package | Version | Purpose |
|---|---|---|
| next | 16.1.6 | App Router framework |
| react / react-dom | 19.2.3 | UI library |
| framer-motion | 12.34.0 | Animations |
| @react-three/fiber + drei | 9.5.0 / 10.7.7 | 3D rendering (Globe) |
| three | 0.182.0 | 3D engine |
| lenis | 1.3.17 | Smooth scrolling |
| lucide-react | 0.563.0 | Icons |
| tailwindcss | v4 | Styling (via PostCSS) |
| typescript | 5.x | Type safety |

### Additionally Installed in Session 4
| Package | Version | Purpose |
|---|---|---|
| @ai-sdk/anthropic | latest | Vercel AI SDK Anthropic provider (streaming) |

### Still Needs Install (for Sprint 4 frontend)
```bash
npm install lottie-react
```

### Env Vars Needed (.env.local)
```
NEXT_PUBLIC_SUPABASE_URL=         # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=    # Supabase anon key
SUPABASE_SERVICE_ROLE_KEY=        # Supabase service role (server only)
ANTHROPIC_API_KEY=                # Claude API key for Q
COHERE_API_KEY=                   # Cohere embed-english-v3.0
UPSTASH_REDIS_REST_URL=           # Upstash Redis
UPSTASH_REDIS_REST_TOKEN=         # Upstash Redis token
RESEND_API_KEY=                   # Email (contact form)
```

---

## 9. FILE MAP — COMPLETE INVENTORY

### Pages (src/app/)
| File | Route | Status |
|---|---|---|
| `page.tsx` | `/` | DONE — SSR, Server Components |
| `about/page.tsx` | `/about` | DONE |
| `contact/page.tsx` | `/contact` | DONE — needs RESEND_API_KEY |
| `financial-advisory/page.tsx` | `/financial-advisory` | DONE — has ServiceJsonLd |
| `human-capital/page.tsx` | `/human-capital` | DONE — has ServiceJsonLd |
| `management/page.tsx` | `/management` | DONE — has ServiceJsonLd |
| `tech-rnd/page.tsx` | `/tech-rnd` | DONE — has ServiceJsonLd |
| `event-logistics/page.tsx` | `/event-logistics` | DONE — has ServiceJsonLd |
| `knowledge-base/page.tsx` | `/knowledge-base` | DONE |
| `portal/page.tsx` | `/portal` | PLACEHOLDER — future |
| `privacy/page.tsx` | `/privacy` | DONE — 1,605 LOC |
| `terms/page.tsx` | `/terms` | DONE — 1,229 LOC |
| `not-found.tsx` | 404 | DONE |
| `layout.tsx` | Root layout | DONE — JsonLd, OG tags, CookieConsentBanner |
| `globals.css` | Styles | DONE — Sovereign Nexus design system |
| `sitemap.ts` | `/sitemap.xml` | DONE (Phase A) |
| `robots.ts` | `/robots.txt` | DONE (Phase A) |

### API Routes (src/app/api/) — NEW in Phase B
| File | Endpoint | Status |
|---|---|---|
| `api/chat/route.ts` | POST /api/chat | DONE — rate limited, RAG, guardrails |
| `api/conversations/route.ts` | GET/POST /api/conversations | DONE |

### Backend Modules (src/lib/) — NEW in Phase B
| File | Purpose | Status |
|---|---|---|
| `supabase.ts` | DB client + 8-table typed schema | DONE |
| `ai/claude.ts` | Q personality + Claude API | DONE |
| `ai/guardrails.ts` | Anti-hallucination (3 scanners) | DONE |
| `rag/ingest.ts` | Knowledge base → chunks → Supabase | DONE |
| `rag/embeddings.ts` | Cohere embed-english-v3.0 via fetch | DONE |
| `rag/retrieve.ts` | pgvector cosine similarity search | DONE |
| `pricing/engine.ts` | Iron Grip state machine class | DONE |
| `pricing/packages.ts` | 20 pricing entries (5×4) | DONE |
| `redis.ts` | Upstash Redis client + rate limiter + cache helpers | DONE (B-10) |

### Middleware — NEW in Phase A
| File | Purpose | Status |
|---|---|---|
| `quartermasters-nexus/middleware.ts` | Geo-detection: cf-ipcountry → qm_geo_mode cookie | DONE |

### SQL Migrations — NEW in Phase B
| File | Purpose | Status |
|---|---|---|
| `supabase/migrations/001_initial_schema.sql` | 8 tables, pgvector, indexes | DONE |
| `supabase/migrations/002_match_documents.sql` | match_documents RPC function | DONE |

### Components (src/components/) — Existing
| File | Purpose | Status |
|---|---|---|
| `layout/Header.tsx` | Navigation | DONE |
| `layout/Footer.tsx` | Footer with legal links | DONE |
| `layout/JsonLd.tsx` | Homepage structured data | DONE |
| `compliance/CookieConsentBanner.tsx` | Cookie consent UI | DONE — wired in layout.tsx, PDPL bug fixed |
| `seo/ServiceJsonLd.tsx` | Per-service structured data | DONE |
| [all other components] | See full list in codebase | DONE |

### Knowledge Base (src/content/knowledge-base/)
| File | Category | Status |
|---|---|---|
| `banking-services.md` | Financial advisory | DONE (Feb 13) |
| `human-resources.md` | HR consultancy | DONE (Feb 13) |
| `management-consultancy.md` | Management | DONE (Feb 13) |
| `technology-education.md` | Tech R&D | DONE (Feb 13) |
| `organization-event.md` | Events | DONE (Feb 13) |
| `event-management.md` | Events (alt) | DONE (Feb 13) |
| `web-dev-design-systems.md` | Design systems, themes, UI | DONE (KB-01, 322 lines) |
| `web-dev-frontend-tech.md` | Frontend frameworks, build tools, state mgmt | DONE (KB-02, 405 lines) |
| `web-dev-animation-3d.md` | Animation, 3D, Framer Motion, Three.js/R3F | DONE (KB-03, 501 lines) |
| `web-dev-realtime-infra.md` | Real-time, infrastructure | DONE (KB-04, 365 lines) |
| `web-dev-integrations.md` | CMS, payments, AI, plugins | DONE (KB-05, 324 lines) |
| `web-dev-enterprise.md` | Enterprise, security, a11y | DONE (KB-06, 352 lines) |
| `service-delivery-philosophy.md` | QM delivery philosophy | DONE (KB-07, 357 lines) |

---

## 10. DO NOT TOUCH — PROTECTED FILES

These files are STABLE. Do not modify unless explicitly asked:

### Legal
- `src/app/privacy/page.tsx` — 1,605 LOC, PDPL+GDPR+CCPA
- `src/app/terms/page.tsx` — 1,229 LOC, all 5 verticals

### Design System
- `src/app/globals.css` — Sovereign Nexus tokens (Deep Harbor + Burnt Copper #C15A2C)
- `src/lib/design-tokens.ts`
- `src/lib/coastal-premium/tokens.ts`

### Configuration
- `package.json` — Only ADD dependencies, never remove
- `next.config.ts`, `tsconfig.json` — Stable

### Organization (CEO manages)
- `.claude/organization/MASTER_EXECUTION_PLAN.md`
- `.claude/organization/DECISIONS.md`

### Brand
- `src/components/icons/QuartermasterLogo.tsx`
- `quartermasters-logo.avif`

### Phase B Backend (ACCEPTED — do not modify unless fixing bugs)
- All files in `src/lib/ai/`, `src/lib/rag/`, `src/lib/pricing/`, `src/lib/supabase.ts`
- All files in `src/app/api/`
- All files in `supabase/migrations/`
- `quartermasters-nexus/middleware.ts`

---

## 11. SPRINT 1 — COMPLETE

> All 10 tasks done. Docker + Cloudflare Tunnel configured.

**Founder actions still pending:**
- [ ] Run `docker compose up -d --build`
- [ ] Set `RESEND_API_KEY` in `.env.local`

---

## 12. SPRINTS 5-10 — FUTURE

### Sprint 5: Booking, CRM & Email
- Cal.com integration, CRM tables, email warm-up

### Sprint 6: Client Portal + Q Persona Engine
- Supabase Auth, client dashboard, Chameleon Engine (persona switching)

### Sprint 7: Payments + Generative UI — SUSTAINABLE REVENUE
- Stripe (USD), invoice generation, Magic Mirror (live wireframes in chat)

### Sprint 8: PWA + Mobile
- Service Worker, push notifications, React Native

### Sprint 9: Analytics & Optimization
- PostHog, conversion funnels, A/B testing, Core Web Vitals

### Sprint 10: Internationalization — $50K+/month target
- next-intl: English, Spanish, French, German, Mandarin, Japanese, Portuguese

---

## 13. AGENT SYSTEM & COMMUNICATIONS

### QM Agent Roster
| ID | Role | Platform | Status |
|---|---|---|---|
| 2000 | CEO (Claude Opus 4.6) | Claude Code CLI | Active |
| 2001 | CTO (Codex/OpenAI) | — | DECOMMISSIONED |
| 2002 | CTO (Gemini) | Google AI Studio (Antigravity) | **Active — delivering Phase B + KB** |
| 2003 | Research Analyst (Gemini) | — | Registered, API key confirmed |

### Aliff Comms API
- **Base URL**: `https://aliffsolutions.com/api/v1/agent-comms`
- **CEO Auth**: `X-Agent-Id: 2000` + `X-Agent-Key: sNfOVUZ31Suwge3gLTCsj6PygtdI0TJZ`
- **Endpoints**: POST /send, GET /inbox/{id}, POST /{msg_id}/reply, PATCH /{msg_id}/status

### Check inbox command
```bash
curl -s -H "X-Agent-Id: 2000" -H "X-Agent-Key: sNfOVUZ31Suwge3gLTCsj6PygtdI0TJZ" "https://aliffsolutions.com/api/v1/agent-comms/inbox/2000?status=unread"
```

### Gemini Behavior Notes
- Gemini modifies files on disk via Antigravity (Google AI Studio terminal)
- Gemini sends delivery reports via Aliff Comms API
- Gemini has sent FALSE completion reports before — always verify files ON DISK
- Gemini sometimes uses wrong prices, wrong filenames, wrong column names — always cross-check against spec

---

## 14. INFRASTRUCTURE & DEPLOYMENT

### Current Setup
- **Hosting**: Local Docker + Cloudflare Tunnel
- **Domain**: quartermasters.me (Cloudflare DNS active)
- **Nameservers**: olga.ns.cloudflare.com / weston.ns.cloudflare.com
- **Tunnel ID**: 21f7fc39-8bfd-41e5-b19d-9c0342c21f3f
- **Status**: Docker compose files exist. **Founder has NOT started Docker yet.**

### Hostinger (backup)
- Cloud Economy (shared hosting, NOT VPS) — NO Docker/API support
- Email DNS (MX/SPF/DKIM/DMARC) configured — PRESERVE during migration
- Static deploy: `quartermasters-nexus/quartermasters-static-deploy.zip`

### Cloudflare
- Zone ID: `1782351a9f0622d1cdee0dacd742ee9b`
- Account ID: `4b502b767d59dbe9d7fea27abf3bb7b7`
- Auth: Global API Key (X-Auth-Email + X-Auth-Key, NOT Bearer token)

---

## 15. KEY ARCHITECTURE DECISIONS

| Decision | Rule | Why |
|---|---|---|
| Server Components + client islands | SSR by default, `"use client"` only where needed | SEO, performance |
| Iron Grip pricing | Deterministic state machine, server-enforced, NOT LLM | Prevent hallucinated prices |
| No circular pricing | At 10% floor → terminate → "Book Mujtaba" | No infinite loops |
| Time-based nudge | >30s hesitation → 5% one-time offer | Conversion optimization |
| Velvet Rope | Standard vs Premium side-by-side, premium behind glassmorphism | Upsell psychology |
| Q streams <200ms | Vercel AI SDK | User experience |
| 3D Kill Switch | WebGL detect → GPU benchmark → Lottie fallback | Device compatibility |
| No LangChain | Claude API direct | Unnecessary abstraction |
| ~~No GSAP~~ GSAP Approved | Founder override for CardSwap + ChromaGrid | Selective use |
| No Python backend | TypeScript end-to-end | Stack simplicity |
| Never say no to any budget | $100 → professional, $120K → world-class team | Every client valuable |
| Human resources for high budgets | Premium/Enterprise get dedicated human teams | AI is accelerator, not replacement |

---

## 16. REVENUE MODEL & PRICING

### Tier Ranges (from packages.ts — server-enforced)
| Tier | Range | Target Market |
|------|-------|---------------|
| Express | $1,000 - $1,800 | Quick wins, self-checkout |
| Standard | $12,000 - $25,000 | Custom work, dedicated PM |
| Premium | $30,000 - $60,000 | Bespoke, top talent |
| Enterprise | $65,000 - $120,000+ | Full team, multi-month |

### Revenue Milestones
- **Sprint 4**: First revenue (Q live, Express self-checkout)
- **Sprint 7**: Sustainable revenue (payments, invoicing)
- **Sprint 10**: Scale target $50K+/month

---

## 17. GEMINI DELIVERY PROTOCOL

This protocol is MANDATORY. If Gemini violates any rule, reject the delivery.

1. **One delivery per message.** No batching files.
2. **Full file contents.** No snippets or "add this to..."
3. **TypeScript strict.** No `any` types.
4. **Subject line**: `DELIVERY: <task-id> <filename>`
5. **Wait for verdict.** Do NOT proceed to next dependent task until ACCEPTED.
6. **Report after every task.** No silent progress.
7. **Print on screen**: `>>> DELIVERY READY: <task> — Tell CEO to check inbox <<<`
8. **No false reports.** If not done, say so.
9. **No extra work.** Do ONLY what is instructed. No refactoring, no features, no opinions.
10. **Tailwind v4 + Sovereign Nexus design tokens.** Use design system from globals.css.
11. **Server Components by default.** Only `"use client"` where hooks/browser APIs needed.
12. **No new dependencies** without CEO approval. Approved: @supabase/supabase-js, ai, @anthropic-ai/sdk, @upstash/redis, lottie-react.

---

## 18. HOW TO RESUME WORK

### If starting a new Claude Code session:

1. **Read this README** — especially Section 1 (Current State) and Section 4 (Phase B progress)
2. **Check Gemini inbox**:
   ```bash
   curl -s -H "X-Agent-Id: 2000" -H "X-Agent-Key: sNfOVUZ31Suwge3gLTCsj6PygtdI0TJZ" "https://aliffsolutions.com/api/v1/agent-comms/inbox/2000?status=unread"
   ```
3. **Determine where Gemini left off** — check which KB file or task was last delivered
4. **Review the delivery on disk** — always `Read` the file, don't trust the message alone
5. **Accept or Improve** — send verdict via Aliff Comms API, then assign next task
6. **Follow the task queue**:
   - KB-02 through KB-07 (knowledge base files)
   - B-10 (Redis caching layer)
   - Phase C tasks (C-01 through C-10)

### Key files to read for context:
- This README
- `.claude/organization/SPRINT_2_3_4_PLAN.md` — Full Phase A/B/C task specs
- `.claude/organization/MASTER_EXECUTION_PLAN.md` — 10-sprint strategy
- `C:\Users\Mujtaba Hasan\.claude\projects\C--Users-Mujtaba-Hasan-Downloads-Kitchen-Quartermasters-3\memory\MEMORY.md` — CEO persistent memory

### DO NOT:
- Modify protected files (Section 10)
- Code directly — CEO reviews only, Gemini does the work
- Install packages without founder approval
- Push to any remote repository without founder confirmation
- Touch aliffsolutions.com or any non-QM domains via Hostinger MCP

---

*This document is the project's recovery insurance. If the terminal closes, this file contains everything needed to resume from exactly where we left off.*
