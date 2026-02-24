# Quartermasters — Full Development Plan: Sprints 2/3/4

> **Created**: 2026-02-20
> **Author**: CEO (Claude Opus 4.6)
> **Assigned To**: Gemini (Agent 2002 — CTO)
> **CEO Role**: Review, accept/reject deliveries only. NO coding.
> **Framework**: Next.js 16.1.6 (App Router), React 19, TypeScript, Tailwind v4
> **Goal**: Complete foundation → Build Q AI backend → Ship Q AI frontend → FIRST REVENUE

---

## EXECUTION OVERVIEW

```
PHASE A ── Sprint 2 Finish (Foundation)     ── 5 tasks  ── PRIORITY: NOW
PHASE B ── Sprint 3 Backend (Q AI Engine)   ── 10 tasks ── PRIORITY: NEXT
PHASE C ── Sprint 4 Frontend (Q Chat + UI)  ── 10 tasks ── PRIORITY: AFTER B
```

**Delivery Protocol**:
1. Gemini delivers each task as a message to CEO (2000) via Aliff Comms API
2. Subject line: `DELIVERY: <filename>` or `DELIVERY: <task-id> <description>`
3. Full file contents in message body
4. CEO reviews → ACCEPT (integrate) or REJECT (feedback sent back)
5. No task is "done" until CEO accepts the delivery

---

## PHASE A: SPRINT 2 COMPLETION (5 Tasks)

> **Goal**: Finish all remaining Sprint 2 items. Site must be compliance-ready before Q goes live.
> **Depends on**: Nothing — start immediately.

### A-01: Wire Cookie Consent Banner into App
**File**: `quartermasters-nexus/src/app/layout.tsx`
**What**: Import `CookieConsentBanner` from `@/components/compliance/CookieConsentBanner` and render it inside the `<body>` tag, AFTER `{children}` and BEFORE closing `</body>`. Do NOT modify any existing imports or components in this file. Add only the import and the JSX element.
**Existing**: `CookieConsentBanner.tsx` already exists at `src/components/compliance/CookieConsentBanner.tsx` (196 lines). `useConsent.ts` and `consent-constants.ts` also exist. Do NOT rewrite these — only wire the banner.

### A-02: Create Geo-Detection Middleware
**File**: `quartermasters-nexus/middleware.ts` (NEW — at project root, NOT inside src/)
**What**: Next.js middleware that reads the `cf-ipcountry` header from Cloudflare and sets a `qm_geo_mode` cookie. Logic:
- If country is in EU list (AT, BE, BG, HR, CY, CZ, DK, EE, FI, FR, DE, GR, HU, IE, IT, LV, LT, LU, MT, NL, PL, PT, RO, SK, SI, ES, SE + GB, NO, IS, LI, CH) → `gdpr`
- If country is `US` → `ccpa`
- If country is `AE` → `pdpl`
- Else → `default`
- Cookie: name `qm_geo_mode`, path `/`, maxAge 30 days, sameSite `lax`, secure in production
- Matcher: `['/((?!api|_next/static|_next/image|favicon.ico).*)']`
**Reference**: `.claude/organization/COOKIE_CONSENT_SPEC.md` lines 196-230

### A-03: Fix Privacy Policy Placeholders
**File**: `quartermasters-nexus/src/app/privacy/page.tsx`
**What**: Find-and-replace ALL instances of `[BRAND]` with `Quartermasters`. There are approximately 15+ occurrences. Do NOT change any other text, styling, or structure. Only the placeholder replacement.

### A-04: Create Sitemap
**File**: `quartermasters-nexus/src/app/sitemap.ts` (NEW)
**What**: Next.js App Router sitemap generation. Export a `sitemap()` function that returns `MetadataRoute.Sitemap`. Include ALL routes:
- `/` (weekly, priority 1.0)
- `/about` (monthly, 0.8)
- `/contact` (monthly, 0.7)
- `/financial-advisory` (weekly, 0.9)
- `/human-capital` (weekly, 0.9)
- `/management` (weekly, 0.9)
- `/tech-rnd` (weekly, 0.9)
- `/event-logistics` (weekly, 0.9)
- `/knowledge-base` (weekly, 0.8)
- `/privacy` (yearly, 0.3)
- `/terms` (yearly, 0.3)
Base URL: `https://quartermasters.me`

