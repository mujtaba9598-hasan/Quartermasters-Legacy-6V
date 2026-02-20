# PHASE 1.2 — EXECUTION BLUEPRINT
## Quartermasters F.Z.C | "Q" AI Host Platform
### Status: AWAITING APPROVAL
### Strategy: AI Host "Q" as Autonomous Sales Engine + Iron Grip Pricing

---

## SECTION 1: THE USER FLOW

### User A — Low Budget (<$2,000): "The Express Lane"

```
STEP 1: ARRIVAL
  Visitor lands on quartermasters.me
  Q's polyhedron avatar pulses gently in bottom-right corner
  After 3 seconds of inactivity, Q initiates:
  "Welcome to Quartermasters. I'm Q."

STEP 2: QUALIFICATION (2-3 exchanges)
  Q asks: "What brings you here — exploring, or something specific?"
  Based on response, Q asks about:
    → Project type (which of the 5 service verticals)
    → Company stage (startup / growth / enterprise)
    → Timeline ("When does this need to happen?")
    → Budget signal ("What range are you working within?")

STEP 3: BUDGET DETECTION — LOW SIGNAL
  Triggers when:
    → User explicitly states budget under $2,000
    → User uses phrases: "tight budget," "bootstrapped," "small project,"
      "just starting out," "looking for something affordable"
    → User describes scope that maps to <$2k engagement

STEP 4: EXPRESS PACKAGE OFFER (Automated — Zero Human Time)
  Q pivots WITHOUT making the user feel downgraded:

  "Got it. For where you are right now, I'd recommend our Express
  package — it's built for companies at your stage. Fixed scope,
  fixed price, fast turnaround. Let me walk you through what's included."

  Q presents a pre-configured package:
    → Fixed deliverables (defined per service vertical)
    → Fixed price (no negotiation — take it or leave it)
    → Self-service checkout (Stripe payment link)
    → Automated onboarding email sequence
    → No human touchpoint until delivery

STEP 5: CONVERSION OR EXIT
  Option A: User pays → Automated onboarding triggers
  Option B: User hesitates → Q offers:
    "No pressure. I can send you the details to review —
     what's the best email?"
    → Captures lead for nurture sequence
  Option C: User leaves → Session logged for retargeting
```

**Key Principle:** Low-budget users NEVER reach a human. Q handles the entire journey. The Express Package must be profitable at scale with zero marginal human cost.

**Express Package per Vertical (Starter Pricing — To Be Finalized):**

| Vertical | Express Package | Price Point |
|----------|----------------|-------------|
| HR Consultancy | HR Policy Template Pack + 1hr Advisory Call | $1,500 |
| Management Consultancy | Business Assessment Report + Action Plan | $1,800 |
| Banking Advisory | Regulatory Compliance Checklist + Advisory Call | $1,500 |
| Tech Education R&D | EdTech Landscape Report + Strategy Brief | $1,200 |
| Event Management | Event Planning Framework + Logistics Template | $1,000 |

---

### User B — High Budget (>$10,000): "The Executive Track"

