# PlayNest responsive booking app — product specification

## Product definition

PlayNest helps a parent find a suitable activity for their child, choose a session with capacity, book one child into that session, and later retrieve the booking and check-in pass.

This web build is a responsive parent booking app for a single activity centre. It is not a generic marketplace and it is not the public marketing website.

## Primary user and success

The primary user is a parent who needs to make a confident, quick decision about an activity. The child does not operate the application.

The core success path is:

`Discover → Activity details → Choose session → Choose child → Review → Confirm → My bookings → Check-in pass`

Success means the parent understands suitability and availability before committing, completes a single-child booking without ambiguity, and can reliably retrieve the saved outcome.

## Product rules

- One booking represents one child attending one session.
- Activities show their age range, duration, price, instructor, location, and availability.
- Child eligibility is calculated from date of birth and an activity's inclusive age range. Ineligible children remain visible with a readable reason.
- A session is bookable only when it exists, has not started, is scheduled, and has remaining capacity.
- Full, cancelled, and past sessions remain understandable but cannot be booked.
- Confirmation appears only after the booking repository acknowledges the save.
- Repeated confirmation must not create duplicate bookings or consume extra capacity. Use a submission identity and atomic repository mutation.
- A booking reference is stable, unique, human-readable, and generated at save time, never during rendering.
- Upcoming bookings are confirmed bookings with a future start time. At the start time, they become Past; do not invent attendance status.
- An active demo pass is available only for an upcoming confirmed booking. Its QR payload must be opaque and contain no child details.
- Price is informational in the demo. Store money in integer minor units at the data boundary; format only for display.

## Scope for the first web implementation

### Required

- Fictional demo access; do not collect credentials or real child data.
- Home, Activities, My Bookings, and Profile as primary navigation destinations.
- Activity browse, search/filter, detail, and activity context throughout booking.
- Session selection, child eligibility, review, persisted confirmation, booking detail, and a demo check-in pass.
- Persisted local demo state, safe retry/error behavior, and an explicit confirmed reset.
- Responsive loading, empty, error, selected, unavailable, and disabled states.

### Deliberately deferred

- Real authentication, backend API, shared inventory locking, payments, taxes, refunds, cancellation, rescheduling
- Staff/admin portal, scanning, admission validation, production QR security
- Email, notifications, calendar/wallet integration, waitlists, memberships, analytics, multi-location selection
- Editing profiles or using real child information

## Data model and boundaries

Use `User`, `Child`, `Activity`, `Session`, and `Booking` entities. Keep fixtures, repositories, domain validation, and UI separate.

`Child` has a parent ID and date of birth, not a stored age. `Activity` defines age limits, duration, price, instructor, location, and image. `Session` defines activity, start time, capacity, seeded occupancy, and status. `Booking` defines user, child, session, reference, status, creation timestamp, and submission identity.

Expose asynchronous repository operations for initialisation, activity/session/child reads, booking create/list/get, and reset. This lets a future server replace local storage without a UI rewrite. Until then, make every local failure recoverable and never claim cross-device inventory integrity.

## Route map

| Route | Purpose |
| --- | --- |
| `/` | Home: relevant discovery and upcoming booking context. |
| `/activities` | Browse/search/filter activities. |
| `/activities/[activityId]` | Activity details and booking entry. |
| `/activities/[activityId]/book` | Sequential session and child selection. |
| `/activities/[activityId]/review` | Read-only review before confirmation. |
| `/bookings` | Upcoming and Past booking groups. |
| `/bookings/[bookingId]` | Persisted booking detail. |
| `/bookings/[bookingId]/pass` | Demo pass for eligible upcoming bookings. |
| `/profile` | Fictional family context and confirmed demo reset. |

Preserve a valid draft when the user navigates back. Clear it after successful confirmation so browser Back cannot submit again. Missing IDs must render a recoverable not-found state.

## Content and trust requirements

Use consistent fictional data. Do not imply a payment was taken, an email was sent, a wallet pass was installed, a host has been contacted, or admission is validated unless an implementation actually does it. Explain disabled/unavailable choices in text as well as color. All display claims should be backed by local fixture data or an eventual API.

## Acceptance checks

- A parent can complete the happy path without assistance.
- Capacity, eligibility, duplicate, and persistence rules hold even when the UI is bypassed.
- Saved bookings survive a browser reload in demo mode.
- Review, confirmation, booking detail, and pass all reflect the same canonical saved booking.
- Keyboard, focus order, screen-reader naming, error recovery, responsive navigation, and touch/click targets are verified.
- The visible product language remains calm, clear, and parent-focused.
