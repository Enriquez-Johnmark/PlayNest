# Stitch native translation

The acceptance reference is the supplied `docs/stitch_playnest_mobile_app_design` export. The earlier product-brief implementation is not the visual reference. Source HTML and PNGs remain unchanged.

| Source | Native implementation |
| --- | --- |
| Home discovery | `src/app/(tabs)/index.tsx` |
| Activities feed | `src/app/(tabs)/activities.tsx` |
| Activity detail | `src/app/activity/[activityId].tsx` |
| Session booking / child selection | `src/app/activity/[activityId]/sessions.tsx` |
| Review / payment | `src/app/activity/[activityId]/review.tsx` |
| Booking confirmed | `src/app/booking/[bookingId]/confirmation.tsx` |
| Bookings / check-in pass | `src/app/(tabs)/bookings.tsx`, `src/components/booking-pass.tsx` |
| Parent family profile | `src/app/(tabs)/profile.tsx` |

## Translation rules

- Actual React Native views, text, images, inputs, navigation and scroll views. No WebView, screenshot-as-screen, or copied HTML scripts.
- Original source photos, portrait, and logo are bundled locally; URL provenance is in `assets/images/stitch/sources.json`.
- Original Material Symbols glyphs are rendered from the bundled font, rather than substituted Lucide icons.
- Static Jakarta Sans 400, 500, 600 and 700 fonts; the previous three font files were identical variable-font copies and did not render the intended weights.
- NativeWind `inlineRem: 16` preserves the source Tailwind dimensions. Its native default of 14 shrank all rem-based dimensions relative to Stitch.
- Source Home uses 24px feature-card radii, Activities uses 16px card radii, and actions use 12px radii.
- Native system status and navigation insets are reserved outside the header, tab bar and fixed booking actions. The HTML's fake OS gesture handle is omitted.
- Screens share explicit text/font handling rather than relying on `Text.defaultProps`, which did not apply reliably.

## Interactive data and demo boundaries

The source catalog and fictional Leo/Maya family are added to existing persisted demo state without deleting previous records or bookings. Source catalog prices are USD, while legacy PHP activity records remain intact. Dates and availability for actual reservations come from the local repository, so they differ from the source's historical October sample dates. The source layout remains in place.

The existing one-child-per-booking rule is preserved, and the source selection screen is used for both child and session selection. Full/ineligible selections stay unavailable. Submission idempotency, persisted reservations, and upcoming-only check-in passes remain enforced. Care notes are passed through review and saved with the booking.

Payment, memberships, wallet, notifications, calendar, host chat, profile editing and waitlist controls are demo presentation, not connected services. They must not display invented payment/email/wallet success. Confirmation explicitly describes local persistence. A real opaque-reference QR is used instead of the source's decorative QR drawing.

The HTML itself has different sample names, upcoming activities, prices/taxes and dates across its screens. Preserve each reference composition; do not treat its simulated scripts or marketing claims as backend requirements.

## Verification

Verification evidence is stored in `docs/mobile/verification/stitch/`. An exact-pixel parity claim requires visual comparison at matching logical viewport width; type checking alone is not acceptance. Android system bars and font rasterization are platform differences, and live reservation values necessarily replace historical source labels.

### 2026-09-04 result

- TypeScript and ESLint pass. Five domain tests pass, including the 18-month infant eligibility boundary.
- ARM64 release APK builds successfully and bundles the original imagery and fonts. Delivery path: `dist/playnest-stitch-preview.apk`.
- Native Android captures use 392 logical pixels (1176 physical pixels, density 480) and system font scale 1.0. Home, Activities, detail, child/session, review, confirmation, bookings, pass and profile were inspected.
- A reservation was created as PN-000001 through the native checkout. It remained in Bookings after force-stop/relaunch and after installing the updated build. `native-final.log` records the successful follow-up screen, filter, pass and restart checks.
- The first checkout run reached confirmation successfully, but its restart assertion ran before cold loading finished. The capture script now waits for screen readiness and supports `--capture-existing` without submitting duplicate reservations.
- The emulator had an Android System UI cold-start stall; it recovered before the successful final capture run. This was separate from the application.
- The delivered source additionally corrects the Activities filter control to the HTML's circular shape; the main capture batch predates that last shape-only correction.
- Screenshots show native OS bars and live local reservation dates/QR values. They are visual review evidence, not a claim of mathematically identical pixels across Android and HTML rendering.
