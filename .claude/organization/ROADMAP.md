# Quartermasters — Execution Roadmap

> **Directive**: Founder has authorized full autonomous execution of all documented phases.
> **Source Plans**: MASTER_PLAN.md, MASTER_PLAN_V2.md, PHASE_1_2_BLUEPRINT.md
> **Created**: 2026-02-12

---

## Sprint 1: Fix the Foundation (NOW — In Progress)
> **Goal**: Resolve all blocking issues so site can deploy and index.

| Task | Owner | Status |
|---|---|---|
| S1-01: SSR homepage conversion | Frontend Lead | **DONE** |
| S1-02: Verify production build | DevOps | **DONE** |
| S1-03: Wire contact form API | Backend Lead | **DONE** |
| S1-04: Privacy Policy page | Compliance Officer | **DONE** |
| S1-05: Terms of Service page | Compliance Officer | **DONE** |
| S1-06: Cookie Consent Banner spec | Compliance Officer | **DONE** |
| S1-07: Testimonial audit (FTC) | Compliance Officer | **DONE** |
| S1-08: Vercel deployment setup | DevOps | PENDING (needs account access) |
| S1-09: Custom domain + SSL | DevOps | PENDING (needs DNS access) |
| S1-10: CTO review SSR conversion | CTO | **DONE** |

---

## Sprint 2: Enhanced Service Pages + Content Architecture
> **Goal**: Transform service pages into information-rich, SEO-optimized content. Create the knowledge base architecture for Q.
> **Maps to**: MASTER_PLAN_V2 Phase 1 + Phase 3

| Task | Owner | Priority |
|---|---|---|
| S2-01: Redesign each service page with comprehensive scope content (can/cannot do sections, regulatory info, process timelines) | Frontend Lead | HIGH |
| S2-02: Create knowledge base content structure (markdown documents per service for RAG ingestion) | Backend Lead | HIGH |
| S2-03: Write detailed service documentation for all 5 activities (scope, deliverables, timelines, FAQ) | Content (CEO to draft) | HIGH |
| S2-04: Add interactive "Phase Gate" process timeline per service page | Frontend Lead | MEDIUM |
| S2-05: Implement proper service comparison tool | Frontend Lead | MEDIUM |
| S2-06: Add regulatory information sections to each service page | Compliance Officer | HIGH |
| S2-07: Add footer links for Privacy Policy and Terms of Service | Frontend Lead | HIGH |
| S2-08: Implement Cookie Consent Banner | Frontend Lead | HIGH |
| S2-09: Update sitemap.ts with new routes (/privacy, /terms) | Frontend Lead | MEDIUM |
| S2-10: SEO audit — meta tags, Open Graph, JSON-LD for new pages | CTO | MEDIUM |

---

## Sprint 3: Q AI Engine — Foundation
> **Goal**: Build the RAG-powered AI assistant backend.
> **Maps to**: MASTER_PLAN_V2 Phase 2 + PHASE_1_2_BLUEPRINT

| Task | Owner | Priority |
|---|---|---|
| S3-01: Set up Supabase project (PostgreSQL + pgvector extension) | Backend Lead | CRITICAL |
| S3-02: Design and create database schema (conversations, leads, pricing_states, audit logs) | Backend Lead | CRITICAL |
| S3-03: Build document ingestion pipeline (markdown → embeddings → vector store) | Backend Lead | HIGH |
| S3-04: Implement RAG retrieval with Claude API | Backend Lead | HIGH |
| S3-05: Write Q's system prompt (personality, scope boundaries, commitment blocklist) | CEO | HIGH |
| S3-06: Build anti-hallucination guardrails (schema validator, commitment scanner) | Backend Lead | HIGH |
| S3-07: Build deterministic PricingEngine module (state machine, server-side enforcement) | Backend Lead | CRITICAL |
| S3-08: Create conversation API routes (create, message, history) | Backend Lead | HIGH |
| S3-09: Implement streaming responses for real-time feel (evaluate Vercel AI SDK streamUI — Q must render within 200ms) | Backend Lead | HIGH |
| S3-10: Test with 50+ queries across all services | CTO | HIGH |

---

## Sprint 4: Q AI Engine — Frontend + Integration
> **Goal**: Build Q's chat UI, 3D avatar, and integrate with backend.
> **Maps to**: PHASE_1_2_BLUEPRINT Sections 1-2