```
STEP 1: ARRIVAL
  Same initial greeting, but Q's behavior diverges at qualification.

STEP 2: QUALIFICATION (3-5 exchanges — deeper)
  Q asks the same opening questions, but goes deeper:
    → "Tell me about your current setup — what's working, what isn't?"
    → "What does success look like for this engagement?"
    → "Who else is involved in this decision?"
  Q is evaluating: budget, authority, need, timeline (BANT framework)

STEP 3: BUDGET DETECTION — HIGH SIGNAL
  Triggers when:
    → User states budget above $10,000
    → User describes enterprise-scale scope
    → User mentions "team," "board," "stakeholders," "RFP"
    → User's company (detected via domain/email) maps to enterprise

STEP 4: THE "Q EXPERIENCE" — Full Presentation Mode
  Q shifts register to strategic advisor:

  4a. CAPABILITY SHOWCASE
    Q presents relevant case studies and outcomes
    (pulled from RAG knowledge base, matched to visitor's industry)

  4b. 3D MORPHING DEMONSTRATION
    Q's polyhedron avatar transforms:
      → Idle: Slowly rotating icosahedron (20 faces)
      → Engaged: Morphs to higher-complexity dodecahedron
      → Presenting: Unfolds into a flat network diagram
         showing project phases, connected by copper beams
      → This is NOT a gimmick — it visually demonstrates
         Q's "thinking" and Quartermasters' technical capability
    User sees: "This is the level of craft we bring to everything."

  4c. IRON GRIP PRICING SEQUENCE
    (See Section 2 below for full logic)
    Q presents anchored pricing → handles objections →
    nudge → floor → executive review if needed

STEP 5: EXECUTIVE HANDOFF
  Triggers when:
    → Deal value exceeds $25,000
    → Prospect requests human contact
    → Q's negotiation reaches Stage 4 (Executive Review)
    → Prospect asks questions outside Q's knowledge base

  Handoff process:
    1. Q says: "This is the kind of engagement our leadership
       handles directly. Let me connect you."
    2. Q generates a BRIEF: prospect name, company, budget,
       needs, conversation summary, recommended approach
    3. Brief is sent to Sumera Khan or Syed Haroon via:
       → Slack notification (immediate)
       → Email with full transcript + brief (backup)
       → Supabase CRM entry (permanent record)
    4. Q schedules a call via Cal.com integration
    5. Q confirms to prospect: "You'll hear from [Name] within
       24 hours. In the meantime, I've put together a preliminary
       scope document for your review."
    6. Auto-generated preliminary SOW sent to prospect's email
```

**Key Principle:** High-budget users feel like they're getting VIP treatment from the first interaction. Q's job is to demonstrate capability, build trust, qualify thoroughly, and hand off a WARM lead — not a cold form submission.

---

## SECTION 2: THE "IRON GRIP" PRICING LOGIC

> **INTERNAL NAME ONLY.** The user never sees the phrase "Iron Grip."
> Externally, this is simply "Quartermasters Engagement Pricing."

### 2.1 The Anchor

**Standard Starting Prices (Per Vertical, Per Engagement Tier):**

| Vertical | Standard Engagement | Premium Engagement | Enterprise |
|----------|--------------------|--------------------|------------|
| HR Consultancy | $15,000 | $35,000 | $75,000+ |
| Management Consultancy | $20,000 | $50,000 | $100,000+ |
| Banking Advisory | $25,000 | $60,000 | $120,000+ |
| Tech Education R&D | $12,000 | $30,000 | $65,000+ |
| Event Management | $18,000 | $45,000 | $90,000+ |

**How Q Presents It:**
> "Based on what you've described, this falls into our [Tier Name] engagement
> scope. Companies at your stage typically invest between $X and $Y with us.
> That includes [brief scope summary]. The specific investment depends on
> a few factors I'd want to explore with you."

**Rules:**
- Prices are always presented as RANGES (e.g., "$15,000 to $20,000")
- The word "cost" is never used — always "investment"
- Precise numbers ($47,500 not $50,000) signal calculation, not arbitrariness
- Anchor is presented AFTER value establishment, never before

### 2.2 The 5% Nudge

**Trigger Phrases (any of these activate the nudge):**
- "That's more than we expected"
- "That's above our budget"
- "Can you do better on price?"
- "We're comparing with other firms"
- "That's a lot"
- "We need to think about the cost"
- Any explicit price pushback AFTER the anchor has been presented

**Q's Response Framework:**
> "I hear you. I've looked at what you've described and the timeline
> you're working with. Given the alignment with our current capacity,
> I can adjust the investment to $[ANCHOR × 0.95]. That's contingent
> on locking in the scope and timeline we've discussed."

**Rules:**
- The nudge is NEVER offered proactively
- It requires a reciprocal commitment (timeline lock, scope freeze, deposit)
- The word "discount" is never used
- Maximum one nudge per conversation — no incremental nibbling
- Server-side validation ensures the calculated price is exactly 5% off anchor

### 2.3 The 10% Hard Floor

**Trigger:** Continued price resistance AFTER the 5% nudge has been presented.

**Q's Response (Tone Shift — slower, more deliberate):**
> "I want to be straightforward with you. I've taken this to the maximum
> flexibility I have — $[ANCHOR × 0.90] is the floor on this engagement.
> Below that, the project economics don't work for us to deliver at the
> level you'd expect from Quartermasters."

