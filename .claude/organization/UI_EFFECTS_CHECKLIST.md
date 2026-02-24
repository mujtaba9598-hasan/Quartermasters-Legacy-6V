# Quartermasters — UI Effects Master Checklist
> Last Updated: 2026-02-20
> Purpose: Track every visual effect component and EVERY location it must be applied.
> Rule: When adding/replacing an effect, check EVERY box. No nook missed.

---

## EFFECT 1: GlareHover (Light Sweep on Cards)

**Source**: `src/components/ui/GlareHover.tsx` + `GlareHover.css`
**What it does**: Diagonal light sweep on hover (CSS-driven, no JS)
**Default props**: `width='100%' height='auto' background='transparent' borderColor='transparent' borderRadius='16px' glareOpacity={0.2} glareAngle={-30} glareSize={300} transitionDuration={800}`

### Application Checklist

| # | Location | File | Element | glareColor | Status |
|---|----------|------|---------|------------|--------|
| G-01 | Homepage — Testimonials card 1 (Regulatory Clarity) | `src/components/home/Testimonials.tsx` | glass card | `#C8872E` (gold) | DONE |
| G-02 | Homepage — Testimonials card 2 (Talent Pipeline) | `src/components/home/Testimonials.tsx` | glass card | `#2A9D8F` (seafoam) | DONE |
| G-03 | Homepage — Testimonials card 3 (Event Delivery) | `src/components/home/Testimonials.tsx` | glass card | `#D4763C` (orange) | DONE |
| G-04 | Homepage — PhaseGate card 1 (Discovery) | `src/components/home/PhaseGate.tsx` | glass card | `#C8872E` | DONE |
| G-05 | Homepage — PhaseGate card 2 (Strategy) | `src/components/home/PhaseGate.tsx` | glass card | `#C8872E` | DONE |
| G-06 | Homepage — PhaseGate card 3 (Execution) | `src/components/home/PhaseGate.tsx` | glass card | `#C8872E` | DONE |
| G-07 | Homepage — PhaseGate card 4 (Review) | `src/components/home/PhaseGate.tsx` | glass card | `#C8872E` | DONE |
| G-08 | Homepage — CTABanner main card | `src/components/home/CTABanner.tsx` | glass CTA | `#C8872E` | DONE |
| G-09 | Financial — capability card 1 | `src/components/services/FinancialClient.tsx` | VaultEffect | `#C8872E` | DONE |
| G-10 | Financial — capability card 2 | `src/components/services/FinancialClient.tsx` | VaultEffect | `#C8872E` | DONE |
| G-11 | Financial — capability card 3 | `src/components/services/FinancialClient.tsx` | VaultEffect | `#C8872E` | DONE |
| G-12 | Financial — capability card 4 | `src/components/services/FinancialClient.tsx` | VaultEffect | `#C8872E` | DONE |
| G-13 | Financial — capability card 5 | `src/components/services/FinancialClient.tsx` | VaultEffect | `#C8872E` | DONE |
| G-14 | Human Capital — capability card 1 | `src/components/services/HumanCapitalClient.tsx` | BreathingEffect | `#2A9D8F` | DONE |
| G-15 | Human Capital — capability card 2 | `src/components/services/HumanCapitalClient.tsx` | BreathingEffect | `#2A9D8F` | DONE |
| G-16 | Human Capital — capability card 3 | `src/components/services/HumanCapitalClient.tsx` | BreathingEffect | `#2A9D8F` | DONE |
| G-17 | Human Capital — capability card 4 | `src/components/services/HumanCapitalClient.tsx` | BreathingEffect | `#2A9D8F` | DONE |
| G-18 | Human Capital — capability card 5 | `src/components/services/HumanCapitalClient.tsx` | BreathingEffect | `#2A9D8F` | DONE |
| G-19 | Management — capability card 1 | `src/components/services/ManagementClient.tsx` | PanoramicEffect | `#1B3A4B` | DONE |
| G-20 | Management — capability card 2 | `src/components/services/ManagementClient.tsx` | PanoramicEffect | `#1B3A4B` | DONE |
| G-21 | Management — capability card 3 | `src/components/services/ManagementClient.tsx` | PanoramicEffect | `#1B3A4B` | DONE |
| G-22 | Management — capability card 4 | `src/components/services/ManagementClient.tsx` | PanoramicEffect | `#1B3A4B` | DONE |
| G-23 | Management — capability card 5 | `src/components/services/ManagementClient.tsx` | PanoramicEffect | `#1B3A4B` | DONE |
| G-24 | Events — capability card 1 | `src/components/services/EventLogisticsClient.tsx` | RippleEffect | `#D4763C` | DONE |
| G-25 | Events — capability card 2 | `src/components/services/EventLogisticsClient.tsx` | RippleEffect | `#D4763C` | DONE |
| G-26 | Events — capability card 3 | `src/components/services/EventLogisticsClient.tsx` | RippleEffect | `#D4763C` | DONE |
| G-27 | Events — capability card 4 | `src/components/services/EventLogisticsClient.tsx` | RippleEffect | `#D4763C` | DONE |
| G-28 | Events — capability card 5 | `src/components/services/EventLogisticsClient.tsx` | RippleEffect | `#D4763C` | DONE |
| G-29 | Events — capability card 6 | `src/components/services/EventLogisticsClient.tsx` | RippleEffect | `#D4763C` | DONE |
| G-30 | Tech R&D — capability card 1 | `src/components/services/TechRndClient.tsx` | GlitchEffect | `#3B82C4` | DONE |
| G-31 | Tech R&D — capability card 2 | `src/components/services/TechRndClient.tsx` | GlitchEffect | `#3B82C4` | DONE |
| G-32 | Tech R&D — capability card 3 | `src/components/services/TechRndClient.tsx` | GlitchEffect | `#3B82C4` | DONE |
| G-33 | Tech R&D — capability card 4 | `src/components/services/TechRndClient.tsx` | GlitchEffect | `#3B82C4` | DONE |
| G-34 | Tech R&D — capability card 5 | `src/components/services/TechRndClient.tsx` | GlitchEffect | `#3B82C4` | DONE |
| G-35 | About — Key Figures card 1 (5 Licensed) | `src/app/about/page.tsx` | glass card | `#C8872E` | DONE |
| G-36 | About — Key Figures card 2 (California Location) | `src/app/about/page.tsx` | glass card | `#C8872E` | DONE |
| G-37 | About — CTA card | `src/app/about/page.tsx` | glass card | `#C8872E` | DONE |
| G-38 | Knowledge Base — category card 1 | `src/app/knowledge-base/page.tsx` | link card | `#C8872E` | DONE |
| G-39 | Knowledge Base — category card 2 | `src/app/knowledge-base/page.tsx` | link card | `#C8872E` | DONE |
| G-40 | Knowledge Base — category card 3 | `src/app/knowledge-base/page.tsx` | link card | `#C8872E` | DONE |
| G-41 | Knowledge Base — category card 4 | `src/app/knowledge-base/page.tsx` | link card | `#C8872E` | DONE |
| G-42 | Knowledge Base — category card 5 | `src/app/knowledge-base/page.tsx` | link card | `#C8872E` | DONE |
| G-43 | Contact — email info card | `src/app/contact/page.tsx` | glass card | `#C8872E` | DONE |
| G-44 | Contact — form card | `src/app/contact/page.tsx` | glass card | `#C8872E` | DONE |
| G-45 | Service pages — CTA band card (all 5) | `src/components/layout/ServicePageLayout.tsx` | glass CTA | sector color | DONE |
| G-46 | Portal — login card | `src/app/portal/page.tsx` | glass card | `#C8872E` | DONE |

