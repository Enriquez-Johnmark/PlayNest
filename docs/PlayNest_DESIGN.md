# PlayNest — DESIGN.md

> Canonical UI/UX and Tailwind design-system specification for the PlayNest mobile application and marketing website.
>
> Audience: human developers, Claude Code, Cursor, and other AI coding agents.
>
> This document is authoritative for PlayNest visual design unless a more specific screen requirement explicitly overrides it.

---

# 1. Design Intent

PlayNest is a parent-facing booking experience for a children's gym, indoor play space, and activity center.

The product should feel:

- Warm
- Safe
- Modern
- Playful
- Trustworthy
- Energetic
- Organized
- Easy to understand

The product must **not** feel:

- Like a toddler game
- Overly colorful
- Visually chaotic
- Corporate
- Clinical
- Like a school ERP
- Like an admin dashboard
- Like an unmodified component-library demo
- Inconsistent between mobile and web

## Core Design Principle

**Playful restraint.**

> The children bring the energy. The interface brings the calm.

The UI is designed primarily for the **parent**, not directly for the child.

---

# 2. Design Priorities

When design decisions conflict, use this priority order:

1. Clarity
2. Task completion
3. Trust
4. Accessibility
5. Consistency
6. Delight
7. Decoration

Never sacrifice clarity for visual novelty.

---

# 3. Technology Direction

## Website

Use:

- Tailwind CSS
- React / Next.js
- shadcn/ui only where useful
- Lucide icons
- CSS variables for semantic theme tokens

Tailwind is the primary styling system.

Do not introduce:

- Bootstrap
- Material UI
- Ant Design
- Chakra UI
- Mantine
- another CSS framework

unless explicitly requested.

## Mobile

Recommended:

- React Native
- Expo
- NativeWind
- Tailwind-compatible semantic tokens
- Lucide React Native icons

The mobile application and website should share the same **design language and semantic tokens**, even though their component implementations are separate.

Do not attempt to force web components into React Native.

---

# 4. Tailwind Philosophy

Tailwind should be used as a **design-system implementation layer**, not as an excuse to scatter random utility values throughout the codebase.

Prefer:

```tsx
className="rounded-2xl bg-card p-4"
```

over:

```tsx
className="rounded-[19px] bg-[#fffaf6] p-[17px]"
```

unless a custom value is part of the approved design system.

## Rules

- Prefer semantic color tokens.
- Prefer standard spacing scale values.
- Prefer reusable component variants.
- Avoid arbitrary values unless necessary.
- Do not duplicate long class strings across many files.
- Use helper utilities such as `cn()` for conditional class composition.
- Use CVA or equivalent only where component variants genuinely benefit from it.

---

# 5. Tailwind Semantic Tokens

Use CSS variables mapped into Tailwind.

Recommended semantic structure:

```css
:root {
  --background: 30 40% 98%;
  --foreground: 24 20% 14%;

  --card: 0 0% 100%;
  --card-foreground: 24 20% 14%;

  --popover: 0 0% 100%;
  --popover-foreground: 24 20% 14%;

  --primary: 14 82% 60%;
  --primary-foreground: 0 0% 100%;

  --secondary: 176 38% 91%;
  --secondary-foreground: 176 45% 24%;

  --accent: 42 92% 90%;
  --accent-foreground: 32 65% 28%;

  --muted: 30 24% 95%;
  --muted-foreground: 24 8% 46%;

  --border: 28 20% 89%;
  --input: 28 20% 89%;
  --ring: 14 82% 60%;

  --success: 145 52% 42%;
  --warning: 38 92% 50%;
  --destructive: 0 72% 55%;
  --info: 205 75% 52%;

  --radius: 1rem;
}
```

These values are a starting direction. Once final visual choices are made, update the tokens rather than hardcoding new colors throughout components.

---

# 6. Tailwind Theme Mapping

Example:

```ts
// tailwind.config.ts

export default {
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },

        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },

        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },

        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        destructive: "hsl(var(--destructive))",
        info: "hsl(var(--info))",
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
    },
  },
};
```

AI agents must use semantic utilities such as:

```text
bg-background
bg-card
text-foreground
text-muted-foreground
bg-primary
text-primary-foreground
border-border
ring-ring
bg-success
bg-warning
bg-destructive
```

Avoid random utilities such as:

```text
bg-orange-500
text-gray-600
border-slate-200
```

inside product components when a semantic token exists.

