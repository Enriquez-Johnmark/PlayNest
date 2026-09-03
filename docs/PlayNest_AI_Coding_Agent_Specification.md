# PlayNest — AI Coding Agent Specification

> Combined reference copy. The split files in the ZIP are preferred for day-to-day coding-agent context.


---

<!-- FILE: README.md -->

# PlayNest — Trial Project

PlayNest is a parent-facing mobile booking experience and responsive marketing website for a children's gym / indoor play space.

This repository specification is designed for a **3-day application developer trial**. The goal is not to build a complete production platform. The goal is to deliver a polished, installable mobile demo, a matching website, strong product thinking, clear technical decisions, and evidence of disciplined AI-assisted development.

## Core Demo Journey

**Home → Activities → Activity Details → Select Schedule → Select Child → Review → Confirmation → My Bookings → QR Check-In Pass**

## Recommended Trial Stack

### Mobile
- React Native
- Expo
- Expo Router
- TypeScript
- React Hook Form
- Zod
- Local mock service/repository layer

### Website
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui where appropriate

### Distribution
- Preferred fast path: Android APK
- Alternative: Apple TestFlight

## Documentation Map

Start here:

1. `CLAUDE.md`
2. `docs/00-PROJECT-OVERVIEW.md`
3. `docs/01-PRD.md`
4. `docs/02-PRODUCT.md`
5. `docs/04-USER-FLOWS.md`
6. `docs/06-DESIGN-SYSTEM.md`
7. `docs/07-SCREEN-SPECS.md`
8. `docs/08-ARCHITECTURE.md`
9. `docs/11-BUSINESS-RULES.md`
10. `docs/17-ACCEPTANCE-CRITERIA.md`

Feature-specific work should read the relevant supporting document before implementation.

## Trial Scope Philosophy

Build the core experience extremely well.

Do not spend limited trial time on:
- production payments
- admin dashboards
- complex backend infrastructure
- production push notifications
- multi-location logic
- a real QR scanner
- advanced analytics

These may be documented as future capabilities but are not part of the required implementation.

## Suggested Repository Layout

```text
playnest/
├── CLAUDE.md
├── README.md
├── mobile/
├── web/
└── docs/
```

The mobile and website applications should share brand and product rules, but they do not need to share runtime code for this trial.


---

<!-- FILE: CLAUDE.md -->

# PlayNest — AI Coding Agent Instructions

You are working on **PlayNest**, a parent-facing children's gym and play-space booking application with a matching marketing website.

This file defines how AI coding agents must work on the repository.

---

## 1. Product Context

PlayNest helps parents:

1. Discover children's activities.
2. View activity details and available sessions.
3. Choose a date and time.
4. Select a child.
5. Review a booking.
6. Confirm the booking.
7. View upcoming bookings.
8. Open a QR-style check-in pass.

The trial intentionally prioritizes a polished end-to-end booking experience over broad feature count.

---

## 2. Required Reading

Before substantial implementation, read:

1. `docs/00-PROJECT-OVERVIEW.md`
2. `docs/01-PRD.md`
3. `docs/02-PRODUCT.md`
4. `docs/06-DESIGN-SYSTEM.md`
5. `docs/08-ARCHITECTURE.md`

Then read feature-specific documentation as relevant:

- User journeys → `docs/04-USER-FLOWS.md`
- Feature behavior → `docs/05-FEATURES.md`
- Screen implementation → `docs/07-SCREEN-SPECS.md`
- Routes → `docs/08A-ROUTES.md`
- Data/entities → `docs/09-DATA-MODEL.md`
- Service contracts → `docs/10-API-CONTRACTS.md`
- Business behavior → `docs/11-BUSINESS-RULES.md`
- Validation → `docs/12-VALIDATION-RULES.md`
- UI states → `docs/13-ERROR-EMPTY-LOADING-STATES.md`
- Accessibility → `docs/14-ACCESSIBILITY.md`
- Security/privacy → `docs/15-SECURITY-PRIVACY.md`
- Testing → `docs/16-TESTING.md`
- Completion → `docs/17-ACCEPTANCE-CRITERIA.md`
- Publishing → `docs/18-APP-PUBLISHING.md`

---

## 3. Source of Truth Priority

When documents appear to conflict, use this priority:

1. Explicit user/requester instruction in the current task
2. `docs/01-PRD.md`
3. `docs/11-BUSINESS-RULES.md`
4. `docs/07-SCREEN-SPECS.md`
5. `docs/06-DESIGN-SYSTEM.md`
6. `docs/08-ARCHITECTURE.md`
7. Other supporting docs

Do not silently resolve meaningful conflicts. Record assumptions in the implementation summary.

---

## 4. Engineering Rules

### TypeScript
- Use strict TypeScript.
- Do not use `any` unless there is a documented reason.
- Prefer explicit domain types.
- Avoid unsafe type assertions.

### Components
- Reuse existing components before creating new ones.
- Keep screen/page components focused on composition.
- Move reusable product UI into components.
- Do not create abstractions for one-off trivial markup.

### Business Logic
- Keep booking and eligibility logic outside visual components.
- Do not duplicate business rules across screens.
- Use pure functions where practical for age/availability/status calculations.

### Data Access
- UI components must not directly own large fixture datasets.
- Access trial data through a service/repository layer.
- Do not invent endpoints that are not documented.
- Mock service interfaces should be replaceable with a real backend later.

### Dependencies
- Do not add dependencies when the platform or current stack already solves the problem.
- Do not introduce Redux or another global state library without a concrete need.
- Do not add a backend solely for architectural appearance.

### Secrets
- Never hardcode secrets, tokens, production keys, passwords, or private credentials.
- Use environment configuration for values that vary by environment.

---

## 5. UI/UX Rules

- Design primarily for parents, not directly for toddlers.
- Friendly and playful does not mean visually chaotic.
- Use clear hierarchy, large touch targets, rounded surfaces, and readable typography.
- Every interactive state must be understandable.
- Full sessions remain visible but disabled.
- Selected booking context must remain visible through the booking flow.
- Do not use placeholder lorem ipsum.
- Use seeded PlayNest content from `docs/24-CONTENT-SEED.md`.

---

## 6. Scope Control

Do not implement these unless explicitly requested:

- Real payment gateway
- Full admin dashboard
- Staff scheduling portal
- Production QR validation
- Push-notification infrastructure
- Multi-tenant architecture
- Multi-location business logic
- Membership billing engine
- Advanced analytics
- Real-time chat

It is acceptable to display a small mocked UI preview for optional features only after P0 is complete.

---

## 7. Before Coding

For a substantial change:

1. Read the relevant docs.
2. Inspect the existing implementation.
3. State the user-visible goal.
4. Identify affected files/modules.
5. Identify applicable business and validation rules.
6. Identify loading, empty, error, success, and disabled states.
7. Write a short implementation plan.
8. Implement the smallest complete solution.

Do not begin by rewriting unrelated code.

---

## 8. During Implementation

- Keep changes scoped.
- Preserve established naming and folder conventions.
- Add or update types before spreading ad-hoc object shapes.
- Reuse seeded data.
- Make demo interactions deterministic.
- Keep navigation back behavior sensible.
- Preserve user's selections on recoverable failures.
- Prevent duplicate booking submission where applicable.

---

## 9. Before Claiming Completion

Run the repository's actual commands for:

- lint
- typecheck
- tests
- build where applicable

Then manually verify the affected flow.

For booking-related work, minimum manual verification is:

1. Open an activity.
2. Choose an available session.
3. Choose an eligible child.
4. Review the correct details.
5. Confirm.
6. See confirmation.
7. See booking under Upcoming.
8. Open the check-in pass.

Do not claim completion if required verification fails.

---

## 10. Required Final Agent Summary

When finishing a substantial task, report:

- What changed
- Which user flow is now supported
- Any assumptions made
- Tests/checks run
- Anything intentionally not implemented
- Known limitations, if any

Keep the summary factual. Do not claim tests passed unless they were actually run.

---

## 11. Trial Success Standard

The implementation should communicate:

> This developer can understand a product, prioritize its most important journey, build efficiently using AI, review AI output, validate the result, and prepare a mobile application for distribution.

Feature count is secondary to product quality and execution discipline.


---

<!-- FILE: docs/README.md -->

# PlayNest Documentation Index

## Start Here