**Total: 46 locations | Done: 46 | Pending: 0**

---

## EFFECT 2: Silk Background (WebGL Animated Waves)

**Source**: `src/components/ui/Silk.tsx`
**What it does**: Full-viewport animated silk wave shader (R3F/Three.js)
**Props**: `speed={5} scale={1} color='#604974' noiseIntensity={1.5} rotation={0.1}`
**Integration**: Via `SilkBackground.tsx` wrapper in root layout (single instance, covers all pages)
**Tier-gated**: Skipped on low-end devices (`useRenderingTier() === 'low'` → null)

### Application Checklist

| # | Location | File | Method | Status |
|---|----------|------|--------|--------|
| S-01 | Root layout — global background | `src/app/layout.tsx` | `<SilkBackground />` as first child in `<body>` | DONE |
| S-02 | SilkBackground wrapper component | `src/components/layout/SilkBackground.tsx` | NEW file, dynamic import, tier check | DONE |
| S-03 | All page content z-index raised | `src/app/layout.tsx` | `<main className="relative z-10">` wrapper | DONE |

**Total: 3 locations | Done: 3 | Pending: 0**

### Pages Covered by Root Layout (auto-covered when S-01 is done):
- [x] `/` Homepage
- [x] `/about`
- [x] `/contact`
- [x] `/portal`
- [x] `/privacy`
- [x] `/terms`
- [x] `/knowledge-base`
- [x] `/financial-advisory`
- [x] `/human-capital`
- [x] `/tech-rnd`
- [x] `/event-logistics`
- [x] `/management`
- [x] `/not-found` (404)

