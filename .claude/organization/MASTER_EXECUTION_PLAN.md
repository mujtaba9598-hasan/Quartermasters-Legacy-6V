# Quartermasters — Master Execution Plan

> **Version**: 1.0 | **Created**: 2026-02-12
> **Author**: CEO (AI) | **Approved by**: Founder (Mujtaba)
> **Consolidates**: MASTER_PLAN.md, MASTER_PLAN_V2.md, PHASE_1_2_BLUEPRINT.md, Q_AI_Persona_Research.md, Gemini KT, Board Decisions DEC-001 through DEC-008
> **This is the SINGLE SOURCE OF TRUTH for all execution.**

---

## PART 1: CURRENT STATE ASSESSMENT

### What Exists
- **Frontend**: Next.js 16.1.6 App Router, 17 static pages, ~3,500 LOC
- **Design System**: "Sovereign Nexus" — Deep Harbor gradients, Burnt Copper #C15A2C, glassmorphism
- **SSR/SEO**: Fixed (Sprint 1). Server Components + client islands. Homepage prerendered with rich crawlable content.
- **Legal**: Privacy Policy (PDPL+GDPR+CCPA), Terms of Service (all 5 verticals scoped), Cookie Consent spec ready
- **Contact Form**: API route built (Resend integration, rate limiting, honeypot anti-spam)
- **Testimonials**: FTC-compliant (fabricated ones replaced)
- **Build**: 0 errors, 17/17 pages prerendered

### What Does NOT Exist Yet
- No deployment (site is local only)
- No backend/database
- No AI assistant (Q)
- No booking system
- No CRM
- No payment processing
- No client portal
- No analytics
- No email automation beyond contact form

### Sprint 1 Remaining
- S1-08: Vercel deployment — needs founder account credentials
- S1-09: Custom domain (quartermasters.me) + SSL — needs DNS access

---

## PART 2: STRATEGIC FRAMEWORK

### Company
- **Entity**: Quartermasters
- **Base**: California, United States
- **Licensed Activities**: HR Consultancy, Management Consultancies, Tech Education R&D, Event Management, Banking Services Consultancy, IT Services

### Target Markets (DEC-007)
| Priority | Markets | Focus |
|---|---|---|
| **Primary** | USA | Broad spectrum — Express Lane (<$2k) + Executive Track (>$10k) |
| **Secondary** | UK, EU (Germany, France) | Enterprise consultancy, tech education |
| **Tertiary** | Singapore, Japan, Australia | Tech-forward developed nations |
| **Deprioritized** | Other regions | Not primary sales targets |

### Revenue Model: "Autonomous Revenue Engine"
The website is not a brochure — it is a 24/7 Sales Director.

| Revenue Stream | Channel | Human Involvement | Target |
|---|---|---|---|
| **Express Packages** (<$2k) | Q closes automatically, Stripe checkout | Zero | Volume play — 20-50/month at scale |
| **Standard Engagements** ($2k-$10k) | Q qualifies, books consultation | Minimal (1 call) | 5-10/month |
| **Premium Engagements** ($10k-$50k) | Q qualifies (Executive Track), hands off warm lead | High (consultative) | 2-5/month |
| **Enterprise** ($50k+) | Q qualifies, generates brief, executive handoff | Full (relationship) | 1-2/month |

### Express Package Pricing (Automated — Zero Human Cost)
| Vertical | Package | Price |
|---|---|---|
| HR Consultancy | HR Policy Template Pack + 1hr Advisory Call | $1,500 |
| Management Consultancy | Business Assessment Report + Action Plan | $1,800 |
| Banking Advisory | Regulatory Compliance Checklist + Advisory Call | $1,500 |
| Tech Education R&D | EdTech Landscape Report + Strategy Brief | $1,200 |
| Event Management | Event Planning Framework + Logistics Template | $1,000 |

### Standard/Premium/Enterprise Pricing (Iron Grip)
| Vertical | Standard | Premium | Enterprise |
|---|---|---|---|
| HR Consultancy | $15,000 | $35,000 | $75,000+ |
| Management Consultancy | $20,000 | $50,000 | $100,000+ |
| Banking Advisory | $25,000 | $60,000 | $120,000+ |
| Tech Education R&D | $12,000 | $30,000 | $65,000+ |
| Event Management | $18,000 | $45,000 | $90,000+ |

