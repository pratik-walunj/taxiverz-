# Taxiverz → Next.js rebuild plan

Read `CLAUDE.md` first. This document is the spec. Execute it one phase at a time (§7), stopping after each.

> **Owner decisions of 2026-09-28** are folded into this document: live-site hotfix track (§7.H), class-based fares (§3.1, §3.3, §3.4), redirect fallbacks (§7 Phase 1 and 7), legacy blog post → destination guide (§7 Phase 5), verified distances (§7 Phase 4B), long-distance routes as drafts (§5), VPS hosting (§7 Phase 8), and the Postgres lead outbox (§2.4, §3.5). Where §1 and `docs/AUDIT.md` differ, the audit wins.

1. What the legacy code actually is (from a full scan)
2. Target architecture
3. Core systems
4. Page templates
5. Content and quality gates
6. Design direction
7. Phases 0–8
8. Growth mode (after launch)
9. Owner questions (seed for `OWNER_TODO.md`)
10. Later roadmap

---

## 1. What the legacy code actually is

A full scan of the repo (September 2026) found the following. Phase 0 confirms or corrects all of it.

### Shape
- Static HTML on Apache: 156 `.html` pages, one global `style.css` plus ~20 per-page CSS files, `script.js`, one-off helper scripts (`add_routes_section.py`, `create-jaguar-pages.js`, `fix-audi-hamburger.js`, `add-mobile-css.bat`) and junk (`index-backup.html`, the `popular-routes-section.html` fragment, `mercedes-s-class.zip`).
- ~51 MB of images in the repo root. Several are 1–3 MB PNGs. Names contain spaces (`bmw 320d.png`, `13_seater (1).webp`), typos (`maybACH.png`, `tvs deut.png`, `jagua xjl.jpeg`) or say nothing (`car2.jpeg` … `car15.jpeg`, `c class.png`).
- 20 pages load the Tailwind Play CDN. There is no analytics or tag manager anywhere.

### Pages by type (every one is mapped in `docs/legacy-url-map.json`)

| Type | Files | Notes |
|---|---|---|
| Routes | 58 → 56 real routes | Gorakhpur → 39 destinations, Raxaul → 7 (Nepal), Kathmandu → 5 (inside Nepal), Ayodhya → 2, reverse routes from Varanasi, Lucknow and Delhi. `gorakhpur-to-lucknow-taxi.html` duplicates `gorakhpur-to-lucknow.html`. `gorakhpur-to-mankapuram.html` describes a place that can't be verified. |
| Vehicles | 54 | 30 cars (18 luxury + 2 vintage among them), 11 group vehicles (tempo travellers, Urbania, 5 bus types), 13 bikes/scooters |
| Gorakhpur service/keyword pages | 12 | Several near-duplicates (`cab-in-gorakhpur.html` and `gorakhpur-cab-service.html` share one title) → consolidated |
| Other service pages | 4 | wedding, bike rental, off-road bikes, tempo traveller hub |
| Shoot-car pages | 16 | Template clones → 1 hub + 6 intent pages |
| Nepal | 4 | `international-taxi.html`, `gorakhpur-to-nepal.html`, helicopter charter, Everest mountain flight |
| Info | 5 | about, contact, faq, blog (one thin post), hindi (thin) |
| Home + leftovers | 3 | `index.html`, `index-backup.html`, `popular-routes-section.html` |

### How leads arrive today
Web3Forms email forms; a "Quick booking" form that opens WhatsApp with a pre-filled message (keep that idea); a rule-based chatbot; a visitor counter.

### SEO defects
Canonicals missing on most pages and placeholders on four (`yourwebsite.com`, `yourdomain.com`); `robots.txt` points its Sitemap line at `yourwebsite.com`; `og:url`/`og:image` placeholders; `sitemap.xml` lists 78 of 156 pages and includes both `/` and `/index.html`; meta keywords; two H1s on the home page; `.htaccess` sends no-cache headers for everything (a "development" setting left on in production).

### Data conflicts — why nothing is trusted blindly
- Swift Dzire: ₹10/km (home), "starting ₹8/km" (`car-rental.html`), ₹29/km one-way (`gorakhpur-to-mankapuram.html`).
- Gorakhpur → Kathmandu: "280 km, 7–8 h via Raxaul" on one page, "350 km, 10–12 h via Sonauli" on another.
- BMW X1 labelled a sedan; Mercedes SLK listed with 5 seats; "BMW MZ Convertible" is not a real model name; Jaguar XJL, SLK, tempo travellers, Urbania and others show blank prices (`₹--`, `...`).
- "Visa assistance" is offered for Nepal. Indian citizens don't need a visa for Nepal — don't repeat it.
- Phones: 8576000083 (primary, 525 uses), 8576000074 (19 uses, group vehicles), and fake numbers (9876543210, 8234567890, 7012590923) on 6 pages. Emails: cabtaxiverz@gmail.com (141 uses), info@taxiverz.com (42), john@example.com (placeholder).
- Testimonials "Rahul Sharma / Priya Patel / Amit Kumar" are placeholders. The JSON-LD AggregateRating (4.8 / 150) and the FAQ claim "#1 rated, 4.8/5" are unverified — remove both.
- Gypsy and Jeep images are swapped. The Instagram link is `travel_nepal_club` (a different brand name).

### Brand
The logo is an orange car over a charcoal "TaxiVerz" wordmark with the tagline "Luxury on the Move". Site copy says "Taxiverz". CSS accent `#ff5800` (134 uses). The logo exists only as raster (`taxiverz.avif`, `taxiverz.jpeg`).

