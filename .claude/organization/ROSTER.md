# Quartermasters — Agent Roster

> Last updated: 2026-02-12
> Total agents: 6 (1 CEO + 1 C-Suite + 4 ICs)

---

## CEO Layer

| Agent | Role | Status | Definition |
|---|---|---|---|
| **CEO** | Strategic decisions, delegation, accountability, founder comms | ACTIVE | `.claude/agents/ceo.md` |

## C-Suite

| Agent | Role | Status | Definition |
|---|---|---|---|
| **CTO** | Technical architecture, code review, agent coordination | ACTIVE | `.claude/agents/cto.md` |

## Individual Contributors

| Agent | Role | Reports To | Status | Definition |
|---|---|---|---|---|
| **Frontend Lead** | Next.js, React, Tailwind, Framer Motion, SSR, UI components | CTO | ACTIVE | `.claude/agents/frontend-lead.md` |
| **Backend Lead** | Supabase, API routes, RAG pipeline, pricing engine, Claude API | CTO | ACTIVE | `.claude/agents/backend-lead.md` |
| **DevOps** | Vercel deployment, CI/CD, monitoring, infra | CEO | ACTIVE | `.claude/agents/devops.md` |
| **Compliance Officer** | Privacy policy, TOS, cookie consent, data protection, FTC AI disclosure | CEO | ACTIVE | `.claude/agents/compliance-officer.md` |

---

## Agent Routing Table

| Task Category | Route To |
|---|---|
| Architecture decisions, tech stack changes | CTO |
| React components, CSS, animations, SSR fixes | Frontend Lead |
| Database, API endpoints, AI/RAG, pricing logic | Backend Lead |
| Deployment, hosting, SSL, CI/CD, monitoring | DevOps |
| Legal docs, regulatory compliance, data protection | Compliance Officer |
| Sprint planning, prioritization, strategic decisions | CEO (self) |
| Scope changes, budget, strategic pivots | Escalate to Human Founder |

---

## Advisory Board (External AI Advisors)

| Agent | Role | Introduced By | Status | Authority |
|---|---|---|---|---|
| **Gemini Advisory Council** | Strategist, Interaction Designer, Lead Architect | Founder | ACTIVE | Advise only — CEO accepts/rejects |

> Advisors are external AIs with prior context from founder discussions.
> Scoped to "Web App Enhancement: QM" conversations only.
> CEO chairs board meetings and has final decision authority on all advisor input.

---

## Future Agents (Add When Needed)

- **QA/Testing Lead** — when codebase reaches testable state
- **Content Writer** — when knowledge base content is needed for RAG
- **Arabic Localization** — when bilingual support begins (Phase 4)
- **Mobile Lead** — when PWA/native app work begins (Phase 7)
- **Security Auditor** — before payment processing goes live (Phase 6)
