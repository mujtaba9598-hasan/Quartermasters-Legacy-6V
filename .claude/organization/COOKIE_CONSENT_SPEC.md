# S1-06: Cookie Consent Banner Specification

> **Task**: S1-06 | **Owner**: Compliance Officer | **Status**: COMPLETE
> **Entity**: Quartermasters F.Z.C | **License**: AFZA #37357
> **Created**: 2026-02-12 | **Spec Version**: 1.0
> **Implementation Target**: Sprint 2, Task S2-08

---

## 1. Regulatory Framework

This cookie consent system must simultaneously comply with three distinct privacy regimes, determined by the visitor's geographic location.

### 1.1 UAE Personal Data Protection Law (PDPL) — Federal Decree-Law No. 45 of 2021

- **Requirement**: Notice-based consent for strictly necessary cookies. Explicit, informed consent for analytics and marketing cookies.
- **Default State**: Analytics and functional cookies may be ON by default, provided the visitor is clearly informed and can opt out.
- **Enforcement**: UAE Data Office.
- **Applies to**: Visitors detected in the United Arab Emirates (country code `AE`).

### 1.2 EU General Data Protection Regulation (GDPR) — Regulation (EU) 2016/679

- **Requirement**: Prior, explicit, informed, freely-given consent for ALL non-essential cookies. No pre-ticked boxes. No cookie walls.
- **Default State**: ALL non-essential cookies must be OFF by default. No analytics scripts may load until affirmative consent is recorded.
- **Enforcement**: National Data Protection Authorities across EEA member states.
- **Applies to**: Visitors detected in any EU/EEA country (see Section 4.2 for country code list).

### 1.3 California Consumer Privacy Act / California Privacy Rights Act (CCPA/CPRA)

- **Requirement**: Right to opt out of the "sale" or "sharing" of personal information. Must provide a conspicuous "Do Not Sell or Share My Personal Information" link.
- **Default State**: Analytics may load by default, but a "Do Not Sell My Info" mechanism must be prominently available.
- **Enforcement**: California Attorney General; California Privacy Protection Agency.
- **Applies to**: Visitors detected in California. Since Vercel's `x-vercel-ip-country` provides country-level granularity only (`US`), and Vercel also provides `x-vercel-ip-country-region`, use region code `CA` to identify California residents.

---

## 2. Cookie Categories

Quartermasters uses four cookie categories. Each category has defined behavior per regulatory mode.

### 2.1 Strictly Necessary

| Property | Value |
|---|---|
| **Description** | Session management, CSRF protection, security tokens, consent preferences storage |
| **Examples** | `qm_consent`, session ID (future client portal), CSRF token |
| **Legal Basis** | Legitimate interest / contractual necessity |
| **User Control** | Cannot be toggled off. Always active. |
| **Default State** | ON in all modes |

### 2.2 Analytics

| Property | Value |
|---|---|
| **Description** | Page views, user interactions, conversion funnel tracking, performance metrics |
| **Provider** | PostHog (self-hostable; currently cloud) |
| **Cookies Set** | `ph_*` cookies (PostHog session, distinct ID, feature flags) |
| **Legal Basis** | Consent (GDPR); legitimate interest with notice (PDPL); notice with opt-out (CCPA) |
| **Default State** | OFF for GDPR mode; ON for PDPL, CCPA, and Default modes |

### 2.3 Functional

| Property | Value |
|---|---|
| **Description** | User preferences: language selection, theme preference, UI state persistence |
| **Status** | Not currently active. Reserved for future use (Arabic language support, dark/light theme toggle). |
| **Cookies Set** | `qm_lang`, `qm_theme` (future) |
| **Legal Basis** | Consent (GDPR); legitimate interest with notice (PDPL/CCPA) |
| **Default State** | OFF for GDPR mode; ON for PDPL, CCPA, and Default modes |

### 2.4 Marketing

| Property | Value |
|---|---|
| **Description** | Third-party advertising, retargeting, cross-site tracking |
| **Status** | None currently planned. Category included for future-proofing. |
| **Cookies Set** | None |
| **Default State** | OFF in all modes. Category hidden from banner until cookies in this category are actually deployed. |

---

## 3. Banner Design Specification

The banner adheres to the Sovereign Nexus design system established in `globals.css`.

### 3.1 Layout & Positioning