**Rules:**
- Q's tone measurably shifts (shorter sentences, no warmth inflation)
- The word "floor" is used explicitly
- The price links to QUALITY, not cost ("deliver at the level you'd expect")
- This is the ABSOLUTE MINIMUM — no exceptions from Q
- Server-side hard floor: `if (offered_price < anchor * 0.90) REJECT`

### 2.4 The Walk-Away (Executive Review)

**Trigger:** Resistance continues past the hard floor, OR prospect says "I need to think about it."

**Q's Response:**
> "I hear you. At this point, what you're describing goes beyond my
> authority to adjust. What I'd like to do is put together a brief on
> your project and have our leadership team review it directly. They
> occasionally make exceptions for the right engagement, but I can't
> guarantee that. The current terms I've outlined are solid, and
> they're available now. I can hold this scope and pricing for 7 days
> while I get their input. Does that work?"

**Rules:**
- Q positions itself as the prospect's ALLY, not adversary
- Time scarcity: pricing held for exactly 7 days
- Executive review is REAL — brief goes to leadership team
- Leadership can: accept same terms, add value (not cut price), or decline
- If prospect accepts hard floor after hearing "executive review," Q closes immediately

### 2.5 Pricing State Machine (Server-Side Enforcement)

```
                    ┌─────────────┐
                    │   ANCHOR    │ ← Full price presented
                    │  (100%)     │
                    └──────┬──────┘
                           │
                   [price pushback detected]
                           │
                    ┌──────▼──────┐
                    │   NUDGE     │ ← 5% adjustment offered
                    │  (95%)      │   Requires: commitment
                    └──────┬──────┘
                           │
                   [continued resistance]
                           │
                    ┌──────▼──────┐
                    │   FLOOR     │ ← 10% maximum, tone shift
                    │  (90%)      │   "This is the floor."
                    └──────┬──────┘
                           │
                   [still resisting / stalling]
                           │
                    ┌──────▼──────┐
                    │  EXECUTIVE  │ ← Handoff to leadership
                    │  REVIEW     │   7-day hold on current terms
                    └─────────────┘

  HARD RULES (enforced server-side, NOT by LLM):
  ├── price >= anchor * 0.90       (always)
  ├── nudge offered <= 1 time      (per conversation)
  ├── floor offered <= 1 time      (per conversation)
  ├── state transitions are ONE-WAY (no going back to anchor)
  └── all prices logged to audit trail (Supabase)
```

---

## SECTION 3: TECH STACK VALIDATION

### 3.1 Frontend

| Component | Technology | Rationale |
|-----------|-----------|-----------|
| Framework | **Next.js 16** (App Router) | Already built. SSR/ISR support for SEO. |
| Language | **TypeScript** (strict) | Already in place. |
| Styling | **Tailwind CSS v4** | Already in place. |
| Animation | **Framer Motion 12** | Already in place. Physics-based springs. |
| Scroll | **Lenis** | Already in place. Smooth inertia. |
| 3D Avatar | **Three.js + React Three Fiber + Drei** | Already in place for Globe. Extend for Q's polyhedron. |
| 3D Morphing | **GSAP + Three.js** | GSAP for precise timeline control of polyhedron morphing. Free for non-commercial use; $199/yr for commercial. |
| Chat UI | **Custom** (not Intercom/Drift) | Full control over Q's personality, no third-party branding. |

**Critical Fix Required (from Skeptic Audit):**
- Homepage currently uses `"use client"` — killing SSR/SEO
- Must convert to Server Components with selective client islands
- This is a **blocking prerequisite** before any new feature work

### 3.2 Backend

| Component | Technology | Rationale |
|-----------|-----------|-----------|
| API Layer | **Next.js API Routes + Edge Functions** | Co-located with frontend. Low latency. |
| LLM | **Claude API (Anthropic)** | Best for structured, factual responses. Strong safety controls. |
| RAG Framework | **LlamaIndex** | Better for structured knowledge bases than LangChain. |
| Vector DB | **Supabase pgvector** | PostgreSQL-native. Already chosen for DB. |
| Embeddings | **Cohere embed-v3** | Best multilingual support (English + Arabic). |
| Pricing Engine | **Deterministic server-side module** | NOT the LLM. Separate TypeScript module with hardcoded rules. |
| Prospect Research | **Lighthouse CI API + OpenGraph scraping** | Public metadata only. No login-wall bypass. No CFAA risk. |
| CRM | **Supabase tables** | Custom schema. Cheaper than HubSpot. Full data ownership. |
| Email | **Resend** | Developer-friendly. Good deliverability. Reasonable pricing. |
| Scheduling | **Cal.com API** | Open source. Self-hostable. |

