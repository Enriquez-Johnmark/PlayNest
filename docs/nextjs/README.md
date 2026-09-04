# PlayNest responsive web app handoff

Start a new Next.js project from these two documents:

1. [PRODUCT.md](PRODUCT.md) establishes user, scope, data, behaviors, and non-goals.
2. [DESIGN.md](DESIGN.md) establishes the visual system and responsive interaction rules.

The target is the **parent booking application**, not the separate marketing site. Treat the mobile Stitch export in `../stitch_playnest_mobile_app_design/` as visual reference material; do not copy its HTML into the app or treat sample payment, membership, messaging, or QR UI as working integrations.

## Suggested project baseline

- Next.js App Router, TypeScript, Tailwind CSS, and accessible semantic components.
- Local deterministic repository/fixtures first, behind async interfaces so an API can replace them later.
- Route-level loading, empty, error, and not-found states.
- A responsive web app with the booking flow maintained as a clear sequential journey.

The existing Android app is implementation evidence, not code to share directly. Reuse its product rules and design language, but make web-native choices for layout, keyboard interaction, browser navigation, and responsive breakpoints.