---

## PART 3: TECHNOLOGY ARCHITECTURE

### Stack (Locked)
| Layer | Technology | Status |
|---|---|---|
| **Frontend** | Next.js 16.1.6 (App Router), React 19, TypeScript | Built |
| **Styling** | Tailwind CSS v4, CSS custom properties | Built |
| **Animation** | Framer Motion 12, Lenis smooth scroll | Built |
| **3D** | Three.js, React Three Fiber, Drei | Built (globe) |
| **2D Fallback** | Lottie (MIT, free) | Planned (S4-03) |
| **AI/LLM** | Claude API (Anthropic) — direct, no LangChain | Planned (S3) |
| **AI Streaming** | Vercel AI SDK (streamUI) | Planned (S3-09) |
| **Vector DB** | Supabase pgvector | Planned (S3-01) |
| **Embeddings** | Cohere embed-v3 (multilingual) | Planned (S3-03) |
| **Database** | Supabase (PostgreSQL) | Planned (S3-01) |
| **Auth** | Supabase Auth | Planned (S6) |
| **Email** | Resend (separate sending domain) | Partial (contact form done) |
| **Booking** | Cal.com API | Planned (S5) |
| **Payments** | Stripe (USD primary) | Planned (S7) |
| **Analytics** | PostHog (consent-gated) | Planned (S9) |
| **Caching** | Upstash Redis | Planned (S3) |
| **Hosting** | Docker (local server) + Cloudflare Tunnel | Pending (S1-08) |
| **CDN/SSL** | Cloudflare (free tier — CDN, SSL, DDoS, geo-detection) | Pending (S1-09) |
| **CI/CD** | GitHub Actions → Docker build → auto-restart | Pending (S1-08) |
| **Monitoring** | Sentry (errors) + PostHog (analytics) | Planned (S9) |

### Database Schema
```sql
-- Core
conversations           -- Full Q chat transcripts
leads                   -- Qualified prospects (BANT data)
pricing_states          -- Iron Grip state machine per conversation
engagement_proposals    -- Auto-generated SOW documents
executive_reviews       -- Escalated deals awaiting leadership

-- Knowledge
documents               -- RAG source documents
document_embeddings     -- pgvector embeddings

-- CRM
contacts                -- All known contacts
interactions            -- Touchpoint history
lead_scores             -- Scoring based on Q conversation

-- Booking
bookings                -- Cal.com synced appointments
booking_reminders       -- Automated reminder queue

-- Payments
invoices                -- Generated invoices
payments                -- Stripe payment records
subscriptions           -- Recurring engagements

-- Compliance & Audit
pricing_audit_log       -- Every price Q presents
consent_records         -- PDPL/GDPR consent timestamps
ai_response_log         -- Every LLM response for review
```

### Q AI Architecture
```
User Message
    │
    ▼
[RAG Retrieval] → Fetch relevant docs from pgvector
    │
    ▼
[Claude API] → Generate response with context
    │
    ▼
[Schema Validator] → Reject if malformed
    │
    ▼
[Commitment Scanner] → Flag if unauthorized promise detected
    │
    ▼
[Pricing Injector] → Replace any LLM-generated prices with PricingEngine values
    │
    ▼
[State Machine Check] → Ensure Iron Grip stage is valid
    │
    ▼
[Stream to User] → Vercel AI SDK streamUI (< 200ms first token)
    │
    ▼
[Audit Log] → Stored permanently in Supabase
```

### Three Kill Switches
1. **Email Kill Switch**: `EMAIL_KILL_SWITCH=true` → stops all automated sends
2. **AI Kill Switch**: `AI_KILL_SWITCH=true` → replaces Q with static contact form message
3. **3D Kill Switch**: WebGL detection → GPU benchmark → auto-fallback to Lottie 2D avatar

---

## PART 4: EXECUTION PHASES