---

## EFFECT 3: Buttons — `btn-glow-line` (Light Sweep CTA)

**Source**: `src/app/globals.css` (`.btn-glow-line` class)
**What it does**: Gold glow shadow + light sweep animation on hover

### Application Checklist

| # | Location | File | Button Text | Has btn-glow-line? | Status |
|---|----------|------|-------------|-------------------|--------|
| B-01 | Header — desktop CTA | `src/components/layout/Header.tsx` | "Get Started" | YES | OK |
| B-02 | Header — mobile CTA | `src/components/layout/Header.tsx` | "Get Started" | NO (missing) | NEEDS FIX |
| B-03 | HeroSection — primary CTA | `src/components/home/HeroSection.tsx` | "Explore Services" | YES | OK |
| B-04 | HeroSection — secondary CTA | `src/components/home/HeroSection.tsx` | "Our Approach" | NO (intentional — outline style) | OK |
| B-05 | CTABanner — CTA | `src/components/home/CTABanner.tsx` | "Get Started" | YES | OK |
| B-06 | ServicePageLayout — hero CTA | `src/components/layout/ServicePageLayout.tsx` | "Get Started" | YES | OK |
| B-07 | ServicePageLayout — bottom CTA | `src/components/layout/ServicePageLayout.tsx` | "Get Started" | YES | OK |
| B-08 | About — CTA | `src/app/about/page.tsx` | "Request Consultation" | NO (missing) | NEEDS FIX |
| B-09 | Contact — submit | `src/app/contact/page.tsx` | "Send Inquiry" | YES | OK |
| B-10 | Portal — sign in | `src/app/portal/page.tsx` | "Sign In" | NO (missing) | NEEDS FIX |
| B-11 | 404 — return home | `src/app/not-found.tsx` | "Return to Headquarters" | YES | OK |
| B-12 | Terms — "Contact Us" | `src/app/terms/page.tsx` | "Contact Us" | NO (missing) | NEEDS FIX |
| B-13 | Terms — "Return Home" | `src/app/terms/page.tsx` | "Return Home" | NO (intentional — outline) | OK |
| B-14 | SearchBar modal — submit | `src/components/home/SearchBar.tsx` | "Send Request" | YES | OK |
| B-15 | Privacy — "Back to Top" | `src/app/privacy/page.tsx` | "Back to Top" | NO (intentional — text link) | OK |

**Total: 15 buttons | OK: 10 | Needs Fix: 4 | Intentionally different: 1**

---

## EFFECT 4: Card Hover (Lift + Glow)

**Source**: `src/app/globals.css` (`.card-hover-glow` + `.glass-hover`)
**What it does**: Y-axis lift + shadow intensification on hover

### Application Checklist

| # | Location | File | Has hover effect? | Status |
|---|----------|------|-------------------|--------|
| H-01 | About — Key Figures cards | `src/app/about/page.tsx` | `card-hover-glow` | OK |
| H-02 | Testimonials cards | `src/components/home/Testimonials.tsx` | `glass-hover` + whileHover y:-4 | OK |
| H-03 | PhaseGate cards | `src/components/home/PhaseGate.tsx` | `glass-hover` only (no whileHover) | OK |
| H-04 | Service capability cards | Via SectorEffects wrappers | Sector-specific effects | OK |
| H-05 | Knowledge Base cards | `src/app/knowledge-base/page.tsx` | hover classes inline | OK |
| H-06 | Contact info card | `src/app/contact/page.tsx` | NONE | NEEDS FIX |
| H-07 | Portal login card | `src/app/portal/page.tsx` | NONE | NEEDS FIX |
| H-08 | Privacy section cards (14) | `src/app/privacy/page.tsx` | NONE (intentional — content cards) | OK |
| H-09 | Terms section cards (17) | `src/app/terms/page.tsx` | NONE (intentional — content cards) | OK |

---

## KNOWN ISSUES FOUND DURING AUDIT

