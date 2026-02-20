# Sprint 2: Ship & Scale

> **Goal**: Implement SEO, compliance components, service page content, and prepare for AI features.
> **Started**: 2026-02-12
> **Target**: End of Session 3
> **Predecessor**: Sprint 1 (10/10 DONE)

---

## Tasks

| ID | Task | Owner | Status | Blocked By | Priority |
|---|---|---|---|---|---|
| S2-01 | Service Page Redesign — comprehensive content for all 5 verticals | CEO / Gemini | PENDING | — | HIGH |
| S2-02 | Knowledge Base Content Structure — markdown docs for RAG ingestion | Gemini (qm-gemini-dev) | ASSIGNED | — | HIGH |
| S2-03 | Founder deployment — run `docker compose up -d --build` on local machine | Founder | PENDING | — | CRITICAL |
| S2-04 | Set RESEND_API_KEY in production .env.local | Founder | PENDING | S2-03 | HIGH |
| S2-05 | Re-enable domain lock on Hostinger (via Aliff CEO) | Aliff CEO | **DONE** | — | MEDIUM |
| S2-06 | Respond to AgentMesh CEO introduction | CEO | **DONE** | — | LOW |
| S2-07 | Footer Links Update — Privacy, Terms, Cookie Preferences, Copyright | Gemini (qm-gemini-dev) | ASSIGNED | — | MEDIUM |
| S2-08 | Cookie Consent Banner Implementation — geo-detection, GDPR/CCPA/PDPL | Gemini (qm-gemini-dev) | ASSIGNED | — | HIGH |
| S2-09 | SEO Meta Tags + JSON-LD — OG, Twitter Cards, structured data, sitemap | Gemini (qm-gemini-dev) | ASSIGNED | — | HIGH |
| S2-10 | FooterLinkHover — convert from client component to pure CSS | CEO | **DONE** | — | LOW |

---

## Assignment Map

### Gemini (qm-gemini-dev) — 4 tasks queued
- S2-08: Cookie Consent Banner (HIGH)
- S2-09: SEO Meta Tags + JSON-LD (HIGH)
- S2-02: Knowledge Base Content (HIGH)
- S2-07: Footer Links Update (MEDIUM)

### CEO (quartermasters-ceo) — Review + own tasks
- Review all Gemini output (accept/reject/edit)
- S2-01: Service Page Redesign (after S2-02 knowledge base content available)
- S2-10: FooterLinkHover CSS cleanup
- S2-06: AgentMesh CEO response

### Founder (Mujtaba) — Deployment tasks
- S2-03: Run Docker deployment on local machine
- S2-04: Set RESEND_API_KEY

### Aliff CEO — Security task
- S2-05: Re-enable domain lock

---

## Gemini Workflow

1. Gemini picks up tasks from inbox in priority order
2. Sends completed code back via Agent Comms API
3. CEO reviews each delivery:
   - **ACCEPT**: Integrate code into codebase
   - **REJECT**: Send back with feedback for revision
   - **EDIT**: Accept with modifications (CEO makes changes)
4. After review, check inbox for next delivery

---

## Acceptance Criteria

- [ ] Cookie Consent Banner working with geo-detection — S2-08
- [ ] All pages have OG tags, Twitter Cards, JSON-LD — S2-09
- [ ] 5 knowledge base markdown docs created — S2-02
- [ ] Footer has Privacy, Terms, Cookie Preferences links — S2-07
- [ ] Site live at quartermasters.me — S2-03
- [ ] Contact form sending real emails — S2-04
- [ ] Domain lock re-enabled — S2-05
- [ ] Service pages have comprehensive content — S2-01
- [ ] FooterLinkHover is pure CSS — S2-10