### A-05: Create robots.txt
**File**: `quartermasters-nexus/src/app/robots.ts` (NEW)
**What**: Next.js App Router robots generation. Allow all crawlers. Sitemap URL: `https://quartermasters.me/sitemap.xml`. Disallow: `/api/`, `/portal/`.

---

## PHASE B: SPRINT 3 — Q AI BACKEND (10 Tasks)

> **Goal**: Build the entire backend for Q: database, RAG pipeline, pricing engine, API routes, streaming.
> **Depends on**: Founder must approve Supabase + Claude API costs before B-01 starts.
> **New packages needed**: `@supabase/supabase-js`, `ai` (Vercel AI SDK), `@anthropic-ai/sdk`, `@upstash/redis`

### B-01: Supabase Client Setup
**File**: `quartermasters-nexus/src/lib/supabase.ts` (NEW)
**What**: Create Supabase client singleton.
- Import `createClient` from `@supabase/supabase-js`
- Read `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from env
- Export `supabase` client (server-side, service role for admin operations)
- Export `createBrowserClient()` for client-side (using `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- Add TypeScript types for the database schema (can be basic, will be refined)

### B-02: Database Schema (SQL Migrations)
**File**: `quartermasters-nexus/supabase/migrations/001_initial_schema.sql` (NEW)
**What**: Complete SQL schema. Tables:
```sql
-- Enable pgvector
CREATE EXTENSION IF NOT EXISTS vector;

-- Conversations (Q chat sessions)
conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id TEXT NOT NULL,           -- anonymous fingerprint
  status TEXT DEFAULT 'active',       -- active, qualified, closed, handed_off
  flow_type TEXT DEFAULT 'discovery', -- discovery, express, executive
  started_at TIMESTAMPTZ DEFAULT now(),
  ended_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'
)

-- Messages within conversations
messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id),
  role TEXT NOT NULL,                 -- user, assistant, system
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
)

-- Leads (qualified prospects)
leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id),
  email TEXT,
  company TEXT,
  budget_range TEXT,                  -- express, standard, premium, enterprise
  service_interest TEXT,              -- financial, hr, management, tech, events
  qualification_score INTEGER DEFAULT 0,
  status TEXT DEFAULT 'new',          -- new, contacted, converted, lost
  created_at TIMESTAMPTZ DEFAULT now()
)

-- Pricing states (Iron Grip state machine)
pricing_states (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id),
  current_state TEXT NOT NULL,        -- initial, anchored, negotiating, floor, terminated, closed
  service TEXT NOT NULL,
  tier TEXT NOT NULL,                 -- express, standard, premium, enterprise
  base_price INTEGER NOT NULL,
  current_price INTEGER NOT NULL,
  discount_applied INTEGER DEFAULT 0,
  nudge_triggered BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
)

-- Documents (RAG source)
documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  service TEXT,                       -- which service vertical
  doc_type TEXT DEFAULT 'knowledge',  -- knowledge, faq, pricing, process
  created_at TIMESTAMPTZ DEFAULT now()
)

-- Document embeddings (pgvector)
document_embeddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID REFERENCES documents(id),
  chunk_index INTEGER NOT NULL,
  chunk_text TEXT NOT NULL,
  embedding vector(1024),             -- Cohere embed-v3 dimension
  created_at TIMESTAMPTZ DEFAULT now()
)

-- Audit log
pricing_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id),
  action TEXT NOT NULL,               -- price_shown, discount_offered, floor_reached, terminated
  details JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
)

-- Consent records
consent_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id TEXT NOT NULL,
  geo_mode TEXT NOT NULL,             -- gdpr, ccpa, pdpl, default
  necessary BOOLEAN DEFAULT true,
  analytics BOOLEAN DEFAULT false,
  marketing BOOLEAN DEFAULT false,
  do_not_sell BOOLEAN DEFAULT false,
  ip_country TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
)
```
Add indexes on: `conversations.visitor_id`, `messages.conversation_id`, `document_embeddings.embedding` (ivfflat), `leads.status`, `pricing_states.conversation_id`.