---

# 7. Brand Color Direction

## Primary

Recommended direction:

**Warm coral / soft tangerine**

Use for:

- Primary CTA
- Selected states
- Key brand accents
- Active navigation
- Important links

Do not cover every large surface in the primary color.

## Secondary

Recommended direction:

**Soft teal / blue-green**

Use for:

- Supporting visual sections
- Informational surfaces
- Secondary illustrations
- Calm contrast

## Accent

Recommended direction:

**Soft sunshine / cream**

Use sparingly for:

- Promotional highlights
- Small decorative areas
- Illustration accents

## Neutral Direction

Prefer warm neutrals instead of a cold gray-heavy interface.

---

# 8. Typography

Recommended font direction:

- Plus Jakarta Sans
- Manrope
- Geist
- Inter

Preferred first choice:

**Plus Jakarta Sans**

It feels modern, friendly, and professional without looking overly childish.

## Tailwind Typography Scale

Recommended:

```text
text-xs      → supporting labels only
text-sm      → metadata and secondary text
text-base    → normal body copy
text-lg      → card/section titles
text-xl      → prominent card or modal title
text-2xl     → screen title
text-3xl     → large page heading
text-4xl+    → website hero only
```

## Weight Guidance

```text
font-normal
font-medium
font-semibold
font-bold
```

Avoid excessive `font-extrabold` or `font-black`.

---

# 9. Spacing System

Use the Tailwind spacing scale.

Preferred values:

```text
gap-1
gap-2
gap-3
gap-4
gap-5
gap-6
gap-8
gap-10
gap-12

p-2
p-3
p-4
p-5
p-6
p-8
```

Primary mobile horizontal padding:

```text
px-4
```

or:

```text
px-5
```

depending on the layout.

Avoid arbitrary spacing such as:

```text
mt-[17px]
px-[19px]
gap-[13px]
```

unless genuinely required.

---

# 10. Container Width

For the website:

```tsx
className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
```

For text-heavy sections, use narrower content:

```tsx
className="mx-auto max-w-3xl"
```

Avoid stretching paragraphs edge-to-edge on wide displays.

---

# 11. Border Radius

PlayNest uses soft, moderately rounded surfaces.

Recommended Tailwind usage:

```text
rounded-lg
rounded-xl
rounded-2xl
rounded-3xl
```

Preferred:

- Inputs: `rounded-xl`
- Buttons: `rounded-xl`
- Standard cards: `rounded-2xl`
- Hero/promotion surfaces: `rounded-3xl`
- Badges/chips: `rounded-full`

Avoid giving every component a different radius.

---

# 12. Shadows

Prefer restrained elevation.

Recommended:

```text
shadow-sm
shadow
```

Use larger shadows only for:

- dialogs
- floating overlays

Avoid:

```text
shadow-2xl
```

on ordinary cards.

Prefer border + surface separation:

```tsx
className="rounded-2xl border border-border bg-card"
```

---

# 13. Icons

Use one icon family.

Recommended:

**Lucide**

Web:

```text
lucide-react
```

Mobile:

```text
lucide-react-native
```

Do not mix Heroicons, Font Awesome, Lucide, Material Icons, etc.

---

# 14. Component Strategy

Build PlayNest's own controlled component layer.

Suggested structure:

```text
components/
├── ui/
│   ├── button
│   ├── input
│   ├── badge
│   ├── card
│   ├── dialog
│   └── ...
│
└── playnest/
    ├── activity-card
    ├── session-card
    ├── child-card
    ├── booking-card
    ├── booking-summary
    ├── check-in-pass
    └── empty-state
```

`ui/` contains generic reusable primitives.

`playnest/` contains product-specific components.

Do not place product/business behavior inside generic UI primitives.

---

# 15. shadcn/ui Usage

shadcn/ui is allowed on the website.

Use it as a starting primitive layer, not as the visual identity.

Allowed examples:

- Button
- Dialog
- Sheet
- Accordion
- Input
- Tabs

Customize through PlayNest tokens.

Do not simply copy default shadcn styling and consider the design complete.

The product should still look distinctly like PlayNest.

---

# 16. Button Design

## Primary

Example:

```tsx
className="
  h-12
  rounded-xl
  bg-primary
  px-5
  font-semibold
  text-primary-foreground
  transition
  hover:opacity-95
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-ring
  focus-visible:ring-offset-2
  disabled:pointer-events-none
  disabled:opacity-50
"
```