| Task | Owner | Priority |
|---|---|---|
| S4-01: Design Q's chat panel UI (collapsed, expanded, full-screen states). UX principle: "Peak-End Micro-Narrative" — buttons morph into next state (Book → Calendar, Send → Confirmation) | Frontend Lead | HIGH |
| S4-02: Build Q's 3D polyhedron avatar (Three.js, idle/engaged/presenting/thinking states) | Frontend Lead | HIGH |
| S4-03: Build 2D fallback avatar (Lottie-animated, reactive to conversation state: idle/thinking/speaking pulses) | Frontend Lead | HIGH |
| S4-04: Implement tiered rendering (WebGL detection → GPU benchmark → tier selection). Performance budget: chat UI interactive <1s, 3D avatar hydrates async | Frontend Lead | HIGH |
| S4-05: Connect chat UI to conversation API | Frontend Lead | HIGH |
| S4-06: Implement user flow segmentation (Express Lane vs Executive Track) | Backend Lead | HIGH |
| S4-07: Implement Iron Grip pricing state machine in chat flow. RULES: (1) At 10% floor rejection, pricing terminates — no circular arguments, render "Book Mujtaba" calendar immediately. (2) Time-based nudge: >30s hesitation triggers 5% offer. (3) "Velvet Rope" UI: Standard vs Premium side-by-side, premium features locked behind glassmorphism blur | Backend Lead + Frontend Lead | CRITICAL |
| S4-08: Build executive handoff flow (brief generation, notification, Cal.com booking) | Backend Lead | HIGH |
| S4-09: Integration testing — full user journey from landing to qualification | CTO | HIGH |
| S4-10: Performance testing — Q chat + 3D avatar on mobile devices | DevOps | HIGH |

---

## Sprint 5: Booking, CRM & Email
> **Goal**: Enable consultation booking and lead management.
> **Maps to**: MASTER_PLAN_V2 Phase 4

| Task | Owner | Priority |
|---|---|---|
| S5-01: Integrate Cal.com API for booking | Backend Lead | HIGH |
| S5-02: Build multi-step booking flow (service → time → details → confirm) | Frontend Lead | HIGH |
| S5-03: Automated email confirmations via Resend | Backend Lead | HIGH |
| S5-04: CRM tables in Supabase (leads, interactions, scoring) | Backend Lead | HIGH |
| S5-05: Lead scoring based on Q conversation data | Backend Lead | MEDIUM |
| S5-06: Admin dashboard for managing bookings and leads | Frontend Lead | MEDIUM |
| S5-07: Email warm-up protocol (separate sending domain) | DevOps | HIGH |
| S5-08: SPF + DKIM + DMARC configuration | DevOps | HIGH |

---

## Future Sprints (Planned, Not Scheduled)

### Sprint 6: Client Portal + Q Persona Engine (MASTER_PLAN_V2 Phase 5)
- Authentication system (Supabase Auth)
- Client dashboard, document sharing, messaging, progress reports
- **KT-05: "Chameleon Engine"** — Q persona switching (CEO=Luxury Dark, CTO=Blueprint Blue, PM=Clean White)

### Sprint 7: Generative UI + Payments (MASTER_PLAN_V2 Phase 6)
- **KT-04: "Magic Mirror"** — Q streams live React wireframes in chat (Vercel AI SDK streamUI)
- **KT-06: "Split Screen" layout** — Left 30% chat + Right 70% visual canvas
- Stripe integration
- Tax compliance, invoice generation, multi-currency (USD, EUR, GBP, SGD)

### Sprint 8: PWA + Mobile (MASTER_PLAN_V2 Phase 7-8)
- **KT-07: "Morphing Backgrounds"** — 3D scene changes based on conversation context
- Service Worker, Web App Manifest, push notifications
- React Native/Expo wrapper for App Store + Play Store

### Sprint 9: Analytics & Optimization (MASTER_PLAN_V2 Phase 9)
- PostHog integration, conversion funnels, A/B testing, CWV monitoring

### Sprint 10: Scale, Compliance & Internationalization (MASTER_PLAN_V2 Phase 10)
- GDPR/CCPA compliance hardening (primary markets: USA, EU, UK, Singapore)
- International data protection compliance maintained
- **Multilingual support for target markets**: Spanish (US), French (EU), German (EU), Mandarin (Singapore), Japanese, Portuguese
- i18n framework (next-intl or similar), translated service pages, Q multilingual responses
- Arabic: deprioritized (DEC-007)
