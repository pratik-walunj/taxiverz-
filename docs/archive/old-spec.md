# Taxiverz — Project Specification

> This file is persistent context for Claude Code. Read it before every task.
> It encodes decisions already made. Do not re-litigate them; if something here
> is genuinely wrong, say so and stop rather than silently deviating.

---

## 1. What we are building

A production cab and travel platform for **Taxiverz** — a real, owner-operated cab and
travel business based in **Gorakhpur, Uttar Pradesh**, with a branch in **Pune**, running
cabs across eastern UP/Bihar and **road journeys into Nepal**.

Not an aggregator. Not a marketplace. A real operator with its own fleet, its own
chauffeurs and its own offices.

### Positioning

> **Gorakhpur's own cab and travel company. All-inclusive fares. India and Nepal.**

Three claims, each defensible:
1. **Local and real** — actual offices, actual fleet, actual chauffeurs
2. **All-inclusive pricing** — fuel, tolls, driver allowance, permits quoted upfront
3. **Nepal expertise** — not border drops; door-to-door into Kathmandu, Pokhara,
   Lumbini, Chitwan, Muktinath, from Gorakhpur and Raxaul

### The three moats (every feature should reinforce at least one)

| Moat | Why it holds |
|---|---|
| **Nepal cross-border travel** | The primary competitor sells border *drops* (Sonauli, Rupaidiha). Taxiverz runs *inside* Nepal. Permits, border formalities, Nepali-speaking chauffeurs, multi-day itineraries. |
| **Luxury + wedding fleet** | BMW, Audi, Mercedes, Jaguar, vintage — in a regional market where the main competitor has essentially one luxury page. |
| **Local operator credibility** | Physical addresses, named chauffeurs, photographed cars. A platform cannot copy this. |

---

## 2. Design source of truth — the four prototypes

Four prototypes already exist. **We are not picking one. We are combining them in a
specific, decided way.**

| Prototype | URL | Role in the real build |
|---|---|---|
| **Demo IV** | demo-iv.vercel.app | **Primary base.** Visual system, brand tone, and the whole content architecture: destinations, journeys, packages, route pages with stop-by-stop itineraries, blog. |
| **Demo III** | demo-iii.vercel.app | **Conversion core.** The `/search?trip=&from=&to=` fare architecture, the vehicle-*class* model, and the honest labelling discipline. |
| **Demo II** | demo-ii.vercel.app | **Component library.** Fleet cards, category filter chips, sticky mobile action bar, FAQ accordion, dark treatment for luxury surfaces. |
| **Demo I** | taxiverz-mockup.vercel.app | **Copy tone + the corporate quote modal.** Editorial, calm, specific. |

**Why this combination:** Demo IV is the only prototype that treats Nepal as a *product*
(journeys, itineraries, packages) rather than a route list — that is the moat expressed as
architecture. Demo III is the only one with a real search/fare URL contract — that is the
conversion wedge. Together they give a premium editorial surface over a commercial engine,
which is exactly the model that works in this category.

### Visual system (from Demo IV, tightened)

- **Base palette:** deep navy `#102A43` as the brand anchor, warm off-white surfaces,
  charcoal text. **One** accent for primary CTAs — warm amber/gold.
- **Luxury + wedding surfaces** shift to a darker, quieter register (Demo II's dark
  treatment): less copy, larger imagery, "Enquire" instead of "Book Now", no per-km rate
  on the card.
- **Everything else stays bright, priced and instantly bookable.** Roughly 80% clean and
  accessible, 20% premium.
- **Typography:** two families maximum. Confident sans for headings with real weight
  contrast; highly readable sans for body. **Prices in tabular figures** so fare cards
  align.
- **Cards:** generous padding, subtle border, soft shadow, one clear price, one clear
  action, never more than four facts.
- **Animation:** restrained. Fade-and-rise on scroll, hover lift on cards, 200–300ms.
  No parallax, no auto-advancing carousels, **no animated stat counters.**

---

## 3. Hard rules (violating these is a build failure)

These come from a competitor audit of nine sites. Each rule exists because a real
competitor is losing money on it right now.

### Content honesty

1. **No fabricated reviews. Ever.** The current taxiverz.com has three placeholder
   testimonials ("Rahul Sharma", "Priya Patel", "Amit Kumar") and they read as fake.
   The prototypes are all correctly labelled as demo content. In production, the reviews
   component renders **real reviews only** — or renders nothing. Build it to accept an
   empty state gracefully.
