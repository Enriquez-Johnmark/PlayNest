# PlayNest — Mobile Product

<!-- impeccable:product-schema 1 -->

## Platform

android

Android phones are the first release target. Preserve React Native portability for a later iOS release; TestFlight and tablet delivery are not current acceptance gates.

## Users

Parents choosing and reserving activities for their children at one activity center. The trial uses Sarah and two fictional children, Emma and Lucas. Children do not operate the application. Reception staff are a future audience, not current app users.

## Product Purpose

Help a parent discover a suitable activity, choose an available session, select an eligible child, and confidently retrieve the resulting booking and check-in pass.

The first milestone is a polished, locally persisted evaluator demo delivered as an Android APK. Success means a reviewer can install it and complete the journey without assistance. Production readiness is a separate milestone. The source proposes three days; a binding calendar deadline remains unconfirmed.

## Positioning

Child suitability and session availability are visible before commitment. One booking represents one child attending one session. The product is a focused activity-center experience, not a general marketplace.

## Operating Context

Discover → Activity Details → Choose Session → Choose Child → Review → Confirm → My Bookings → Check-In Pass.

Parents return to Upcoming Bookings to retrieve details and show a pass at reception. Trial passes demonstrate presentation only; no staff scanner or admission validation exists. PHP is the sole display currency. Seeded activities use PlayNest Activity Center; Asia/Manila is the proposed demo venue timezone.

## Capabilities and Constraints

- Four primary destinations: Home, Activities, Bookings, Profile.
- Four seeded activities: Toddler Time, Little Explorers, Junior Gymnastics, Open Play.
- Demo access, no real account creation or credential collection.
- Activity details include age range, duration, price, instructor, and location.
- Full sessions stay visible and unavailable; ineligible children remain visible with a reason.
- A successful booking persists locally before confirmation appears, and remains available after restart.
- Local services own validation and data access. There is no shared availability across devices.
- A deliberate reset restores fictional demo data and removes locally created demo records.
- Add Child is P1. Seeded child profiles are persisted in P0; newly added profiles persist if P1 is implemented.
- No real payments, backend, staff administration, production QR validation, cancellation, memberships, notifications, or multi-location selection in P0.
- The marketing website is deferred and documented separately under `docs/web/`. It is not an Expo web delivery target or a mobile acceptance requirement.

## Brand Commitments

PlayNest. “Play. Learn. Grow.” Warm, calm, parent-facing language. The source principle is “The children bring the energy. The interface brings the calm.” Preserve the existing restrained, family-oriented direction; visual rules live in DESIGN.md.

## Evidence on Hand

The combined source specification and PlayNest_DESIGN.md under docs/ contain product requirements, fictional seed content, and a proposed visual system. The existing implementation is a foundation screen, not the finished product. No live inventory, verified commercial claims, customer evidence, or production service is established by these documents.

## Product Principles

1. Make suitability and availability understandable before booking.
2. Keep one clear next action through the booking journey.
3. Confirm only what the repository actually saved.
4. Preserve user selections through recoverable errors.
5. Complete and verify the core journey before expanding scope.

## Accessibility & Inclusion

Readable text that respects system font scaling, screen-reader labels and state announcements, adequate touch targets, status expressed through text as well as color, reduced-motion support, and safe-area/keyboard-aware layouts. Disabled choices must remain readable and explain why they cannot be selected.