- `00-PROJECT-OVERVIEW.md` — fast product context
- `01-PRD.md` — authoritative trial requirements
- `02-PRODUCT.md` — product principles and language
- `03-USER-PERSONAS.md` — who the product serves
- `04-USER-FLOWS.md` — exact user journeys
- `05-FEATURES.md` — feature-by-feature behavior
- `06-DESIGN-SYSTEM.md` — visual/UX rules
- `07-SCREEN-SPECS.md` — screen content, actions, and states
- `08-ARCHITECTURE.md` — technical structure
- `08A-ROUTES.md` — navigation map
- `09-DATA-MODEL.md` — canonical entities and types
- `10-API-CONTRACTS.md` — service boundaries
- `11-BUSINESS-RULES.md` — product logic
- `12-VALIDATION-RULES.md` — input/operation validation
- `13-ERROR-EMPTY-LOADING-STATES.md` — non-happy paths
- `14-ACCESSIBILITY.md` — accessibility expectations
- `15-SECURITY-PRIVACY.md` — safety and data discipline
- `16-TESTING.md` — verification strategy
- `17-ACCEPTANCE-CRITERIA.md` — completion checklist
- `18-APP-PUBLISHING.md` — APK/TestFlight knowledge
- `19-AI-WORKFLOW.md` — Claude/AI development process
- `20-DEMO.md` — evaluator walkthrough
- `21-OUT-OF-SCOPE.md` — protects the 3-day scope
- `22-FUTURE-ROADMAP.md` — documented future direction
- `23-NON-FUNCTIONAL-REQUIREMENTS.md` — quality constraints
- `24-CONTENT-SEED.md` — canonical demo copy/data
- `25-IMPLEMENTATION-PLAN.md` — 3-day execution sequence
- `26-DEFINITION-OF-DONE.md` — agent completion standard
- `GLOSSARY.md` — shared terminology

## AI Agent Reading Strategy

Do **not** load every document into every prompt.

### Repository Startup
Read:
- `CLAUDE.md`
- `00-PROJECT-OVERVIEW.md`
- `01-PRD.md`
- `02-PRODUCT.md`
- `06-DESIGN-SYSTEM.md`
- `08-ARCHITECTURE.md`

### Booking Feature
Add:
- `04-USER-FLOWS.md`
- `07-SCREEN-SPECS.md`
- `09-DATA-MODEL.md`
- `10-API-CONTRACTS.md`
- `11-BUSINESS-RULES.md`
- `12-VALIDATION-RULES.md`
- `17-ACCEPTANCE-CRITERIA.md`

### UI Polish
Add:
- `06-DESIGN-SYSTEM.md`
- `13-ERROR-EMPTY-LOADING-STATES.md`
- `14-ACCESSIBILITY.md`
- `24-CONTENT-SEED.md`

### Release
Add:
- `16-TESTING.md`
- `18-APP-PUBLISHING.md`
- `20-DEMO.md`
- `26-DEFINITION-OF-DONE.md`

This reduces context noise while keeping requirements explicit.


---

<!-- FILE: docs/SPEC-VERSION.md -->

# Specification Version

Product: PlayNest  
Specification: AI Coding Agent Trial Specification  
Version: 1.0  
Date: 2026-09-03

## Scope
Initial 3-day application developer trial specification.

## Change Rule
If product requirements change during implementation:
1. update the relevant source-of-truth document,
2. update acceptance criteria if affected,
3. then update implementation.

Avoid undocumented requirement drift.


---

<!-- FILE: docs/00-PROJECT-OVERVIEW.md -->

# 00 — Project Overview

## Product Name

**PlayNest**

## One-Line Description

A parent-friendly mobile booking app and marketing website for a children's gym, indoor playground, and activity space.

## Problem

Parents need a fast way to understand:

- what activities are available,
- whether an activity fits their child's age,
- when a session is available,
- how much it costs,
- and what they have already booked.

Many real-world play spaces still rely on social messages, calls, walk-ins, spreadsheets, or generic booking tools that do not reflect child-specific needs.

## Solution

PlayNest provides a focused parent journey:

**Discover → Select Activity → Choose Session → Select Child → Review → Book → Check In**

## Trial Context

This is a 3-day application developer trial.

The evaluator is looking for evidence of:

- mobile development
- UI/UX judgment
- APK/TestFlight knowledge
- web development
- effective AI usage
- code review discipline
- maintainable engineering
- ability to guide/mentor a team

## Product Surfaces

### Mobile App
Primary transactional experience.

### Marketing Website
Public-facing brand and conversion experience.

## Trial Definition

This is a polished product slice, not a complete production platform.

The mobile app should feel real enough that an evaluator can complete the entire booking journey without explanation.

## Primary Demo

Parent Sarah books **Junior Gymnastics** for **Emma**, age 5.

The app should allow Sarah to:

1. Find Junior Gymnastics.
2. See age, duration, price, and description.
3. Pick September 7 at 2:00 PM.
4. Select Emma.
5. Review the booking.
6. Confirm it.
7. See it under Upcoming Bookings.
8. Open a QR-style check-in pass.

## Non-Goals

The trial is not intended to prove:

- complex backend scale
- production payments
- enterprise reporting
- staff workforce management
- accounting
- complex subscriptions
- operational automation

## Design Positioning

PlayNest should look like a modern consumer booking app with a warm family-oriented identity.

It should not look like:

- a school ERP
- a colorful toddler game
- a generic Bootstrap dashboard
- an enterprise admin panel


---

<!-- FILE: docs/01-PRD.md -->

# 01 — Product Requirements Document

## 1. Product Goal

Enable a parent to discover and book a suitable children's activity in a small number of clear steps.

## 2. Trial Goals

The trial must demonstrate:

- installable mobile application
- coherent end-to-end user flow
- thoughtful UI/UX
- responsive matching website
- clear architecture
- validation and state handling
- AI-assisted engineering process
- Android APK or Apple TestFlight understanding

## 3. Primary Persona

**Sarah**
- Parent/guardian
- Has two children
- Emma, age 5
- Lucas, age 3
- Uses her phone to plan activities

## 4. Primary Use Case

Sarah wants to book Emma into Junior Gymnastics.

## 5. Functional Requirements

### FR-001 — Onboarding
The app should provide a short first-run introduction or a clear entry into the demo.

### FR-002 — Demo Access
The evaluator must be able to use the app without creating a real production account.

Recommended action:
- `Continue as Demo User`

### FR-003 — Home
Home must show:
- greeting
- featured content
- at least one activity section
- quick path to bookings
- optional upcoming booking preview

### FR-004 — Browse Activities
The user must be able to see available activities.

Each activity must expose enough information to decide whether to open it:
- title
- age range
- duration
- price or starting price
- useful availability cue

### FR-005 — Activity Detail
The detail screen must show:
- name
- description
- age range
- duration
- price
- instructor or host
- capacity/availability context
- booking CTA

### FR-006 — Choose Date
The user must select a date with available sessions.

### FR-007 — Choose Session
The user must see sessions and whether each is available.

Full sessions:
- remain visible
- cannot be selected
- clearly show `Full`

### FR-008 — Choose Child
The user must select exactly one child for the trial booking.

### FR-009 — Add Child
The user should be able to add a child with essential fields.

### FR-010 — Eligibility
An obviously age-ineligible child should not be silently accepted.

The UI must communicate why the child cannot be selected.

### FR-011 — Review Booking
Before confirmation, the user must see:
- activity
- child
- date
- time
- duration
- price

### FR-012 — Confirm Booking
The user can confirm the booking.

The trial may use a local/mock service.

### FR-013 — Booking Success
Successful confirmation must show:
- success message
- booking reference
- activity
- child
- date
- time
- location

### FR-014 — My Bookings
The app must expose:
- Upcoming
- Past

### FR-015 — Booking Details
The user can open a booking and view its details.

### FR-016 — Check-In Pass
A confirmed upcoming booking should expose a QR-style pass.

The QR does not need a real validation backend.

### FR-017 — Profile
The profile area should provide:
- account information
- child management entry
- terms/policies entry
- logout/demo reset option if useful

### FR-018 — Marketing Website
The website must contain:
- hero
- programs
- benefits
- how it works
- schedule
- pricing
- FAQ
- final CTA

### FR-019 — Responsive Website
The website must work on mobile and desktop widths.

### FR-020 — Visual Consistency
Mobile and web must clearly belong to the same brand.

## 6. Non-Functional Requirements

See `23-NON-FUNCTIONAL-REQUIREMENTS.md`.

Minimum:
- no crash during core demo
- fast local/mock interactions
- readable text
- predictable navigation
- clear loading/error handling
- no secrets in source
- deterministic demo seed

## 7. P0 Scope

Required:
- Home
- Activities
- Activity Details
- Booking flow
- Child selection
- Booking confirmation
- My Bookings
- Booking Details
- QR Check-In Pass
- Profile
- Matching website
- installable mobile release artifact
- documentation

## 8. P1 Scope

Only if P0 is complete:
- add child
- favorites
- membership card preview
- notifications screen preview
- cancellation interaction
- promotional content

## 9. Explicitly Out of Scope

See `21-OUT-OF-SCOPE.md`.

## 10. Success Metrics for Trial

This is not production analytics. Trial success is judged qualitatively.

A reviewer should be able to:
- understand the app without instructions
- complete the main flow
- see professional UI states
- install/open the mobile build
- understand the publishing approach
- see that AI use is controlled and validated

## 11. Acceptance

The complete acceptance matrix is in `17-ACCEPTANCE-CRITERIA.md`.


---