- **Position**: Fixed to the bottom of the viewport (`position: fixed; bottom: 0; left: 0; right: 0`).
- **Behavior**: Non-blocking. The banner sits above page content but does NOT prevent scrolling or interaction with the page beneath it. It is NOT a modal. No overlay or backdrop.
- **Z-Index**: `z-index: 9998` (below the noise overlay at 9999, above all page content).
- **Max Width**: Content constrained to `max-w-7xl` (consistent with Footer and page layout), centered with `mx-auto`.
- **Padding**: `px-6 py-4` on desktop; `px-4 py-3` on mobile.
- **Margin**: `mb-4 mx-4` to float slightly above the viewport edge with side gutters, giving a card-like appearance (consistent with premium feel).

### 3.2 Visual Treatment — Glassmorphism

The banner uses the established glassmorphism system:

```
Background:     var(--glass-bg)          → rgba(255, 255, 255, 0.05)
Border:         var(--glass-border)      → rgba(255, 255, 255, 0.1)
Border Radius:  var(--radius-lg)         → 1rem
Backdrop Filter: blur(var(--glass-blur)) → blur(20px)
```

Additionally, the banner should have a subtle top-edge gradient line using the Burnt Copper accent to visually separate it from page content:

```
border-top: 1px solid rgba(193, 90, 44, 0.3)
```

Fallback for browsers that do not support `backdrop-filter`:

```
background: rgba(15, 26, 23, 0.95)
```

### 3.3 Typography