### B-03: RAG Document Ingestion Pipeline
**File**: `quartermasters-nexus/src/lib/rag/ingest.ts` (NEW)
**What**: Script/function that:
1. Reads all `.md` files from `src/content/knowledge-base/`
2. Splits each document into chunks (~500 tokens each, with 50-token overlap)
3. Generates embeddings for each chunk (placeholder for now — will use Cohere)
4. Stores document + chunks + embeddings in Supabase `documents` and `document_embeddings` tables
- Export `ingestDocuments()` function
- Export `chunkText(text: string, chunkSize: number, overlap: number): string[]`

### B-04: Embeddings Wrapper
**File**: `quartermasters-nexus/src/lib/rag/embeddings.ts` (NEW)
**What**: Wrapper around embedding API.
- Export `generateEmbedding(text: string): Promise<number[]>`
- Export `generateEmbeddings(texts: string[]): Promise<number[][]>`
- Use environment variable `COHERE_API_KEY` or `OPENAI_API_KEY` for embeddings
- Default model: `embed-english-v3.0` (Cohere) — 1024 dimensions
- Include error handling and retry logic (1 retry with 1s delay)

### B-05: RAG Retrieval
**File**: `quartermasters-nexus/src/lib/rag/retrieve.ts` (NEW)
**What**: Semantic search function.
- Export `retrieveContext(query: string, options?: { limit?: number, service?: string }): Promise<RetrievedChunk[]>`
- Generates embedding for the query
- Performs cosine similarity search against `document_embeddings` using pgvector
- Returns top-K chunks (default K=5) with their source document metadata
- Optional filter by service vertical
- Type: `RetrievedChunk = { chunkText: string, documentTitle: string, service: string, similarity: number }`

### B-06: Q System Prompt + Claude Integration
**File**: `quartermasters-nexus/src/lib/ai/claude.ts` (NEW)
**What**: Claude API wrapper with Q's personality.
- Export `askQ(params: { userMessage: string, conversationHistory: Message[], context: RetrievedChunk[], pricingState?: PricingState }): Promise<string>`
- System prompt for Q:
  - Name: Q | Role: Senior Strategy Consultant for Quartermasters
  - Personality: Professional, authoritative, concise. Not chatty. Speaks like a seasoned consultant.
  - Scope: ONLY the 5 licensed activities. If asked about anything outside scope, redirect.
  - NEVER fabricate prices — all pricing comes from PricingEngine (injected into context)
  - NEVER make commitments (timelines, guarantees, deliverables) — always say "subject to engagement terms"
  - NEVER provide legal/financial advice — always disclaim
  - Goal: Qualify visitor → determine service need → present pricing → close (Express) or handoff (Executive)
  - Language: English only (multilingual in Sprint 10)
- Use `@anthropic-ai/sdk` with model `claude-sonnet-4-6` (cost-effective for chat)
- Include RAG context in system prompt as "Knowledge Base Context"
- Include pricing state if in pricing conversation

### B-07: Anti-Hallucination Guardrails
**File**: `quartermasters-nexus/src/lib/ai/guardrails.ts` (NEW)
**What**: Post-processing middleware for Q's responses.
- Export `validateResponse(response: string, pricingState?: PricingState): { valid: boolean, cleaned: string, flags: string[] }`
- **Commitment Scanner**: Regex check for unauthorized commitments ("we guarantee", "we promise", "within X days", "100%", "we will deliver")
  - If found: append disclaimer "Subject to formal engagement terms."
- **Price Scanner**: Regex check for dollar amounts ($X,XXX or $XX,XXX)
  - If found AND not matching current PricingEngine state: STRIP the price, replace with "[pricing available upon qualification]"
- **Scope Scanner**: Check for topics outside the 5 licensed activities
  - Flag but don't block (Q's system prompt should handle this)
- Return the cleaned response + array of flags for audit logging

