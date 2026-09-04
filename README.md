# PlayNest Android trial

PlayNest is a locally persisted Android demo for a parent booking an activity at one fictional activity center. It opens with an explicit demo sign-in for Sarah's sample family; it has no live accounts, payments, shared capacity, staff scanner, or production admission validation.

## Requirements and setup

- Node.js and npm
- Android SDK, Java, and a physical Android device or emulator
- For a USB device, Android Debug Bridge (`adb`) and USB debugging enabled

Install dependencies with `npm ci`. Start the Metro development server with `npm start`, then build, install, and open the Android debug build with:

```bash
npm run android -- --device V2434
```

If several devices are connected, first identify the exact target:

```bash
adb devices -l
```

The app package is `com.enriquezwend.playnest`. A local debug APK is written to `android/app/build/outputs/apk/debug/app-debug.apk` after `./android/gradlew app:assembleDebug` succeeds. Install it directly with:

```bash
adb -s <serial> install -r android/app/build/outputs/apk/debug/app-debug.apk
```

Debug builds still load JavaScript from Metro; use the `preview` EAS profile when a fully standalone evaluator APK is needed:

```bash
npx eas build --platform android --profile preview
```

The configured `preview` profile produces an APK for internal distribution. EAS authentication/signing access is required and is not stored in this repository.

## Stitch design reference

The UI is translated from `docs/stitch_playnest_mobile_app_design/`. Its HTML, screenshots, original images and logo are the visual authority. See [native screen mapping and verification](docs/mobile/STITCH_PARITY.md). Do not replace the source compositions with a simplified interpretation of the earlier product brief.

## Evaluator demo

1. Tap **Use Sarah's demo** to populate the local demo credentials, then **Sign in**. On Home, tap **Start with Leo's best fit**. The recommendation is calculated from Leo's age, eligible activities, and local availability.
2. Review the preselected available session, choose Leo, and tap **Review booking**.
3. Tap **Confirm booking**. No payment is collected.
4. Open **View booking**, then open the **check-in pass**.
5. Force-close and reopen the app. The new booking remains in **Bookings** and becomes the Home highlight.

The clean demo state begins without a reservation. The source catalog uses fictional USD prices and the Leo/Maya family. The existing legacy PHP activities and previously persisted bookings are retained during migration. Reservations still validate eligibility, availability and duplicates before saving.

The pass QR contains only an opaque demo reference. The app does not offer payment, wallet, calendar, notification, membership, waitlist, refund, or rescheduling controls because these services are not connected. Saved reservations are available in Bookings.

## Resetting demo data

Open **Profile** → **Reset local demo data** → **Reset demo**. This confirmation removes bookings stored on that device and creates a fresh, future-facing fictional session set. It does not affect other devices.

## Verification commands

Run all source checks from the project root:

```bash
npm run test:domain
npx tsc --noEmit
npm run lint
node .agents/skills/impeccable/scripts/detect.mjs --json src/app src/components
```

## Trial limits

- All people, activity data, bookings, and references are fictional.
- Availability and bookings are local to one installation; capacity is not shared or server-authoritative.
- Demo entry is not live authentication; there is no real login, payment, cancellation, membership, push notification, child editing, or live staff workflow.
- The check-in pass is presentation-only and is not a valid admission mechanism.
- Android phone delivery is the acceptance target. The deferred website under `docs/web/` is outside this app’s scope.

## Stitch Android preview

The local ARM64 Android preview is `dist/playnest-stitch-preview.apk`. Install it on an ARM64 Android phone, or use `adb install -r dist/playnest-stitch-preview.apk`. It contains its JavaScript bundle and assets and does not require Metro.

Screen mappings, translation decisions and verification evidence are documented in `docs/mobile/STITCH_PARITY.md`.
