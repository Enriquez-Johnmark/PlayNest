# PlayNest Android trial demonstration guide

## What this submission is

PlayNest is a parent-facing activity-booking **Android APK demonstration**. It shows the core journey from discovering an activity to retrieving a saved booking and a check-in pass. It is designed to make the product direction, interaction design, and key local business rules easy to evaluate without presenting unfinished production systems as complete.

The app uses fictional families, children, activities, schedules, and bookings. No real child information should be entered.

## Download and install

Use the release artifact at [`dist/playnest-android-demo.apk`](../dist/playnest-android-demo.apk).

1. Download the APK to an Android device.
2. Open it and approve the device's **Install unknown apps** prompt if Android requests it.
3. Install **PlayNest** and open it. The APK runs independently; it does not need Metro, a development server, or an account.

If an Android device blocks the install because a prior development build has the same package identifier, uninstall that older PlayNest installation first, then install this release APK.

## Recommended five-minute walkthrough

1. On the demo entry screen, continue into the app as the fictional parent.
2. On **Home**, point out the calm parent-focused hierarchy, personalised recommendation, and upcoming-booking area.
3. Open **Activities**, optionally use search or the age filter, and open an activity card.
4. On the activity detail screen, show age range, duration, instructor, venue, price, and the next booking action.
5. Select an available session. A full session remains visible but cannot be selected.
6. Select an eligible child. Ineligible children remain visible with an explanation rather than silently disappearing.
7. Add an optional care note, then use **Review** to verify the selected activity, child, date/time, and price before confirming.
8. Confirm the booking. The confirmation screen appears only after it is saved locally and gives a stable booking reference.
9. Open **Bookings**, then the new booking and its **Check-in pass**. Force-close and reopen the app if you would like to demonstrate that the saved booking persists.
10. Open **Profile** to show the explicitly confirmed demo reset option. Use it after a walkthrough to restore a clean fictional-data state.

## What the core flow demonstrates

| Capability | Demonstrated behavior |
| --- | --- |
| Activity discovery | Browse, search, and filter a curated activity catalogue with imagery and practical parent decision information. |
| Suitability | Child age is calculated from fictional dates of birth; unavailable choices explain the age rule. |
| Availability | Sessions have local capacity rules. Full, cancelled, or past sessions cannot be reserved. |
| Booking integrity | One child is booked into one session. The app revalidates eligibility and capacity, prevents duplicate submissions, and only shows success after local persistence. |
| Persistence | Confirmed reservations and fixture state survive app restart on the same device. |
| Booking retrieval | Bookings are grouped into Upcoming and Past; an upcoming reservation has a human-readable reference and demo QR pass. |
| Reset and recovery | A clearly labelled, confirmed reset restores the evaluator's fictional data without requiring app reinstall. |

## Intentionally simulated or excluded

This is a single-device product demonstration, not a production booking service. The following are intentionally not connected:

- Real sign-in, customer accounts, backend APIs, or shared multi-device inventory
- Payment collection, taxes, refunds, cancellations, or rescheduling
- Email, calendar, wallet, push notifications, waitlists, or memberships
- Staff tools, scanning, admission validation, or a production QR security system
- Profile editing, real child records, multi-location operations, and analytics

The check-in QR contains only an opaque demo reference. It is present to show the intended reception handoff, not to grant entry.

## Evidence and verification

The release build is a standalone ARM64 Android APK. The repository includes Android flow captures, UI-tree evidence, release build output, and checksum under [`docs/mobile/verification/stitch/`](mobile/verification/stitch/). The verified flow covers discovery, filtering, detail, child/session selection, review, confirmation, booking retrieval, pass display, profile, and post-restart persistence.

This guide describes the current app truth. The visual source export remains in [`docs/stitch_playnest_mobile_app_design/`](stitch_playnest_mobile_app_design/), while the implementation mapping and caveats live in [`docs/mobile/STITCH_PARITY.md`](mobile/STITCH_PARITY.md).
