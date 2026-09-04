# PlayNest mobile implementation plan

Status: planning deliverable. Product implementation has not started beyond the existing Expo/NativeWind foundation. Use [PRD.md](PRD.md) for behavior and [PRODUCT.md](../../PRODUCT.md) for scope.

## 1. Confirm the working baseline

Record the agreed trial scope, Android-first delivery, local persistence, deferred web scope, and provisional deadline. The active documentation resolves source contradictions explicitly. Keep unanswered commercial and production questions out of the trial.

Exit: PRODUCT.md, DESIGN.md, mobile PRD and this plan are available; web requirements have their own brief. This documentation stage is the current deliverable.

## 2. Prove the native foundation and distribution path

Inspect the actual dependency lockfile, Expo configuration, Metro/NativeWind setup and assets. Check installed package compatibility using the project's tooling before changing versions. Run the current shell on Android and produce an early installable preview build using available build infrastructure. Document credential/tooling blockers immediately. Do this before investing in finished screens.

Exit: the shell starts on the target device/emulator and the standalone APK path is demonstrated, or a precise external blocker is recorded. A browser preview is not native verification.

## 3. Implement the design foundation and app shell

Translate the existing direction into semantic native tokens, typography roles, safe-area behavior, four tabs and stack navigation. Build only the controls required by the booking flow: buttons, labels/inputs as needed, statuses, session/child rows, activity/booking cards, and empty/error states. Check contrast and native font scaling before expanding the system. Choose real available imagery or clearly temporary assets; do not invent asset provenance.

Exit: representative Home/detail/selection compositions demonstrate the direction on Android; system Back, labels, disabled states, and keyboard/safe-area behavior work. Capture evidence and reconcile provisional DESIGN.md values against the actual implementation.

## 4. Implement and verify the local domain

Create typed entities, a clock boundary, future-facing seeded sessions, repository initialization, versioned persisted state and explicit reset. Implement age eligibility, time/capacity checks, booking identity, serialized writes and safe retries. Add service operations for activities, sessions, children and bookings. Define deterministic fault injection for relevant demo/test failures without exposing debug tools as product features.

High-value tests: age boundaries, DOB parsing, timezone/session-start cutoff, capacity, past/cancelled sessions, duplicate submission/retry, failed writes, reload consistency, and reset. These protect meaningful behavior rather than mirror components.

Exit: booking creation and reload work through services, errors are typed, failed writes do not consume capacity, and reset restores coherent fixtures.

## 5. Deliver one complete booking slice

Implement demo entry → Home/Activities → Activity Details → Choose Session → Choose Child → Review → Confirmation → saved Booking Details → Check-In Pass. Wire actual repository data rather than static screenshots. Implement loading, invalid selections, full sessions and save failure along the way.

Exit: Sarah books an eligible session for Emma, sees the same saved record in Bookings after restart, and opens its valid demo pass. Lucas and full sessions are correctly unavailable. This is the primary milestone; do not defer integration until all screens are styled.

## 6. Complete P0 and recovery behavior

Finish Upcoming/Past, Profile/seeded children, demo reset, missing IDs and empty states. Verify backwards navigation, repeated taps, retry after uncertain results, app resume/time boundary, long labels and storage read failures. Ensure every displayed control works and no deferred feature leaks into P0.

Exit: every P0 acceptance item passes at feature level and limitations are visible in the demo where relevant.

## 7. Perform native release verification

Run lint/type checks and the focused domain tests. Install the release candidate APK and repeat the primary journey, restart persistence, reset and key failure paths. Batch native screenshot/accessibility checks across the supported phone sizes; fix the concrete findings, then confirm those fixes. Test TalkBack basics, enlarged text, system Back, safe areas and keyboard behavior. Confirm the light-only brand remains legible when the device uses dark appearance.

Exit: verified APK with evidence identifying device/emulator, build configuration, checks performed and remaining limitations. Do not claim iOS, tablet or production validation without evidence.

## 8. Deliver and hand off

Provide APK location/download, install instructions, evaluator demo steps, fixture/reset behavior, architectural map, test results and known limitations. Update the starter README and capture publishing steps actually used. Never invent successful upload, signing or store distribution.

Exit: another person can install the build, repeat the demo and understand what is simulated.

## 9. Reassess P1 and future milestones

Only after P0 release verification, decide whether to implement Add Child or stop at the accepted slice. New P1 work repeats the relevant validation and APK build gates. iOS distribution, the separate marketing website, and production booking each have their own scope review.

## Provisional three-day allocation

This is a source-derived timebox, not a promise or confirmed deadline. Build access and dependency compatibility may change it.

| Window | Target | Exit |
| --- | --- | --- |
| Day 1 | Native build path, app shell/design foundation, domain and persistence | Installable shell and service-level booking/reload |
| Day 2 | Complete integrated booking journey and supporting P0 screens | Primary demo plus failure/retry path works |
| Day 3 | P0 completion, native checks, fixes, release and handoff | Verified APK and evaluator instructions |

If the timebox is binding, cut P1 and decorative extras first. Preserve booking integrity, recovery behavior and standalone install verification. No website work is hidden in this schedule.

## Next implementation action

Start Stage 2: verify the current Expo foundation on Android and prove the APK build path. Do not begin by generating every screen or adding a backend.
