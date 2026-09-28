# Design system — Taxiverz

Written in Phase 1 (2026-09-28). `CLAUDE.md` has **DESIGN REFERENCE: none** (OWNER_TODO A3), so this follows the default direction in `REBUILD_PLAN.md §6`: **premium regional operator**. It should look like a real, well-run company with real cars — not an aggregator, not a template.

Tokens live in one place: `@theme` in `src/app/globals.css`. No hex values anywhere else.

---

## 1. Principles

1. **The fare is the hero.** On every commercial page the fare widget is the visual centre of gravity (arrives in Phase 3). Until then the primary action is Call / WhatsApp.
2. **Built from what the brand owns.** The orange car and charcoal wordmark of the existing logo, sampled directly: orange `#F45C0C`, charcoal `#242123`.
3. **One accent.** Brand orange is for the primary action only. Links use a darker orange that passes contrast. Everything else is ink on white and cool grey.
4. **Specific, not decorative.** Real facts, real photos, real distances. No illustration of things we can't show yet.
5. **Two registers.** Standard (bright, price-forward, bookable) and luxury (dark, quiet, "Enquire").
6. **Cheap phones first.** 360px width, patchy 4G, thumbs. System fallbacks look fine while web fonts load.

## 2. Colour tokens

| Token | Hex | Use | Contrast |
|---|---|---|---|
| `ink` | `#1C1B1D` | Text, headings, icons, dark UI | 17.2:1 on white |
| `muted` | `#5B6270` | Secondary text | 6.1:1 on white, 5.6:1 on `mist` |
| `line` | `#E3E5EA` | Borders, dividers | decorative |
| `mist` | `#F3F4F6` | Alternate section background, inputs | — |
| `paper` | `#FFFFFF` | Page background | — |
| `brand` | `#F45C0C` | Primary button fill, focus ring, milestone accents — **always with `ink` text** | ink on brand 5.2:1 (white on brand 3.3:1 fails, never used) |
| `brand-deep` | `#C2410C` | Links and orange text on light backgrounds | 5.2:1 on white, 4.7:1 on `mist` |
| `whatsapp` | `#25D366` | WhatsApp button fill with `ink` text | 8.7:1 |
| `nh-yellow` | `#FFD400` | Milestone cap only | ink on it 12:1 |
| `night` | `#0E0F11` | Luxury register background | — |
| `ivory` | `#F4F1EA` | Luxury register text | 17.0:1 on night |
| `champagne` | `#C8A96A` | Luxury hairlines and small accent text | 8.5:1 on night |
| `night-muted` | `#A8A39A` | Luxury secondary text | 7.6:1 on night |

Four core colours carry the standard register: **ink, paper, mist, brand**. The rest are functional.

## 3. Typography

Two families:

- **Body and UI — Mukta** (400/500/600/700). Latin and Devanagari in one family, so Hindi place names sit naturally next to English. Reads well at 16px on low-DPI screens.
- **Headings — Anek Latin** (variable 400–800, width axis).

**Heading choice: Anek Latin over Overpass** — to be confirmed on `/styleguide/`, where both are set side by side (H1–H3, a long route heading, a milestone) at 360px and 1280px. The result is recorded in §11.
- Overpass is drawn from US highway signage; it risks reading as a generic road sign.
- Anek Latin is Indian-designed, and its narrower widths should keep long route headings ("Gorakhpur to Muktinath taxi") compact at 360px.
- Anek has a Devanagari sibling (Anek Devanagari) for the later `/hi/` version.

**Scale** (fluid, `clamp()`, min at 360px → max at 1280px):

| Style | Size | Line height | Weight / family |
|---|---|---|---|
| Display (home H1 only) | 2.25rem → 3.5rem | 1.05 | Anek 750, width 90 |
| H1 | 2rem → 2.75rem | 1.1 | Anek 700 |
| H2 | 1.5rem → 2rem | 1.15 | Anek 700 |
| H3 | 1.2rem → 1.4rem | 1.25 | Anek 650 |
| Body | 1rem (16px) → 1.0625rem | 1.6 | Mukta 400 |
| Small | 0.875rem | 1.5 | Mukta 500 |
| Price | inherits | — | Mukta 700, `tabular-nums` |

Sentence case everywhere. No all-caps labels.

## 4. Space, layout, shape

- **Spacing:** 4px base — 1, 2, 3, 4, 6, 8, 12, 16, 24 (× 0.25rem). Sections: 3rem on mobile, 5rem on desktop.
- **Container:** max 1200px (`75rem`); side padding 1rem, 1.5rem ≥ 768px. Content left-aligned; hierarchy through size and space, not boxes.
- **Radius:** 6px for controls, 10px for panels. Not everything is a rounded card.
- **Elevation:** one shadow (`0 1px 2px` + `0 8px 24px` at low opacity), used for the fare widget and the mobile sheet only. Everything else uses a 1px `line` border or nothing.
- **Tap targets:** at least 48 × 48px.
- **Breakpoints:** 480 / 768 / 1024 / 1280.