<!-- FILE: docs/02-PRODUCT.md -->

# 02 — Product Guide

## Product Promise

PlayNest helps parents confidently plan children's play and activity sessions without unnecessary friction.

## Primary User Mental Model

A parent thinks:

1. What can my child do?
2. Is it right for their age?
3. When is it available?
4. How much is it?
5. Can I reserve it?
6. Where do I find my booking later?

The interface should answer those questions in that order.

## Product Principles

### 1. Parent First
Write and design for the parent making a decision.

### 2. Fast Booking
The user should not repeatedly enter information already known.

### 3. Child Context Matters
Age and child selection are part of the product, not an afterthought.

### 4. Availability Must Be Obvious
Do not force users to tap into full sessions just to discover they are unavailable.

### 5. Confirmation Must Feel Certain
After booking, clearly communicate success and next steps.

### 6. Safe, Warm, Credible
Playfulness must not reduce trust.

### 7. Mobile First
The mobile app is the primary transactional surface.

### 8. Explain, Do Not Surprise
Disabled states and validation must tell the user why.

## Main Jobs To Be Done

### Discover
"When I want an activity for my child, help me quickly see suitable options."

### Evaluate
"When I open an activity, tell me whether it fits my child, schedule, and budget."

### Reserve
"When I decide to attend, let me book without unnecessary steps."

### Recall
"When the day approaches, let me easily find the booking details."

### Check In
"When I arrive, give me a simple pass I can show at reception."

## Product Vocabulary

Use:
- Activity
- Session
- Book Session
- Available
- Slots Left
- Full
- My Children
- Upcoming
- Confirmed
- Check-In Pass
- Booking Reference

Avoid:
- Reservation entity
- Slot allocation
- Child record object
- Transaction
- Resource
- Backend status code

## Product Tone

Warm, concise, reassuring, practical.

Examples:
- "You're booked!"
- "2 slots left"
- "Emma is outside the age range for this activity."
- "Show this pass at reception when you arrive."

Avoid:
- "Operation completed successfully."
- "Invalid child."
- "Request failed."


---

<!-- FILE: docs/03-USER-PERSONAS.md -->

# 03 — User Personas

## Persona 1 — Sarah, Parent

### Profile
- Primary trial persona
- Busy parent
- Comfortable with mobile apps
- Wants fast booking, not a complex membership portal
- Has multiple children with different ages

### Children
- Emma — age 5
- Lucas — age 3

### Goals
- Find age-appropriate activities
- See available times
- Avoid calling the venue
- Keep bookings in one place
- Know what to show at arrival

### Frustrations
- Unclear availability
- Having to message a business to ask basic questions
- Re-entering child information
- Finding out too late that a class is full
- Booking confirmations buried in messages

### Design Implications
- Age range must be visible
- Availability must be scannable
- Saved children must be easy to select
- Booking details must remain accessible

---

## Persona 2 — Mia, First-Time Parent

### Profile
- More cautious
- Wants clear safety and age information
- May hesitate if the product feels untrustworthy

### Goals
- Understand exactly what the activity is
- Confirm age suitability
- See duration and location
- Know what happens after booking

### Design Implications
- Avoid vague descriptions
- Use clear status and confirmation copy
- Keep contact/location information visible on booking details

---

## Persona 3 — Reception Staff (Future)

Not a trial implementation target.

Potential future needs:
- search booking
- scan/check pass
- mark arrival
- identify child and session
- see emergency/allergy notes when authorized

Do not implement a staff portal during the trial.


---

<!-- FILE: docs/04-USER-FLOWS.md -->

# 04 — User Flows

## Flow A — Primary Booking Flow

### Preconditions
- Demo user is available.
- At least one activity exists.
- At least one session is available.
- Demo parent has Emma and Lucas.

### Flow
1. User opens Home.
2. User opens Activities.
3. User selects Junior Gymnastics.
4. App displays activity information.
5. User taps `Book Session`.
6. User selects a date.
7. App displays sessions for the selected date.
8. User selects an available session.
9. User proceeds to child selection.
10. User selects Emma.
11. App validates eligibility.
12. User proceeds to review.
13. App shows booking summary.
14. User taps `Confirm Booking`.
15. App creates the booking.
16. App shows confirmation.
17. User can open booking details.
18. Booking appears under Upcoming.
19. User opens the Check-In Pass.

### Success
- Booking exists once.
- Status is `confirmed`.
- Booking has a reference.
- Correct child/session data is shown.

### Failure Behavior
- If creation fails, keep user's selections and allow retry.
- Do not navigate to success unless creation succeeds.

---

## Flow B — Full Session

1. User opens an activity.
2. User chooses a date.
3. A full session is visible.
4. Full session displays `Full`.
5. Full session is disabled.
6. User can choose another session.

The user should never need to submit a form to discover the session is full.

---

## Flow C — Ineligible Child

1. User chooses an activity for ages 5–8.
2. User reaches child selection.
3. Emma, age 5, is eligible.
4. Lucas, age 3, is visibly ineligible.
5. Lucas cannot be selected.
6. UI explains: `Ages 5–8 only`.

---

## Flow D — Add Child

1. User opens child selection or My Children.
2. User taps `Add Child`.
3. User enters required information.
4. Form validates.
5. User saves.
6. Child appears in list.
7. If initiated from booking, new child can be selected.

---

## Flow E — View Upcoming Booking

1. User opens Bookings.
2. Upcoming is selected.
3. User sees confirmed booking.
4. User opens booking.
5. Booking details show activity, child, date, time, reference, location.
6. User can open Check-In Pass.

---

## Flow F — No Upcoming Bookings

1. User opens Bookings.
2. Upcoming contains no items.
3. App displays intentional empty state.
4. CTA opens Activities.

---

## Flow G — Website Conversion

1. Visitor lands on website.
2. Understands business proposition from hero.
3. Browses programs.
4. Reviews schedule/pricing.
5. Understands booking process.
6. Uses final CTA to book/download.

For the trial, CTA may link to an app/demo location rather than a full web checkout.


---

<!-- FILE: docs/05-FEATURES.md -->

# 05 — Feature Specifications

## F01 — Demo Authentication

### Goal
Remove evaluator friction.

### Requirements
- Show Sign In UI.
- Provide `Continue as Demo User`.
- No real account is required for the trial.
- Demo identity should be deterministic.

### Demo User
Name: Sarah  
Email: sarah@example.test

---

## F02 — Home

### Goal
Orient the user and surface relevant actions.

### Required Content
- greeting
- featured activity
- today's/available activities
- quick access to bookings
- optional upcoming booking

### Required Actions
- Open activity
- Browse all activities
- Open bookings

---

## F03 — Activities

### Goal
Allow fast comparison.

### Card Content
- name
- age range
- duration
- price
- availability cue

### Filtering
Not required for trial.

---

## F04 — Activity Details

### Required
- image/illustration
- name
- description
- age range
- duration
- price
- instructor
- location
- session availability CTA

---

## F05 — Schedule Selection

### Required
- selected activity context
- date selection
- session list
- availability status
- selected state
- disabled full state

### Rule
Exactly one session is selected before continuing.

---

## F06 — Child Selection

### Required
- saved children
- age display
- eligibility state
- add child entry point

### Rule
Exactly one eligible child is selected.

---

## F07 — Booking Review

### Required
- activity
- child
- date
- time
- duration
- price
- location if space allows

### CTA
`Confirm Booking`

---

## F08 — Confirmation

### Required
- clear success indicator
- `You're booked!`
- booking reference
- summary
- next actions

---

## F09 — My Bookings

### Required
Tabs:
- Upcoming
- Past

### Trial Statuses
- confirmed
- completed
- cancelled

---

## F10 — Booking Details

### Required
- activity
- child
- date
- time
- location
- reference
- status
- Check-In Pass action

---

## F11 — Check-In Pass

### Required
- visual QR code
- booking reference
- child
- activity
- session time
- instruction

### Non-Requirement
The QR does not need server-side verification.

---

## F12 — Children

### Required
- child list
- age
- add child action

Editing/removing children is optional.

---

## F13 — Marketing Website

### Required Sections
- Hero
- Programs
- Benefits
- How It Works
- Schedule
- Pricing
- FAQ
- Final CTA
- Footer

### Requirement
Match PlayNest brand and terminology.


---

<!-- FILE: docs/06-DESIGN-SYSTEM.md -->

# 06 — Design System

## Brand Direction

PlayNest should feel:
- warm
- modern
- safe
- energetic
- approachable
- organized
- parent-friendly

It should not feel:
- infantile
- chaotic
- corporate
- clinical
- like a generic admin dashboard

## Design Principle

**Playful restraint.**

Use cheerful visual cues without turning every surface into decoration.

## Typography

Use a modern, highly readable sans-serif.

Requirements:
- clear heading hierarchy
- body text readable at typical mobile size
- avoid decorative fonts for body text
- no important information below comfortable accessibility sizing

## Spacing

Use a consistent spacing scale.