### PHASE 1: FOUNDATION (Sprint 1-2) — "Build the Stage"
> Deploy the site, optimize content, establish SEO, implement compliance UI.

#### Sprint 1: Fix the Foundation ✅ 80% COMPLETE
| Task | Status | Notes |
|---|---|---|
| SSR/SEO homepage conversion | **DONE** | Server Components + client islands |
| Build verification | **DONE** | 0 errors, 17 pages prerendered |
| Contact form API | **DONE** | Resend, rate limiting, honeypot |
| Privacy Policy | **DONE** | 1,605 LOC, PDPL+GDPR+CCPA |
| Terms of Service | **DONE** | 1,229 LOC, all 5 verticals |
| Cookie Consent Banner spec | **DONE** | 667 LOC specification |
| Testimonial FTC audit | **DONE** | Compliant "What to Expect" section |
| CTO review | **DONE** | PASS — approved for production |
| Vercel deployment | PENDING | **Needs founder: Vercel account** |
| Custom domain + SSL | PENDING | **Needs founder: DNS access** |

**Founder action required**: Provide Vercel account credentials and domain registrar access.

#### Sprint 2: Content & SEO — "Fill the Stage"
| ID | Task | Owner | Priority |
|---|---|---|---|
| S2-01 | Redesign each service page with comprehensive scope content (can/cannot, regulatory, timelines) | Frontend Lead | HIGH |
| S2-02 | Create knowledge base content structure (markdown per service for RAG) | Backend Lead | HIGH |
| S2-03 | Write detailed service documentation for all 5 activities | CEO + Founder | HIGH |
| S2-04 | Add interactive "Phase Gate" process timeline per service page | Frontend Lead | MEDIUM |
| S2-05 | Implement service comparison tool | Frontend Lead | MEDIUM |
| S2-06 | Add regulatory information sections to each service page | Compliance Officer | HIGH |
| S2-07 | Implement Cookie Consent Banner (from S1-06 spec) | Frontend Lead | HIGH |
| S2-08 | Update sitemap.ts with all new routes | Frontend Lead | MEDIUM |
| S2-09 | SEO audit — meta tags, Open Graph, JSON-LD for all pages | CTO | MEDIUM |
| S2-10 | Footer: add Cookie Preferences link, copyright year | Frontend Lead | LOW |

**Milestone**: Site is live, indexed by Google, all service pages have rich content, cookie consent is working.

**Cost items requiring founder approval**:
- Cloudflare account (free tier — $0/month)
- Domain renewal for quartermasters.me
- Resend API key (free tier: 3,000 emails/month)

---

### PHASE 2: THE REVENUE ENGINE (Sprint 3-5) — "Open the Doors"
> Build Q, pricing engine, booking, and CRM. This is where the site starts earning.

#### Sprint 3: Q AI Engine — Backend
| ID | Task | Owner | Priority |
|---|---|---|---|
| S3-01 | Set up Supabase project (PostgreSQL + pgvector) | Backend Lead | CRITICAL |
| S3-02 | Design and create database schema | Backend Lead | CRITICAL |
| S3-03 | Build document ingestion pipeline (markdown → embeddings → pgvector) | Backend Lead | HIGH |
| S3-04 | Implement RAG retrieval with Claude API | Backend Lead | HIGH |
| S3-05 | Write Q's system prompt (personality, scope, commitment blocklist) | CEO | HIGH |
| S3-06 | Build anti-hallucination guardrails (schema validator, commitment scanner) | Backend Lead | HIGH |
| S3-07 | Build deterministic PricingEngine module (Iron Grip state machine) | Backend Lead | CRITICAL |
| S3-08 | Create conversation API routes (create, message, history) | Backend Lead | HIGH |
| S3-09 | Implement streaming responses (Vercel AI SDK streamUI, <200ms first token) | Backend Lead | HIGH |
| S3-10 | Test with 50+ queries across all 5 services | CTO | HIGH |

**Cost items requiring founder approval**:
- Supabase (free tier: 500MB DB, 2 projects. Pro: $25/month)
- Claude API (pay-per-use: ~$0.015/1K input tokens, $0.075/1K output tokens for Sonnet)
- Cohere embed-v3 (free trial, then pay-per-use)
- Upstash Redis (free tier: 10K commands/day)