Use for:

- Book Session
- Continue
- Confirm Booking
- Get Started

One dominant primary action per decision area.

## Secondary

Use:

```text
bg-secondary
text-secondary-foreground
```

or an outlined style.

## Ghost

Use for low-emphasis actions.

## Destructive

Only for destructive actions such as cancellation.

---

# 17. Inputs

Recommended base:

```tsx
className="
  h-12
  w-full
  rounded-xl
  border
  border-input
  bg-background
  px-4
  text-base
  text-foreground
  outline-none
  transition
  placeholder:text-muted-foreground
  focus:border-primary
  focus:ring-2
  focus:ring-ring/20
  disabled:cursor-not-allowed
  disabled:opacity-50
"
```

Always show a real label.

Do not use placeholder-only forms.

---

# 18. Cards

Standard card:

```tsx
className="
  rounded-2xl
  border
  border-border
  bg-card
  p-4
"
```

Interactive card may add:

```text
transition
hover:border-primary/30
hover:shadow-sm
```

Do not turn every piece of content into a card.

---

# 19. Activity Card

Required content:

- image
- activity name
- age range
- duration
- price
- availability cue

Suggested hierarchy:

```text
Image
Activity Name
Age badge
Duration • Price
Availability
```

Example conceptual Tailwind structure:

```tsx
<div className="overflow-hidden rounded-2xl border border-border bg-card">
  <div className="aspect-[16/10] bg-muted" />

  <div className="space-y-3 p-4">
    <div className="flex items-start justify-between gap-3">
      <h3 className="text-lg font-semibold text-foreground">
        Junior Gymnastics
      </h3>

      <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
        Ages 5–8
      </span>
    </div>

    <p className="text-sm text-muted-foreground">
      45 minutes · ₱450
    </p>
  </div>
</div>
```

---

# 20. Session Card

States:

- Available
- Selected
- Full

Available:

```text
border-border
bg-card
```

Selected:

```text
border-primary
bg-primary/5
ring-1
ring-primary
```

Full:

```text
cursor-not-allowed
bg-muted
text-muted-foreground
```

Full session must remain readable.

Example:

```text
4:00 PM
Full
```

Never hide full sessions.

---

# 21. Child Card

States:

- Default
- Selected
- Ineligible

Selected:

```text
border-primary
bg-primary/5
ring-1
ring-primary
```

Ineligible:

```text
bg-muted
text-muted-foreground
```

Add explanatory copy:

```text
Ages 5–8 only
```

Do not use only opacity to communicate ineligibility.

---

# 22. Status Badges

## Confirmed

Use success semantics.

Example:

```text
bg-success/10
text-success
```

Text:

`Confirmed`

## Full

Use muted or warning treatment.

Text:

`Full`

## Slots Left

Example:

`2 slots left`

Avoid using bright error red unless availability is genuinely critical.

---

# 23. Mobile Navigation

Exactly four tabs:

1. Home
2. Activities
3. Bookings
4. Profile

Use icon + label.

Active:

```text
text-primary
```

Inactive:

```text
text-muted-foreground
```

Do not add a fifth tab during the trial.

---

# 24. Home Screen

The Home screen should feel welcoming, not like an admin dashboard.

Recommended structure:

```text
Greeting
Featured activity
Today's activities
Upcoming booking
```

Example greeting:

```text
Good morning, Sarah 👋
```

Avoid:

- analytics widgets
- KPI cards
- unnecessary statistics
- dense grids

---

# 25. Activity Details

Hierarchy:

```text
Hero image
Activity name
Age badge
Description
Key information
Booking CTA
```

Key facts:

- Duration
- Price
- Instructor
- Location

Primary CTA:

`Book Session`

The CTA should be visually easy to reach on mobile.

---

# 26. Booking Flow

This is PlayNest's highest-priority design area.

Flow:

```text
Choose Session
→
Choose Child
→
Review
→
Confirmation
```

Do not add extra steps without a requirement.

---

# 27. Choose Session

Recommended:

```text
Choose a Session

[ Mon 7 ] [ Tue 8 ] [ Wed 9 ] ...

9:00 AM      5 slots left
11:00 AM     2 slots left
2:00 PM      Available
4:00 PM      Full

[ Continue ]
```

Rules:

- Exactly one selection
- Continue disabled before selection
- Full session disabled
- Selected state obvious
- Activity context still visible

---

# 28. Choose Child