Suggested conceptual scale:
- 4
- 8
- 12
- 16
- 24
- 32
- 48

Do not introduce arbitrary spacing repeatedly.

## Corner Radius

Use moderately rounded:
- buttons
- cards
- inputs
- chips
- bottom sheets

Avoid extreme pill styling for large content containers.

## Elevation

Keep shadows subtle.

Prefer:
- border
- surface contrast
- spacing

over heavy shadows.

## Iconography

Use one consistent icon family.

Icons should support labels, not replace important text without reason.

## Images

Use consistent treatment:
- rounded crop
- appropriate aspect ratio
- meaningful alt/accessibility text on web
- avoid random stock-photo visual inconsistency

## Core Components

### Button
Variants:
- primary
- secondary
- ghost
- destructive

States:
- default
- pressed/active
- disabled
- loading

### Input
States:
- default
- focused
- error
- disabled

### Badge
Examples:
- Confirmed
- Full
- 2 slots left
- Ages 5–8

### ActivityCard
Must make title and suitability scannable.

### SessionCard
States:
- available
- selected
- full/disabled

### ChildCard
States:
- eligible
- selected
- ineligible

### BookingCard
Must expose:
- activity
- child
- date/time
- status

### EmptyState
Contains:
- concise title
- helpful copy
- relevant CTA when possible

## Mobile Navigation

Bottom tabs:
1. Home
2. Activities
3. Bookings
4. Profile

Keep labels visible.

## Touch Targets

Interactive controls should be comfortably tappable.

Avoid tiny text-only targets.

## Forms

- Label fields clearly.
- Show validation near the field.
- Do not clear user-entered values after recoverable errors.
- Use appropriate keyboard/input modes.

## Booking Flow Design

Maintain context.

While selecting date/time/child, the user should still understand:
- which activity they are booking
- what step they are on

## Website

Use the same:
- brand personality
- typography family
- component language
- radii
- icon style
- tone of voice

Website can be more spacious and editorial than mobile.

## Prohibited Design Patterns

Do not:
- use excessive gradients
- use rainbow coloring on every card
- place multiple competing primary CTAs together
- hide essential status behind color alone
- use large blocks of centered body copy
- create dashboard-style metric cards unrelated to the parent journey


---

<!-- FILE: docs/07-SCREEN-SPECS.md -->

# 07 — Mobile Screen Specifications

Each screen lists required content, actions, and states.

---

## S01 — Splash

### Purpose
Brand entry.

### Content
- PlayNest mark/name
- short loading transition if needed

### Rule
Do not artificially delay app startup.

---

## S02 — Onboarding

### Content
Maximum 3 slides.

Suggested:
1. Play. Learn. Grow.
2. Find activities made for your child.
3. Book a session in just a few taps.

### Actions
- Skip
- Get Started

---

## S03 — Sign In / Demo Access

### Content
- email
- password
- sign in
- create account link
- `Continue as Demo User`

### Trial Rule
Demo access must work without external setup.

---

## S04 — Home

### Header
- greeting
- optional parent avatar

### Sections
1. Featured activity
2. Today's activities
3. Upcoming booking or quick actions

### Actions
- open activity
- browse activities
- open booking

### Empty State
If no upcoming booking, show useful activity CTA rather than blank space.

---

## S05 — Activities

### Header
`Activities`

### Content
Activity cards for seeded activities.

### Actions
Tap card → Activity Details.

### State
No search/filter required.

---

## S06 — Activity Details

### Content
- hero image/illustration
- title
- age range
- description
- duration
- price
- instructor
- location
- availability cue

### Primary CTA
`Book Session`

### Navigation
Back → Activities or prior origin.

---

## S07 — Select Schedule

### Header
`Choose a Session`

### Context
Show selected activity summary.

### Content
- date strip/calendar
- session cards

### Session Card
- start time
- optional end time
- availability
- full state

### Primary CTA
`Continue`

### CTA State
Disabled until an available session is selected.

---

## S08 — Select Child

### Header
`Who's joining?`

### Content
- child cards
- age
- eligibility
- `Add Child`

### Rule
Exactly one child.

### Ineligible State
Clearly display age restriction.

### CTA
`Continue`

---

## S09 — Add Child

### Required Fields
- first name
- last name
- date of birth
- emergency contact

### Optional
- allergies/notes

### Actions
- Save Child
- Cancel/back

### Success
Return to prior flow and expose newly saved child.

---

## S10 — Booking Review

### Header
`Review Booking`

### Summary
- activity
- child
- date
- time
- duration
- price
- location

### Primary CTA
`Confirm Booking`

### Loading
Disable duplicate submission and show progress.

---

## S11 — Booking Confirmation

### Content
- success graphic/icon
- `You're booked!`
- reference
- activity
- child
- schedule
- location

### Actions
- View Booking
- Back to Home

---

## S12 — Bookings

### Header
`My Bookings`

### Tabs
- Upcoming
- Past

### Booking Card
- activity
- child
- date/time
- status

### Empty State
`No upcoming bookings yet`
CTA: `Browse Activities`

---

## S13 — Booking Details

### Content
- status
- activity
- child
- date
- time
- duration
- location
- booking reference

### Primary Action
`View Check-In Pass`

### Optional
`Cancel Booking`

---

## S14 — Check-In Pass

### Header
`Check-In Pass`

### Content
- QR visual
- child
- activity
- date/time
- booking reference

### Helper Text
`Show this pass at reception when you arrive.`

---

## S15 — My Children

### Content
- saved children
- age
- `Add Child`

### Optional
Edit action.

---

## S16 — Profile

### Content
- parent name
- email
- phone
- My Children
- Notifications
- Terms & Policies
- Logout / Reset Demo

### Trial
Notifications and policy pages may be static placeholders if needed.

---

# Website Page Specification

A single polished landing page is sufficient.

## W01 — Navigation
- PlayNest logo
- Programs
- Schedule
- Pricing
- FAQ
- Book / Get App CTA

## W02 — Hero
Headline:
`Where Kids Play, Learn & Grow`

Subheading:
`Fun, active, and engaging experiences designed for growing kids.`

CTAs:
- Explore Programs
- Book a Session

## W03 — Programs
Four seeded program cards.

## W04 — Benefits
- Safe Environment
- Active Learning
- Small Groups
- Easy Booking

## W05 — How It Works
1. Find an Activity
2. Choose a Schedule
3. Come & Play

## W06 — Schedule
Simple readable schedule.

## W07 — Pricing
- Single Session
- 5-Visit Pass
- Monthly Membership

Prices are demo content.

## W08 — FAQ
Use seeded questions.

## W09 — Final CTA
`Ready for your next adventure?`

## W10 — Footer
- brand
- contact placeholder
- privacy/terms links


---

<!-- FILE: docs/08-ARCHITECTURE.md -->

# 08 — Architecture

## Architecture Goal

Use a simple architecture that:
- is easy to explain
- supports deterministic demo behavior
- keeps business rules outside visual components
- can later replace mock services with a backend
- does not waste trial time on infrastructure

## Mobile Stack

- React Native
- Expo
- Expo Router
- TypeScript
- React Hook Form
- Zod

Optional:
- TanStack Query if the chosen mock/remote data layer benefits from async query semantics

## Web Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui where appropriate

## Backend Decision

**Trial default: no dedicated backend required.**

Use a mock/local repository layer.

A real backend may be added only if it directly improves the demonstration and does not jeopardize P0 completion.

## Mobile Layers

```text
app/routes
    ↓
screens / feature composition
    ↓
feature components + hooks
    ↓
domain/services
    ↓
mock repositories / persistence
```

## Suggested Mobile Structure

```text
mobile/
├── app/
├── src/
│   ├── components/
│   ├── features/
│   │   ├── activities/
│   │   ├── bookings/
│   │   ├── children/
│   │   ├── auth/
│   │   └── profile/
│   ├── services/
│   ├── repositories/
│   ├── domain/
│   ├── data/
│   ├── hooks/
│   ├── utils/
│   └── types/
├── assets/
└── package.json
```

## Suggested Web Structure

```text
web/
├── app/
├── components/
├── sections/
├── lib/
├── public/
└── package.json
```

## Domain Separation

Keep these concepts distinct:
- Activity
- Session
- Child
- Booking
- User

Do not model a session as an activity with extra fields.

## Booking Logic Location

Recommended domain/service functions:
- `isChildEligibleForActivity`
- `isSessionBookable`
- `createBookingReference`
- `calculateChildAge`
- `getBookingDisplayStatus`

## Data Persistence

Acceptable trial options:
1. in-memory + seeded fixture reset
2. local storage / AsyncStorage
3. lightweight Supabase implementation

Prefer deterministic behavior over unnecessary complexity.

## Navigation

Expo Router routes are defined in `08A-ROUTES.md`.

## State

Use:
- local state for transient presentation
- forms for input state
- lightweight shared context only for demo identity/booking draft if necessary
- service/repository for persisted trial data

## Error Boundary