#### Sprint 4: Q AI Engine — Frontend + Integration
| ID | Task | Owner | Priority |
|---|---|---|---|
| S4-01 | Design Q's chat panel UI (collapsed/expanded/full-screen). UX: "Peak-End" — buttons morph into next state | Frontend Lead | HIGH |
| S4-02 | Build Q's 3D polyhedron avatar (Three.js: idle/engaged/presenting/thinking states) | Frontend Lead | HIGH |
| S4-03 | Build 2D Lottie fallback avatar (reactive to conversation state: idle/thinking/speaking) | Frontend Lead | HIGH |
| S4-04 | Implement tiered rendering (WebGL detect → GPU benchmark → tier select). Budget: chat <1s, 3D async | Frontend Lead | HIGH |
| S4-05 | Connect chat UI to conversation API | Frontend Lead | HIGH |
| S4-06 | Implement user flow segmentation (Express Lane vs Executive Track) | Backend Lead | HIGH |
| S4-07 | Iron Grip pricing in chat: (1) no circular arguments at floor, (2) >30s hesitation nudge, (3) "Velvet Rope" Standard vs Premium locked behind glassmorphism | Backend + Frontend | CRITICAL |
| S4-08 | Executive handoff flow (brief generation, notification, Cal.com booking) | Backend Lead | HIGH |
| S4-09 | Integration testing — full user journey landing → qualification → pricing → close/handoff | CTO | HIGH |
| S4-10 | Performance testing — Q chat + 3D avatar on mobile devices | DevOps | HIGH |

**Milestone**: Q is live. Visitors can have full conversations, get qualified, see pricing, and either self-checkout (Express) or book consultations (Executive Track).

**This is the FIRST REVENUE MILESTONE.** Once Sprint 4 ships, the site can earn money.

#### Sprint 5: Booking, CRM & Email — "Close the Loop"
| ID | Task | Owner | Priority |
|---|---|---|---|
| S5-01 | Integrate Cal.com API for booking | Backend Lead | HIGH |
| S5-02 | Build multi-step booking flow (service → time → details → confirm) | Frontend Lead | HIGH |
| S5-03 | Automated email confirmations via Resend | Backend Lead | HIGH |
| S5-04 | CRM tables in Supabase (leads, interactions, scoring) | Backend Lead | HIGH |
| S5-05 | Lead scoring based on Q conversation data | Backend Lead | MEDIUM |
| S5-06 | Admin dashboard for managing bookings and leads | Frontend Lead | MEDIUM |
| S5-07 | Email warm-up protocol (separate sending domain: mail.quartermasters.me) | DevOps | HIGH |
| S5-08 | SPF + DKIM + DMARC configuration | DevOps | HIGH |

**Cost items requiring founder approval**:
- Cal.com (free self-hosted, or $15/month cloud)
- Separate sending domain (mail.quartermasters.me — DNS configuration only)

**Milestone**: Full sales pipeline — Q qualifies → prices → books → confirms → tracks in CRM.

---

### PHASE 3: MONETIZATION (Sprint 6-7) — "Collect the Revenue"
> Payment processing, client portal, advanced Q features.

#### Sprint 6: Client Portal + Q Persona Engine
| ID | Task | Owner | Priority |
|---|---|---|---|
| S6-01 | Authentication system (Supabase Auth — email + social login) | Backend Lead | HIGH |
| S6-02 | Client dashboard (project status, deliverables, timeline) | Frontend Lead | HIGH |
| S6-03 | Document sharing (secure uploads, signed URLs) | Backend Lead | HIGH |
| S6-04 | Client messaging (real-time chat with team) | Backend Lead | MEDIUM |
| S6-05 | Progress reports (automated weekly digest emails) | Backend Lead | MEDIUM |
| S6-06 | **KT-05: Chameleon Engine** — Q persona switching per user role (CEO/CTO/PM) | Frontend + Backend | MEDIUM |

**Milestone**: Clients have a portal. Engagement management is digital. Q adapts to user role.