| Element | Font | Size | Weight | Color |
|---|---|---|---|---|
| Heading ("Cookie Preferences") | `var(--font-heading)` (Space Grotesk) | `var(--text-caption)` (0.875rem) | 600 | `var(--color-text-base)` (#f0f2f0) |
| Description text | `var(--font-body)` (Inter) | `var(--text-caption)` (0.875rem) | 400 | `var(--color-text-muted)` (#8B9E94) |
| "Learn more" link | `var(--font-body)` (Inter) | `var(--text-caption)` (0.875rem) | 500 | `var(--color-accent-gold)` (#C15A2C) |
| Category labels (in customize view) | `var(--font-heading)` (Space Grotesk) | `var(--text-caption)` (0.875rem) | 500 | `var(--color-text-base)` (#f0f2f0) |
| Category descriptions | `var(--font-body)` (Inter) | `var(--text-overline)` (0.75rem) | 400 | `var(--color-text-dim)` (#5E7A6E) |

### 3.4 Content — Default (Collapsed) View

**Layout**: Single row on desktop (flex, space-between, items-center). Stacked on mobile (flex-col, gap-3).

**Left side — Text block**:
```
We use cookies to improve your experience and analyze site usage.
[Learn more](/privacy#cookies)
```

For CCPA mode, append:
```
| [Do Not Sell My Info](#do-not-sell)
```

**Right side — Button group** (flex, gap-2):
- "Customize" button
- "Reject Non-Essential" button
- "Accept All" button

### 3.5 Content — Expanded (Customize) View

When "Customize" is clicked, the banner expands vertically (animated with `var(--duration-base)` / 300ms, easing `var(--ease-out-expo)`) to reveal category toggles.

**Layout**:

```
+-----------------------------------------------------------------------+
|  Cookie Preferences                                    [X] Close       |
|  We use cookies to improve your experience.  Learn more               |
|                                                                        |
|  ┌─────────────────────────────────────────────────────────────────┐   |
|  │ [ON]  Strictly Necessary                          Always Active │   |
|  │       Session management and security.                          │   |
|  ├─────────────────────────────────────────────────────────────────┤   |
|  │ [  ]  Analytics                                     [Toggle]    │   |
|  │       Page views and interaction tracking (PostHog).            │   |
|  ├─────────────────────────────────────────────────────────────────┤   |
|  │ [  ]  Functional                                    [Toggle]    │   |
|  │       Language and theme preferences (future).                  │   |
|  └─────────────────────────────────────────────────────────────────┘   |
|                                                                        |
|                      [Reject Non-Essential]  [Save Preferences]        |
+-----------------------------------------------------------------------+
```

**Toggle switches**:
- Style: Pill-shaped toggle (44px wide, 24px tall).
- OFF state: Background `var(--color-text-dim)` (#5E7A6E), knob left.
- ON state: Background `var(--color-accent-gold)` (#C15A2C), knob right.
- Strictly Necessary: Visually locked ON. Toggle rendered in ON state with `opacity: 0.6`, `pointer-events: none`. Label reads "Always Active" instead of a toggle.
- Transition: `var(--duration-fast)` (180ms), `var(--ease-in-out)`.

**Category rows**: Separated by `1px solid var(--glass-border)`. Each row has padding `py-3`.

---

## 4. Geo-Detection Logic

### 4.1 Detection Mechanism

Use Cloudflare's automatic geo-detection headers, available on all Cloudflare plans (including free):

| Header | Purpose | Example Value |
|---|---|---|
| `CF-IPCountry` | ISO 3166-1 alpha-2 country code | `AE`, `DE`, `US` |
| `CF-IPCity` | City name (for regional detection) | `San Francisco`, `London` |

For US state-level detection (CCPA — California), use a GeoIP lookup service or Cloudflare Workers (free tier: 100K requests/day) to resolve state from IP.

**Alternative Vercel headers** (if migrated to Vercel in future): `x-vercel-ip-country`, `x-vercel-ip-country-region`.

**Implementation approach**: A Next.js middleware (`middleware.ts`) reads the `CF-IPCountry` header on every request and sets a first-party cookie (`qm_geo_mode`) with the determined consent mode. The client-side banner component reads this cookie to configure its behavior.

**Fallback**: If headers are absent (local development, no Cloudflare), default to GDPR mode (most restrictive) to ensure compliance.

### 4.2 Mode Determination Rules

```
IF country IN EU/EEA_COUNTRIES:
    mode = "gdpr"
ELSE IF country == "AE":
    mode = "pdpl"
ELSE IF country == "US" AND region == "CA":
    mode = "ccpa"
ELSE:
    mode = "default"
```

**EU/EEA Country Codes** (27 EU + 3 EEA + UK for safety):

```
AT, BE, BG, HR, CY, CZ, DK, EE, FI, FR, DE, GR, HU, IE, IT, LV, LT, LU,
MT, NL, PL, PT, RO, SK, SI, ES, SE, IS, LI, NO, GB
```

Note: The United Kingdom (GB) is included despite Brexit because the UK GDPR mirrors EU GDPR requirements.

### 4.3 Mode Behavior Matrix

| Behavior | GDPR | PDPL | CCPA | Default |
|---|---|---|---|---|
| Analytics default | OFF | ON | ON | ON |
| Functional default | OFF | ON | ON | ON |
| PostHog loads before consent | NO | YES | YES | YES |
| Banner type | Consent gate | Informational | Informational | Informational |
| "Do Not Sell" link visible | No | No | YES | No |
| Banner dismissible without action | No | Yes | Yes | Yes |
| Required user action | Accept/Reject/Customize | None (informational) | None (informational) | None (informational) |
| Banner persists until | Explicit choice made | Dismissed or 5s auto-hide | Dismissed or 5s auto-hide | Dismissed or 5s auto-hide |

**GDPR-specific behavior**: The banner MUST NOT auto-dismiss. It must remain visible until the user takes an explicit action (Accept All, Reject Non-Essential, or Save Preferences in Customize view). Scrolling or clicking elsewhere does NOT constitute consent.

**Non-GDPR informational behavior**: The banner appears, informs the user, and can be dismissed by clicking any button or via auto-hide after 5 seconds of inactivity. Even after auto-hide, the user can re-access cookie preferences via a persistent link in the site footer.

---

## 5. Buttons Specification

### 5.1 "Accept All" — Primary CTA

| Property | Value |
|---|---|
| **Label** | "Accept All" |
| **Background** | `var(--color-accent-gold)` (#C15A2C) — Burnt Copper |
| **Text Color** | `var(--color-text-base)` (#f0f2f0) — Warm White |
| **Border** | None |
| **Border Radius** | `var(--radius-md)` (0.75rem) |
| **Padding** | `px-5 py-2` |
| **Font** | `var(--font-heading)` (Space Grotesk), `var(--text-caption)` (0.875rem), weight 600 |
| **Hover** | Background lightens to `var(--color-accent-gold-matte)` (#D4683A), subtle `box-shadow: 0 4px 20px rgba(193, 90, 44, 0.3)` |
| **Transition** | `var(--duration-base)` (300ms), `var(--ease-in-out)` |
| **Action** | Sets all categories to accepted. Stores consent. Dismisses banner. Loads PostHog if not already loaded. |

### 5.2 "Reject Non-Essential" — Ghost Button

| Property | Value |
|---|---|
| **Label** | "Reject Non-Essential" |
| **Background** | Transparent |
| **Text Color** | `var(--color-text-muted)` (#8B9E94) |
| **Border** | `1px solid var(--glass-border)` → rgba(255, 255, 255, 0.1) |
| **Border Radius** | `var(--radius-md)` (0.75rem) |
| **Padding** | `px-5 py-2` |
| **Font** | `var(--font-heading)` (Space Grotesk), `var(--text-caption)` (0.875rem), weight 500 |
| **Hover** | Background `var(--glass-bg-hover)`, border `var(--glass-border-hover)`, text color `var(--color-text-base)` |
| **Transition** | `var(--duration-base)` (300ms), `var(--ease-in-out)` |
| **Action** | Sets only Strictly Necessary to accepted. All others rejected. Stores consent. Dismisses banner. Does NOT load PostHog. |

### 5.3 "Customize" — Text Button

| Property | Value |
|---|---|
| **Label** | "Customize" |
| **Background** | Transparent |
| **Text Color** | `var(--color-accent-gold)` (#C15A2C) |
| **Border** | None |
| **Padding** | `px-3 py-2` |
| **Font** | `var(--font-heading)` (Space Grotesk), `var(--text-caption)` (0.875rem), weight 500 |
| **Hover** | Underline, color lightens to `var(--color-accent-gold-matte)` |
| **Action** | Expands banner to show category toggles (Customize view). |

### 5.4 "Save Preferences" — Primary CTA (Customize View Only)

Same styling as "Accept All" (Section 5.1). Replaces "Accept All" in the expanded customize view.

| Property | Value |
|---|---|
| **Label** | "Save Preferences" |
| **Action** | Stores consent with the user's specific toggle selections. Dismisses banner. Conditionally loads PostHog based on analytics toggle state. |

### 5.5 "Do Not Sell My Info" — CCPA Link (CCPA Mode Only)

| Property | Value |
|---|---|
| **Label** | "Do Not Sell or Share My Personal Information" |
| **Rendered as** | Inline text link (not a button) |
| **Text Color** | `var(--color-accent-gold)` (#C15A2C) |
| **Font** | `var(--font-body)` (Inter), `var(--text-caption)`, weight 500 |
| **Hover** | Underline |
| **Position** | Below the description text in the banner; also permanently in the site footer |
| **Action** | Opens the Customize view with analytics pre-toggled to OFF. On save, sets a `do_not_sell: true` flag in the consent cookie. |

---

## 6. Consent Storage

### 6.1 Cookie: `qm_consent`

| Property | Value |
|---|---|
| **Name** | `qm_consent` |
| **Type** | First-party cookie |
| **Value** | URL-encoded JSON string |
| **Domain** | `.quartermasters.me` (includes all subdomains) |
| **Path** | `/` |
| **Expiry** | 365 days (12 months) from last update |
| **SameSite** | `Lax` |
| **Secure** | `true` (HTTPS only) |
| **HttpOnly** | `false` (must be readable by client-side JavaScript for PostHog conditional loading) |

### 6.2 JSON Schema

```json
{
  "v": 1,
  "ts": "2026-02-12T14:30:00.000Z",
  "mode": "gdpr",
  "categories": {
    "necessary": true,
    "analytics": false,
    "functional": false,
    "marketing": false
  },
  "do_not_sell": false
}
```

**Field definitions**:

| Field | Type | Description |
|---|---|---|
| `v` | `number` | Consent schema version. Increment when cookie categories change, triggering re-consent. |
| `ts` | `string` (ISO 8601) | Timestamp of when consent was recorded or last updated. |
| `mode` | `string` | The geo-detection mode active when consent was given: `"gdpr"`, `"pdpl"`, `"ccpa"`, or `"default"`. |
| `categories.necessary` | `boolean` | Always `true`. Included for completeness. |
| `categories.analytics` | `boolean` | Whether PostHog and analytics cookies are permitted. |
| `categories.functional` | `boolean` | Whether preference cookies (language, theme) are permitted. |
| `categories.marketing` | `boolean` | Whether marketing/advertising cookies are permitted. Always `false` until marketing cookies are deployed. |
| `do_not_sell` | `boolean` | CCPA-specific. `true` if user has exercised "Do Not Sell" right. |

### 6.3 Version-Based Re-Consent

The banner component stores a `CONSENT_VERSION` constant (initially `1`). On every page load:

1. Read `qm_consent` cookie.
2. Parse JSON.
3. If `v` field does not match `CONSENT_VERSION`, treat as no-consent state and re-display the banner.
4. This ensures that when new cookie categories are added or existing ones change, all users are prompted for fresh consent.

### 6.4 Geo-Mode Cookie: `qm_geo_mode`

Set by the Next.js middleware (server-side). Read by the client banner component.

| Property | Value |
|---|---|
| **Name** | `qm_geo_mode` |
| **Value** | `"gdpr"`, `"pdpl"`, `"ccpa"`, or `"default"` |
| **Expiry** | Session (or 24 hours) |
| **SameSite** | `Lax` |
| **Secure** | `true` |
| **HttpOnly** | `false` |

---

## 7. PostHog Conditional Loading

### 7.1 Loading Logic

PostHog MUST respect the consent state. The loading decision tree:

```
1. Read qm_consent cookie
2. IF cookie exists AND cookie.v == CONSENT_VERSION:
     a. IF cookie.categories.analytics == true:
          → Load PostHog, initialize with stored user ID
     b. ELSE:
          → Do NOT load PostHog. No analytics scripts.
3. IF cookie does NOT exist OR cookie.v != CONSENT_VERSION:
     a. Read qm_geo_mode cookie
     b. IF mode == "gdpr":
          → Do NOT load PostHog. Wait for explicit consent.
     c. ELSE (pdpl, ccpa, default):
          → Load PostHog immediately (default-on behavior).
          → When user later rejects analytics, call posthog.opt_out_capturing()
            and remove PostHog cookies.
```

### 7.2 PostHog Initialization Guard

The PostHog provider component (likely wrapping `posthog-js/react`) should:

1. Be a client component.
2. Check consent state before calling `posthog.init()`.
3. If consent is not yet given (GDPR mode, no cookie), render children WITHOUT initializing PostHog.
4. If consent is granted after page load (user clicks "Accept All"), dynamically initialize PostHog without requiring a page reload.
5. If consent is revoked (user changes preferences), call `posthog.opt_out_capturing()` and clear PostHog cookies.

### 7.3 PostHog Cookie Cleanup on Rejection

When a user rejects analytics (or revokes previously given consent), the following PostHog cookies must be deleted:

- All cookies matching the pattern `ph_*`
- `__ph_opt_in_out_*`

This cleanup should be performed by the consent manager, not PostHog itself.

---

## 8. Banner Lifecycle & Animation

### 8.1 Appearance

1. **Page loads** -> Middleware sets `qm_geo_mode` cookie (if not already set).
2. **Client hydrates** -> Banner component reads `qm_consent` and `qm_geo_mode`.
3. **Decision**:
   - If valid consent exists (correct version): Banner does NOT appear.
   - If no consent or stale version: Banner appears.
4. **Entry animation**: Slide up from below viewport. Duration: `var(--duration-slow)` (600ms). Easing: `var(--ease-out-expo)`.
5. **Initial delay**: 500ms after hydration (prevents layout jank, allows hero content to render first).

### 8.2 Dismissal

- **On button click**: Banner slides down and fades out. Duration: `var(--duration-base)` (300ms). After animation completes, component unmounts.
- **Auto-hide (non-GDPR only)**: 5 seconds after appearance, banner auto-dismisses with the same slide-down animation. Consent cookie is written with default-on values for the active mode.
- **GDPR mode**: NO auto-hide. Banner persists until explicit user action.

### 8.3 Expand/Collapse (Customize View)

- **Expand**: `max-height` transition from collapsed height to expanded height. Duration: `var(--duration-base)` (300ms). Easing: `var(--ease-out-expo)`. Content fades in with slight delay (100ms stagger).
- **Collapse**: Reverse animation. "Close" (X) button or "Save Preferences" triggers collapse.

---

## 9. Responsive Behavior

### 9.1 Desktop (>768px)

- Single-row layout: text on left, buttons on right.
- Customize view: category toggles in a single column within the expanded area.
- Max width constrained to page content width.

### 9.2 Mobile (<=768px)

- Stacked layout: text block on top, buttons below (full width, stacked vertically).
- Buttons order (top to bottom): "Accept All", "Reject Non-Essential", "Customize".
- "Accept All" is always the first (most prominent) button on mobile.
- Customize view: full-width toggles. Category descriptions may be truncated to 2 lines.
- Banner takes approximately 40-50% of viewport height when expanded. Scrollable if content overflows.

### 9.3 Accessibility

- All buttons have `aria-label` attributes.
- Toggle switches use `role="switch"` with `aria-checked` state.
- Banner container has `role="dialog"`, `aria-label="Cookie consent preferences"`.
- Focus trap is NOT applied (non-blocking banner). However, the first interactive element receives focus when the banner appears (for keyboard users).
- Color contrast ratios meet WCAG 2.1 AA:
  - Burnt Copper (#C15A2C) on glass background: passes AA for large text.
  - Warm White (#f0f2f0) on glass background: passes AA.
  - Sage Grey-Green (#8B9E94) on glass background: verify contrast ratio >= 4.5:1 during implementation; if insufficient, use `var(--color-text-base)` instead.
- `prefers-reduced-motion`: Disable slide/fade animations; banner appears/disappears instantly.

---

## 10. Footer Integration

A persistent "Cookie Preferences" link must be added to the site footer (in the "Company" link column of the existing `Footer.tsx`). This link:

- Opens the cookie consent banner in its Customize view, regardless of whether consent has already been given.
- Allows users to modify their preferences at any time.
- For CCPA mode, the footer must also display a "Do Not Sell or Share My Personal Information" link (can be the same link, or separate per CCPA requirements).

**Addition to `footerLinks.company` array**:
```
{ label: "Cookie Preferences", href: "#cookie-preferences" }
```

For CCPA visitors, also render:
```
{ label: "Do Not Sell My Info", href: "#do-not-sell" }
```

These are hash links that trigger the banner programmatically rather than navigating to a new page.

---

## 11. Technical Implementation Notes

### 11.1 Component Architecture

```
src/
  components/
    consent/
      CookieConsentBanner.tsx    ← Main banner component ("use client")
      CookieConsentProvider.tsx  ← Context provider, consent state management
      ConsentToggle.tsx          ← Individual toggle switch component
      useConsent.ts              ← Custom hook: read/write consent state
      consent-constants.ts       ← Version, EU country list, category definitions
  middleware.ts                  ← Geo-detection, sets qm_geo_mode cookie
```

### 11.2 React Component Interface — `CookieConsentBanner`

```typescript
// CookieConsentBanner.tsx — "use client"

interface CookieConsentBannerProps {
  // No required props. All state is derived from cookies.
}

// Internal state:
interface BannerState {
  visible: boolean;           // Whether banner is shown
  expanded: boolean;          // Whether customize view is open
  geoMode: 'gdpr' | 'pdpl' | 'ccpa' | 'default';
  categories: {
    necessary: true;          // Always true, not toggleable
    analytics: boolean;
    functional: boolean;
    marketing: boolean;
  };
  doNotSell: boolean;         // CCPA-specific
}

// Events emitted (via context or callbacks):
// - onConsentUpdate(consent: ConsentState)  → triggers PostHog load/unload
// - onBannerDismiss()                       → cleanup, unmount
// - onCategoryToggle(category, enabled)     → updates local state before save
```

### 11.3 React Component Interface — `CookieConsentProvider`

```typescript
// CookieConsentProvider.tsx — "use client"
// Wraps the application (placed in layout.tsx or Providers.tsx)

interface ConsentContextValue {
  consent: ConsentState | null;       // null = no consent yet
  geoMode: 'gdpr' | 'pdpl' | 'ccpa' | 'default';
  hasConsented: boolean;
  isAnalyticsAllowed: boolean;        // Convenience getter
  isFunctionalAllowed: boolean;       // Convenience getter
  updateConsent: (categories: Partial<CategoryState>) => void;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  openPreferences: () => void;        // Programmatically show banner
  resetConsent: () => void;           // Clear cookie, re-show banner
}

interface ConsentState {
  v: number;
  ts: string;
  mode: string;
  categories: CategoryState;
  do_not_sell: boolean;
}

interface CategoryState {
  necessary: true;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
}
```

### 11.4 React Component Interface — `useConsent` Hook

```typescript
// useConsent.ts

function useConsent(): {
  consent: ConsentState | null;
  geoMode: GeoMode;
  isAnalyticsAllowed: boolean;
  updateConsent: (categories: Partial<CategoryState>) => void;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  openPreferences: () => void;
}
```

### 11.5 Middleware Interface

```typescript
// middleware.ts

// Reads: request.headers.get('x-vercel-ip-country')
// Reads: request.headers.get('x-vercel-ip-country-region')
// Sets:  response cookie 'qm_geo_mode' = determined mode string
// Runs:  on all routes (or exclude _next/static, _next/image, favicon.ico, api/)

// Matcher config:
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/).*)',
  ],
};
```

### 11.6 Integration Points

1. **PostHog Provider**: The existing or future PostHog provider component must consume `CookieConsentProvider` context and check `isAnalyticsAllowed` before initializing.

2. **Layout.tsx**: `CookieConsentProvider` wraps the app. `CookieConsentBanner` is rendered inside the provider, after the main page content (so it appears on top via fixed positioning).

3. **Footer.tsx**: Add "Cookie Preferences" link that calls `openPreferences()` from the consent context.

4. **Any future functional cookie usage**: Check `isFunctionalAllowed` from the consent context before reading/writing preference cookies.

---

## 12. Testing Requirements

### 12.1 Geo-Mode Testing

- **Local development**: Default to GDPR mode (most restrictive). Allow override via environment variable `NEXT_PUBLIC_FORCE_GEO_MODE=pdpl|gdpr|ccpa|default` for testing.
- **Vercel Preview**: Test with VPN or Vercel's `x-vercel-ip-country` header override (possible via custom request headers in browser dev tools or Vercel Edge Config).

### 12.2 Acceptance Criteria

- [ ] Banner appears on first visit (no existing consent cookie).
- [ ] Banner does NOT appear on subsequent visits if valid consent cookie exists.
- [ ] Banner re-appears if consent version is bumped.
- [ ] GDPR mode: PostHog does NOT load before consent. Verified via Network tab.
- [ ] GDPR mode: Banner does not auto-dismiss. Persists until user action.
- [ ] PDPL/Default mode: PostHog loads immediately. Banner is informational.
- [ ] CCPA mode: "Do Not Sell" link is visible. Setting it writes `do_not_sell: true`.
- [ ] "Accept All" stores consent with all categories true.
- [ ] "Reject Non-Essential" stores consent with only necessary true.
- [ ] "Customize" -> toggle analytics off -> "Save Preferences" stores correct state.
- [ ] After rejecting analytics, PostHog cookies (`ph_*`) are cleaned up.
- [ ] After accepting analytics post-rejection, PostHog re-initializes without page reload.
- [ ] Footer "Cookie Preferences" link re-opens the banner.
- [ ] Banner is keyboard-navigable. Toggles work with Space/Enter.
- [ ] Banner respects `prefers-reduced-motion`.
- [ ] Mobile layout stacks correctly at <=768px.
- [ ] Cookie expires after 365 days.

---

## 13. Open Questions for Founder Review

1. **Auto-hide timing for non-GDPR**: Spec proposes 5 seconds. Should this be longer (e.g., 10 seconds) or should non-GDPR banners also require manual dismissal?

2. **PostHog cookie-less mode**: PostHog supports a cookie-less tracking mode that does not set any cookies and does not track individual users. Should this be offered as an alternative to full analytics for GDPR users who reject cookies? (Would still require consent under GDPR, but lowers the privacy impact.)

3. **Marketing category visibility**: Currently hidden since no marketing cookies are planned. Should the category be shown (greyed out, with "Coming soon" or "None currently") for transparency, or kept hidden to reduce visual clutter?

4. **Consent log retention**: Should consent records be stored server-side (e.g., in Supabase) for audit trail purposes? GDPR Article 7(1) requires controllers to be able to demonstrate that consent was given. A client-side cookie alone may not suffice for audit purposes.

---

*Specification prepared by the Compliance Officer, Quartermasters F.Z.C.*
*Document version: 1.0 | 2026-02-12*