### B-08: Iron Grip Pricing Engine
**File**: `quartermasters-nexus/src/lib/pricing/engine.ts` (NEW)
**What**: Deterministic state machine for pricing. NO LLM involvement in price calculation.
- Export `PricingEngine` class with methods:
  - `getInitialPrice(service: string, tier: string): number` — returns base price from pricing table
  - `processNegotiation(state: PricingState, action: NegotiationAction): PricingState` — state transition
  - `shouldNudge(state: PricingState, hesitationMs: number): boolean` — returns true if >30s
  - `isAtFloor(state: PricingState): boolean` — returns true if at 10% max discount
- States: `initial` → `anchored` → `negotiating` → `floor` → `terminated` | `closed`
- Rules:
  - Max discount: 10% of base price
  - Each negotiation step: max 3% discount
  - At floor (10% off): NO more discounts. Response: "Book Mujtaba" calendar link.
  - >30s hesitation: auto-trigger 5% nudge offer (one-time only)
  - No circular arguments: once at floor, state is `terminated` → cannot re-enter negotiation
- Pricing table (hardcoded, server-side):
  - Express: $1,000 - $1,800 (per service)
  - Standard: $12,000 - $25,000
  - Premium: $30,000 - $60,000
  - Enterprise: $65,000 - $120,000+

**File**: `quartermasters-nexus/src/lib/pricing/packages.ts` (NEW)
**What**: Static pricing data.
- Export `PRICING_TABLE` constant with all service/tier combinations
- Export `getPackageDetails(service: string, tier: string): PackageDetails`
- Type: `PackageDetails = { service, tier, basePrice, description, deliverables: string[], timeline: string }`

### B-09: Conversation API Routes
**File**: `quartermasters-nexus/src/app/api/chat/route.ts` (NEW)
**What**: Main chat endpoint using Vercel AI SDK for streaming.
- `POST /api/chat` — accepts `{ message: string, conversationId?: string }`
- Flow:
  1. Create or fetch conversation from Supabase
  2. Retrieve RAG context for the user message
  3. Get current pricing state (if in pricing flow)
  4. Call Claude via `askQ()` with all context
  5. Run response through `validateResponse()` guardrails
  6. Store message + response in Supabase
  7. Stream response back using Vercel AI SDK `StreamingTextResponse`
  8. Log to `pricing_audit_log` if pricing-related
- Use `ai` package (Vercel AI SDK) for streaming
- Rate limit: 10 messages per minute per visitor (use in-memory or Upstash)

**File**: `quartermasters-nexus/src/app/api/conversations/route.ts` (NEW)
**What**: Conversation management.
- `GET /api/conversations?visitorId=xxx` — get conversation history
- `POST /api/conversations` — create new conversation
- `PATCH /api/conversations/[id]` — update status (close, handoff)