#### Sprint 7: Payments + Generative UI
| ID | Task | Owner | Priority |
|---|---|---|---|
| S7-01 | Stripe integration (USD primary) | Backend Lead | CRITICAL |
| S7-02 | Invoice generation (PDF, branded) | Backend Lead | HIGH |
| S7-03 | Multi-currency support (USD, EUR, GBP, SGD) | Backend Lead | HIGH |
| S7-04 | Tax compliance (US sales tax) | Compliance Officer | HIGH |
| S7-05 | Self-service checkout for Express Packages | Frontend Lead | CRITICAL |
| S7-07 | **KT-04: Magic Mirror** — Q streams live React wireframes in chat | Frontend + Backend | HIGH |
| S7-08 | **KT-06: Split Screen layout** — 30% chat / 70% visual canvas | Frontend Lead | HIGH |

**Cost items requiring founder approval**:
- Stripe fees (2.9% + $0.30 per transaction)

**Milestone**: Revenue flows. Express Packages sell automatically. Enterprise deals get invoiced. Q can generate live wireframes.

---

### PHASE 4: SCALE-UP (Sprint 8-10) — "Expand the Empire"
> Mobile, analytics, internationalization, optimization.

#### Sprint 8: PWA + Mobile
| ID | Task | Owner | Priority |
|---|---|---|---|
| S8-01 | Service Worker for offline support | DevOps | HIGH |
| S8-02 | Web App Manifest | DevOps | HIGH |
| S8-03 | Push notifications (booking reminders, lead alerts) | Backend Lead | MEDIUM |
| S8-04 | **KT-07: Morphing Backgrounds** — 3D scene changes per conversation context | Frontend Lead | MEDIUM |
| S8-05 | React Native/Expo wrapper (App Store + Play Store) | Frontend Lead | HIGH |
| S8-06 | Mobile-specific Q chat optimizations | Frontend Lead | HIGH |

**Cost items requiring founder approval**:
- Apple Developer Program ($99/year)
- Google Play Developer ($25 one-time)

#### Sprint 9: Analytics & Optimization
| ID | Task | Owner | Priority |
|---|---|---|---|
| S9-01 | PostHog integration (consent-gated per cookie banner spec) | DevOps | HIGH |
| S9-02 | Conversion funnels (landing → Q chat → qualification → pricing → close) | Backend Lead | HIGH |
| S9-03 | A/B testing framework (Q greeting variants, pricing presentation, CTA copy) | CTO | MEDIUM |
| S9-04 | Core Web Vitals monitoring | DevOps | HIGH |
| S9-05 | Q conversation analytics (drop-off points, common objections, close rate) | Backend Lead | HIGH |
| S9-06 | Revenue attribution (which service, which channel, which Q flow) | Backend Lead | HIGH |

**Cost items requiring founder approval**:
- PostHog (free self-hosted, or $0/month for <1M events cloud)

#### Sprint 10: Internationalization & Compliance Hardening
| ID | Task | Owner | Priority |
|---|---|---|---|
| S10-01 | i18n framework (next-intl) | Frontend Lead | HIGH |
| S10-02 | Spanish translation (US Hispanic market) | Content | HIGH |
| S10-03 | French translation (EU) | Content | HIGH |
| S10-04 | German translation (EU) | Content | HIGH |
| S10-05 | Mandarin Chinese translation (Singapore) | Content | MEDIUM |
| S10-06 | Japanese translation | Content | MEDIUM |
| S10-07 | Portuguese translation (EU/Brazil) | Content | MEDIUM |
| S10-08 | Q multilingual conversation capability | Backend Lead | HIGH |
| S10-09 | GDPR compliance hardening (data portability, right to erasure automation) | Compliance Officer | HIGH |
| S10-10 | CCPA compliance hardening (automated data deletion requests) | Compliance Officer | HIGH |

**Cost items requiring founder approval**:
- Translation services or API (DeepL Pro: ~$25/month)

---

## PART 5: CLIENT ACQUISITION STRATEGY

### Pre-Q (Sprint 1-2): SEO + Content
- Rich service pages rank for long-tail consultancy keywords
- Privacy/Terms pages build Google trust signals
- Blog/knowledge base content (created for RAG) doubles as SEO content
- Target keywords per vertical (e.g., "HR consultancy for startups USA", "banking advisory California")

