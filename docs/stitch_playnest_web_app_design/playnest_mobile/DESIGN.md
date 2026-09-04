---
name: PlayNest Mobile
description: A calm place for parents to organize energetic experiences for their
  children.
colors:
  surface: '#fff8f6'
  surface-dim: '#e9d6ce'
  surface-bright: '#fff8f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1eb'
  surface-container: '#fdeae2'
  surface-container-high: '#f7e4dc'
  surface-container-highest: '#f1dfd7'
  on-surface: '#231a15'
  on-surface-variant: '#59413c'
  inverse-surface: '#392e29'
  inverse-on-surface: '#ffede6'
  outline: '#8d716b'
  outline-variant: '#e1bfb8'
  surface-tint: '#ae3118'
  primary: '#ab2e16'
  on-primary: '#ffffff'
  primary-container: '#cd462c'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb4a4'
  secondary: '#526161'
  on-secondary: '#ffffff'
  secondary-container: '#d5e6e5'
  on-secondary-container: '#586767'
  tertiary: '#006670'
  on-tertiary: '#ffffff'
  tertiary-container: '#00818d'
  on-tertiary-container: '#f7feff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad3'
  primary-fixed-dim: '#ffb4a4'
  on-primary-fixed: '#3e0500'
  on-primary-fixed-variant: '#8c1802'
  secondary-fixed: '#d5e6e5'
  secondary-fixed-dim: '#b9cac9'
  on-secondary-fixed: '#0f1e1e'
  on-secondary-fixed-variant: '#3a4a49'
  tertiary-fixed: '#92f1ff'
  tertiary-fixed-dim: '#63d6e6'
  on-tertiary-fixed: '#001f23'
  on-tertiary-fixed-variant: '#004f57'
  background: '#fff8f6'
  on-background: '#231a15'
  surface-variant: '#f1dfd7'
  surface-base: '#FCFAF7'
  surface-card: '#FFFFFF'
  secondary-foreground: '#215956'
  accent-sunshine: '#FDF1D0'
  accent-sunshine-foreground: '#764D18'
  muted-surface: '#F6F3F0'
  muted-text: '#7C736E'
  border-subtle: '#EBE4DE'
  semantic-success: '#33A364'
  semantic-warning: '#F59E0B'
  semantic-destructive: '#DC3535'
  semantic-info: '#2984DF'
typography:
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  space-1: 0.25rem
  space-2: 0.5rem
  space-3: 0.75rem
  space-4: 1rem
  space-5: 1.25rem
  space-6: 1.5rem
  space-8: 2rem
  space-10: 2.5rem
---

# PlayNest mobile design system

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