Preferred heading:

**Who's joining?**

Show:

- Emma — Age 5
- Lucas — Age 3

For Junior Gymnastics:

- Emma → selectable
- Lucas → disabled
- show `Ages 5–8 only`

CTA:

`Continue`

---

# 29. Booking Review

Make this screen calm and confidence-building.

Show:

- Activity
- Child
- Date
- Time
- Duration
- Location
- Price

Primary CTA:

`Confirm Booking`

Avoid ambiguous button labels such as:

`Submit`

---

# 30. Confirmation Screen

Use extra whitespace.

Suggested hierarchy:

```text
Success icon

You're booked!

Emma's Junior Gymnastics
session is confirmed.

PN-7K4M2Q

[ View Booking ]

Back to Home
```

Do not immediately push promotions after successful booking.

---

# 31. Check-In Pass

Hierarchy:

1. QR code
2. Child
3. Activity
4. Schedule
5. Booking reference
6. Helper text

Helper:

**Show this pass at reception when you arrive.**

Give the QR visual sufficient white space.

---

# 32. Empty States

## No Bookings

```text
No upcoming bookings yet

Find an activity your child will love.

[ Browse Activities ]
```

## No Children

```text
Add your first child

Create a child profile to start booking activities.

[ Add Child ]
```

## No Sessions

```text
No sessions on this date

Choose another day to see available times.
```

Never leave blank screens.

---

# 33. Loading States

Prefer skeletons for:

- activities
- bookings
- session rows

Use button loading state for booking confirmation.

Avoid fake loading delays.

---

# 34. Error States

## Session Filled Up

```text
That session just filled up.
Please choose another time.

[ Choose Another Session ]
```

## Booking Failed

```text
We couldn't complete your booking.

Your selections are still here.
Please try again.

[ Try Again ]
```

Preserve the booking draft after recoverable errors.

---

# 35. Website Direction

The website is a marketing experience, not a desktop version of the mobile app.

Recommended structure:

```text
Navbar
Hero
Programs
Benefits
How It Works
Schedule
Pricing
FAQ
Final CTA
Footer
```

Use:

```text
py-16
sm:py-20
lg:py-24
```

for major section spacing where appropriate.

---

# 36. Website Hero

Headline:

**Where Kids Play, Learn & Grow**

Supporting copy:

**Fun, active, and engaging experiences designed for growing kids.**

Actions:

- Explore Programs
- Book a Session

Desktop layout may use:

```text
grid
lg:grid-cols-2
gap-12
items-center
```

Mobile should collapse naturally to one column.

---

# 37. Website Programs

Use four program cards:

- Toddler Time
- Little Explorers
- Junior Gymnastics
- Open Play

Recommended grid:

```text
grid
gap-6
md:grid-cols-2
lg:grid-cols-4
```

Do not reduce card readability just to force four columns.

---

# 38. Website Benefits

Benefits:

- Safe Environment
- Active Learning
- Small Groups
- Easy Booking

Use lightweight icon + text sections.

Avoid large corporate feature matrices.

---

# 39. Website Pricing

Demo pricing:

- Single Session — ₱450
- 5-Visit Pass — ₱1,800
- Monthly Membership — ₱1,499/month

Pricing cards can use:

```text
rounded-3xl
border
bg-card
p-6
```

Do not build real checkout.

---

# 40. Responsive Breakpoints

Use Tailwind defaults unless there is a clear reason not to.

Primary:

```text
sm
md
lg
xl
2xl
```

Do not create numerous custom breakpoints.

Mobile-first implementation:

```tsx
className="
  grid
  gap-6
  md:grid-cols-2
  lg:grid-cols-4
"
```

rather than desktop-first overrides.

---

# 41. NativeWind Mobile Alignment

Mobile and web should use equivalent semantic ideas.

Example mapping:

Web:

```text
bg-primary
text-primary-foreground
rounded-2xl
p-4
```

Mobile NativeWind:

```text
bg-primary
text-primary-foreground
rounded-2xl
p-4
```

Where NativeWind/platform limitations differ, preserve the **visual intent**, not necessarily identical utility strings.

Do not share DOM-specific components with React Native.

---

# 42. Mobile + Web Consistency

Both surfaces should share:

- Brand palette
- Typography direction
- Radius system
- Spacing philosophy
- Icon family
- Voice
- Activity imagery
- CTA hierarchy
- Semantic statuses

They do not need identical layouts.