| # | Issue | File | Severity | Status |
|---|-------|------|----------|--------|
| BUG-01 | CookieConsentBanner rendered TWICE (Providers.tsx + layout.tsx) | `src/app/layout.tsx` line 108 | Medium | OPEN |
| BUG-02 | `knowledge-base/[slug]` route has no page.tsx — all 5 category links 404 | `src/app/knowledge-base/[slug]/` | High | OPEN |
| BUG-03 | Hero "Explore Services" links to `#services` — no element has that id | `src/components/home/HeroSection.tsx` | Medium | OPEN |
| BUG-04 | CookiePreferencesButton uses broken Tailwind classes (`text-text-dim`) | `src/components/layout/CookiePreferencesButton.tsx` | Low | OPEN |
| BUG-05 | Portal form is non-functional (preventDefault only) | `src/app/portal/page.tsx` | Expected (Sprint 7+) | DEFERRED |
| BUG-06 | Placeholder `hello@example.com` not replaced with real email | Multiple files | High | OPEN |
| BUG-07 | `[BRAND]` placeholder not replaced with "Quartermasters" | Multiple files | High | OPEN |
| BUG-08 | ChatPanel, QAvatar2D, QAvatar3D built but NOT wired into layout | Various | Expected (C-07/C-10) | PENDING |
| BUG-09 | Silk.tsx built but NOT wired into layout | `src/components/ui/Silk.tsx` | Expected (Gemini task) | DONE |

---

## EFFECT 5: ClickSpark (Click Firework Burst)

**Source**: `src/components/ui/ClickSpark.tsx`
**What it does**: Canvas-based radial spark burst on every click — wraps children, overlays transparent canvas
**Default props**: `sparkColor='#C8872E' sparkSize={10} sparkRadius={15} sparkCount={8} duration={400} easing='ease-out'`
**No CSS file needed** — pure canvas rendering

### Application Checklist — Buttons & CTAs

| # | Location | File | Element | sparkColor | Status |
|---|----------|------|---------|------------|--------|
| CS-01 | Header — desktop "Get Started" CTA | `src/components/layout/Header.tsx` | Link button | `#C8872E` | DONE |
| CS-02 | Header — mobile "Get Started" CTA | `src/components/layout/Header.tsx` | Link button | `#C8872E` | DONE |
| CS-03 | Header — desktop nav links (Home, About, Contact) | `src/components/layout/Header.tsx` | Nav links (3) | `#C8872E` | DONE |
| CS-04 | Header — Services dropdown links (5) | `src/components/layout/Header.tsx` | Service links | sector colors | DONE |
| CS-05 | HeroSection — "Explore Services" CTA | `src/components/home/HeroSection.tsx` | Anchor button | `#C8872E` | DONE |
| CS-06 | HeroSection — "Our Approach" CTA | `src/components/home/HeroSection.tsx` | Anchor button | `#C8872E` | DONE |
| CS-07 | CTABanner — "Get Started" CTA | `src/components/home/CTABanner.tsx` | Link button | `#C8872E` | DONE |
| CS-08 | ServicePageLayout — hero "Get Started" CTA | `src/components/layout/ServicePageLayout.tsx` | Anchor button | sector color | DONE |
| CS-09 | ServicePageLayout — bottom "Get Started" CTA | `src/components/layout/ServicePageLayout.tsx` | Anchor button | sector color | DONE |
| CS-10 | About — "Request Consultation" CTA | `src/app/about/page.tsx` | Anchor button | `#C8872E` | DONE |
| CS-11 | Contact — "Send Inquiry" submit | `src/app/contact/page.tsx` | Submit button | `#C8872E` | DONE |
| CS-12 | Portal — "Sign In" submit | `src/app/portal/page.tsx` | Submit button | `#C8872E` | DONE |
| CS-13 | 404 — "Return to Headquarters" | `src/app/not-found.tsx` | Link button | `#C8872E` | DONE |
| CS-14 | Terms — "Contact Us" CTA | `src/app/terms/page.tsx` | Link button | `#C8872E` | DONE |
| CS-15 | Terms — "Return Home" CTA | `src/app/terms/page.tsx` | Link button | `#C8872E` | DONE |
| CS-16 | SearchBar — arrow submit button | `src/components/home/SearchBar.tsx` | Button | `#C8872E` | DONE |
| CS-17 | SearchBar — 4 suggestion pills | `src/components/home/SearchBar.tsx` | Pill buttons | `#C8872E` | DONE |
| CS-18 | SearchBar modal — "Send Request" submit | `src/components/home/SearchBar.tsx` | Submit button | `#C8872E` | DONE |
| CS-19 | Privacy — "Back to Top" link | `src/app/privacy/page.tsx` | Link button | `#C8872E` | DONE |