2. **No invented statistics.** No "500+ cities", no trip counters, no ratings until
   there is real operational data behind them. Demo IV gets this right and says so
   explicitly. Follow it.
3. **No placeholder prices in production.** The current site ships `Price: ...`,
   `₹--/km` and `... INR onwards`. A vehicle or route with no price must not render a
   price field at all. Add a build-time check that fails on `--`, `...`, `₹--`, `TBD`.
4. **No placeholder anything in production.** The current site's canonical tag still says
   `https://yourwebsite.com`. Add a build-time check for `yourwebsite`, `example.com`,
   `{{`, `lorem`, `TODO` in rendered output.

### Technical

5. **Server-render everything.** One competitor (BLCK Luxury) ships literal `{{ h2 }}`
   template placeholders to Google on every page. Another (Savaari) returns no content at
   all without JS. Every public page must be SSR or SSG and must contain its real H1 and
   body copy in the HTML response.
6. **Never disable pinch-zoom.** Eight of nine competitors set `user-scalable=no`. It is
   an accessibility failure and a Lighthouse penalty. Use
   `width=device-width, initial-scale=1, viewport-fit=cover` and nothing else.
7. **One URL pattern per page type, forever.** Locked in §5 below. The primary competitor
   uses six different patterns for city pages and it permanently fragments their authority.
8. **Every nav link goes to a distinct page.** The current site has a Wedding menu where
   five links resolve to one page.
9. **No dead CTAs.** No `href="#"` buttons in production. One competitor ships
   "Check Availability" buttons that go nowhere.
10. **One phone number, one WhatsApp number**, defined once in config and imported
    everywhere. The current site uses two different numbers for the same service.

### Conversion

11. **Price before contact details.** The user sees a fare with **no** name, phone, OTP,
    login or captcha. This is the single biggest wedge against the primary competitor,
    whose search form demands a mobile number and a captcha *before* showing anything.
12. **Two fields to a fare.** Pickup + Drop + one button. Date and time are collected
    *after* the fare is shown.
13. **Three parallel closes** on the booking screen — `Confirm Booking`,
    `Book on WhatsApp` (pre-filled with the trip summary), `Call to Book`. The market
    contains self-serve, WhatsApp-first and phone-first buyers. Every competitor forces
    one path and loses the other two.
14. **All-inclusive fares.** Quote a total that includes fuel, tolls, state taxes, driver
    allowance and (for Nepal) permits. List inclusions and exclusions on the fare card.
    No competitor in this region does this.

---

## 4. Stack

| Layer | Choice | Note |
|---|---|---|
| Frontend | **Next.js 15, App Router, TypeScript** | SSG for content pages, SSR for search/fare, ISR for blog |
| Styling | **Tailwind CSS + CSS variables for tokens** | Tokens in one file; no hard-coded hex outside it |
| UI primitives | **shadcn/ui (Radix)** | Accessible accordion, dialog, tabs, select out of the box |
| Backend | **Node.js + NestJS + TypeScript** | Chosen deliberately: modules, DI, decorators and layered services map closely onto Spring Boot, which is the owner's day-to-day stack |
| ORM | **Prisma** | Typed client shared with the frontend via a generated types package |
| Database | **PostgreSQL 18** | Local instance already runs at `localhost:5432`; create a **new** database `taxiverz` alongside the existing ones — do not reuse them |
| Validation | **Zod** on the frontend, `class-validator` on NestJS DTOs | |
| Auth (admin only) | **JWT, httpOnly cookies, refresh rotation** | Public booking requires **no** account |
| Transactional messaging | WhatsApp Business API + SMTP email | Behind a provider interface so it can be swapped |
| Monorepo | **pnpm workspaces + Turborepo** | `apps/web`, `apps/api`, `packages/types`, `packages/config` |

### Environment

Development is on **Windows**. Use **cmd syntax** in all instructions
(`set VAR=value`), never PowerShell (`$env:`). Do not assume PowerShell is available.

---

## 5. URL architecture — LOCKED

This is the one decision that is genuinely expensive to reverse. It is final.