Provide sane fallback handling for unexpected screen-level failure if practical.

## Logging

Do not expose sensitive data.

Development logging should be removable/minimal in release builds.


---

<!-- FILE: docs/08A-ROUTES.md -->

# 08A — Routes and Navigation

## Mobile Route Map

Conceptual Expo Router structure:

```text
app/
├── _layout.tsx
├── index.tsx
├── onboarding.tsx
├── sign-in.tsx
├── (tabs)/
│   ├── _layout.tsx
│   ├── home.tsx
│   ├── activities.tsx
│   ├── bookings.tsx
│   └── profile.tsx
├── activities/
│   └── [activityId].tsx
├── booking/
│   ├── schedule.tsx
│   ├── child.tsx
│   ├── review.tsx
│   └── success.tsx
├── bookings/
│   └── [bookingId].tsx
├── check-in/
│   └── [bookingId].tsx
└── children/
    ├── index.tsx
    └── new.tsx
```

Exact folder syntax may be adapted to existing project conventions.

## Navigation Rules

### Activity → Booking
Activity Details → Schedule → Child → Review → Success

### Back Behavior
Back from:
- Child → Schedule
- Review → Child
- Schedule → Activity Details

User selections should remain available when navigating backward during the same booking draft.

### Success Behavior
Do not allow accidental back navigation to re-submit a completed booking.

### Booking Details
Bookings → Booking Details → Check-In Pass

### Tabs
Tabs should not be shown on modal/deep flow screens if doing so makes the booking experience confusing.

## Website Routes

Trial may be a single page:
- `/`

Optional:
- `/privacy`
- `/terms`

Do not build unnecessary web application routes.


---

<!-- FILE: docs/09-DATA-MODEL.md -->

# 09 — Data Model

This document defines the canonical trial domain model.

## User

```ts
type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
};
```

## Child

```ts
type Child = {
  id: string;
  parentId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // ISO date
  emergencyContact: string;
  notes?: string;
};
```

Derived:
- age
- displayName

Do not persist age as the source of truth.

## Activity

```ts
type Activity = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  minAge: number;
  maxAge: number;
  durationMinutes: number;
  price: number;
  currency: "PHP";
  instructorName: string;
  locationName: string;
  imageKey: string;
};
```

## Session

```ts
type Session = {
  id: string;
  activityId: string;
  startsAt: string; // ISO datetime
  capacity: number;
  bookedCount: number;
  status: "scheduled" | "cancelled";
};
```

Derived:
- availableSlots = capacity - bookedCount
- full = availableSlots <= 0

## Booking

```ts
type BookingStatus = "confirmed" | "completed" | "cancelled";

type Booking = {
  id: string;
  reference: string;
  userId: string;
  childId: string;
  sessionId: string;
  status: BookingStatus;
  createdAt: string;
};
```

## Booking View Model

UI may derive:

```ts
type BookingDetails = {
  booking: Booking;
  child: Child;
  session: Session;
  activity: Activity;
};
```

## Relationships

```text
User 1 ─── * Child
User 1 ─── * Booking
Activity 1 ─── * Session
Child 1 ─── * Booking
Session 1 ─── * Booking
```

## IDs

Use stable string IDs in seed data.

Examples:
- `usr_sarah`
- `child_emma`
- `act_junior_gymnastics`
- `ses_jg_2026_09_07_1400`
- `bkg_demo_001`

## Dates

Store machine values in ISO format.

Format for display in UI only.

## Currency

Trial currency:
`PHP`

Display:
`₱450`

Do not build multi-currency logic for the trial.


---

<!-- FILE: docs/10-API-CONTRACTS.md -->

# 10 — Service / API Contracts

The trial may use local repositories instead of HTTP APIs.

These interfaces define behavior so the UI is not coupled to fixture implementation.

## Activity Service

```ts
interface ActivityService {
  listActivities(): Promise<Activity[]>;
  getActivity(activityId: string): Promise<Activity | null>;
  listSessions(activityId: string, date?: string): Promise<Session[]>;
}
```

## Child Service

```ts
type CreateChildInput = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  emergencyContact: string;
  notes?: string;
};

interface ChildService {
  listChildren(parentId: string): Promise<Child[]>;
  createChild(parentId: string, input: CreateChildInput): Promise<Child>;
}
```

## Booking Service

```ts
type CreateBookingInput = {
  userId: string;
  childId: string;
  sessionId: string;
};

interface BookingService {
  createBooking(input: CreateBookingInput): Promise<Booking>;
  listBookings(userId: string): Promise<Booking[]>;
  getBooking(bookingId: string): Promise<Booking | null>;
  cancelBooking?(bookingId: string): Promise<Booking>;
}
```

## Booking Creation Behavior

`createBooking` must validate:
- session exists
- session is scheduled
- session has capacity
- child exists
- activity exists
- child is age eligible

If invalid, return/throw a domain-safe error that the UI can map to a human message.

## Suggested Domain Error Codes

```ts
type DomainErrorCode =
  | "SESSION_NOT_FOUND"
  | "SESSION_FULL"
  | "SESSION_CANCELLED"
  | "CHILD_NOT_FOUND"
  | "CHILD_INELIGIBLE"
  | "BOOKING_NOT_FOUND"
  | "UNKNOWN";
```

## UI Error Mapping

Do not show raw error codes.

Example:
- `SESSION_FULL` → `That session just filled up. Please choose another time.`
- `CHILD_INELIGIBLE` → `This activity is for ages 5–8.`

## Future HTTP Mapping

If a backend is later introduced, these service interfaces can wrap actual endpoints without forcing screen rewrites.

Do not invent production endpoints in the trial documentation or UI.


---

<!-- FILE: docs/11-BUSINESS-RULES.md -->

# 11 — Business Rules

These rules are canonical for the trial.

## BR-001 — One Child Per Trial Booking

A booking represents one child attending one session.

Multi-child checkout is out of scope.

## BR-002 — Age Eligibility

A child is eligible when their age is within:
- `activity.minAge`
- `activity.maxAge`

Inclusive boundaries.

Example:
- Activity ages 5–8
- Child age 5 → eligible
- Child age 8 → eligible
- Child age 4 → ineligible
- Child age 9 → ineligible

## BR-003 — Calculate Age From Date of Birth

Do not store age as permanent source data.

Calculate based on date of birth.

For the trial, current date calculation is sufficient; exact venue-specific age-at-session policy is not required.

## BR-004 — Session Availability

Available slots:
`capacity - bookedCount`

A session is full if result <= 0.

## BR-005 — Full Sessions

Full sessions:
- remain visible
- show `Full`
- cannot be selected

## BR-006 — Cancelled Sessions

Cancelled sessions cannot be booked.

They may be hidden from normal session selection.

## BR-007 — Booking Requires Selection

Booking cannot proceed without:
- activity
- session
- eligible child

## BR-008 — Confirmation

A booking is considered created only after the booking service returns success.

Never show success first and persist later.

## BR-009 — Booking Reference

Every successful booking has a human-readable unique reference.

Example:
`PN-7K4M2Q`

Exact format may differ but must be deterministic enough for display.

## BR-010 — Booking Status

Trial statuses:
- confirmed
- completed
- cancelled

Do not create extra statuses without a product requirement.

## BR-011 — Upcoming

A booking is shown under Upcoming when:
- status is confirmed
- session has not passed

## BR-012 — Past

Past may include:
- completed bookings
- previous confirmed bookings if the implementation derives completed state
- cancelled items only if intentionally displayed

Keep behavior consistent.

## BR-013 — QR Pass

Only a valid booking should expose a check-in pass.

For trial simplicity, confirmed upcoming bookings are the primary case.

## BR-014 — Price

Activity price is the displayed trial session price.

No taxes, discounts, or dynamic pricing rules are required.

## BR-015 — Payment

No real payment is collected in the trial.

Do not create a fake payment success screen that implies money was actually processed.

## BR-016 — Location

All seeded trial activities may use one location:
`PlayNest Activity Center`

Multi-location selection is out of scope.


---

<!-- FILE: docs/12-VALIDATION-RULES.md -->

# 12 — Validation Rules

## Sign In

If implementing form validation:

### Email
- required
- valid email shape

### Password
- required for normal sign-in
- not relevant for `Continue as Demo User`

## Add Child

### First Name
- required
- trimmed
- 1–50 characters

### Last Name
- required
- trimmed
- 1–50 characters

### Date of Birth
- required
- must be a valid date
- must not be in the future

### Emergency Contact
- required
- trimmed
- reasonable length

### Notes
- optional
- cap length to prevent absurd input

## Booking

### Session
- required
- must exist
- must not be full
- must not be cancelled

### Child
- required
- must exist
- must belong to current parent in a real backend
- must be age eligible

## Client Validation vs Domain Validation

UI validation improves UX.

Domain/service validation still must protect the actual operation.

Do not assume disabled buttons are sufficient business-rule enforcement.

## Error Copy