## 5. The two registers

| | Standard | Luxury (luxury, wedding, shoots, helicopter) |
|---|---|---|
| Background | paper / mist | night |
| Text | ink / muted | ivory / night-muted |
| Accent | brand fill for the one primary action | champagne hairlines; primary action is an outlined ivory "Enquire" |
| Price | total fare, prominent | never per-km; a package or "from" price only when verified, otherwise none |
| Copy | practical, specific | fewer words, larger real photography |
| CTA | "Check fare", "Book on WhatsApp", "Call to book" | "Enquire", "Enquire on WhatsApp" |

## 6. Signature element — the highway milestone

Route cards and route-page distance badges are drawn as the Indian roadside milestone: a white stone with a coloured cap, the destination in Devanagari and English, and the distance in km. Only for routes and distances; never as decoration.

**Cap colour: NH yellow, not brand orange.**
- The yellow cap means "national highway" to every Indian traveller. That instant recognition is the point of the element.
- An orange cap would dilute the one-accent rule, since orange means "press here" on this site.
- Both caps are shown on `/styleguide/`; the check is recorded in §11.

Specs:
- The stone is an SVG shape (rounded top), 1px `line` border, subtle inner shade.
- Text, top to bottom:
  - destination in Devanagari (Mukta 600)
  - destination in English (Anek 700)
  - distance: number in Anek 800, `tabular-nums`, followed by "km"
- Sizes: `sm` (route card, ~88px wide) and `lg` (route page, ~132px).
- Accessibility: the SVG is `aria-hidden`; the component renders a visually hidden sentence ("Kathmandu, 370 km").
- Unknown distance (`null`): the component shows the destination only and no number — never a placeholder.

## 7. Components (inventory)

**Phase 1 (built):**
- Primitives: `Button` (primary, secondary, whatsapp, call, ghost; `lg` and `md`; renders `<a>` or `<button>`), `Price` (₹ with Indian grouping, `tabular-nums`, "Get a quote" when null), `Badge`, `Container`, `Section` (standard or luxury register), `Milestone`, visually-hidden text.
- Layout: `SkipLink`, `Header`, `MobileNav` (Radix Dialog sheet), `Footer` (both branches), `StickyActionBar` (Call · WhatsApp · Book, safe-area padded), `Breadcrumbs` (with BreadcrumbList JSON-LD).
- SEO: `JsonLd`.

Navigation and footer lists render **only links to published pages**. In Phase 1 that means the home page alone, so there is no nav menu yet — the header carries the logo, Call and WhatsApp. "Book" appears in the header and the sticky bar only once `/book/` exists (Phase 3).

**Later phases:**
- Phase 3: `FareWidget`, `PlaceCombobox`, `TripTabs`, `VehicleClassCard`, `TripDetails`, `ContactAndClose`.
- Phase 4: section components and cards.

## 8. Wireframes

### Home — mobile (360px)
```
┌──────────────────────────────┐
│ [logo]            [☎] [WA]   │  header, sticky, 56px
├──────────────────────────────┤
│ H1 Taxi service in Gorakhpur,│
│    across India and into     │
│    Nepal                     │
│ Intro: who we are, where the │
│ offices are                  │
│ ┌──────────────────────────┐ │
│ │ FARE WIDGET (Phase 3)    │ │  until then: [Call] [WhatsApp]
│ └──────────────────────────┘ │
│ Trust line (verified only)   │
├──────────────────────────────┤
│ Services (Phase 4)           │
│ Fleet tiers →→ scroll-snap   │
│ Popular routes: milestones   │
│ ▓▓ Nepal band (night) ▓▓▓▓▓▓ │
│ ▓▓ Luxury & wedding ▓▓▓▓▓▓▓▓ │
│ How booking works 1-2-3      │
│ Offices: Gorakhpur · Pune    │
│ FAQ                          │
│ Footer                       │
├──────────────────────────────┤
│ [ ☎ Call ][ WhatsApp ][Book] │  sticky bar + safe-area inset
└──────────────────────────────┘
```

### Home — desktop (1280px)
```
┌──────────────────────────────────────────────────────────────┐
│ [logo]   Cabs  Nepal  Luxury  Fleet  Routes   ☎ 85760 00083 [WA] [Check fare] │
├──────────────────────────────────────────────────────────────┤
│ H1 (display) left, 7 cols          │  real vehicle photo      │
│ intro                              │  (Phase 4)               │
│ ┌──────────── FARE WIDGET overlapping the hero edge ───────┐ │
│ └──────────────────────────────────────────────────────────┘ │
│ … sections as mobile, 2–4 column grids where content allows  │
└──────────────────────────────────────────────────────────────┘
```