Consistency means **same brand and design system**, not pixel-for-pixel duplication.

---

# 43. Accessibility

Required:

- status never communicated only by color
- readable contrast
- visible focus state on web
- labels for inputs
- icon-only buttons have accessible labels
- comfortable touch targets
- semantic headings
- keyboard-accessible web interactions
- meaningful image alt text
- disabled states remain readable

Never remove Tailwind focus rings without providing a replacement.

---

# 44. Motion

Allowed:

- subtle transitions
- button press feedback
- dialog/sheet transitions
- small confirmation animation

Avoid:

- bouncing UI
- excessive parallax
- long splash animation
- animations that block actions
- decorative motion everywhere

---

# 45. Tailwind Class Rules for AI Agents

AI coding agents must:

1. Prefer semantic utilities.
2. Use existing tokens.
3. Use existing components.
4. Avoid arbitrary colors.
5. Avoid arbitrary spacing.
6. Avoid duplicating long class strings.
7. Use `cn()` when conditional classes are needed.
8. Keep responsive classes mobile-first.
9. Keep interaction states explicit.
10. Keep accessibility classes intact.

---

# 46. Prohibited Tailwind Patterns

Avoid:

```text
bg-[#FF6633]
text-[#242424]
rounded-[21px]
mt-[13px]
w-[347px]
```

unless there is a documented design reason.

Avoid giant strings repeated across components.

Create a reusable component or variant when repetition is meaningful.

---

# 47. Do Not Randomly Redesign

AI agents must not:

- change the primary brand color per screen
- create new button variants without need
- redesign the bottom navigation
- introduce Bootstrap
- introduce Material UI
- introduce a second styling system
- introduce random gradients
- add glassmorphism
- add dark mode during the trial
- add a fifth navigation tab
- use a different icon family
- change typography casually
- make every section a card
- change product terminology
- remove documented disabled/error states

---

# 48. Design Review Checklist

Before finishing a screen:

## Product

- Does it match the screen specification?
- Is terminology correct?
- Is the primary action obvious?

## Tailwind

- Are semantic tokens used?
- Are arbitrary values avoided?
- Are classes readable?
- Are responsive classes mobile-first?

## Components

- Was an existing component reused?
- Was unnecessary duplication introduced?

## UX States

- Loading?
- Empty?
- Error?
- Disabled?
- Selected?
- Success?

## Accessibility

- Sufficient contrast?
- Readable labels?
- Comfortable touch targets?
- Color not used alone?

---

# 49. Booking Flow Quality Checklist

Before calling the booking flow done:

- [ ] Activity context remains visible
- [ ] Session selection is clear
- [ ] Full sessions remain visible
- [ ] Full sessions are disabled
- [ ] Continue disabled without a valid session
- [ ] Emma is eligible for Junior Gymnastics
- [ ] Lucas is visibly ineligible
- [ ] Reason for ineligibility is shown
- [ ] Review data is correct
- [ ] Confirm action prevents duplicate submission
- [ ] Success appears only after booking creation
- [ ] Booking appears under Upcoming
- [ ] Check-In Pass opens
- [ ] Back navigation preserves selections

---

# 50. Trial Design Priority

If time becomes limited, polish in this order:

1. Home
2. Activity Details
3. Session Selection
4. Child Selection
5. Booking Review
6. Booking Confirmation
7. My Bookings
8. Check-In Pass
9. Website Hero
10. Programs
11. Website CTA
12. Secondary profile/settings screens

A polished core flow is more valuable than uniformly polishing every low-priority screen.

---

# 51. Definition of Design Done

A PlayNest screen is design-complete when:

- visual hierarchy is clear
- correct PlayNest terminology is used
- semantic Tailwind tokens are used
- spacing follows the system
- radii are consistent
- components are reused appropriately
- required UX states exist
- accessibility is considered
- mobile layout is verified
- responsive web behavior is verified where relevant
- no unrelated redesign was introduced

---

# 52. Final Quality Bar

Ask:

> Could this screen reasonably belong to a polished consumer booking app used by real parents?

If it looks like:

- a coding tutorial
- a generic shadcn example
- an admin dashboard
- a wireframe
- a children's game
- a collection of unrelated Tailwind styles

then it needs another design pass.

---

# 53. Final Design Principle

PlayNest should feel like:

> **A calm place for parents to organize energetic experiences for their children.**

That is the visual and UX identity that every screen should preserve.
