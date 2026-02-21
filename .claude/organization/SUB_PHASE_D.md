# Sub-Phase D: Mid-Way Design Overhaul
> Created: 2026-02-20 | Priority: BEFORE completing Phase C
> All tasks assigned to Gemini (2002)

---

## D-01: Replace [BRAND] with "Quartermasters"
- Global find-replace across ALL files
- Header logo text, footer brand, 404 page, JSON-LD, meta tags, etc.
- Files: layout.tsx, Header.tsx, Footer.tsx, not-found.tsx, JsonLd.tsx, QuartermasterLogo.tsx, all page metadata

## D-02: Logo Integration
- **BLOCKED**: Founder must provide logo image file
- Once provided: place in /public/logo.png (or SVG)
- Update QuartermasterLogo.tsx to use actual image instead of gradient placeholder
- Wire into Header, Footer, portal, 404, favicon

## D-03: Silk Background Color Change
- Change from #604974 (purple) to #002147 (dark navy RGB:0-33-71)
- File: src/components/layout/SilkBackground.tsx — update color prop
- This is the ONLY background now — page base color irrelevant since Silk covers viewport

## D-04: All Text → White (#FFFFFF)
- All body text, headings, paragraphs → white
- Update CSS variables in globals.css: --text-primary, --text-muted, --text-light → white shades
- Cards/glass panels: adjust for readability on dark Silk background
- Overline text, pill tags, descriptions — all white or white/opacity variants

## D-05: Button Styling Consistency
- All buttons → match header "Get Started" CTA style (gold bg #C8872E, white text)
- Apply btn-glow-line to missing buttons: mobile header CTA, About page CTA, Portal sign-in, Terms "Contact Us"
- Uniform rounded-lg, consistent padding

## D-06: Remove Services Dropdown from Header
- Remove the hover dropdown in desktop nav
- Keep services as direct links in the nav OR simplify to just: Home, About, Services, Contact
- Services link → /services (new page, see D-10)

## D-07: Slow Down Card Hover Effects
- All hover transitions: increase duration from current (0.3-0.48s) to 0.8-1.2s
- Files: SectorEffects.tsx (all 5 effects), globals.css (.glass-hover, .card-hover-glow)
- GlareHover: transitionDuration already 800ms — keep as-is
- Make hover feel elegant, not snappy

## D-08: Add 6th Service — IT Services
- New service: "IT Services" (Software Development & Web Apps)
- Icon: Monitor or Code (from Lucide)
- Accent color: #6366F1 (indigo — distinctive from existing 5)
- Metaphor: "The Engine" or "The Forge"
- Create: src/app/it-services/page.tsx (server shell)
- Create: src/components/services/ITServicesClient.tsx (client component)
- Capabilities (5 cards):
  1. Custom Software Development
  2. Web Application Engineering
  3. SaaS Platform Development
  4. API Design & Integration
  5. Digital Product Strategy
- Add to: Header nav, Footer links, ServiceJsonLd, sitemap, robots
- Add SectorEffect: new "CodeEffect" or reuse GlitchEffect with indigo

## D-09: Hero Section — 6 Services
- Change "5 Service Verticals" → "6 Service Verticals" in trust badge
- Update any references to "five verticals" in hero text, about page, etc.
- FooterTicker: update "5 SERVICE VERTICALS" → "6 SERVICE VERTICALS"

## D-10: Create /services Page with CardSwap
- New page: src/app/services/page.tsx
- Shows all 6 services as swapping cards (CardSwap component)
- Each card: service icon + name + brief tagline + link to detail page
- CardSwap configured: cardDistance={60} verticalDistance={70} delay={5000}
- Page layout: hero section + CardSwap centered

## D-11: ChromaGrid in Service Detail Pages
- Replace current grid of capability cards with ChromaGrid component
- Each capability becomes a ChromaGrid item with image + title + subtitle
- Files: ServicePageLayout.tsx (modify the capabilities grid section)
- Images: BLOCKED until founder provides generated images from Nano Banana Pro
- For now: use placeholder gradient cards (no images)

## D-12: Update Checklist
- Add CardSwap, ChromaGrid sections to UI_EFFECTS_CHECKLIST.md
- Update Silk color entry

---

## Execution Order
1. D-01 (branding) + D-03 (silk color) + D-04 (text white) + D-05 (buttons) — core visual overhaul
2. D-06 (remove dropdown) + D-07 (slow hover) + D-09 (6 services text) — quick fixes
3. D-08 (new IT service page) + D-10 (services page) — new pages
4. D-11 (ChromaGrid) — after images available
5. D-02 (logo) — after founder provides image

## BLOCKED Items
- D-02: Logo image (founder must generate)
- D-11: Card images (founder must generate via Nano Banana Pro)
