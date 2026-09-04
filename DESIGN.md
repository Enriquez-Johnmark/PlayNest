---
name: PlayNest Mobile
description: A calm place for parents to organize energetic experiences for their children.
---

# PlayNest mobile design system

## Visual authority — September 4, 2026

The user explicitly requires a faithful React Native translation of `docs/stitch_playnest_mobile_app_design/`, not a redesign or interpretation of the earlier product brief. Per-screen `code.html` plus `screen.png` are the visual acceptance references. Preserve their content hierarchy, images, typography, layout, controls, spacing, colors, and corner radii. If the older token tables below or the export's DESIGN.md disagree with a rendered screen and its HTML, the screen and its HTML win.

Shared implementation: `src/components/stitch-ui.tsx` and `stitch-header.tsx`. NativeWind uses a 16px rem base to preserve the HTML dimensions. Load real static Jakarta Sans 400/500/600/700 fonts, and the original Material Symbols font. The main discovery colors are background #FDF9F6, primary #EE5E41, ink #2B221D, muted #7C736E, border #E8DED8, mint #D3F2EF, and sunshine #FDF1D0. Home's 2xl radius is 24px; feed cards are 16px; buttons are 12px. Do not blindly replace every source radius with the same Tailwind class.

Native status/navigation insets are additional to the source's 64px header and tab content. Never draw a fake OS gesture handle or place tab labels behind system navigation. Booking records, dates, availability and child eligibility must come from the local repository. Source payment, membership and external-service controls are demonstration UI, not integrations. Do not say that email was sent, money collected, a wallet pass installed or a host contacted when that did not happen.

The original downloaded assets and URL provenance are in `assets/images/stitch/sources.json`. The source exports remain untouched.

The following is the earlier, provisional product-brief direction, retained for history. It must not override the supplied Stitch screens.


## Overview

**Creative North Star: “Playful restraint.”** The children bring the energy; the interface brings the calm. Warm, clear, and credible for parents, with modest playfulness in imagery and small brand details. Preserve the direction in the supplied PlayNest_DESIGN.md rather than inventing a replacement identity.

Status: provisional, pre-implementation design direction. This records the supplied brief, not a visual audit of finished screens. The existing dark foundation screen is scaffolding, not the PlayNest identity. After the first native implementation, reconcile this document with verified tokens, components, and device evidence. Do not label untested values as extracted or accessibility-approved.

Mobile scope only. The website has its own design document. Use React Native components, NativeWind semantic utilities and Lucide React Native icons. Retain native navigation, system Back, safe-area, font-scaling and accessibility behavior. The supplied light-only trial, font direction and icon family take precedence over generic skill defaults; do not add dark mode, a second UI library, or dynamic wallpaper colors during the trial.

## Colors

Warm coral/tangerine is the primary action and selection accent. Soft teal supports quiet information surfaces; sunshine/cream is a sparse secondary accent. Use warm off-white backgrounds, white cards and warm dark text. Avoid covering whole screens in coral.

The source supplies these **candidate** HSL values. They are starting inputs for native contrast validation, not final shipped tokens:

| Semantic role | Source candidate |
| --- | --- |
| background / foreground | `hsl(30 40% 98%)` / `hsl(24 20% 14%)` |
| card / card foreground | `hsl(0 0% 100%)` / `hsl(24 20% 14%)` |
| primary / on-primary | `hsl(14 82% 60%)` / `hsl(0 0% 100%)` |
| secondary / on-secondary | `hsl(176 38% 91%)` / `hsl(176 45% 24%)` |
| accent / on-accent | `hsl(42 92% 90%)` / `hsl(32 65% 28%)` |
| muted / muted foreground | `hsl(30 24% 95%)` / `hsl(24 8% 46%)` |
| border / input | `hsl(28 20% 89%)` |
| success / warning | `hsl(145 52% 42%)` / `hsl(38 92% 50%)` |
| destructive / info | `hsl(0 72% 55%)` / `hsl(205 75% 52%)` |

Check every foreground/background pair before use, particularly white text on coral and small semantic status labels. Adjust semantic token lightness or the foreground pairing when needed while preserving the palette's character. Do not rely on tinted opacity layers to make unavailable text legible. A status always has a label or icon explanation in addition to color. Record validated native token values in frontmatter only after implementation establishes them.

## Typography