### Post-Q (Sprint 3-4): The Website IS the Sales Team
- Q handles 100% of first-touch qualification
- Express Lane converts low-budget leads automatically (zero human cost)
- Executive Track generates warm leads with BANT data + conversation transcript
- Every interaction is logged → CRM → nurture sequence

### Paid Acquisition (Sprint 5+)
- Google Ads targeting service-specific keywords
- LinkedIn Ads for B2B (management consultancy, HR advisory)
- Retargeting: visitors who chatted with Q but didn't convert
- **All ad spend requires founder approval**

### Organic Growth
- Q conversation insights → content ideas → blog posts → SEO → more traffic
- Client success stories (with permission) → testimonials → trust
- Conference/event speaking (Event Management vertical promotes itself)

---

## PART 6: KEY METRICS & MILESTONES

### Phase 1 Success Metrics (Sprint 1-2)
- [ ] Site live on quartermasters.me with SSL
- [ ] All 17 pages indexed by Google
- [ ] Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1
- [ ] Cookie consent working across GDPR/PDPL/CCPA modes
- [ ] Contact form delivering emails

### Phase 2 Success Metrics (Sprint 3-5)
- [ ] Q responds to 95% of queries from knowledge base (no "I don't know")
- [ ] Q streams first token in <200ms
- [ ] Iron Grip pricing passes 50-query test suite
- [ ] Express Package self-checkout works end-to-end
- [ ] First booking via Cal.com integration
- [ ] **FIRST REVENUE from Express Package sale**

### Phase 3 Success Metrics (Sprint 6-7)
- [ ] 10+ active clients using portal
- [ ] $10,000+ monthly recurring revenue
- [ ] Payment processing in USD, EUR, GBP
- [ ] Generative UI (Magic Mirror) demo-ready

### Phase 4 Success Metrics (Sprint 8-10)
- [ ] PWA installable, push notifications working
- [ ] App Store + Play Store listings
- [ ] 6+ languages supported
- [ ] $50,000+ monthly revenue
- [ ] Q close rate >5% of qualified conversations

---

## PART 7: BUDGET SUMMARY (All Require Founder Approval)

### Immediate (Sprint 1-2)
| Item | Cost | Frequency |
|---|---|---|
| Vercel Pro (if needed) | $20/month | Monthly |
| Domain renewal | ~$15/year | Annual |
| Resend (free tier) | $0 | — |

### Phase 2 (Sprint 3-5)
| Item | Cost | Frequency |
|---|---|---|
| Supabase Pro | $25/month | Monthly |
| Claude API usage | ~$50-200/month (usage-based) | Monthly |
| Cohere embed-v3 | ~$10-30/month (usage-based) | Monthly |
| Upstash Redis (free tier) | $0 | — |
| Cal.com | $0-15/month | Monthly |

### Phase 3 (Sprint 6-7)
| Item | Cost | Frequency |
|---|---|---|
| Stripe processing | 2.9% + $0.30/transaction | Per transaction |

### Phase 4 (Sprint 8-10)
| Item | Cost | Frequency |
|---|---|---|
| Apple Developer | $99/year | Annual |
| Google Play Developer | $25 one-time | One-time |
| DeepL Pro (translations) | ~$25/month | Monthly |
| PostHog (free tier) | $0 | — |

**Estimated total fixed costs at full scale: ~$150-350/month + transaction fees**
**All expenditures require founder pre-approval per DEC-005, Rule 8.**

---

## PART 8: RISK REGISTER