```
/                                           Homepage

SERVICE HUBS
/outstation-cabs/          /one-way-cabs/         /airport-taxi/
/local-car-rental/         /luxury-car-rental/    /wedding-cars/
/tempo-traveller/          /corporate-car-rental/ /self-drive-car-rental/

CITY HUBS
/cabs/{city}/                                e.g. /cabs/gorakhpur/

ROUTES
/cabs/{origin}/{origin}-to-{destination}/    e.g. /cabs/gorakhpur/gorakhpur-to-kathmandu/

SERVICE x CITY  (the volume layer)
/{service}/{city}/                           e.g. /luxury-car-rental/gorakhpur/

FLEET
/fleet/                     /fleet/{vehicle-slug}/

PACKAGES
/packages/                  /packages/{package-slug}/
/packages/{package-slug}/from-{city}/        the origin multiplier

DESTINATIONS
/destinations/{slug}/
/destinations/{slug}/places-to-visit/
/destinations/{slug}/best-time-to-visit/
/destinations/{slug}/how-to-reach-from-{city}/

BOOKING
/search?trip={one-way|round-trip|local|airport}&from={slug}&to={slug}&date=&time=
/booking/{reference}/

SUPPORT
/blog/  /blog/{slug}/  /about/  /contact/  /faq/  /reviews/
/terms/  /privacy/  /refund-policy/  /attach-your-taxi/  /drive-with-us/
```

**Rules:** lowercase, hyphenated, trailing slash, no `.html`, no underscores, no
capitalised segments, no URL-encoded spaces. Every one of those mistakes is live on a
competitor right now.

**Migration:** the existing site has 25 live route pages at `/{origin}-to-{destination}.html`.
**301 every one** to its new equivalent. Do not delete them — they are the only accumulated
authority the domain has.

**Prototype slugs differ** (Demo IV uses `/routes/gorakhpur-to-kathmandu`, Demo II uses
`/fleet/swift-dzire`, Demo IV uses `/fleet/dzire`). The spec above wins. Add redirects
from prototype paths where useful.

---

## 6. Vehicle model — classes, not individual cars

Follow **Demo III**, not Demo II or IV. Public fare results advertise a **class**, with
representative models named:

| Class | Representative models |
|---|---|
| Economy | WagonR, Swift |
| Sedan | Swift Dzire, Etios |
| Sedan Plus | Honda City, Hyundai Verna |
| Compact SUV | Scorpio, XUV700 |
| SUV | Innova Crysta |
| Premium | Fortuner, XUV700 |
| Luxury | BMW 3/5 Series, Mercedes E-Class, Audi A6, Jaguar |
| Group | Tempo Traveller 13/17/20/26, Urbania, Winger, Volvo, AC bus |

State plainly that the exact model allocated depends on availability, and that photography
represents the class. This is operationally honest and prevents a dispute at pickup.

`/fleet/{vehicle-slug}/` pages may still cover individual named vehicles — those are
marketing and SEO surfaces, and **every one must carry complete pricing**: per-km rate,
local package rates (6h/60km, 8h/80km, 12h/120km), night charge, minimum km, inclusions,
exclusions.

---

## 7. Booking flow — the conversion core

```
STEP 1  Fare check                       above the fold, on every page
        Tabs: Outstation · One Way · Local (Hourly) · Airport
        Fields: Pickup, Drop, [Check Fare]
        Local tab swaps Drop for a package selector (6h/60km, 8h/80km, 12h/120km)
        Under the button: rating + trip count (once real) + "All-inclusive — fuel,
        tolls, driver allowance included"
        NO date. NO time. NO phone. NO captcha. NO login.

STEP 2  /search results
        3–5 class cards, cheapest first
        Each: real photo, seats, luggage, TOTAL all-inclusive fare, inclusions,
        exclusions, use-case line ("Innova — families and Nepal mountain routes")

STEP 3  Trip details
        Date, time, return date for round trips, pickup address
        Fare updates live as choices change

STEP 4  Contact and close — three buttons side by side
        [Confirm Booking]  [Book on WhatsApp]  [Call to Book]
        WhatsApp deep link pre-filled with the full trip summary

STEP 5  Confirmation
        Booking reference, chauffeur and vehicle details when assigned,
        WhatsApp confirmation, cancellation policy stated explicitly
```

The fare engine is a **server-side service** (`apps/api`), never client-side arithmetic.
Inputs: origin, destination, distance, trip type, vehicle class, date. Outputs: base fare,
driver allowance, tolls, state tax, permits, night charge, total, and an itemised breakdown.
Admin-editable rate cards — never hard-coded numbers.

---

## 8. Data model (initial)