Prefer:
- `Choose a session to continue.`
- `Choose a child to continue.`
- `This activity is for ages 5–8.`
- `That session is now full. Choose another time.`

Avoid:
- `Invalid request`
- `Validation error`
- raw schema messages


---

<!-- FILE: docs/13-ERROR-EMPTY-LOADING-STATES.md -->

# 13 — Loading, Empty, Error, Disabled, and Success States

Every important screen should have intentional non-happy-path behavior.

## Global Principles

- Preserve user input after recoverable failure.
- Explain what happened.
- Offer a next action.
- Avoid blank screens.
- Do not show technical errors to users.

## Activities Loading
Show skeletons or lightweight loading state.

## Activities Empty
Title:
`No activities available right now`

Copy:
`Check back soon for new sessions.`

## Activity Error
Title:
`We couldn't load this activity`

Action:
`Try Again`

## Sessions Loading
Show placeholder session cards.

## No Sessions
Title:
`No sessions on this date`

Copy:
`Choose another day to see available times.`

## Full Session
Visible but disabled.

Label:
`Full`

## Child List Empty
Title:
`Add your first child`

Copy:
`Create a child profile to start booking activities.`

CTA:
`Add Child`

## Child Ineligible
Disable selection.

Helper:
`Ages 5–8 only`

## Booking Submission Loading
- disable confirm button
- show progress
- prevent repeated taps

## Session Became Full
Message:
`That session just filled up. Please choose another time.`

Action:
`Choose Another Session`

Preserve child choice when possible.

## Booking Failed
Title:
`We couldn't complete your booking`

Copy:
`Your selections are still here. Please try again.`

Action:
`Try Again`

## Booking Success
Title:
`You're booked!`

Never combine success and error messaging.

## Bookings Empty
Title:
`No upcoming bookings yet`

CTA:
`Browse Activities`

## Check-In Pass Error
If booking is invalid/unavailable:
`This check-in pass is unavailable.`

Provide back navigation.


---

<!-- FILE: docs/14-ACCESSIBILITY.md -->

# 14 — Accessibility

The trial should demonstrate accessibility awareness even if it is not a full certification exercise.

## Mobile

- Use readable text sizes.
- Ensure tap targets are comfortably large.
- Provide accessibility labels for icon-only buttons.
- Do not communicate status by color alone.
- Keep focus order logical.
- Avoid unnecessarily long animated transitions.
- Respect system text where practical.
- Use meaningful labels for forms.

## Web

- Semantic heading order.
- Buttons for actions, links for navigation.
- Form labels associated with fields.
- Alt text for meaningful images.
- Keyboard-accessible navigation and controls.
- Visible focus treatment.
- Sufficient contrast.
- No essential information conveyed only by hover.

## Booking States

Examples:
- Full session should include text `Full`, not just a disabled color.
- Selected session should have visual and programmatic indication.
- Error text should be associated with relevant form/control.

## Motion

Keep animation subtle.

Do not use motion that blocks task completion.


---

<!-- FILE: docs/15-SECURITY-PRIVACY.md -->

# 15 — Security and Privacy

This is a trial application, but basic engineering discipline still applies.

## Secrets

Never commit:
- API secrets
- private signing keys
- passwords
- production tokens
- Apple credentials
- Android keystore secrets

## Demo Data

Use fictional names and contact information.

Do not use real children's personal data.

## Child Information

Child data may include:
- name
- date of birth
- emergency contact
- optional allergy/notes

Treat these as sensitive product data in a real implementation.

For the trial:
- keep data fictional
- avoid exposing it in logs
- do not send it to unnecessary third parties

## Authentication

Demo authentication is allowed.

Do not claim mocked authentication is production security.

## Backend Future Requirements

A production version would require:
- authenticated authorization
- parent ownership checks
- secure data storage
- audit controls where appropriate
- privacy policy
- deletion/account controls
- secure transport
- server-side validation

## QR Code

Trial QR codes are visual/demo artifacts.

Do not embed sensitive child medical notes in the QR payload.

## Logging

Avoid logging:
- full child profile
- credentials
- secrets
- private notes


---

<!-- FILE: docs/16-TESTING.md -->

# 16 — Testing Strategy

## Testing Objective

Prove the demo was verified, not merely generated.

## Test Pyramid for Trial

Prioritize:
1. critical domain logic tests
2. critical component/form tests where practical
3. end-to-end/manual primary flow
4. release build smoke test

Do not spend the entire trial building a large test suite.

## Unit Tests — High Value

Test:
- age calculation
- child eligibility
- available slot calculation
- full-session logic
- booking reference generation if deterministic
- booking classification as upcoming/past

## Form Tests

Useful:
- add child required fields
- invalid future birth date
- booking continue disabled until selection

## Mobile Manual Flow

### Primary
- app opens
- demo user enters
- home loads
- activities load
- activity detail opens
- available session selectable
- full session disabled
- Emma selectable
- Lucas ineligible for ages 5–8
- review values correct
- confirm only submits once
- success shown
- booking appears in Upcoming
- QR pass opens

### Navigation
- back from child preserves session
- back from review preserves child
- success does not accidentally recreate booking

## Website Manual Tests

Widths:
- mobile
- tablet
- desktop

Verify:
- no horizontal overflow
- nav works
- hero readable
- sections ordered correctly
- CTAs work
- FAQ works if interactive
- images do not break layout

## Release Test

For APK:
- install fresh
- launch
- no dev server dependency
- complete main flow
- restart app
- verify acceptable persistence/reset behavior

For TestFlight:
- install through TestFlight
- launch
- complete main flow

## Quality Commands

Use repository's actual scripts.