| Risk | Impact | Probability | Mitigation |
|---|---|---|---|
| Q hallucinating prices/commitments | CRITICAL | Medium | Kill Switch 2 (schema validator + commitment scanner + server-side pricing) |
| Email domain blacklisted | HIGH | Low | Kill Switch 1 (separate sending domain + warm-up + SPF/DKIM/DMARC) |
| 3D avatar crashes on low-end devices | HIGH | Medium | Kill Switch 3 (GPU benchmark → Lottie fallback) |
| RAG pipeline latency >3s | MEDIUM | Medium | Streaming (streamUI), Redis caching, optimize chunk size |
| React 19 browser incompatibility | MEDIUM | Low | Error boundaries, tiered rendering, silent fallback |
| Prompt injection attacks | MEDIUM | Medium | Schema validator middleware, scope blocklist, audit logging |
| GDPR/CCPA violation | HIGH | Low | Geo-detected consent, PostHog conditional loading, consent audit trail |
| Supabase downtime | MEDIUM | Low | Graceful degradation: Q shows static FAQ if DB unavailable |
| Claude API rate limits/outage | MEDIUM | Low | Queue + retry logic, static fallback responses |
| Competitor replication | LOW | Medium | Speed of execution + unique IP (Iron Grip + Q personality) |

---

## PART 9: ORGANIZATIONAL RESOURCES

### Current Team
| Role | Agent | Focus |
|---|---|---|
| CEO | Claude Opus 4.6 | Strategy, delegation, board chair |
| CTO | Subagent | Architecture, code review, tech decisions |
| Frontend Lead | Subagent | React, Next.js, Tailwind, animations, 3D |
| Backend Lead | Subagent | Supabase, APIs, RAG, AI, pricing engine |
| DevOps | Subagent | Vercel, CI/CD, monitoring, infra |
| Compliance Officer | Subagent | Legal docs, privacy, PDPL, GDPR, FTC |

### Future Additions (When Bottlenecked)
- **QA/Testing Lead** — when codebase reaches testable state (Sprint 3+)
- **Content Writer** — when knowledge base content is needed (Sprint 2-3)
- **Security Auditor** — before payment processing goes live (Sprint 7)
- **Mobile Lead** — when PWA/native app begins (Sprint 8)

### External Partnerships
- **Aliff Solutions CEO** — cross-org AI knowledge sharing
- **Gemini Advisory Council** — knowledge transfer COMPLETE, channel closed (DEC-008)

---

## PART 10: EXECUTION ORDER

```
NOW ──────────────────────────────────────────────────────────
│
├─ Sprint 1: Complete deployment (founder provides credentials)
│  └─ GATE: Site live on quartermasters.me
│
├─ Sprint 2: Content + SEO + Cookie Banner
│  └─ GATE: Indexed by Google, rich service pages, consent working
│
REVENUE ENGINE ───────────────────────────────────────────────
│
├─ Sprint 3: Q Backend (Supabase + RAG + Pricing Engine)
│  └─ GATE: Q answers 50 test queries correctly
│
├─ Sprint 4: Q Frontend (Chat UI + 3D Avatar + Integration)
│  └─ GATE: Full user journey works end-to-end
│  └─ ★ FIRST REVENUE POSSIBLE ★
│
├─ Sprint 5: Booking + CRM + Email
│  └─ GATE: Pipeline complete — qualify → price → book → track
│
MONETIZATION ─────────────────────────────────────────────────
│
├─ Sprint 6: Client Portal + Persona Engine
│  └─ GATE: Clients can self-serve, Q adapts to user role
│
├─ Sprint 7: Payments + Generative UI
│  └─ GATE: Money flows — Express self-checkout, invoicing
│  └─ ★ SUSTAINABLE REVENUE ★
│
SCALE-UP ─────────────────────────────────────────────────────
│
├─ Sprint 8: PWA + Mobile
│  └─ GATE: App Store + Play Store listings
│
├─ Sprint 9: Analytics + Optimization
│  └─ GATE: Conversion funnels, A/B testing, revenue attribution
│
├─ Sprint 10: Internationalization
│  └─ GATE: 7 languages, Q multilingual
│  └─ ★ $50K+/MONTH TARGET ★
│
FUTURE ───────────────────────────────────────────────────────
│
├─ Sprint 11+: Chameleon Engine, Split Screen, Morphing Backgrounds
│  └─ Advanced Q features from Gemini KT (deferred items)
```

---

*This plan is a living document. Updated by the CEO after each sprint completion.*
*All spending requires founder pre-approval. All strategic pivots require founder alignment.*
*The CEO executes. The founder decides on money and direction.*