```
City            id, slug, name, state, country, lat, lng, isOrigin, content
Route           id, originCityId, destCityId, slug, distanceKm, durationMin,
                borderCrossing?, isCrossBorder, content, stops[]
RouteStop       id, routeId, order, name, note
VehicleClass    id, slug, name, seats, luggage, models[], sortOrder
Vehicle         id, slug, name, classId, images[], specs, useCase
RateCard        id, vehicleClassId, tripType, perKm, minKm, driverAllowance,
                nightCharge, localPackages[], effectiveFrom, effectiveTo
Package         id, slug, name, nights, days, destinations[], inclusions[],
                exclusions[], itinerary[], basePrice, collection
Destination     id, slug, name, country, heroImage, content, sections[]
Booking         id, reference, tripType, from, to, date, time, vehicleClassId,
                fareBreakdown(json), customer, status, channel, createdAt
Enquiry         id, type(corporate|wedding|package), payload(json), status
Review          id, customerName, city, route, vehicle, rating, body,
                source(google|direct), verifiedAt, publishedAt
BlogPost        id, slug, title, excerpt, body(mdx), category, readTime,
                heroImage, publishedAt
```

`Review.verifiedAt` is non-null only for reviews with a real source. The public component
filters on it. This is enforced in the schema so no one can ship a fake review later.

---

## 9. SEO requirements

- **Structured data on every template:** `LocalBusiness` (home, city pages), `Service`
  (service pages), `Product` + `Offer` (fleet pages), `FAQPage`, `BreadcrumbList`,
  `TouristTrip` (packages/journeys), `AggregateRating` **only once real reviews exist**.
  No competitor in the audit set does this comprehensively — it is free advantage.
- **Unique content per page.** Every route page needs genuine specifics: distance, drive
  time, road condition, toll count, best departure time, border formalities for Nepal
  routes, what to see en route. A competitor's programmatic generation has produced links
  where "Camping In Rishikesh" resolves to a Lonavala page — build a QA step that catches
  duplicate body content before publish.
- **Hub pages, not a link dump.** Homepage → city hub → route. Three clicks. Do not put
  700 links on the homepage the way the primary competitor does.
- **Canonical, `og:url`, `og:image`** generated from one config constant. Never a literal.
- `sitemap.xml` generated from the database. `robots.txt` allowing everything public.
- FAQ content written to earn featured snippets and AI answers, not just blue links.

### Immediately, before any of this ships

The live taxiverz.com canonical says `https://yourwebsite.com`. If the old site is still
serving while the new one is built, **fix that tag on the old site today** — it is a
five-minute change on a bug that is actively costing rankings.

**Also:** set `noindex` on all four Vercel prototypes. Demo I and Demo IV are currently
indexable, and Demo IV carries a canonical to `https://taxiverz.demo`. Leaving them
crawlable risks duplicate-content confusion with the real launch.

---

## 10. Mobile

The audience is overwhelmingly on phones, often on patchy 4G, frequently first-time
online bookers.

- Fare widget above the fold, thumb-reachable
- Sticky bottom bar: **Call · WhatsApp · Book** (Demo II and Demo III both have this)
- 48px minimum touch targets
- `next/image` everywhere, AVIF/WebP, correct `sizes`, lazy below the fold
- Horizontal scroll for fleet tiers rather than endless vertical stacks
- `inputmode="tel"` on phone fields, `tel:` links throughout
- Pinch-zoom enabled (see rule 6)
- Test on a low-end Android on throttled 4G, not a resized desktop browser

---

## 11. Quality gates

Every PR must pass:

- `pnpm typecheck` — zero TS errors, no `any` in app code
- `pnpm lint` — ESLint + Prettier clean
- `pnpm test` — Vitest unit tests; the **fare engine requires test coverage**
- `pnpm build` — clean production build
- Playwright smoke: homepage → fare check → results → booking → confirmation
- Lighthouse on homepage, a route page and a fleet page:
  **Performance ≥ 90, Accessibility ≥ 95, SEO = 100** on mobile
- The placeholder scanner (rule 4) finds nothing

---

## 12. Working agreement

- **Ask before inventing business facts.** Fares, years in business, fleet size, client
  names, chauffeur counts — if it is not in the repo or this file, ask. Do not fill the
  gap with a plausible number.
- **Small, reviewable commits.** One concern per commit, conventional commit messages.
- **No new dependency without saying why** and what was considered instead.
- **Flag conflicts loudly.** If a prototype contradicts this spec, this spec wins — but
  say which prototype and where, so the decision is visible.
- **Do not scaffold ahead.** Build the phase asked for. Stubs and "we'll fill this later"
  files are how placeholder text reaches production.