### Route — mobile
```
│ Breadcrumbs: Home › Cabs › Gorakhpur › Gorakhpur to Kathmandu│
│ H1 Gorakhpur to Kathmandu taxi                               │
│ [Milestone lg: काठमांडू / Kathmandu / N km]  time · via    │
│ FARE WIDGET (pre-filled)                                     │
│ Fare table: class rows, one way | round trip, incl./excl.   │
│ Route facts card · Route guide · Stops                       │
│ ▓ Nepal block (night) — verified content only ▓              │
│ FAQs · Related routes (milestones) · CTA band (3 closes)     │
```

### Vehicle — mobile
```
│ Breadcrumbs › Fleet › Innova Crysta                          │
│ H1 Innova Crysta on rent in Gorakhpur                        │
│ Gallery (real photos, swipe)                                 │
│ Class line: "Priced as MPV — Innova Crysta or similar"      │
│ FARE WIDGET with the class pre-selected                      │
│ Price table (class rates) · specs · good for · FAQs          │
│ Luxury models: night register, "Enquire", no per-km         │
```

## 9. Motion

- **One orchestrated moment:** on first load of the home page, the hero heading and the widget rise 8px and fade in over 240ms, staggered 60ms.
- **Otherwise, motion answers the user:** the sheet slides in (200ms), tabs switch, the fare figure cross-fades when it changes, step changes slide.
- `prefers-reduced-motion: reduce` turns all of it off.
- Nothing animates on scroll.

## 10. Self-review against the template tells (`CLAUDE.md`)

| Tell | Status | What changed |
|---|---|---|
| ALL-CAPS eyebrow labels | Avoided | No eyebrow over headings; the H1 carries the place names itself. |
| Dot-joined meta strings | Avoided | Route facts under the H1 are a small definition list (Time / Via / Tolls), not a "7 h · via … · 2 tolls" string — better for screen readers too. (The mobile wireframe above keeps "time · via" only as sketch shorthand.) |
| "→" on every button | Avoided | Buttons say what happens ("Call to book"); icons only where they carry meaning (phone, WhatsApp). |
| Identical rounded cards with the same soft shadow | Avoided | One shadow, used by the widget and the sheet only. Lists and tables are open layouts with rules, not card grids. Route cards are milestones, not boxes. |
| Gradient washes | Avoided | Flat colour. The legacy site's gradient headers are not carried over. |
| Emoji icons | Avoided | lucide-react icons only; the legacy 📞 is gone. |
| Cream + serif + terracotta | Avoided | Cool greys and white; no serif; orange is the brand's own, used sparingly. |

Also checked:
- WhatsApp green is used only on the WhatsApp button.
- Orange never carries white text.
- Focus rings are 3px brand orange with a 2px offset, visible on every surface, the luxury register included.

## 11. Style-guide review

Reviewed on 2026-09-28 from full-page screenshots of `/styleguide/` (dev server) and the production home page at 360px and 1280px (Chrome, via Playwright). No horizontal scroll at either width; no console errors on production pages.

- **Headings — Anek Latin confirmed.** At 1280px Anek keeps "Gorakhpur to Muktinath taxi" on one line where Overpass needs two. At 360px both take two lines, so width alone doesn't decide it at mobile size. Overpass also reads as generic signage beside Mukta. The decision rests on the tighter desktop fit, the better pairing with Mukta, and the Devanagari sibling for `/hi/`.
- **Milestone cap — NH yellow confirmed.** Side by side, the orange cap reads as a warning or a button (it's the same orange as "Check fare"), while the yellow cap reads as a road sign. Fixed during review: in the first build the English name sat on the edge of the cap; text rows are now placed at fixed heights inside the stone. A `null` distance shows the name only.
- **Logo.** The logo image had an off-white (`#FDFDFD`) background that showed as a faint box on the white header. Only the background was made transparent; the logo itself is unchanged.
- **Header at 360px.** The WhatsApp button showed in the header on mobile, duplicating the sticky bar — `Button`'s own `inline-flex` beat the `hidden` passed to it. The display class now lives on a wrapper; the header shows logo only on mobile, and logo, phone and WhatsApp from 640px up.
- **Home page.** An "Our offices" block repeated the footer's addresses word for word; removed. Until the fare widget exists (Phase 3), the home page is the hero (H1, intro, Call, WhatsApp), and the footer carries both branches.
- **Contrast.** Orange buttons carry ink text (5.2:1). Muted text on mist is 5.6:1. Champagne and ivory on night are 8.5:1 and 17:1.