### Legacy pricing model — keep its structure, verify its numbers
- Per-km with a minimum km per day (200–250).
- Driver night charge after 10 PM (₹200–500).
- Local packages 6h/60km, 8h/80km, 12h/120km (Innova, Scorpio); Fortuner 8h/80km.
- Luxury: wedding packages by hours (14–16 h) + extra-hour rate; corporate 8h/80km; outstation ₹/km with minimum km; "garage to garage" km counting; extras toll, parking, washing.
- Today toll, parking and border tax are listed as extras. The new site quotes all-inclusive totals (parking excepted) once the owner confirms the numbers.

### Where the scan corrects `docs/competitor-analysis.pdf`
The report counted 25 route pages (there are 56), didn't cover bikes, buses, shoot cars, helicopter/mountain flight, inside-Nepal routes or the Hindi page, and said there was no structured data (there is — including the fabricated rating). Its strategy stands; its inventory numbers don't.

---

## 2. Target architecture

### 2.1 URL tree (final)

```
/                                           Home
/cabs/                                      All cities and routes (directory)
/cabs/{city}/                               City hub — "taxi service in {city}"
/cabs/{origin}/{origin}-to-{destination}/   Route
/{service}/                                 Service hub (13 services, §2.2)
/{service}/{city}/                          Service × city — only combinations allow-listed in data
/shoot-car-rental/{shoot-type}/             pre-wedding | post-wedding | music-video | film-and-web-series | ads-and-fashion | youtube-and-vlogs
/fleet/                                     Fleet hub (tiers + bikes)
/fleet/{vehicle}/                           Vehicle (cars, group vehicles, bikes)
/packages/                                  Packages hub
/packages/{package}/                        Package
/packages/{package}/from-{city}/            Origin variant — only with real variant data
/destinations/                              Destinations hub
/destinations/{place}/                      Destination overview
/destinations/{place}/{guide}/              places-to-visit | best-time-to-visit | how-to-reach-from-gorakhpur
/blog/   /blog/{slug}/
/book/   /book/confirmed/                   Booking funnel (noindex)
/about/  /contact/  /faq/  /reviews/
/terms/  /privacy/  /refund-policy/
/attach-your-taxi/  /drive-with-us/
/api/leads                                  (+ /api/distance only if a maps provider is configured)
```

Implementation note: services are static folders (`src/app/outstation-cabs/page.tsx`, `src/app/outstation-cabs/[city]/page.tsx`, …) that render shared templates. `shoot-car-rental/[type]` is the one service whose sub-segment is a type, not a city. `from-{city}` is a normal dynamic segment whose values are `from-gorakhpur` etc.

### 2.2 Services

| Slug | Page name | Register | How it sells | v1 city pages |
|---|---|---|---|---|
| outstation-cabs | Outstation cabs (round trip) | standard | fare widget | gorakhpur |
| one-way-cabs | One-way cabs | standard | fare widget | gorakhpur |
| airport-taxi | Airport taxi | standard | fare widget (airport tab) | gorakhpur |
| local-car-rental | Car rental with driver (hourly/daily) | standard | local tab | gorakhpur |
| nepal-taxi | India–Nepal taxi | standard + dark Nepal band | fare widget | gorakhpur, raxaul |
| luxury-car-rental | Luxury car rental | luxury | enquiry | gorakhpur |
| wedding-cars | Wedding cars | luxury | enquiry | gorakhpur |
| shoot-car-rental | Cars for shoots | luxury | enquiry | — (shoot types instead) |
| tempo-traveller | Tempo traveller & Urbania | standard | fare widget / enquiry | gorakhpur |
| bus-rental | Bus rental | standard | enquiry | gorakhpur |
| corporate-car-rental | Corporate car rental | standard | corporate enquiry | — |
| self-drive-car-rental | Self-drive cars | standard | enquiry | gorakhpur |
| bike-rental | Bike & scooter rental | standard | enquiry | gorakhpur |

Pune pages follow once the owner confirms which services run from the Pune branch.

### 2.3 Folders

```
src/
  app/            routes — thin: read via lib/content, render a template
    api/leads/route.ts
  components/
    layout/       Header, MobileNav, Footer, FooterLinks, StickyActionBar, Breadcrumbs, SkipLink
    booking/      FareWidget, PlaceCombobox, TripTabs, FareResults, VehicleFareCard, TripDetails, ContactAndClose, CloseActions
    sections/     page sections (hero, trust line, services, fleet tiers, routes, Nepal band, luxury band, how it works, reviews, FAQ, CTA band …)
    cards/        RouteMilestone, VehicleCard, ServiceCard, PackageCard, DestinationCard
    ui/           primitives (Button, Price, Badge, Sheet, Tabs, Accordion …)
    seo/          JsonLd
  config/         business.ts, site.ts (nav, footer lists), pricing.ts, tracking.ts, env.ts
  data/           cities.ts, places.ts, routes/{origin}.ts, vehicle-classes.ts, vehicles.ts, services.ts, service-cities.ts,
                  packages.ts, destinations.ts, faqs.ts, reviews.ts, clients.ts
  lib/
    content/      the only way pages read data (getRoute, getRoutesFrom, getVehicle …)
    schemas/      Zod schemas
    pricing/      fare engine + tests
    seo/          metadata builder, title patterns, JSON-LD builders
    tracking/     track(), attribution capture
    format.ts, whatsapp.ts, phone.ts
  server/         lead service, outbox (db/schema.ts, db/client.ts), sinks (email, webhook, telegram), retry worker, rate limiter, reference generator
content/          blog/*.mdx, destinations/{place}/{guide}.mdx
drizzle/          generated SQL migrations for the outbox
public/images/    brand/, fleet/, routes/, shoots/, places/
scripts/          validate-data.ts, qa.ts, migrate-images.ts, check-redirects.ts, fetch-distances.ts
tests/            unit + e2e
legacy/           the old site (reference only)
```