### Application Checklist — Cards (click-through cards)

| # | Location | File | Element | sparkColor | Status |
|---|----------|------|---------|------------|--------|
| CS-20 | Knowledge Base — 5 category cards | `src/app/knowledge-base/page.tsx` | Link cards | `#C8872E` | DONE |
| CS-21 | Testimonials — 3 capability cards | `src/components/home/Testimonials.tsx` | Glass cards | sector colors | DONE |
| CS-22 | PhaseGate — 4 methodology cards | `src/components/home/PhaseGate.tsx` | Glass cards | `#C8872E` | DONE |
| CS-23 | Financial — 5 capability cards | `src/components/services/FinancialClient.tsx` | VaultEffect | `#C8872E` | DONE |
| CS-24 | Human Capital — 5 capability cards | `src/components/services/HumanCapitalClient.tsx` | BreathingEffect | `#2A9D8F` | DONE |
| CS-25 | Management — 5 capability cards | `src/components/services/ManagementClient.tsx` | PanoramicEffect | `#1B3A4B` | DONE |
| CS-26 | Events — 6 capability cards | `src/components/services/EventLogisticsClient.tsx` | RippleEffect | `#D4763C` | DONE |
| CS-27 | Tech R&D — 5 capability cards | `src/components/services/TechRndClient.tsx` | GlitchEffect | `#3B82C4` | DONE |
| CS-28 | About — 2 key figures cards | `src/app/about/page.tsx` | Glass cards | `#C8872E` | DONE |

### Application Checklist — Chat UI

| # | Location | File | Element | sparkColor | Status |
|---|----------|------|---------|------------|--------|
| CS-29 | ChatPanel — "Q" floating button | `src/components/chat/ChatPanel.tsx` | Floating FAB | `#C15A2C` | DONE |
| CS-30 | ChatPanel — Maximize/Minimize button | `src/components/chat/ChatPanel.tsx` | Icon button | `#fff` | DONE |
| CS-31 | ChatPanel — X close button | `src/components/chat/ChatPanel.tsx` | Icon button | `#fff` | DONE |
| CS-32 | ChatInput — Send button | `src/components/chat/ChatInput.tsx` | Submit button | `#C15A2C` | DONE |

### Application Checklist — Footer

| # | Location | File | Element | sparkColor | Status |
|---|----------|------|---------|------------|--------|
| CS-33 | Footer — Logo link | `src/components/layout/Footer.tsx` | Link | `#C8872E` | DONE |
| CS-34 | Footer — 5 service links | `src/components/layout/Footer.tsx` | Links | `#C8872E` | DONE |
| CS-35 | Footer — 6 company links | `src/components/layout/Footer.tsx` | Links | `#C8872E` | DONE |
| CS-36 | Footer — Cookie Preferences button | `src/components/layout/CookiePreferencesButton.tsx` | Button | `#C8872E` | DONE |

### Application Checklist — Cookie Banner

| # | Location | File | Element | sparkColor | Status |
|---|----------|------|---------|------------|--------|
| CS-37 | CookieConsent — "Accept All" button | `src/components/compliance/CookieConsentBanner.tsx` | Button | `#C8A97E` | DONE |
| CS-38 | CookieConsent — "Reject All" button | `src/components/compliance/CookieConsentBanner.tsx` | Button | `#fff` | DONE |
| CS-39 | CookieConsent — "Save Preferences" button | `src/components/compliance/CookieConsentBanner.tsx` | Button | `#fff` | DONE |

**Total: 39 locations | Done: 39 | Pending: 0**

---

## REPLACEMENT SOP

When the founder provides a new UI effect to replace an existing one:

1. **Read this checklist** to find every location the current effect is applied
2. **Create a new section** for the replacement effect
3. **Copy the location list** from the old effect section
4. **Update each location** one by one, checking off as you go
5. **Verify**: grep the codebase for the old import to confirm zero remaining references
6. **Remove old files** only after all replacements are confirmed
7. **Update this checklist**: mark old effect as REPLACED, new effect as ACTIVE
