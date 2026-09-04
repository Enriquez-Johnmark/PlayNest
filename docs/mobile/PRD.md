# PlayNest mobile PRD

Status: implementation baseline following the user's instruction to proceed with the recommended trial approach. Product-rule clarifications below are explicit implementation defaults, not claims of individually answered interview questions.

## Outcome and delivery boundary

Deliver an installable Android phone demo in which a parent completes an age-appropriate activity booking and retrieves it after restarting the app. Use Expo, React Native, Expo Router, TypeScript, and the existing NativeWind setup. Validate actual dependency compatibility before installing additional packages; package presence alone does not prove runtime readiness.

The repository is the mobile project. A later marketing website lives in another project folder. No website, backend, real login, payments, or operational check-in system is part of this release. iOS portability is an architectural consideration; an iOS binary is not currently required.

## Personas and primary demonstration

Sarah books Junior Gymnastics for Emma. Emma's seeded DOB is 2021-04-12; Lucas's is 2023-03-08. Calculate age from DOB rather than persisting age. On the source's 2026 demo date Emma is 5 and Lucas is 3. Junior Gymnastics accepts ages 5–8, so Emma is selectable and Lucas is visibly ineligible.

Demonstrate available, low-capacity, and full sessions. Source times are 9:00, 11:00, 14:00, and 16:00. Generate future-facing dates once at first initialization or explicit reset, then persist them; never regenerate sessions during daily reads or invalidate existing bookings. If fixture ages no longer demonstrate eligibility on a future evaluation date, revise fictional seed DOBs deliberately and document that change.

## Priority

| P0: required | P1: only after P0 passes | Deferred |
| --- | --- | --- |
| Demo entry; Home; Activities; details | Add Child | Real authentication/backend |
| Session and child selection; review | Onboarding carousel | Payments/membership engine |
| Persistent confirmation and booking list/details | Favorites and clearly labeled membership preview | Staff/admin/scanner |
| Upcoming/Past; valid demo pass | Promotional content | Cancellation/rescheduling |
| Profile with seeded children and demo reset | Other additions require scope review | Push notifications/multi-location |
| Error/empty/loading states; APK and documentation | | Website and iOS release |

Do not expose dead controls for deferred features. P0 empty child state explains that the demo can be reset; do not show an Add Child action until the feature exists. Profile can show seeded children without promising editing.

## Screen and navigation contract

| Surface | Required behavior |
| --- | --- |
| Demo entry | Clearly labeled demo access. No pretend password validation or account creation. |
| Home | Greeting, featured activity, today's activities or honest empty state, upcoming booking when present. |
| Activities | Four seeded activities with image, name, age range, duration, price, and meaningful availability. |
| Activity Details | Description, age range, duration, price, instructor, location, Book Session action. |
| Choose Session | Activity context, date picker, times and availability. Exactly one selection; full sessions visible and disabled. |
| Choose Child | Show all demo children and age eligibility reason. Exactly one eligible selection. |
| Review | Activity, child, date/time, duration, location, price; Confirm Booking action. No payment step. |
| Confirmation | Success only after persistence; reference, summary, View Booking and Back to Home. |
| Bookings | Upcoming/Past groups, correct summaries, empty state leading to Activities. |
| Booking Details | Canonical saved booking, reference, schedule and child; pass action only when eligible. |
| Check-In Pass | QR containing an opaque demo reference, human-readable reference and details; reception helper text and demo qualification. |
| Profile | Sarah's fictional details, children, explicit reset action. No nonfunctional settings. |

Four tabs only: Home, Activities, Bookings, Profile. Put activity details and the sequential booking flow in a navigation stack. Preserve draft selections on ordinary Back and recoverable errors. Changing session must revalidate any selected child. Success clears the draft and prevents Back from resubmitting the completed review. Missing route IDs show a recoverable not-found state.

## Domain rules and explicit implementation defaults

1. One booking = one child + one session. No multi-child checkout.
2. Eligibility is inclusive minAge/maxAge, calculated from DOB on the current demo venue date. This preserves the source's trial rule; age-at-session policy is a future production decision.
3. Store timestamps as offset-aware ISO values; use Asia/Manila consistently for demo venue display and date selection. Never parse a DOB as a timezone-shifting instant.
4. Bookable means a real scheduled session, startsAt strictly in the future, and capacity remaining. Revalidate at confirmation, even when the UI previously allowed selection.
5. Available capacity derives from seeded occupancy plus locally confirmed bookings. Persist booking and occupancy changes as one coherent repository state; prevent partial updates and double counting after reload.
6. Require a real child belonging to the active demo parent and a real activity matching the session. UI disabling is not domain validation.
7. Repeated confirmation and retry of the same submission must not create duplicate bookings. Use a stable submission identity and serialize local writes; an already-saved retry returns the same result. A separate request for an existing confirmed child/session combination returns a friendly duplicate response.
8. Success appears only after the repository acknowledges the saved booking. A persistence error retains the draft and shows a retry path. A failed write must not consume capacity.
9. Persist unique internal IDs and unique human-readable references. Do not regenerate references during rendering.
10. Upcoming = confirmed and startsAt > now. At session start, the item moves to Past; grouping does not fabricate attendance or mutate status to completed. Preserve the stored status. Cancelled fixtures, if present, appear in Past with their status clearly stated.
11. Pass eligibility uses the same upcoming rule. Recheck when opening a pass; cancelled, missing, or past bookings cannot expose an active pass. The QR is a demo reference, never a security or admission guarantee.
12. Currency is PHP only. Normalize source peso prices into integer minor units at the data boundary; format for display. Price is informational in the trial, with no collection or payment-success screen.
13. Persist profile/children, fixture version, sessions, and bookings locally. A repository reset removes user-created demo data, resets occupancy, and creates a new future-facing fixture set together. Confirm this destructive action in the app.
14. A cold-start read failure must offer retry or explicit reset, rather than silently deleting records. Incompatible fixture/storage versions require a controlled migration or an explained reset.