### 2.4 Rendering and data flow
- **Build**: data → Zod parse → `lib/content` → static pages. Route fare tables are computed at build time by the fare engine.
- **Client**: the fare widget uses a slim generated fare index (places, route distances and tolls, vehicle rates — no prose) loaded lazily on first interaction. Target: widget JS + index ≤ ~40 KB gzipped.
- **Server**: `/api/leads` validates, recomputes the fare, **writes the lead to the Postgres outbox**, then delivers to the sinks and retries failures (§3.5). Postgres (Drizzle) holds only leads and their delivery attempts; all content stays in typed data files built statically. The outbox is the record of every lead and the table TravelCRM reads later.
- **Database**: database `taxiverz`. Development: local PostgreSQL on `localhost:5432`. Production: the VPS PostgreSQL. `DATABASE_URL` in `.env.local` (documented in `.env.example`). Pages never depend on the database, so a database outage can't take the site down.

---

## 3. Core systems

### 3.1 Data model (Zod; nullable = unknown)
- **Business**: brandName (owner decides "Taxiverz" vs "TaxiVerz"), legalName, tagline, phone, whatsapp, bookingEmail, branches[] {id, label, address, postalCode, city, geo, hours, mapsUrl, googleBusinessUrl, isHeadOffice}, foundedYear, gstin, registrations[], socials {instagram, facebook, youtube}, sisterSites[], responseTimeMins, paymentMethods[], policies {freeCancellationHours, advancePercent, refundDays}, claims {available24x7, gpsTracked, …} (each boolean|null), gscVerification.
- **City**: slug, name, nameHi, state, country (IN|NP), geo, isBranch, intro, faqs, status.
- **Place** (autocomplete): id, name, nameHi, aliases[] (Banaras/Kashi → Varanasi, Allahabad → Prayagraj, GKP, "Gorakhpur Jn" …), type (city|town|airport|station|border|landmark), citySlug, geo, country.
- **Route**: origin, destination, slug, status, ownerConfirmed (required for long-distance routes, §5), distanceKm, durationMins (both from the reviewed `docs/route-distances.csv`), verified {distance, duration, tolls, border}, via[], isInternational, borderCrossing, tolls {car, lcv, bus}, permitCharges, borderCharges, bestDepartureTime, roadNotes, stops[] {name, note}, content {intro, routeGuide, tips[]}, faqs[], featured, image, relatedPackages[], legacyUrls[].
- **VehicleClass** (what the fare engine prices): slug, name ("Sedan"), representativeModels[] ("Dzire", "Etios"), seats, luggage, ac, tollClass (car|lcv|bus), useCase, image (photo of a real car of this class), rates {roundTripPerKm, oneWayPerKm, minKmPerDay, oneWayMinKm, driverAllowancePerDay, nightCharge, local[] {hours, km, price}, extraKm, extraHour, garageToGarage}, sortOrder, status. Results read "Sedan — Dzire, Etios or similar", with the note that the exact model depends on availability and photos represent the class.
- **Vehicle** (a page for every vehicle, for SEO): slug, name, make, model, classSlug (null for per-model vehicles), category (car|group|bike), tier (economy|comfort|premium|luxury|group|bike), bodyType, seats, luggage, ac, fuel[], useCase, bookingMode (instant|enquire), selfDrive, images[], rates (**only for enquire-mode vehicles priced per model — luxury, vintage, bikes**: {wedding {hours, price, extraHour}, corporate {hours, km, price}, outstationPerKm, minKmPerDay, local[], extraKm, extraHour, nightCharge, washing, garageToGarage, extras[] {label, amount}}), status, legacyUrls[]. An instant-mode vehicle page shows its class's fares.
- **Service**, **ServiceCity** (service, city, intro with genuinely local specifics, faqs, status), **Package** (slug, type, days, nights, inclusions, exclusions, itinerary[], price, compareAtPrice — only a real regular price, variants[] {fromCity, price, days, itineraryChanges}, status), **Destination**, **Review** (real only: author as permitted, source, rating, date, text, tripType, route, driverName, url), **Client** (only with written permission), **FAQ**.
- `npm run validate:data` checks: unique slugs, every reference resolves, published entities pass the §5 gates, no placeholder strings, every referenced image exists.

### 3.2 Places and autocomplete
- Local dataset, instant search, no API. Every city and town used by routes, plus airports (Gorakhpur GOP, Kushinagar KBK, Varanasi VNS, Lucknow LKO, Pune PNQ, Kathmandu KTM, Bhairahawa BWA, Pokhara PKR), main railway junctions, border points (Sonauli–Bhairahawa, Raxaul–Birgunj), English and Devanagari names, common spellings.
- Accessible ARIA combobox (keyboard, screen reader, touch). Free text is allowed: an unknown place returns an "exact fare on WhatsApp" result — still a lead.

