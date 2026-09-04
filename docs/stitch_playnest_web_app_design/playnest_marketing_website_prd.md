# PlayNest marketing website — deferred PRD

Status: preserved website scope, not part of the mobile milestone. Move this document and DESIGN.md together into the future website project. This is a matching marketing website, not a browser version of the transactional mobile app.

## Purpose and audience

Help a parent understand PlayNest's children's activity programs, evaluate suitability, and reach the available app/demo destination. One polished responsive landing page is sufficient. Preserve PlayNest's warm, calm identity and “Play. Learn. Grow.” tagline.

## Proposed implementation boundary

Source stack: Next.js App Router, TypeScript, Tailwind CSS, optional shadcn/ui, Lucide. Reassess actual versions and hosting when the separate project starts. Do not install web dependencies or build web routes in the current mobile repository. Share brand/content concepts; do not require a shared runtime component package or use React Native components as the website UI.

## Page sections

| Section | Content and behavior |
| --- | --- |
| Navigation | PlayNest name/logo, Programs, Schedule, Pricing, FAQ anchors, verified app/demo action. |
| Hero | “Where Kids Play, Learn & Grow”; “Fun, active, and engaging experiences designed for growing kids.” Explore Programs scrolls to programs. Secondary conversion action must have a real destination. |
| Programs | Four activity cards with name, age, duration, demo price and description. |
| Benefits | Source themes: Safe Environment, Active Learning, Small Groups, Easy Booking. Treat these as draft demo copy, not verified commercial proof. |
| How It Works | Find an Activity → Choose a Schedule → Come & Play. Explain that booking is in the app. |
| Schedule | Readable, clearly labeled sample schedule; no claim of live availability. |
| Pricing | Clearly labeled demo offers; no checkout. |
| FAQ | Ages, booking ahead, parent attendance and cancellation questions, with only established answers. |
| Final CTA | “Ready for your next adventure?” plus a verified destination. |
| Footer | Brand and actual available contact/legal information. No fake contact routes or empty links. |

## Portable seed content

All amounts below are fictional demonstration content, not verified offers.

| Program | Ages | Duration | Demo session price | Description |
| --- | --- | --- | --- | --- |
| Toddler Time | 1–3 | 45 minutes | ₱350 | Gentle movement and guided play for little explorers. |
| Little Explorers | 3–5 | 45 minutes | ₱400 | Movement, balance, coordination, and playful challenges. |
| Junior Gymnastics | 5–8 | 45 minutes | ₱450 | A fun introduction to gymnastics fundamentals. |
| Open Play | 2–10 | 90 minutes | ₱300 | Flexible supervised play in the PlayNest activity space. |

Location label: PlayNest Activity Center; no physical address is confirmed. Pricing section source examples: Single Session ₱450, 5-Visit Pass ₱1,800, Monthly Membership ₱1,499/month. Clarify that program session prices vary and these are sample offers; never imply pass purchase or membership redemption works in the trial app.

FAQ handling: program ages come from the table; booking-ahead copy may explain the app journey. Parent attendance rules require venue confirmation. Do not promise cancellation or rescheduling: the mobile baseline does not implement either. A public launch requires approved real pricing, policies, contacts and legal content.

## Conversion behavior

The source suggests Book a Session/Get App, but the destination is not settled. Before implementation, choose a real app download, demo instructions page or verified deep link with fallback. Use a label matching that destination. Until such a destination exists, use the working Explore Programs anchor and an honest availability message; do not invent a store badge or a successful booking action.

## Excluded

Browser booking, customer accounts, payments, checkout, CMS, staff/admin tools, backend inventory, membership management, and forms that imply messages were delivered when no service exists.

## Acceptance when website work begins

- Responsive page works at phone, tablet and desktop widths with no overflow.
- Navigation, section anchors, mobile menu and every visible action work.
- Age ranges, durations and demo prices agree with the approved mobile content.
- Schedule and offers are labeled appropriately; no unverified live availability or commercial proof.
- No cancellation, payment, membership or check-in promise exceeds actual app capability.
- Images have valid provenance and meaningful alt text; forms/menus, if present, work by keyboard.
- Text contrast, focus visibility, reduced motion, hierarchy and loading behavior are verified.
- Verify the actual conversion destination before publishing.
- Publishing is its own later task with confirmed hosting and content readiness.

## Decisions deferred to that project

App/download destination, hosting/domain, final imagery, real venue contacts and policies, public versus private-demo audience, and whether commercial sample prices should appear publicly. None blocks completion of the mobile trial.