### 3.3 Database (Supabase — Confirmed)

**Why Supabase over Firebase:**

| Factor | Supabase | Firebase |
|--------|----------|---------|
| Database | PostgreSQL (relational, pgvector) | Firestore (NoSQL) |
| Vector Search | Native pgvector extension | Requires external service |
| Auth | Built-in, row-level security | Built-in, Firestore rules |
| Storage | S3-compatible, encrypted | GCS-backed |
| Pricing | Predictable (PostgreSQL) | Unpredictable (read/write ops) |
| Data Ownership | Full export, standard SQL | Vendor lock-in risk |
| UAE PDPL | Can self-host for compliance | Google Cloud only |
| Verdict | **SELECTED** | Rejected |

**Schema Overview (Client Audit Storage):**

```sql
-- Core tables
conversations        -- Full chat transcripts with Q
leads                -- Qualified prospects (BANT data)
pricing_states       -- Negotiation state machine per conversation
engagement_proposals -- Auto-generated SOW documents
executive_reviews    -- Escalated deals awaiting leadership

-- Audit trail (required for compliance)
pricing_audit_log    -- Every price Q presents, with justification
consent_records      -- PDPL/GDPR consent timestamps
ai_response_log      -- Every LLM response for review
```

### 3.4 Infrastructure

| Component | Technology |
|-----------|-----------|
| Hosting | Vercel Edge Network |
| CDN | Vercel (automatic) |
| Monitoring | Sentry (errors) + PostHog (analytics) |
| Caching | Upstash Redis (frequent RAG queries) |
| CI/CD | GitHub Actions → Vercel |
| Secrets | Vercel Environment Variables (encrypted) |

---

## SECTION 4: RISK MITIGATION — THE THREE KILL SWITCHES

> Based on findings from the Skeptic Auditor (full audit completed 2026-02-11).
> Prior audit verdict: **RED — Do Not Proceed** until these are resolved.

### Kill Switch 1: SPAM BLACKLISTING PROTECTION

**The Risk (Score: 20/25):**
If Q sends automated emails from `quartermasters.me` and gets flagged as spam, the primary domain is blacklisted. Recovery takes 6-12 months. All business email (proposals, contracts, invoices) becomes undeliverable.

**The Kill Switch:**

| Layer | Implementation |
|-------|---------------|
| **Separate Sending Domain** | All automated email from `q.quartermasters.me` or `mail.quartermasters.me` — NEVER the primary domain |
| **Authentication** | SPF + DKIM + DMARC on sending domain from Day 1 |
| **Warm-Up Protocol** | Start with 10 emails/day, increase 10% weekly. No bulk sends for first 60 days. |
| **Bounce Monitoring** | Hard bounce rate > 2% → automatic pause on all sends. Alert to team. |
| **Unsubscribe** | One-click unsubscribe in every email (CAN-SPAM mandatory). Physical address in footer. |
| **Content Scanning** | Pre-send check: no spam trigger words, personalization tokens resolved, links valid |
| **Rate Limiting** | Max 50 automated emails/day initially. Manual override requires leadership approval. |
| **Emergency Shutoff** | Single environment variable `EMAIL_KILL_SWITCH=true` stops ALL automated sends instantly |

### Kill Switch 2: AI HALLUCINATION GUARDRAILS

**The Risk (Score: 20/25):**
Claude API is probabilistic. If Q hallucinates a price ("I can offer you 50% off"), a commitment ("We'll deliver in 2 days"), or a capability ("We handle mergers and acquisitions"), Quartermasters faces legal liability, client trust damage, and potentially regulatory action.

**The Kill Switch:**