Preferred brand family: Plus Jakarta Sans, with native system sans as an explicit loading/failure fallback. Load only the weights used. Native text must scale with system settings; avoid fixed-height containers that clip larger text.

| Role | Starting scale | Weight and purpose |
| --- | --- | --- |
| Screen title | 24 | Semibold; screen context |
| Prominent title | 20 | Semibold; booking outcome or focused detail |
| Section/card title | 18 | Semibold; scannable activity and section names |
| Body | 16 | Regular; instructions and descriptions |
| Metadata/label | 14 | Regular or medium; age, duration, price and status |
| Small supporting label | 12 | Sparse nonessential supporting text only |

These are starting native logical text sizes, not fixed CSS pixels or a completed font specification. Validate line height, weight rendering and enlarged text on Android. Use sentence case and concise parent-facing copy. Primary actions use explicit verbs: Book Session, Continue, Confirm Booking, View Booking. Avoid “Submit.”

## Layout

Phone-first, one main reading column, safe-area-aware top and bottom regions, and scrollable content. Start with 16–20 dp horizontal gutters and the source spacing rhythm of 4, 8, 12, 16, 20, 24, 32 and 40 dp. Group related information closely; separate sections more generously. Preserve comfortable space around primary actions.

Four tabs with icon and label: Home, Activities, Bookings, Profile. The booking steps remain inside stack navigation, not extra tabs. Respect Android system Back; keep the selected activity visible during selection and review. A reachable bottom action must not obscure the final content row or keyboard. Do not copy website breakpoints or DOM layout patterns into native screens.

Home is welcoming, with activity discovery and the parent's next booking; no KPI dashboard. Activity Details presents imagery, name, suitability, description, facts and Book Session. The booking sequence is Choose Session → Choose Child → Review → Confirmation, with no invented extra steps. Confirmation gets extra whitespace and no immediate promotional interruption.

## Elevation & Depth

Prefer surfaces and subtle borders over heavy shadows. Ordinary activity and booking cards have restrained depth. Reserve stronger separation for actual overlays. Do not turn every text group into a card or introduce glass effects, oversized shadows or random gradients.

## Shapes

Soft, moderately rounded forms. Starting mapping: 12 dp inputs/buttons, 16 dp standard cards, 24 dp occasional feature surfaces, and pill badges. Maintain a small reusable radius scale rather than varying corners per screen. Do not let decorative rounding reduce readable width or touch target area.

## Components

- **Buttons:** one clear primary action per step; default, pressed, disabled and busy states. Minimum 48 dp touch target. Busy confirmation blocks repeat taps while the repository handles duplicate safety.
- **Activity card:** image, name, age range, duration, price and truthful availability. The whole card's interaction is clear and accessible; avoid competing nested actions.
- **Session row/card:** time and available/full label. Selected state combines a visible boundary and accessible selected state. Full stays readable and unselectable.
- **Child row/card:** name, derived age and eligibility. An unavailable child explicitly says “Ages 5–8 only” where appropriate; never use opacity alone.
- **Review summary:** label/value hierarchy for activity, child, date/time, duration, location and informational price. Easy to scan without turning each fact into a separate card.
- **Booking card:** stable child/activity/date summary with a textual status. Upcoming/Past grouping follows PRD rules, not visual guesses about attendance.
- **Check-in pass:** high-contrast QR with clear quiet space, child, activity, schedule and human-readable reference. “Show this pass at reception when you arrive.” Qualify the trial pass as a demo with no admission validation. Do not encode child details into the QR.
- **Empty/error states:** explain what happened and provide a working next action. Never show controls for unimplemented P1 features. Preserve selections when retrying.
- **Motion:** native transitions and subtle press/success feedback. Honor reduced motion. No artificial loading delay, bouncing UI or action-blocking animation.

## Do's and Don'ts

- Reuse semantic tokens and controlled React Native components; keep business rules out of visual components.
- Keep the parent task and the next action clear, including with larger text or a screen reader.
- Use fictional seed data consistently; source final imagery deliberately and record its origin.
- Verify rendered Android screens, not just web previews, before documenting a design as implemented.
- Preserve light-only trial branding while ensuring system bars and controls remain legible under device appearance changes.
- Do not introduce a fifth tab, child-game aesthetic, enterprise dashboard, web-only components, random token overrides, or fake payment success.
- Do not describe this seed document as final visual approval; the first implemented screens must establish and verify its concrete values.
