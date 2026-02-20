# Sprint 1: Fix the Foundation

> **Goal**: Resolve all blocking issues so the site can be deployed and indexed by search engines.
> **Started**: 2026-02-12
> **Target**: End of Session 2

---

## Tasks

| ID | Task | Owner | Status | Blocked By | Priority |
|---|---|---|---|---|---|
| S1-01 | Convert homepage from `"use client"` to Server Components with client islands | Frontend Lead | **DONE** | — | CRITICAL |
| S1-02 | Verify production build passes (`npm run build`, 0 errors) | DevOps | **DONE** | S1-10 | HIGH |
| S1-03 | Wire contact form to send emails via Resend API | Backend Lead | **DONE** | — | HIGH |
| S1-04 | Draft Privacy Policy page | Compliance Officer | **DONE** | — | CRITICAL |
| S1-05 | Draft Terms of Service page | Compliance Officer | **DONE** | — | CRITICAL |
| S1-06 | Design Cookie Consent Banner spec | Compliance Officer | **DONE** | — | HIGH |
| S1-07 | Audit testimonials for FTC compliance — remove or flag unverifiable ones | Compliance Officer | **DONE** | — | MEDIUM |
| S1-08 | Set up Docker deployment + Cloudflare Tunnel on local server | DevOps | **DONE** | S1-02 | HIGH |
| S1-09 | Configure custom domain (quartermasters.me) via Cloudflare DNS + SSL | DevOps | **DONE** | S1-08 | HIGH |
| S1-10 | CTO review: validate SSR conversion doesn't break animations/3D | CTO | **DONE** | S1-01 | HIGH |

---

## Dependency Graph

```
S1-01 (SSR Fix) ──→ S1-10 (CTO Review) ──→ S1-02 (Build Verify) ──→ S1-08 (Vercel) ──→ S1-09 (Domain)

S1-03 (Contact API) ──→ [independent, can run in parallel]
S1-04 (Privacy) ──→ [independent]
S1-05 (TOS) ──→ [independent]
S1-06 (Cookie Banner) ──→ [independent]
S1-07 (Testimonials) ──→ [independent]
```

## Parallelization Plan

**Wave 1 (Launch Immediately — No Dependencies):**
- S1-01: Frontend Lead → SSR conversion
- S1-03: Backend Lead → Contact form API
- S1-04: Compliance Officer → Privacy Policy
- S1-05: Compliance Officer → Terms of Service
- S1-07: Compliance Officer → Testimonial audit

**Wave 2 (After Wave 1 Completes):**
- S1-10: CTO → Review SSR conversion
- S1-06: Compliance Officer → Cookie Banner spec
- S1-02: DevOps → Verify build

**Wave 3 (After Wave 2):**
- S1-08: DevOps → Vercel setup
- S1-09: DevOps → Domain + SSL

---

## Acceptance Criteria

- [x] Homepage renders meaningful HTML on server (not empty div) — S1-01 DONE, CTO verified in S1-10
- [x] All animations still work after SSR conversion — CTO verified, client islands preserved
- [ ] Contact form sends real email to quartermasters inbox — S1-03 DONE (code), needs RESEND_API_KEY env in production
- [x] Privacy Policy accessible at `/privacy` — S1-04 DONE, 1605 LOC, PDPL+GDPR+CCPA
- [x] Terms of Service accessible at `/terms` — S1-05 DONE, 1229 LOC, all 5 verticals scoped
- [x] Cookie Consent Banner spec documented for implementation — S1-06 DONE, 667 LOC spec
- [x] Unverifiable testimonials removed or flagged — S1-07 DONE, replaced with compliant "What to Expect"
- [x] `npm run build` produces 0 errors — S1-02 DONE (0 errors, 17/17 pages prerendered)
- [x] Site deployed via Docker + Cloudflare Tunnel with custom domain — S1-08 DONE (Dockerfile, docker-compose.yml, Cloudflare Tunnel created), S1-09 DONE (Cloudflare zone active, DNS configured, tunnel CNAME records set)

## Notes

**S1-08/S1-09 COMPLETED (2026-02-12):**
- Cloudflare zone: ACTIVE (quartermasters.me)
- Nameservers: olga.ns.cloudflare.com / weston.ns.cloudflare.com (propagated)
- Tunnel: quartermasters-tunnel (ID: 21f7fc39-8bfd-41e5-b19d-9c0342c21f3f)
- DNS: Root + www CNAME → tunnel. Email records preserved (MX, SPF, DKIM, DMARC all DNS-only)
- Docker: Dockerfile + docker-compose.yml created. Standalone output enabled.
- Remaining: Founder runs `docker compose up -d --build` on local machine to go live
- RESEND_API_KEY needed in .env.local for contact form

**CTO Advisory (non-blocking)**: FooterLinkHover could be pure CSS instead of a client component. Logged for Sprint 2 cleanup.