These rules only protect a single local demo installation. They are not shared inventory locking or production authorization.

## Data and service boundaries

Entities: User, Child, Activity, Session, Booking. Child stores parentId, names, DOB, emergencyContact, optional notes; never stored age. Activity owns age bounds, duration, minor-unit price, currency, instructor, location, and image key. Session owns activityId, startsAt, capacity, seeded occupancy, and scheduled/cancelled status. Booking owns userId, childId, sessionId, reference, status, and createdAt. Persist submission identity for safe retries.

Routes call feature hooks/services; services apply domain rules; repositories own persistence. Keep fixtures outside UI components. Use async repository interfaces so error/loading behavior is real and a future backend can replace storage without rewriting screens.

Required service operations: list/get activities, list sessions by activity/date, list children, create/list/get bookings, initialize/read demo state, reset demo state. Add createChild only with P1. Map missing entities, full/cancelled/past sessions, ineligible children, duplicates, and persistence errors to readable recovery actions. Never expose raw exceptions.

## State and accessibility requirements

- Lists: loading, populated, empty, error and retry. Do not introduce artificial delays.
- Selection: available, selected, unavailable with a textual reason.
- Submission: disabled until valid; busy state prevents repeated taps; failure retains draft; success follows save.
- Session filled: explain and return to session selection while preserving still-valid context.
- Android Back, safe areas, keyboard avoidance, scrolling, font scaling and screen-reader order work through the flow.
- Touch targets are at least 48 dp. Color alone must not convey eligibility, availability or confirmation.
- All data is fictional; do not request or log real child details during evaluation. No personal data in QR payloads.

## P1 Add Child contract

First and last name required, trimmed, 1–50 characters. DOB required, valid, and not in the future. Emergency contact required and trimmed; define a reasonable length bound before implementation without claiming number verification. Notes optional with an explicit bounded length. Save returns to the prior flow and exposes the persisted child without losing the selected session. Save errors retain entered fields. Do not implement this form until P0 is verified.

## Acceptance checklist

- [ ] Fresh Android APK installs and opens independently of the development server.
- [ ] Demo entry reaches four working tabs and four seeded activities.
- [ ] Available session is selectable; full/cancelled/past sessions cannot be booked through UI or service calls.
- [ ] Emma can book the seeded Junior Gymnastics scenario; Lucas has a readable ineligibility reason.
- [ ] Review matches the selected activity, session, child, and price.
- [ ] Rapid taps, retries and duplicate requests do not create extra bookings or consume extra slots.
- [ ] A saved booking has a stable reference, appears in Upcoming, and survives process restart.
- [ ] Forced save failure produces no success or capacity change and permits a safe retry.
- [ ] Upcoming/Past and pass access agree at the session-start boundary.
- [ ] Back navigation preserves the draft and cannot resubmit after success.
- [ ] Demo reset is explicit, confirmed, complete, and leaves fresh usable fixtures.
- [ ] Empty, missing-record, loading and error states have working recovery actions.
- [ ] Target Android device evidence covers font scaling, TalkBack basics, keyboard and system Back.
- [ ] Documentation identifies artifact location, install steps, demo scenario, validation and limitations.

## Decision register and open items

| Item | Current disposition |
| --- | --- |
| Milestone | Trial demo; baseline recommended then user said “Lets proceed.” |
| Release | Android APK first; iOS binary and tablets deferred. |
| Data | Local persistence and deliberate reset, no dedicated backend. |
| Web | Separate deferred marketing brief; excluded from mobile completion. |
| Add Child conflict | P1 follows the source priority list; no dead P0 entry point. |
| Dates, duplicates, pass validity | Explicit defaults above close gaps in the source. |
| Timeline | Three-day source estimate is provisional; actual deadline not confirmed. |
| Brand | Preserve source direction; final tokens/contrast/font rendering require implementation verification. |
| Assets | Audit existing imagery and usage rights before selecting final app images. |
| Build access | Verify Android build tooling/credentials early; report unavailable access concretely. |
| UI workflow | User delegated the choice; direct implementation selected and stored as Impeccable's code-first default. |

Production would require a separate requirements pass for real accounts, child-data handling, venue policies, server-authoritative capacity, operations, payments and actual admission validation. The trial does not silently graduate to production.