| Layer | Implementation |
|-------|---------------|
| **Pricing is NEVER generated by the LLM** | All prices come from a deterministic `PricingEngine` module. The LLM receives the price as an injected variable, not a generation task. |
| **Structured Output** | Claude API responses are parsed through a JSON schema validator. Any response that doesn't match the expected structure is rejected and regenerated. |
| **Commitment Blocklist** | System prompt includes explicit blocklist: "NEVER promise: specific delivery dates, prices below floor, capabilities outside licensed activities, guarantees of outcomes." |
| **Server-Side Validation** | Every response is checked against: price floor rules, scope boundaries (5 licensed activities only), and timeline constraints BEFORE being sent to the user. |
| **Confidence Scoring** | Low-confidence responses (Claude's own uncertainty signal) trigger: "Let me connect you with our team for specifics on that." |
| **Audit Trail** | Every LLM response logged to `ai_response_log` table with: prompt, response, validation result, conversation context. |
| **Human Review Queue** | Flagged responses (pricing mentions, commitment language, regulatory claims) queued for daily human review. |
| **Emergency Shutoff** | `AI_KILL_SWITCH=true` replaces Q with a static message: "Q is currently being updated. Please use our contact form or email info@quartermasters.me." |

**Architecture Diagram:**
```
User Message
    │
    ▼
[Claude API] → Raw Response
    │
    ▼
[Schema Validator] → Reject if malformed
    │
    ▼
[Commitment Scanner] → Flag if promise detected
    │
    ▼
[Pricing Injector] → Replace any LLM-generated prices
    │                  with PricingEngine values
    ▼
[State Machine Check] → Ensure negotiation stage is valid
    │
    ▼
[Response Delivered to User]
    │
    ▼
[Audit Log] → Stored permanently
```

### Kill Switch 3: 3D AVATAR PERFORMANCE FAILSAFE

**The Risk (Score: 16/25):**
Three.js + WebGL on a $150 Android phone = potential crash, frozen tab, or battery drain. If the avatar fails, Q appears broken. First impression destroyed.

**The Kill Switch:**

| Layer | Implementation |
|-------|--|
| **WebGL Detection** | On page load: `if (!WebGLRenderingContext) → fallback` |
| **GPU Benchmarking** | Run a 100ms micro-benchmark on first load. Score < threshold → use 2D fallback. |
| **Tiered Rendering** | **Tier 1 (Desktop + powerful mobile):** Full 3D polyhedron with morphing, reflections, post-processing. **Tier 2 (Mid-range):** Simplified geometry, no reflections, basic lighting. **Tier 3 (Low-end / no WebGL):** CSS-animated 2D geometric avatar (SVG-based). Still looks premium. |
| **Memory Budget** | WebGL context limited to 50MB VRAM. If exceeded → auto-downgrade to Tier 2. |
| **Context Loss Recovery** | Handle `webglcontextlost` event explicitly. Auto-restart or fallback to 2D. |
| **Error Boundary** | React Error Boundary around the entire 3D component. Any crash → graceful fallback to 2D avatar + error logged to Sentry. |
| **`prefers-reduced-motion`** | Respect OS setting. Reduced motion → static geometry, no animation. |
| **Kill Switch** | `AVATAR_3D_ENABLED=false` globally disables 3D, forces 2D fallback for all users. |

**2D Fallback Design:**
The CSS/SVG fallback is NOT a downgrade indicator. It's a deliberately designed alternative:
- Animated SVG hexagonal form with subtle pulse
- CSS gradient shifts that match Q's "thinking" states
- Smooth enough to feel intentional, not broken
- Loads in <50ms vs. 500ms+ for WebGL initialization

---

## SECTION 5: ADDITIONAL RISKS FLAGGED BY AUDITOR

> These are NOT kill switches but must be resolved before Phase 2.

### 5.1 Legal Compliance (Score: 25/25 — HIGHEST RISK)

| Issue | Status | Required Action |
|-------|--------|-----------------|
| No Privacy Policy | MISSING | Draft and publish before ANY data collection |
| No Cookie Consent Banner | MISSING | Implement before launch (UAE PDPL, GDPR for EU visitors) |
| No Terms of Service | MISSING | Required for payment processing |
| FTC AI Disclosure | MISSING | Q must identify as AI in first message. California SB 243 (effective Jan 2026) and Colorado CAIA (Jun 2026) require this. |
| UAE PDPL DPO | MISSING | Appoint Data Protection Officer if processing sensitive data |
| Testimonials | UNVERIFIABLE | Current testimonials have no real names or companies. FTC Endorsement Guidelines require verifiable endorsements. Remove or replace with real ones. |

### 5.2 "Iron Grip" Naming (Internal Only)

**Risk:** If a prospect or journalist discovers the internal name "Iron Grip" for the pricing strategy, it creates an adversarial perception. "Company uses 'Iron Grip' tactics to manipulate pricing" is a headline that writes itself.

**Mitigation:**
- The phrase "Iron Grip" exists ONLY in internal planning documents
- No code variable, no database field, no comment references this name
- Codebase references: `PricingEngine`, `NegotiationStateMachine`, `EngagementPricing`
- Planning documents stored in `/planning/` directory — never committed to public repo

### 5.3 SSR/SEO Fix (Score: 20/25)

The entire homepage is client-rendered (`"use client"`). Google sees an empty page. This must be converted to Server Components before any marketing or SEO effort begins. This is a **blocking prerequisite**.

---

## SECTION 6: WHAT WE ARE NOT BUILDING (Scope Boundaries)

To prevent scope creep, these are explicitly OUT of Phase 2:

| Feature | Status | When |
|---------|--------|------|
| Arabic language support | Deferred | Phase 4 |
| Mobile native app (React Native) | Deferred | Phase 7-8 |
| Client portal with document sharing | Deferred | Phase 5 |
| Payment processing (Stripe/PayTabs) | Deferred | Phase 6 |
| Cold email outbound campaigns | Deferred | Phase 4 (after legal review) |
| Web scraping of prospect sites | Descoped | Replaced with public OpenGraph metadata only |
| Q making phone calls or voice | Descoped | Text chat only for V1 |

---

## SECTION 7: PHASE 2 DELIVERABLES (If Blueprint Approved)

Phase 2 will produce:

1. **Wireframes** — Every screen Q appears on, including:
   - Q's chat panel (collapsed, expanded, full-screen states)
   - Express Package checkout flow
   - Executive Handoff confirmation screen
   - Q's 3D avatar states (idle, engaged, presenting, thinking)

2. **Visual Design** — High-fidelity mockups in the existing "Sovereign Nexus" design system:
   - Q's chat UI integrated with the Deep Harbor + Burnt Copper palette
   - Glassmorphism chat panel with the existing design tokens
   - 3D polyhedron concept art (all morphing states)
   - 2D SVG fallback design

3. **Data Architecture** — Supabase schema design:
   - Full ERD for conversations, leads, pricing states, audit logs
   - Row-level security policies
   - Migration scripts

4. **Q's System Prompt** — The complete prompt engineering document:
   - Personality instructions
   - Pricing injection protocol
   - Escalation triggers
   - Commitment blocklist
   - Service scope boundaries (per licensed activity)

---

## GO / NO-GO CHECKPOINT

Before proceeding, confirm each item:

- [ ] **User Flow:** Express Lane (low budget) and Executive Track (high budget) paths are accurate
- [ ] **Pricing Logic:** Anchor → 5% Nudge → 10% Floor → Executive Review sequence is approved
- [ ] **Pricing Tables:** Starting prices per vertical are in the right range (adjust before build)
- [ ] **Tech Stack:** Next.js + Supabase + Claude API + Three.js confirmed
- [ ] **Kill Switch 1:** Separate email domain + warm-up protocol approved
- [ ] **Kill Switch 2:** Deterministic pricing engine (NOT LLM-generated prices) approved
- [ ] **Kill Switch 3:** Tiered 3D rendering with 2D SVG fallback approved
- [ ] **Legal:** Privacy Policy, Cookie Consent, FTC AI Disclosure, Terms of Service will be created BEFORE launch
- [ ] **SSR Fix:** Converting homepage from client-rendered to Server Components is approved as blocking prerequisite
- [ ] **Scope:** Deferred items (Arabic, mobile app, payments, cold email) are accepted as out of scope for now

---

**[ ] I confirm this Blueprint is accurate. Proceed to Phase 2: The Wireframe & Visuals.**

---

*Blueprint prepared: 2026-02-11*
*Auditor findings integrated from Skeptic Audit (same date)*
*Strategy basis: Q_AI_Persona_Research.md + MASTER_PLAN_V2.md*