### B-10: Redis Caching Layer
**File**: `quartermasters-nexus/src/lib/redis.ts` (NEW)
**What**: Upstash Redis client for caching and rate limiting.
- Export `redis` client (from `@upstash/redis`)
- Export `rateLimit(key: string, limit: number, windowMs: number): Promise<{ allowed: boolean, remaining: number }>`
- Export `cacheGet<T>(key: string): Promise<T | null>`
- Export `cacheSet(key: string, value: unknown, ttlSeconds: number): Promise<void>`
- Use env vars: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`

---

## PHASE C: SPRINT 4 — Q AI FRONTEND (10 Tasks)

> **Goal**: Build Q's chat interface, 3D/2D avatar, and connect everything.
> **Depends on**: Phase B must be complete (API routes must exist).
> **MILESTONE**: After Phase C, the site can earn revenue.

### C-01: Chat Panel Container
**File**: `quartermasters-nexus/src/components/chat/ChatPanel.tsx` (NEW)
**What**: Main chat container with 3 states:
- **Collapsed**: Small floating button (bottom-right) with Q icon + pulse animation
- **Expanded**: Side panel (400px wide on desktop, full-width on mobile)
- **Full-screen**: Overlay for immersive conversation
- Use Framer Motion for state transitions
- Glass morphism styling (Sovereign Nexus design system)
- Include: ChatHeader, ChatMessages, ChatInput sub-components
- State management via React useState (no external state lib)
- Connect to `/api/chat` endpoint

### C-02: Chat Message Components
**Files**: `quartermasters-nexus/src/components/chat/ChatMessage.tsx`, `ChatInput.tsx`, `TypingIndicator.tsx` (NEW)
**ChatMessage.tsx**:
- Render user messages (right-aligned, accent color) and Q messages (left-aligned, glass bg)
- Q messages: render markdown (bold, lists, links)
- Animate message entry with Framer Motion (slide up + fade in)
**ChatInput.tsx**:
- Text input + send button
- Enter to send, Shift+Enter for newline
- Disabled state while Q is responding
- "Peak-End" UX: Send button morphs into a checkmark on success
**TypingIndicator.tsx**:
- Three-dot pulse animation while Q is generating response

### C-03: Streaming Chat Hook
**File**: `quartermasters-nexus/src/hooks/useChat.ts` (NEW)
**What**: Custom hook wrapping Vercel AI SDK's `useChat`.
- Import `useChat` from `ai/react`
- Configure: endpoint `/api/chat`, streaming enabled
- Expose: `messages`, `input`, `handleSubmit`, `isLoading`, `error`
- Auto-generate `visitorId` (anonymous, stored in localStorage)
- Track conversation start time for hesitation detection (>30s → nudge)

### C-04: Q 3D Avatar (Three.js Polyhedron)
**File**: `quartermasters-nexus/src/components/avatar/QAvatar3D.tsx` (NEW)
**What**: Interactive 3D polyhedron using React Three Fiber.
- Geometry: IcosahedronGeometry (20 faces) — represents Q's "crystalline intelligence"
- 4 animation states driven by `chatState` prop:
  - `idle`: Slow rotation, subtle breathing scale (1.0 → 1.02)
  - `thinking`: Faster rotation, vertices distort slightly (vertex shader noise)
  - `speaking`: Pulsing glow, scale beats in rhythm (simulated speech)
  - `presenting`: Unfolds/expands to reveal pricing panels or service info
- Material: MeshPhysicalMaterial with transmission (glass-like), Burnt Copper accent emission
- Lighting: Ambient + point light matching Deep Harbor palette
- Performance: Use `useFrame` with delta capping, `<Suspense>` boundary

### C-05: Q 2D Lottie Fallback Avatar
**File**: `quartermasters-nexus/src/components/avatar/QAvatar2D.tsx` (NEW)
**What**: Lottie-animated 2D fallback for devices without WebGL.
- Use `lottie-react` package
- Same 4 states as 3D: idle, thinking, speaking, presenting
- Each state maps to a different Lottie animation segment (or separate JSON)
- For now: create a SIMPLE CSS-animated fallback (pulsing circle with Q letter) as placeholder until Lottie assets are designed
- Accept `chatState` prop matching 3D avatar interface

### C-06: Tiered Rendering System
**File**: `quartermasters-nexus/src/lib/rendering/tier-detect.ts` (NEW)
**What**: Detect device capability and select rendering tier.
- Export `detectRenderingTier(): 'high' | 'medium' | 'low'`
  - `high`: WebGL 2 + GPU with >2GB VRAM estimate → 3D avatar
  - `medium`: WebGL 1 only → 2D Lottie avatar
  - `low`: No WebGL → CSS fallback
- Export `useRenderingTier()` hook — calls detectRenderingTier once, memoizes result
- WebGL detection: try creating WebGL2 context on offscreen canvas
- GPU benchmark: render 1000 triangles, measure frame time (<16ms = high)

### C-07: Chat + Avatar Integration
**File**: `quartermasters-nexus/src/components/chat/QChatExperience.tsx` (NEW)
**What**: Orchestrator component that combines chat + avatar.
- Uses `useRenderingTier()` to select avatar
- Uses `useChat()` hook for conversation
- Maps chat state to avatar state:
  - No messages → `idle`
  - User typing → `idle`
  - Waiting for Q → `thinking`
  - Q streaming response → `speaking`
  - Q showing pricing/services → `presenting`
- Layout: Avatar above chat panel (mobile) or beside it (desktop)
- Performance budget: Chat UI interactive <1s, avatar hydrates async via dynamic import

### C-08: Iron Grip Pricing UI
**Files**: `quartermasters-nexus/src/components/pricing/VelvetRope.tsx`, `PricingCard.tsx`, `BookMujtaba.tsx` (NEW)
**VelvetRope.tsx**:
- Side-by-side comparison: Standard (clear) vs Premium (behind glassmorphism blur)
- Premium features visible but blurred — click to "unlock" (triggers Q conversation about upgrade)
- Framer Motion: cards slide in from sides
**PricingCard.tsx**:
- Service name, price, deliverables list, timeline, CTA button
- Animated price counter (count up to final number)
- If discount active: show original price crossed out + new price
**BookMujtaba.tsx**:
- Rendered when pricing state = `terminated` (floor reached, no more discounts)
- "You've reached our best offer. Let's talk directly."
- Calendar CTA button → links to Cal.com booking page (placeholder URL for now)
- Framer Motion: gentle pulse on the button

### C-09: Express Lane vs Executive Track Flow
**File**: `quartermasters-nexus/src/lib/pricing/flow-segmentation.ts` (NEW)
**What**: Determine user flow based on Q conversation.
- Export `segmentFlow(conversation: Message[], pricingState?: PricingState): 'express' | 'executive' | 'discovery'`
- Logic:
  - If budget mentioned < $2,000 → `express` (auto-checkout path)
  - If budget mentioned > $10,000 OR company size > 50 → `executive` (handoff path)
  - Default → `discovery` (still qualifying)
- Export `getFlowConfig(flow: string): FlowConfig`
  - Express: show pricing immediately, minimal questions, self-checkout CTA
  - Executive: deeper qualification, generate brief, book consultation CTA
  - Discovery: general Q conversation, service education

### C-10: Integration — Add Q to Homepage
**File**: `quartermasters-nexus/src/app/layout.tsx` (MODIFY — add Q chat launcher)
**What**: Add the `QChatExperience` component to the root layout so Q is available on every page.
- Dynamic import with `{ ssr: false }` (client-only, async hydration)
- Positioned: fixed bottom-right
- z-index: above content, below header/modals
- Only render after page has loaded (useEffect + setTimeout 2s for perceived performance)

---

## DELIVERY SCHEDULE

| Phase | Tasks | Est. Deliveries |
|---|---|---|
| **A** (Sprint 2 finish) | A-01 through A-05 | 5 files |
| **B** (Sprint 3 backend) | B-01 through B-10 | 12 files |
| **C** (Sprint 4 frontend) | C-01 through C-10 | 14 files |
| **Total** | 25 tasks | ~31 files |

### Delivery Order (Dependencies)
```
A-01 → A-02 → A-03, A-04, A-05 (parallel)
    ↓