Expected categories:
```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Do not invent passing output in documentation.

## Bug Severity

### Blocker
- app won't install/launch
- booking flow cannot complete
- website does not load

### High
- booking data incorrect
- session/child validation wrong
- confirmation shown without creation

### Medium
- visual issue affecting usability
- broken non-core navigation

### Low
- minor spacing/copy polish


---

<!-- FILE: docs/17-ACCEPTANCE-CRITERIA.md -->

# 17 — Acceptance Criteria

Use this as the practical Definition of Done for the trial.

## A. Mobile Release

- [ ] Installable APK or accessible TestFlight build exists.
- [ ] App launches without requiring a local dev server.
- [ ] App name/branding shows PlayNest.
- [ ] No blocker crash exists in primary flow.

## B. Demo Access

- [ ] Reviewer can enter with `Continue as Demo User` or equivalent.
- [ ] No real credential setup is required for core demo.

## C. Home

- [ ] Greeting/identity is visible.
- [ ] Featured or available activities are visible.
- [ ] Reviewer can navigate to Activities.
- [ ] Reviewer can navigate to Bookings.

## D. Activities

- [ ] At least four seeded activities exist.
- [ ] Activity cards show age and useful summary information.
- [ ] Activity details open.

## E. Activity Detail

- [ ] Name visible.
- [ ] Description visible.
- [ ] Age range visible.
- [ ] Duration visible.
- [ ] Price visible.
- [ ] Book Session CTA works.

## F. Schedule

- [ ] Date can be selected.
- [ ] Available sessions are visible.
- [ ] Full session remains visible.
- [ ] Full session cannot be selected.
- [ ] User cannot continue without a session.

## G. Child

- [ ] Emma and Lucas are seeded.
- [ ] Emma can be selected for Junior Gymnastics.
- [ ] Lucas is visibly ineligible for Junior Gymnastics.
- [ ] User cannot continue without an eligible child.

## H. Review

- [ ] Activity is correct.
- [ ] Child is correct.
- [ ] Date/time is correct.
- [ ] Price is correct.
- [ ] Confirm action is clear.

## I. Confirmation

- [ ] Confirmation appears only after successful creation.
- [ ] Booking reference exists.
- [ ] Summary is correct.
- [ ] Duplicate tap does not create obvious duplicate booking.

## J. Bookings

- [ ] New booking appears in Upcoming.
- [ ] Booking card shows useful details.
- [ ] Booking details open.

## K. Check-In Pass

- [ ] QR-style visual is displayed.
- [ ] Booking reference visible.
- [ ] Child/activity/schedule visible.
- [ ] Reception instruction visible.

## L. States

- [ ] At least core loading state handled.
- [ ] No-sessions state handled.
- [ ] Empty bookings state handled.
- [ ] Full session disabled.
- [ ] Booking failure has a recoverable UI path.

## M. Website

- [ ] Website is deployed.
- [ ] Responsive on mobile and desktop.
- [ ] Hero exists.
- [ ] Programs exist.
- [ ] Benefits exist.
- [ ] How It Works exists.
- [ ] Schedule exists.
- [ ] Pricing exists.
- [ ] FAQ exists.
- [ ] CTA exists.
- [ ] Branding matches mobile.

## N. Engineering

- [ ] No secrets committed.
- [ ] Business rules are not duplicated throughout screens.
- [ ] Mock data is isolated from screen markup.
- [ ] Typecheck passes.
- [ ] Lint passes.
- [ ] Relevant tests/checks run.
- [ ] README explains how to run/build.

## O. Documentation

- [ ] Architecture documented.
- [ ] AI workflow documented.
- [ ] Testing documented.
- [ ] Publishing documented.
- [ ] Demo walkthrough documented.


---

<!-- FILE: docs/18-APP-PUBLISHING.md -->

# 18 — App Publishing and Distribution

## Trial Requirement

The mobile app should be publishable as either:
- Apple TestFlight, or
- downloadable Android APK

For a 3-day trial, Android APK is usually the fastest demonstration path.

---

# Android

## APK

An APK is directly installable on Android devices.

Good for:
- evaluation
- QA
- direct trial distribution

## AAB

Android App Bundle is the standard upload format for Google Play.

Google Play generates optimized APKs from it.

## Key Android Concepts

- application/package ID
- version name
- version code
- signing
- keystore
- release profile
- APK vs AAB
- release smoke testing

## Expo/EAS Workflow

Conceptually:

1. Configure Expo project.
2. Configure Android package ID.
3. Configure EAS build.
4. Build preview APK or production artifact.
5. Download/install.
6. Run fresh-install smoke test.

Example package:
`com.playnest.demo`

Do not use another company's production identifier.

## APK Checklist

- app name correct
- icon correct
- splash correct
- package ID correct
- version correct
- no development server required
- no fatal startup error
- main booking flow works after fresh install

---

# iOS / TestFlight

## Key Concepts

- Apple Developer Program
- Bundle Identifier
- certificates/signing
- provisioning
- App Store Connect
- version/build number
- internal testers
- external testers
- Beta App Review

## Typical Flow

1. Create/configure app in App Store Connect.
2. Configure bundle identifier.
3. Build signed iOS release.
4. Upload build.
5. Wait for processing.
6. Enable build under TestFlight.
7. Add internal testers, or configure external testing.
8. Test installed build.

## Internal Testing

Usually used for App Store Connect team members.

## External Testing

Used for outside testers and may require Beta App Review.

## Production App Store Awareness

A production release may additionally require:
- screenshots
- description
- category
- support URL
- privacy policy URL
- age rating
- app privacy declarations
- export compliance responses
- review contact/instructions
- account deletion behavior where applicable

The trial does not need to complete a public App Store release unless specifically requested.

---

# Submission Evidence

Recommended evaluator package:
- APK/TestFlight access
- website URL
- screenshots
- release notes
- short publishing explanation
- `DEMO.md`


---

<!-- FILE: docs/19-AI-WORKFLOW.md -->

# 19 — AI-Assisted Engineering Workflow

## Goal

Use Claude or other coding agents to increase speed while keeping engineering accountability with the developer.

## Core Principle

**AI generates suggestions and implementation; the developer owns correctness.**

## Good Uses of AI

- requirement decomposition
- implementation planning
- scaffolding
- repetitive component work
- refactoring suggestions
- test generation
- debugging hypotheses
- documentation
- code review assistance

## Bad Uses

- "Build the whole app" with no context
- blindly accepting generated dependencies
- skipping tests because code looks plausible
- allowing AI to invent business rules
- allowing AI to redesign established UI arbitrarily
- claiming a feature works without running it

## Context Strategy

### Stable Context
Agents should know:
- product
- architecture
- design
- rules

Use:
- `CLAUDE.md`
- PRD
- Product
- Design System
- Architecture

### Task Context
For a booking task, also read:
- User Flows
- Screen Specs
- Business Rules
- Validation
- Acceptance Criteria

## Recommended Agent Loop

1. Read.
2. Inspect.
3. Plan.
4. Implement.
5. Verify.
6. Review diff.
7. Report.

## Prompt Shape

A strong task prompt includes:

### Goal
What user-visible outcome is required?

### Context
Which product docs apply?

### Constraints
What must not change?

### Acceptance
What proves completion?

### Verification
What commands and flows must be run?

Example:

> Implement the PlayNest session selection step. Read `docs/04-USER-FLOWS.md`, `docs/07-SCREEN-SPECS.md`, `docs/11-BUSINESS-RULES.md`, and `docs/17-ACCEPTANCE-CRITERIA.md`. Keep full sessions visible but disabled. The Continue action must remain disabled until one available session is selected. Preserve selected activity context. Reuse existing components before adding new ones. Run typecheck and relevant tests, then report verification.

## Review Checklist for AI Output

Check:
- Does it match the docs?
- Did it introduce a new dependency?
- Did it duplicate a component?
- Did it hardcode domain logic inside JSX?
- Did it silently invent data?
- Are error states missing?
- Are loading states missing?
- Are types weakened?
- Are secrets exposed?
- Did it change unrelated code?
- Does it actually run?

## Team Mentoring Story

The developer can teach a team to:

- create stable repository instructions
- write task-specific acceptance criteria
- provide controlled context
- keep AI tasks small
- verify every generated change
- review diffs rather than trusting output
- capture repeated practices as documentation

This demonstrates AI fluency as an engineering process, not just prompt usage.


---

<!-- FILE: docs/20-DEMO.md -->

# 20 — Evaluator Demo Guide

## Demo Goal

Show product thinking, polish, technical quality, AI workflow, and publishing knowledge in a short presentation.

## Demo Persona

Sarah  
Children:
- Emma, 5
- Lucas, 3

## Recommended Mobile Walkthrough

### 1. Launch
Open PlayNest installed build.

### 2. Demo Access
Tap:
`Continue as Demo User`

### 3. Home
Briefly show:
- brand
- activities
- quick navigation

### 4. Activities
Open:
`Junior Gymnastics`

### 5. Activity Details
Point out:
- ages 5–8
- 45 minutes
- ₱450
- activity description

Tap:
`Book Session`

### 6. Schedule
Choose:
`September 7 — 2:00 PM`

Point out one full session stays visible but disabled.

### 7. Child
Show:
- Emma selectable
- Lucas disabled because he is below the age range

Choose Emma.

### 8. Review
Show:
- activity
- child
- time
- price

Tap:
`Confirm Booking`

### 9. Confirmation
Show:
- success state
- reference
- next actions

### 10. Bookings
Open My Bookings.

Show newly created booking.

### 11. Check-In Pass
Open QR-style pass.

Explain that server-side scanning is intentionally outside trial scope.

---

## Website Walkthrough

Show:
1. Hero
2. Programs
3. Benefits
4. How It Works
5. Schedule
6. Pricing
7. FAQ
8. CTA

Emphasize shared brand with mobile.

---

## Engineering Talking Points

### Scope
"I prioritized the highest-value parent journey rather than spreading the trial across unfinished features."

### Architecture
"The trial uses a service/repository boundary so mock data can later be replaced with a backend without rewriting screens."

### Business Logic
"Age eligibility and session availability live outside presentation components."

### AI
"I used AI for implementation acceleration, but controlled it through repository context, small tasks, type checking, tests, and manual verification."

### Publishing
"The Android build is directly installable, and the publishing documentation also covers the TestFlight workflow."

---

## Suggested Closing

> I focused on making one realistic booking journey complete and presentation-ready: discover an activity, choose a session, select an eligible child, confirm the booking, and access a check-in pass. The non-essential production infrastructure is intentionally documented but left outside the three-day implementation scope so the trial can demonstrate product judgment, code quality, verification, and mobile distribution.


---

<!-- FILE: docs/21-OUT-OF-SCOPE.md -->

# 21 — Out of Scope

This file prevents coding agents from expanding the trial unnecessarily.

Do not implement unless explicitly requested.

## Payments
- Stripe
- PayMongo
- GCash
- card collection
- refunds
- invoices

## Staff/Admin
- admin dashboard
- employee accounts
- attendance operations
- staff scheduling
- instructor management

## Production QR
- scanner app
- cryptographic token validation
- backend check-in event service

## Complex Memberships
- recurring billing
- usage credits
- pause/freeze
- family plans
- plan migrations

## Multi-Location
- branch selection
- location-specific pricing
- location-specific inventory

## Notifications
- APNs/FCM setup
- production push delivery
- email infrastructure

## Advanced Product
- waitlist
- referral program
- loyalty points
- reviews
- chat
- social features
- calendar sync

## Enterprise
- multi-tenancy
- audit portal
- SSO
- role matrix
- advanced reporting

## Website
- web checkout
- CMS
- customer account portal
- SEO content engine

Agents should not add these because they "seem useful."


---

<!-- FILE: docs/22-FUTURE-ROADMAP.md -->

# 22 — Future Roadmap

This roadmap demonstrates product awareness. It is not part of the trial commitment.

## Phase 1 — Trial Slice
- activities
- schedules
- child selection
- booking
- check-in pass
- marketing website

## Phase 2 — Production Booking
- real authentication
- backend persistence
- venue capacity enforcement
- cancellation rules
- transactional notifications
- real admin operations

## Phase 3 — Payments and Membership
- online payment
- passes
- memberships
- discounts
- invoices/receipts

## Phase 4 — Operations
- staff check-in
- attendance
- session management
- waitlists
- customer support tools

## Phase 5 — Growth
- multiple locations
- birthday parties/events
- referral/loyalty
- analytics
- personalized recommendations

Roadmap items must not leak into trial scope without explicit approval.


---

<!-- FILE: docs/23-NON-FUNCTIONAL-REQUIREMENTS.md -->

# 23 — Non-Functional Requirements

## Reliability

- Core demo flow must not crash.
- Booking action should not create obvious duplicates.
- Failure states should preserve recoverable selections.

## Performance

Trial targets:
- local/mock content should feel immediate
- avoid unnecessary large dependencies
- images should be reasonably optimized
- website should not feel blocked by heavy client JavaScript

## Maintainability

- domain types centralized
- business logic not duplicated
- reusable product components
- clear file names
- no giant screen files when avoidable
- no premature enterprise abstraction

## Portability

Mock services should be replaceable with backend services later.

## Security

- no committed secrets
- no real child personal data
- release configuration kept separate from source secrets

## Accessibility

Follow `14-ACCESSIBILITY.md`.

## Responsiveness

Website must support:
- common phone width
- tablet
- desktop

## Offline

No formal offline support required.

The APK should still demonstrate mock data without needing a local development server.

## Observability

No production monitoring stack required.

Basic development error visibility is sufficient.


---

<!-- FILE: docs/24-CONTENT-SEED.md -->

# 24 — Seed Content

Use this content so screens remain consistent across AI-generated work.

## Brand

Name:
**PlayNest**

Tagline:
**Play. Learn. Grow.**

Website headline:
**Where Kids Play, Learn & Grow**

Website subheading:
**Fun, active, and engaging experiences designed for growing kids.**

Location:
**PlayNest Activity Center**

## Demo Parent

Name:
Sarah

Email:
sarah@example.test

Phone:
+63 917 000 0000

## Children

### Emma
- First name: Emma
- Last name: Reyes
- Date of birth: 2021-04-12
- Trial age context: 5

### Lucas
- First name: Lucas
- Last name: Reyes
- Date of birth: 2023-03-08
- Trial age context: 3

Use dynamic age calculation in code; the trial age context above explains intended demo behavior.

## Activities

### Toddler Time
ID: `act_toddler_time`  
Ages: 1–3  
Duration: 45 minutes  
Price: ₱350  
Instructor: Coach Mia

Short:
Gentle movement and guided play for little explorers.

Description:
A calm, playful session designed for toddlers to explore movement, balance, and social play in a safe environment.

### Little Explorers
ID: `act_little_explorers`  
Ages: 3–5  
Duration: 45 minutes  
Price: ₱400  
Instructor: Coach Anna

Short:
Movement, balance, coordination, and playful challenges.

Description:
A guided activity class that helps young children build confidence, balance, coordination, and body awareness through age-appropriate play.

### Junior Gymnastics
ID: `act_junior_gymnastics`  
Ages: 5–8  
Duration: 45 minutes  
Price: ₱450  
Instructor: Coach Alex

Short:
A fun introduction to gymnastics fundamentals.

Description:
An energetic beginner-friendly session covering basic gymnastics movement, coordination, strength, and confidence.

### Open Play
ID: `act_open_play`  
Ages: 2–10  
Duration: 90 minutes  
Price: ₱300  
Instructor: PlayNest Team

Short:
Flexible supervised play in the PlayNest activity space.

Description:
A relaxed open-play session where children can explore the activity space at their own pace.

## Example Junior Gymnastics Sessions

For demo presentation, create a date with:

- 9:00 AM — 5 slots left
- 11:00 AM — 2 slots left
- 2:00 PM — Available
- 4:00 PM — Full

The exact real calendar date may be adjusted to keep demo dates future-facing.

## Pricing Website

### Single Session
₱450  
Perfect for occasional visits.

### 5-Visit Pass
₱1,800  
Best for regular visitors.

### Monthly Membership
₱1,499/month  
For families who visit regularly.

Prices are fictional demo content.

## Benefits

### Safe Environment
A child-friendly space designed with safety in mind.

### Active Learning
Activities encourage movement, creativity, and confidence.

### Small Groups
Sessions are designed around meaningful interaction.

### Easy Booking
Reserve activities from your phone in just a few taps.

## FAQ

### What age groups do you accept?
Our demo programs are designed for children approximately 1–10 years old.

### Do I need to book in advance?
Booking is recommended because some sessions have limited capacity.

### Can I cancel my booking?
Bookings can be managed from the app. Trial cancellation behavior may be simplified.

### Do parents need to stay?
Requirements may vary by program and age. For this demo, contact the activity center for program-specific policies.


---

<!-- FILE: docs/25-IMPLEMENTATION-PLAN.md -->

# 25 — Three-Day Implementation Plan

This is a scope guide, not a rigid hour-by-hour commitment.

## Day 1 — Foundation + Product Shape

### Mobile
- initialize/configure app
- navigation
- theme/design primitives
- seeded data/services
- demo access
- Home
- Activities
- Activity Details

### Web
- project foundation
- shared brand direction
- hero
- programs

### Engineering
- domain types
- basic service interfaces
- lint/typecheck setup

### Day 1 Exit
Reviewer can open the app and understand the product.

---

## Day 2 — Complete Core Booking Journey

### Mobile
- schedule selection
- full state
- child selection
- age eligibility
- add child if time permits
- review
- booking creation
- confirmation
- My Bookings
- Booking Details
- QR Check-In

### Web
- benefits
- how it works
- schedule
- pricing
- FAQ
- CTA

### Tests
- domain rules
- critical booking behavior

### Day 2 Exit
Primary journey works end-to-end in development.

---

## Day 3 — Release Quality

### Mobile
- polish
- accessibility pass
- empty/error/loading states
- release icon/splash
- APK/TestFlight build
- fresh-install testing

### Web
- responsive polish
- deploy
- link/CTA verification

### Documentation
- verify README
- update demo instructions
- confirm publishing notes
- record actual test commands/results

### Submission
- APK/TestFlight
- website URL
- screenshots
- repository/docs as required

### Day 3 Exit
Presentation-ready deliverable.


---

<!-- FILE: docs/26-DEFINITION-OF-DONE.md -->

# 26 — Definition of Done

A feature is not done because the main UI renders.

For trial features, Done means:

## Product
- behavior matches PRD
- business rules match documentation
- copy uses PlayNest terminology

## UX
- normal state works
- disabled state works where applicable
- loading state handled where meaningful
- empty state handled where meaningful
- recoverable error has useful action

## Engineering
- types are appropriate
- no new unexplained dependency
- business logic placed correctly
- no secrets
- no obvious duplication

## Validation
- relevant tests pass
- typecheck passes
- lint passes
- affected flow manually verified

## Release
If feature is part of P0:
- works in release build, not only dev mode

## Documentation
If implementation intentionally differs from spec:
- difference is documented
- reason is explicit

Do not mark a feature done while known blocker/high-severity defects remain.


---

<!-- FILE: docs/GLOSSARY.md -->

# Glossary

## Activity
A type of children's program, such as Junior Gymnastics.

## Session
A scheduled occurrence of an activity at a specific date/time.

## Child
A child profile owned/managed by a parent or guardian.

## Booking
A reservation connecting one parent, one child, and one session.

## Booking Reference
A human-readable identifier shown to the customer.

## Check-In Pass
A screen containing booking context and a QR-style visual for reception.

## Full
A session with no remaining capacity.

## Eligible
A child whose age satisfies the selected activity's age range.

## P0
Required trial scope.

## P1
Optional improvement only after P0 is complete.

## Demo User
A deterministic fictional account used by the evaluator without real registration.

## Mock Service
A local implementation of a service contract that behaves like a backend boundary but uses seeded/local data.

## Release Build
An installable app build that does not depend on the local development server.


---

<!-- FILE: docs/AI-CONTEXT-STARTER.md -->

# AI Context Starter

Use this file as the first task prompt companion for coding agents.

## Product
PlayNest is a parent-facing children's gym/activity booking app with a matching marketing website.

## Primary Demo
Sarah books Junior Gymnastics for Emma.

## Core Flow
Home → Activities → Activity Details → Schedule → Child → Review → Confirmation → Bookings → Check-In Pass

## Required Scope
- mobile demo
- website
- installable APK or TestFlight
- polished UX
- documented AI workflow
- documented publishing knowledge

## Implementation Default
Mobile:
- React Native + Expo + Expo Router + TypeScript

Web:
- Next.js + TypeScript + Tailwind

Data:
- deterministic local/mock service layer

## Important Rules
- full sessions visible but disabled
- one child per booking
- child must meet activity age range
- confirmation only after booking creation succeeds
- no real payment
- no admin dashboard
- no production QR scanner
- no unnecessary backend

## Before implementing a feature
Read its relevant detailed documents.

## Before completing
Run lint, typecheck, tests, and manually verify the affected flow.