### 3.3 Fare engine (`src/lib/pricing/`, pure, fully unit-tested)
All policies come from `config/pricing.ts`, so the owner's answers change numbers, not code. The engine prices **vehicle classes**, not individual cars; enquire-mode vehicles (luxury, vintage, shoots, buses, bikes) are priced per model or go to enquiry. The owner fills in the numbers in `docs/RATE_CARD.md`. `d` = one-way road distance of the route.
- **One way**: `max(d, oneWayMinKm) × oneWayPerKm` + driver allowance + night charge (once the time is known) + tolls + permits/border charges + GST.
- **Round trip**: `max(2d, days × minKmPerDay) × roundTripPerKm` + days × driver allowance + nights × night charge + tolls × 2 + permits/border charges + GST. The first fare shown assumes the shortest sensible trip (`days = max(1, ceil(2d / maxDrivingKmPerDay))`), says "for an N-day round trip", and updates live when dates are picked.
- **Local**: package price (6h/60km, 8h/80km, 12h/120km …) + GST; show the extra-km and extra-hour rates.
- **Airport**: fixed airport fares if the owner provides them, else one-way with an airport minimum.
- **Enquire-mode vehicles** (luxury, wedding, shoots, buses, bikes): show a "from" price only if a verified package price exists; otherwise go straight to enquiry.
- Reverse routes reuse the route's distance. Round up to `pricing.roundTo` (default ₹10). GST rate and whether it is included come from config.
- Output: `{ status: 'priced' | 'on-request', reason?, total, lines[], included[], excluded[], assumptions[], isEstimate }`. `isEstimate` is true while pricing is draft or any input is unverified.
- Missing rate or distance → `on-request`, never a guess. Parking at venues is always listed as excluded.

### 3.4 Booking funnel
1. **Fare widget** — tabs One way · Round trip · Local (hourly) · Airport. Two inputs and "Check fare" (Local: city + package; Airport: airport + direction + area). Trust line directly under the button, built only from verified facts.
2. **Results** (`/book/?type=…&from=…&to=…` — state in the URL so Back and sharing work) — **vehicle-class** cards cheapest first ("Sedan — Dzire, Etios or similar"): real photo of a car in that class, seats, luggage, total fare, included/excluded, one use-case line. One line under the list: the exact model depends on availability; photos represent the class. A link below the classes leads to luxury cars (per model, "Enquire"). Secondary action: "Request a call back" (phone only).
3. **Trip details** — date, time, return date for round trips; the fare updates live (night charge, days).
4. **Contact and close** — name, mobile (+91 default, +977 allowed), optional email, pickup address, a short consent notice, and an optional unticked "offers on WhatsApp" opt-in. Three buttons side by side: Confirm booking · Book on WhatsApp · Call to book.
5. **Confirmed** (`/book/confirmed/?ref=`) — reference, summary, what happens next (only promises the owner has confirmed), WhatsApp button carrying the ref, cancellation-policy link, payment-safety notice.
- The draft booking survives a refresh (sessionStorage). Every step works by keyboard and at 360px width.

### 3.5 Lead pipeline (`POST /api/leads`)
- Lead types: booking, callback, enquiry-luxury, enquiry-wedding, enquiry-shoot, enquiry-group, enquiry-corporate, enquiry-package, enquiry-bike, partner-attach, partner-driver, contact.
- Zod validation → honeypot + minimum fill time + per-IP rate limit (no captcha) → server-side fare recompute → reference `TVZ-YYMMDD-XXXX` → **write to the outbox** → fan out to the sinks enabled by env vars.
- **Outbox (PostgreSQL via Drizzle).** Two tables:
  - `leads`: id (uuid), ref (unique; idempotency key), type, trip fields, contact, quoted fare + breakdown (json), consent flags, attribution (gclid, gbraid, wbraid, utm_*, landing page, referrer, first-visit time), page, user agent, createdAt.
  - `lead_deliveries`: leadId, sink, status (pending|sent|failed), attempts, nextAttemptAt, lastError (no personal data), deliveredAt.
  - Flow: insert lead + one pending delivery per enabled sink in one transaction → attempt delivery immediately → failures back off exponentially (1 min, 5 min, 30 min, 2 h, 12 h) and are retried by `POST /api/leads/retry` (token-protected), called every 5 minutes by a cron on the VPS.
  - **If the database is unreachable**, deliver directly to the sinks and log the failure (no personal data in logs). The lead is never dropped.
  - Retention of personal data follows the privacy policy (period set by the owner; DPDP Act).
  - The outbox is the source for Google Ads offline-conversion import (gclid + value + conversion time) and the table TravelCRM reads later.
