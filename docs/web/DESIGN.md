---
name: PlayNest Website
description: A warm, parent-facing introduction to PlayNest activity programs.
---

# PlayNest website design direction

## Overview

Provisional design brief for the deferred marketing website. Pair with PRD.md and move both to the later web project. Preserve the same brand as the mobile app, with a distinct marketing layout. This is supplied design intent, not an extracted or implemented website system.

“Playful restraint”: energetic program imagery and warm details, held within a calm, legible layout. Parents should quickly understand suitability and the real next action. Avoid a toddler game, corporate dashboard, generic component demo, or unsubstantiated marketing claims.

## Colors

Warm coral/tangerine for principal actions and small brand accents; soft teal for supporting sections; sunshine/cream used sparingly; warm off-white page background, white cards, warm dark text. Use semantic CSS variables mapped to Tailwind. Final values must be reconciled with the validated mobile palette when the web project begins; do not independently fork the brand.

The source coral candidate is `hsl(14 82% 60%)`, warm background `hsl(30 40% 98%)`, foreground `hsl(24 20% 14%)`, soft teal `hsl(176 38% 91%)`, and cream accent `hsl(42 92% 90%)`. These are unverified starting points, not approved contrast pairs. Test text, buttons, focus and statuses before shipping.

## Typography

Plus Jakarta Sans is the source's preferred family, with a sans-serif fallback. Clear sentence-case headings, readable body text and modest metadata. Reserve the largest type for the hero; do not use huge text everywhere. Start with the Tailwind text scale and constrain paragraphs for comfortable reading. Final font files, weights, sizes and loading strategy are implementation decisions.

## Layout

Navbar → Hero → Programs → Benefits → How It Works → Schedule → Pricing → FAQ → Final CTA → Footer.

The source proposes a centered max-width container around 80rem with 16/24/32px responsive gutters; narrower text sections around 48rem. Treat these as starting layout constraints. A two-column desktop hero may pair real imagery with copy and collapse naturally on mobile. Programs expand from one column to two/four where card readability allows. Use substantial section spacing, approximately 64/80/96px across viewport sizes, tuned to actual content.

The page must work without horizontal scrolling, fixed-height text boxes or decorative content hiding the CTA. Website responsive breakpoints belong here, not in the native app. Anchor destinations remain visible below a sticky header if used.

## Elevation & Depth

Prefer borders and surface changes to heavy shadows. Lightweight icon/text benefits; cards for genuine grouped content such as programs or offers. No glassmorphism, arbitrary gradients, or deep shadows on every section.

## Shapes

Source mapping: 12px buttons/inputs, 16px ordinary cards, 24px occasional feature/pricing surfaces, pill badges. Keep the same form language as mobile without forcing identical layouts.

## Components

- Navigation: responsive menu, working section anchors, explicit focus state and keyboard behavior.
- Hero: source headline/subheading and honest CTAs. Explore Programs is a section anchor; any app conversion requires a verified destination.
- Program cards: image, program, ages, duration and demo price. No false live availability badges.
- Benefits: concise text with one Lucide icon family. No invented testimonials, certifications or safety guarantees.
- Schedule: readable responsive rows/list or table; labeled sample data.
- Pricing: distinguish fictional offers and varying program prices. No fake checkout or purchase controls.
- FAQ: accessible disclosures with accurate, approved answers; do not promise mobile cancellation.
- Footer: actual contact/legal destinations only; no empty links.

## Do's and Don'ts

Use Tailwind semantic tokens, reusable React components, and shadcn/ui only where useful. Keep content and brand aligned with the mobile app. Use imagery with known provenance, meaningful alt text, visible focus and reduced-motion support. Verify at representative phone and desktop widths.

Do not force React Native UI into the website, build browser booking, introduce another styling framework, or publish demo policy/pricing as verified venue facts. Record final token values after the first implementation and native/web brand reconciliation.
