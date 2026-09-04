# PlayNest responsive booking app — design specification

## Design point of view

**Playful restraint.** The children bring the energy; the interface brings the calm. The app should feel warm, safe, organised, and modern for a parent who is making a real-world decision. It must not become a child-game interface, a loud marketplace, or an enterprise dashboard.

The mobile Stitch export is the visual authority for brand character, content hierarchy, photography treatment, and component proportions. Preserve its intent; adapt its layouts for responsive web rather than mechanically copying mobile HTML.

## Visual foundations

| Role | Value / rule |
| --- | --- |
| App background | `#FDF9F6` or the close Stitch surface `#FFF8F6`; use a single warm light canvas. |
| Primary action | Coral `#EE5E41`; use for the one clear primary action, selected state, and small brand moments. |
| Ink | `#2B221D` for major text; never use coral as body copy. |
| Supporting text | `#7C736E`, with contrast checked in its actual context. |
| Borders | Warm, quiet `#E8DED8` / `#EBE4DE`; rely on surfaces and borders before shadows. |
| Supporting surfaces | Mint `#D3F2EF`, sunshine `#FDF1D0`, and white cards, used sparingly to group information. |
| Font | Plus Jakarta Sans, weights 400, 500, 600, and 700, with a clean system-sans fallback. |
| Icons | A single coherent outline icon set. Match the source's simple Material-symbol character; do not mix visual families. |

Use a 4px spacing rhythm: 4, 8, 12, 16, 20, 24, 32, and 40px. Default page gutters are 16–20px on compact screens, 24–32px on tablet, and a centred readable content width on desktop. Buttons use 12px radius; ordinary cards use 16px; feature surfaces may use 24px. Pills are reserved for concise status and filters.

## Typography and hierarchy

- Screen title: 24px / 32px, semibold.
- Prominent title: 20px / 28px, semibold.
- Section or card title: 18px / 24px, semibold.
- Body: 16px / 24px, regular.
- Metadata and controls: 14px / 20px, regular or medium.
- Supporting labels: 12px / 16px, medium; do not put essential instructions only at this size.

Use sentence case, short parent-facing language, and direct verbs such as **Book session**, **Continue**, **Confirm booking**, and **View booking**. Avoid generic “Submit” labels and invented operational claims.

## Responsive structure

### Compact: 320–767px

Use a single-column flow. Keep persistent navigation simple and reachable; booking remains a focused sequence with an obvious Back affordance. Use a sticky primary action only when it does not obscure content or keyboard fields.

### Medium: 768–1023px

Keep the main flow single-purpose but allow a two-column activity detail or review summary when it improves scanning. Preserve a clear reading order for keyboard and screen-reader users.

### Expanded: 1024px and above

Centre application content within a practical max width. Activity detail can use image/content columns; session choice and review can hold an unobtrusive contextual summary beside the active task. Do not turn booking into a dense dashboard or show more than one competing primary action.

On every size, maintain the same booking sequence and selected context. Responsive changes should redistribute space, not relocate or hide essential decisions.

## Component contract

- **App shell and navigation:** Home, Activities, My Bookings, Profile. Strong current-location state; browser Back must work naturally.
- **Activity card:** image, title, age range, duration, price, and honest availability; whole-card interaction is clear without nested action clutter.
- **Session option:** time, availability, selected state, and disabled reason. A full item is readable, not faded beyond use.
- **Child option:** name, calculated age, eligibility, and explicit rule when unavailable.
- **Review summary:** label/value structure for activity, child, date/time, duration, location, and informational price. Scanable, not a card-per-field wall.
- **Booking card:** stable child/activity/date/status hierarchy; sorting/grouping comes from product rules, not colour guesses.
- **Check-in pass:** high-contrast QR with quiet space, human-readable reference, schedule, and a conspicuous `Demo only — reception validation is not connected` explanation.
- **Feedback states:** loading, empty, error, success, disabled, and busy states always explain the next useful action. Preserve selections on recoverable failure.

## Interaction, accessibility, and motion

Every interactive target is at least 44×44 CSS pixels, with an aim of 48px for primary controls. Preserve visible focus indicators, logical DOM/focus order, semantic headings, descriptive image alt text, and announced selected/unavailable/busy states. Never use color alone for availability, eligibility, status, or confirmation. Allow browser zoom and reflow without clipped actions.

Use short, purposeful transitions for navigation and selection; respect `prefers-reduced-motion`. Do not introduce artificial loading delays, bouncing elements, large gradients, glass effects, or decorative animations that delay a booking action.

## Asset and implementation rules

Use the original local image assets and provenance record at `../../assets/images/stitch/sources.json` when bringing the app into the new project. Record any replacement asset's origin and license. Use optimised responsive images and reserve image dimensions to avoid layout shift.

Implement semantic tokens (not raw one-off hex values) and reusable components. Keep domain rules out of visual components. Before declaring visual parity, compare the implemented responsive states against the mobile reference and test real keyboard, mouse, touch, narrow viewport, and enlarged-text/browser-zoom behavior.