- Sinks:
  - **Email** (Resend or SMTP). Legacy used Web3Forms; keep it as an interim sink only if server-side submission works on the owner's plan.
  - **Generic webhook** (Google Sheets Apps Script, n8n, or TravelCRM's website-lead endpoint once it exists). The payload maps cleanly onto a CRM lead: name, phone, source `taxiverz-website`, lead type, trip type, from, to, date, pax, vehicle, quoted fare, attribution, page, ref (also the idempotency key).
  - **Telegram bot** (optional instant alert).
- The client gets success once the lead is in the outbox (or, without a database, once at least one sink succeeds). Log failures without personal data. The client always offers WhatsApp as the fallback.

### 3.6 Tracking and attribution
- GTM via `@next/third-parties` when `NEXT_PUBLIC_GTM_ID` is set; nothing hardcoded. One typed `track(event, params)` helper pushing to `dataLayer`.
- Events: `fare_check`, `fare_results`, `vehicle_select`, `trip_details_complete`, `lead_submit` (value = fare, currency INR, ref, lead type), `callback_request`, `enquiry_submit`, `whatsapp_click` (placement), `call_click` (placement).
- Capture gclid / gbraid / wbraid / utm_* / landing page / referrer on the first visit, keep them 90 days in first-party storage, and attach them to every lead — so bookings closed on phone or WhatsApp can be imported into Google Ads as offline conversions.
- Optional Microsoft Clarity via env var. The privacy policy discloses analytics.

### 3.7 SEO system
- `buildMetadata({ title, description, path, image, noindex })` on every page. Title builders per template drop trailing segments to stay ≤ 60 characters, e.g.
  - Home: `Taxi Service in Gorakhpur | Cabs to Nepal & India | Taxiverz`
  - Route: `Gorakhpur to Kathmandu Taxi | Fare from ₹X | Taxiverz` (price only when verified; else `One Way & Round Trip`)
  - City: `{City} Taxi Service | Local & Outstation Cabs | Taxiverz`
  - Vehicle: `{Vehicle} on Rent in Gorakhpur | Taxiverz`
  - Service × city: `{Service} in {City} | Taxiverz`
- JSON-LD builders: Organization + WebSite (root) · LocalBusiness per branch using the most specific valid type (home, contact, branch city hubs) · BreadcrumbList · Service (service hubs, service × city, routes) · Product/Offer for vehicles only with verified prices · TouristTrip for packages · FAQPage where FAQs exist (Google now shows FAQ rich results only for a few authoritative sites — keep it for meaning, don't promise stars) · BlogPosting. Never AggregateRating/Review about Taxiverz itself (self-serving reviews aren't eligible, and the legacy one is fabricated).
- `app/sitemap.ts` from data (published only) · `app/robots.ts` · dynamic `opengraph-image.tsx` for routes, vehicles and packages (these previews matter because links get shared on WhatsApp) · `/llms.txt` summarising services and key pages.
- Internal-link modules generated from data: route → reverse route, 4–8 routes from the same origin, city hub, suitable vehicles, related packages, destination guide. Footer: curated lists (top routes, cities, fleet, services), about 60 links at most.
- `lang="en-IN"`. No meta keywords, no geo-tag stuffing.

### 3.8 Images
- `scripts/migrate-images.ts` (sharp): legacy images → `public/images/{brand,fleet,routes,shoots,places}/{kebab-name}.webp`, max 2000px, metadata stripped; writes `docs/IMAGE_MAP.md` (old → new).
- Look at the images to fix mismatches (Gypsy/Jeep swap, wrong vehicle on a page). Mark stock or low-quality images for replacement with real photos of the actual fleet (OWNER_TODO).
- `next/image` everywhere with correct `sizes`; only the hero image gets `priority`. Route cards don't need photos — they use the milestone design (§6), never one stock image repeated.

---

## 4. Page templates (adapt the order; keep the jobs)

**Home** — sticky header (logo, nav, phone, WhatsApp, Check fare) → hero with a real Taxiverz vehicle photo, an H1 carrying the keyword and the positioning, fare widget overlapping the hero's lower edge → trust line (verified facts only) → services grouped (Cabs · Nepal · Luxury, wedding & shoots · Group · Self-drive & bikes · Corporate) → fleet by tier (horizontal scroll-snap: Economy → Comfort → Premium → Luxury → Group → Bikes) → popular routes (milestone cards) → Nepal band (dark: "India to Nepal, door to door", origins Gorakhpur and Raxaul, inside-Nepal routes, border block once verified) → luxury & wedding band (dark register, Enquire) → how booking works (a real sequence, so numbered steps are fine) → why Taxiverz (four specific, verified proofs) → reviews (real only; else a link to the Google profile; else hidden) → packages (only when some are published) → corporate band → FAQ → footer link lists → mobile sticky bar.

**Route** — breadcrumb → H1 "{Origin} to {Destination} Taxi" + distance/time line + widget pre-filled → fare table for every eligible vehicle class (one way and round trip, computed at build) with included/excluded → route facts card (distance, time, via, tolls, best departure time, road notes, border crossing) → route guide (unique prose) and stops worth making → Nepal block when international (documents, border steps, Bhansar, currency — verified content only) → route-specific FAQs → related links (reverse route, same-origin routes, city hub, packages, destination guide) → CTA band with the three closes.

**City hub** — H1 "Taxi service in {City}" → widget → services available in this city → all published routes from the city (grouped: UP, Bihar, Nepal, long-distance) → local packages with prices → airports and stations → branch block (address, hours, map behind a click-to-load facade) when a branch exists → FAQs.

**Service hub / service × city** — a hero about the customer's problem, the right widget tab or enquiry form, relevant fleet, pricing as a table, city-specific content (on × city pages), FAQs. Luxury, wedding and shoot pages use the luxury register: dark palette, big real photography, little copy, "Enquire", organised by occasion.

**Fleet hub / vehicle** — tier tabs; a vehicle page has a real gallery, specs, the full price table (outstation, one way, local packages, night charge, wedding/corporate where relevant, extras), a "good for" line, popular routes for this vehicle, FAQs, and the widget with the vehicle pre-selected (or the enquiry form for enquire-mode vehicles).

**Package / destination guide / blog post** — itinerary and inclusions table; guides answer traveller questions (what to see, when, how to reach from Gorakhpur); posts link to the relevant route and package pages.

**Contact** — both branches (name, address and phone identical to the Google Business Profile), click-to-call, WhatsApp, enquiry form, hours, map facade. **404** — fare widget + popular routes.

---

## 5. Content and quality gates

**Voice**: plain Indian English, specific and useful — road conditions, where to stop for food, the border steps, luggage space, travelling with kids or elders, night driving. No fluff ("embark on a journey"), no superlatives, no emoji.

**Publish gates** (enforced by `validate:data` and `qa`):
- **Route**: distance from the owner-reviewed `docs/route-distances.csv` · for long-distance routes (one-way over 600 km — e.g. Goa, Mumbai, Nashik, Indore, Ujjain, Jaipur, Dehradun, Kolkata, Delhi, Agra), `ownerConfirmed: true` (until then the route stays draft and its legacy URL uses its fallback) · intro ≥ 80 words and route guide ≥ 150 words, both unique · ≥ 3 stops or sights · ≥ 4 route-specific FAQs · at least one eligible vehicle either priced or clearly "on request".
- **City hub**: a branch, or ≥ 3 published routes · ≥ 150-word unique intro. Unpublished hubs are skipped in breadcrumbs.
- **Service × city**: ≥ 200 words of genuinely local specifics · ≥ 4 FAQs.
- **Vehicle**: ≥ 1 real image, seats, tier. Prices may be null ("Get a quote").
- **Package**: complete itinerary, inclusions/exclusions, verified price.
- **Destination guide**: ≥ 400 words; regulatory statements only if owner-verified.
- **Blog post**: published only when the owner sets it.

**`npm run qa` fails the build on**: placeholder strings · duplicate titles or descriptions · missing or multiple H1 · broken internal links · images without alt text · invalid JSON-LD · near-duplicate pages of the same template (5-word-shingle Jaccard similarity above 0.35 — report the pairs).

---

## 6. Design direction

If `CLAUDE.md` has a DESIGN REFERENCE, match it and skip the default direction below (keep the principles).

**Default: "premium regional operator."** It should look like a real, well-run company with real cars — not an aggregator and not a template. Build on what the brand already owns: the orange car and the charcoal wordmark in the logo.

- **Palette** (starting point — verify every pairing for AA contrast): ink `#15171A` (from the wordmark) · brand orange `#FF5A00` (from the logo; button fill with ink text) · deep orange `#C2410C` (links and text on light backgrounds) · clean light surfaces: white and cool greys, not cream · luxury register: near-black `#0E0F11`, champagne `#C8A96A` hairlines, ivory text · WhatsApp `#25D366` with ink text.
- **Signature element — spend the boldness here**: the Indian highway milestone. Route cards and route-page distance badges are drawn as the roadside stone with a coloured cap (authentic NH yellow or brand orange — decide in `DESIGN.md` with a mock), the destination in Devanagari and English, and the km. It is instantly local, it carries real information, and it replaces the legacy mistake of one stock photo on every route card. Use it only for routes and distances.
- **Type**: two families, clearly distinct. Body/UI: **Mukta** (Latin + Devanagari, reads well small on cheap screens). Headings: a signage-flavoured face — try **Overpass** (drawn from highway-sign lettering) and **Anek Latin** (Indian-designed, condensed widths) side by side on the style-guide page and choose. Tabular figures for prices.
- **Layout**: left-aligned, generous spacing, content width ~1200px; hierarchy through size and spacing, not a wall of identical cards. The fare widget is the visual centre of gravity on every commercial page.
- **Two registers**: standard pages are bright, price-forward and instantly bookable; luxury, wedding, shoot and helicopter pages go dark and quiet with large real photography and "Enquire".
- **Motion**: one orchestrated moment when the home page first loads (hero and widget), then only motion that answers the user — tab switch, fare reveal, step change. Nothing animates just because it scrolled into view.

**Process**: in Phase 1 write `docs/DESIGN.md` — tokens (4–6 named colours), type scale, spacing, the two registers, ASCII wireframes for home / route / vehicle at mobile and desktop, component inventory. Review it against the template-tells list in `CLAUDE.md`, write down what you changed and why, and only then build. Keep a dev-only `/styleguide/` page (excluded from production and the sitemap) showing tokens, type, buttons, the milestone, cards and the widget.

---

## 7. Phases

Every phase: scan → plan in `PROGRESS.md` → build → `npm run check` → commit → report → **stop**.
The report always contains: what was done, counts, descriptions or screenshots of key screens at 360px and 1280px, decisions made, new OWNER_TODO items, and anything in this plan you disagree with.

### Phase 0 — Scan and audit (read-only)
1. Check the environment: `node -v` (≥ 20.9), npm, `git status`. Create branch `nextjs-rebuild`.
2. Inventory every legacy file: pages, CSS, JS, images (with sizes), helper scripts.
3. Write `docs/AUDIT.md`: business facts (name/address/phone, phones, emails, socials, sister sites, GSC token) · every vehicle with every price found per page (conflicts side by side) · every route with legacy distance/time/via/fares (implausible values flagged) · which legacy copy is worth keeping · forms and integrations · SEO state · defects. Confirm or correct everything in §1.
4. Verify `docs/legacy-url-map.json` against the real files. Adjust targets if the audit shows a better mapping; coverage must stay at 100%.
5. Write `docs/OWNER_TODO.md` from §9 plus whatever the audit finds — grouped, each item with why it matters and the default behaviour until answered.
6. Create `docs/PROGRESS.md`.
7. Commit docs only. Report and stop.

### Phase 1 — Foundation
1. Move the whole legacy site into `legacy/` with `git mv` (it's on `main` as the live snapshot, and `nextjs-rebuild` is rebased onto `main`), excluded from TypeScript, ESLint, the build and deploys.
2. Scaffold Next.js 16. create-next-app refuses a non-empty folder: scaffold into a temp folder and move the files in, or set it up by hand. TS strict, App Router, `src/`, Tailwind v4, `@/*` alias.
3. `next.config.ts`: `trailingSlash: true`, AVIF/WebP images, `output: 'standalone'`, security headers, `poweredByHeader: false`, legacy redirects generated from the JSON (plus `proxy.ts` scoped to `.html` paths only if needed for case or encoding variants).
4. Tooling: ESLint (`eslint .`), Prettier, Vitest, Playwright, `tsx`, cross-platform npm scripts including `check`, `.gitattributes`, `.editorconfig`, `engines`, `.env.example` documenting every variable (including `DATABASE_URL`, `GOOGLE_MAPS_API_KEY`, `LEADS_RETRY_TOKEN`), Zod-validated `config/env.ts`. `.env.local` is git-ignored.
5. Design: write `docs/DESIGN.md` (§6 process), self-review, then implement tokens, fonts, primitives (Button variants, Price, Badge, Container, Section, Milestone) and `/styleguide/`.
6. Config: `business.ts` (from the audit; unknowns null), `site.ts`, `pricing.ts` (status `'draft'`), `tracking.ts`.
7. Shell: root layout (`en-IN`, metadataBase, GSC token, default OG), Header + MobileNav sheet, Footer (both branches), StickyActionBar, SkipLink, Breadcrumbs, `not-found.tsx`.
8. SEO core: `buildMetadata`, JSON-LD builders (Organization, WebSite, LocalBusiness), `robots.ts`, `sitemap.ts` (static pages for now).
9. Redirects are generated at build time from the JSON: each legacy URL points at its `target` if that page is published, otherwise at its `fallback`, otherwise `/`. `scripts/check-redirects.ts` against `next start`: every legacy URL → exactly one permanent redirect to its **effective** destination (that the destination returns 200 is asserted in Phase 7).

Acceptance: `npm run check` green · redirect check passes · home shell and `/styleguide/` reviewed at 360px and 1280px.

### Phase 2 — Data layer and migration
1. Zod schemas (§3.1), data files, `lib/content` accessors, `validate:data`. Vehicle classes and rates are migrated from the owner's `docs/RATE_CARD.md` (cells still ending in "?" are unconfirmed → `pricing.status = 'draft'`).
2. Migrate business facts; all vehicles (cars, group, bikes — plus vehicles mentioned without pages, e.g. Tata Winger, Volvo bus, Ertiga, Etios, Defender); all 56 routes; the 13 services; the service × city allow-list; places (with Hindi names and aliases). Consistent facts only; conflicts → null + OWNER_TODO; every legacy distance starts as `verified: false`.
3. Run the image migration; fix mismatches by looking at the images; write `IMAGE_MAP.md`.
4. Unit tests for schemas and accessors.

Acceptance: `validate:data` passes · report counts of published vs draft per entity, and why each draft is a draft.

### Phase 3 — Fare engine and booking funnel
1. Fare engine with unit tests for every trip type, minimum-km logic, night charges, GST, rounding, reverse routes, and missing data → on-request (≥ 90% line coverage on `lib/pricing`).
2. Slim fare index (lazy-loaded), PlaceCombobox, FareWidget (4 tabs).
3. `/book/` funnel steps 2–5 (§3.4), one shared WhatsApp message builder, error and fallback states.
4. `/api/leads` + Postgres outbox (Drizzle schema and migrations, §3.5) + sinks + retry endpoint + anti-spam + server-side fare recompute. Unit tests for the outbox flow, including "database unreachable → deliver directly".
5. Tracking helper, events, attribution capture.

Acceptance: Playwright — home → Gorakhpur to Kathmandu → pick a car → details → submit (sinks mocked in tests; the lead is in the outbox) → confirmation; the WhatsApp link contains the summary and ref; the call link is correct; the whole flow works by keyboard and at 360px; axe finds no serious issues.

### Phase 4 — Core pages
- **4A**: home, the 13 service hubs, service × city pages (allow-list), city hubs, the `/cabs/` directory, fleet hub and vehicle pages (luxury register where it applies).
- **Before 4B — verified distances.** Add `scripts/fetch-distances.ts` (Google Maps Routes API, key `GOOGLE_MAPS_API_KEY` in `.env.local`). Nepal routes are routed through the border crossing Taxiverz actually uses (OWNER_TODO D1) via an intermediate waypoint. It writes `docs/route-distances.csv`: route, legacy km, Google km, difference, legacy time, Google time, border used. The owner reviews it; the reviewed CSV becomes the verified distances in route data. No route is published before its row is reviewed.
- **4B**: the route template, then route content for all 56 routes in batches of 8–10 (long-distance routes stay draft until the owner confirms them, §5). After each batch run `validate:data` + `qa` and commit. Nepal routes get the Nepal block — as draft content until the owner verifies it.

Acceptance: all published pages build statically · `qa` passes · Lighthouse mobile ≥ 90 on home, one route and one vehicle · each template reviewed at 360/768/1280px.

### Phase 5 — Premium and growth verticals
Luxury, wedding and shoot-car pages (6 shoot types) · Nepal hub with Gorakhpur and Raxaul pages · corporate page with its own enquiry form (company, GSTIN, monthly volume) · tempo traveller and bus pages · packages (hub, template, `from-{city}` variants gated on real data; helicopter charter and Everest mountain flight migrated as drafts until the owner confirms operator and prices) · destinations (MDX guides) · blog (MDX setup; the legacy Gorakhpur post `blog.html` becomes the destination guide `/destinations/gorakhpur/places-to-visit/`, not a blog post; a few drafts from the long-tail topics in the report's §12.4).

Acceptance: as Phase 4.

### Phase 6 — Trust and support
About (the owner's real story — no invented history) · contact · FAQ · reviews (real entries only, else a link to the Google profile) · terms, privacy (mentions India's DPDP Act, analytics, a grievance contact) and refund policy — generated from config values and marked for owner review · attach-your-taxi and drive-with-us (partner lead forms) · payment-safety notice ("we only take payment via …").

Acceptance: as Phase 4.

### Phase 7 — SEO hardening, QA, performance
JSON-LD on every template (builder unit tests + a validator run) · dynamic OG images · footer link lists from data · sitemap completeness (published only) · canonical audit · redirect check now asserting every legacy URL's **effective** destination (target if published, else fallback) returns 200 in one hop · link checker · Lighthouse CI on key templates · bundle report per route · axe on every template · a low-end run (Slow 4G, 4× CPU). Fix what fails.

Acceptance: every budget in `CLAUDE.md` met, or a written reason and fix plan for each miss.

### Phase 8 — Launch prep
- Hosting (decided): the owner's Hostinger VPS — Docker (Next.js standalone output) + Nginx + Certbot, Cloudflare in front (Full (strict) SSL, real client IP forwarded for rate limiting). www → apex redirect, env vars set, sinks tested live.
- Database: `taxiverz` on the VPS PostgreSQL (dedicated user with rights on that database only), migrations applied, daily backup, a cron calling `/api/leads/retry` every 5 minutes.
- Search Console: verification kept, new sitemap submitted, 404s watched. GTM/GA4: conversions for `lead_submit`, `whatsapp_click`, `call_click`, plus a short guide for Google Ads offline conversion import. Google Business Profile: website URLs with UTM tags; name/address/phone identical to the site.
- Delete `legacy/` after the redirect check passes on the live domain.
- Hand over a 14-day post-launch checklist.

### 7.H — Live-site hotfix track (parallel to the phases)

The legacy site keeps earning (and losing) money until launch, so live defects are fixed on the old site now instead of waiting for Phase 8.
- `main` mirrors what is live on Hostinger, exactly. It starts as a snapshot of the owner's `public_html` download (logs and server-only folders excluded, checked for secrets).
- Each fix is a `hotfix/<topic>` branch off `main`: smallest possible change, no redesign, no new features.
- Deliverable: `hotfix-upload.zip` with only the changed files at their folder paths, plus the list of files, for upload through Hostinger File Manager.
- After the owner confirms the upload is live: merge the hotfix into `main`, then rebase `nextjs-rebuild` onto `main` (force-push with lease).
- First hotfix (`hotfix/live-site`): self-canonicals on every page, fixed `og:url`/`og:image`, `robots.txt` Sitemap line, `/index.html` out of `sitemap.xml`; every form submits to Web3Forms with one key (success shown only when the API confirms; on failure WhatsApp opens pre-filled with the same details); fabricated rating, "#1 rated"/"4.8" claims, visitor counter and placeholder testimonials removed; Nepal document advice replaced with owner-approved text; sensible caching in `.htaccess` (HTTPS redirect kept); hotlinked images replaced or removed.

---

## 8. Growth mode (after launch)

The site must scale like Lakshya's footprint without Lakshya's URL chaos or thin pages. Every expansion goes through data entries → §5 gates → `npm run check`:
- New routes in batches (reverse routes, more Nepal and pilgrimage routes, Pune routes).
- New origin cities (Varanasi, Lucknow, Ayodhya, Kushinagar, Deoria, Patna …) once each has ≥ 3 routes.
- Service × city pages only where Taxiverz really operates.
- Packages with `from-{city}` variants (Nepal circuits, Char Dham, Buddhist circuit, Ayodhya–Varanasi darshan).
- Destination guides and blog posts for the long-tail topics.

The owner's copy-paste prompts for each are in `PROMPTS.md`.

---

## 9. Owner questions (seed for `OWNER_TODO.md`)

1. **Pricing model**: one-way ₹/km per vehicle? Round-trip ₹/km and minimum km/day per vehicle? Driver allowance per day? Night charge rules? GST — rate, included or extra? How tolls, state permits and Nepal border charges are charged? Does "garage to garage" apply beyond luxury cars?
2. **Missing or conflicting prices**: tempo travellers, Urbania, buses, bikes, Jaguar XJL, Mercedes SLK, vintage cars, Audi Q3; ₹8 vs ₹10/km for the Dzire; the ₹29–58/km rates on the Mankapuram page.
3. **Brand**: "Taxiverz" or "TaxiVerz"? Keep the tagline "Luxury on the Move"? Is a vector (SVG) logo available?
4. **Contact**: confirm 8576000083 as the only public number (what is 8576000074 for?). Which email receives leads — cabtaxiverz@gmail.com or info@taxiverz.com (does that mailbox exist)? Are Instagram `travel_nepal_club` and the Facebook page Taxiverz's own?
5. **Proof**: years in operation, trips or customers served, GST/registration details, permits, Google Business Profile link, real reviews you're allowed to quote (names or initials), corporate or wedding clients who gave permission. Only what is true and provable.
6. **Pune**: which services and vehicles run from the Pune branch? Hours?
7. **Nepal operations**: which border crossings you use; whether Indian vehicles go through to Kathmandu/Pokhara or passengers switch vehicles at the border; how Bhansar/customs and other charges are handled; documents needed for Indian, Nepali and foreign passengers; Nepali-speaking drivers; how Muktinath is done (vehicle change? permits?).
8. **Unverified pages**: is "Mankapuram" real? Who operates the helicopter charter and the Everest mountain flight, and at what price? Should those live on Taxiverz or on nepaltoursandtravels.com?
9. **Self-drive**: which cars are really available for self-drive (legacy lists BMW, Mercedes, Audi, Jaguar, Defender)? Deposit and document rules?
10. **Policies**: free-cancellation window, advance payment, refund timeline, payment methods, the official payment accounts for the payment-safety notice, grievance contact.
11. **Service promises**: is 24/7 true? What callback time can you always keep? GPS tracking?
12. **Photos**: real photos of your own cars, drivers and office — the single biggest visual upgrade available.
13. **Design**: which demo prototype, if any, is the reference?
14. **Leads and tracking**: lead email, WhatsApp Business number, Telegram (optional), when TravelCRM should start receiving website leads, GTM/GA4/Google Ads IDs.
15. **Hosting**: decided — Hostinger VPS (Docker + Nginx + Certbot, Cloudflare).

---

## 10. Later roadmap (not in this rebuild)
Hindi version (`/hi/`) · online advance payment (Razorpay) and EMI on packages above ~₹50,000 · booking lookup by ref + phone OTP · TravelCRM as system of record (lead auto-assignment, driver assignment, WhatsApp confirmations) · live driver-tracking link · flight tracking for airport pickups · automated review requests after trips · call-tracking numbers per channel · Pune expansion · 300+ routes.