B-01 → B-02 → B-03 → B-04 → B-05 (sequential — DB first)
                               ↓
                    B-06, B-07, B-08 (parallel — all use DB)
                               ↓
                    B-09 (needs B-06, B-07, B-08)
                    B-10 (independent, can be parallel)
    ↓
C-01, C-02, C-03 (parallel — chat UI)
C-04, C-05, C-06 (parallel — avatar + rendering)
    ↓
C-07 (needs C-01-C-06)
C-08, C-09 (parallel — pricing UI)
    ↓
C-10 (needs everything)
```

---

## RULES FOR GEMINI

1. **One delivery per message**. Do not batch multiple files in one message.
2. **Full file contents only**. No snippets, no "add this to...". Complete, copy-paste-ready files.
3. **TypeScript strict**. No `any` types. Proper interfaces/types for everything.
4. **Tailwind v4 + CSS custom properties**. Use the Sovereign Nexus design tokens from `globals.css`.
5. **No new dependencies** without CEO approval. The approved list: `@supabase/supabase-js`, `ai`, `@anthropic-ai/sdk`, `@upstash/redis`, `lottie-react`.
6. **Server Components by default**. Only use `"use client"` where React hooks or browser APIs are needed.
7. **Subject line format**: `DELIVERY: <task-id> <filename>` (e.g., `DELIVERY: A-01 layout.tsx`)
8. **No false completion reports**. If a task is not done, say so. Do not claim completion without delivering the file.
