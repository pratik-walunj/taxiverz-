# Progress log

Phase plan: `docs/REBUILD_PLAN.md §7`. Open questions: `docs/OWNER_TODO.md`. Legacy audit: `docs/AUDIT.md`.

| Phase | Status |
|---|---|
| 0 — Scan and audit | ✅ done 2026-09-28, awaiting owner review |
| 7.H — Live-site hotfix | ✅ built on `hotfix/live-site` (pushed); ⏳ owner uploads `hotfix-upload.zip` and confirms it's live → merge into `main` → merge `main` into `nextjs-rebuild` |
| 1 — Foundation | ✅ done 2026-09-28 — pushed |
| 2 — Data layer and migration | ✅ done 2026-09-28 — pushed |
| 3 — Fare engine and booking funnel | ✅ done 2026-09-28 — pushed |
| 4 — Core pages | ✅ 4A done 2026-09-29 — pushed; 4B route content waits for reviewed distances (L3) and D1 |
| 5–8 | not started |

---

---

## Phase 4 — Core pages (2026-09-29)

Owner said "go" with all three recommendations: (A) copy publishes when it passes its gate, owner reviews from OWNER_TODO L8; (B) the 4A publish set below; (C) route content waits for the reviewed distances CSV and D1.

### Done
- **Now published (12 content pages + home):**
  - the service hubs `/outstation-cabs/`, `/one-way-cabs/`, `/airport-taxi/`, `/local-car-rental/` and `/tempo-traveller/`;
  - the same five × Gorakhpur;
  - the Gorakhpur hub `/cabs/gorakhpur/`;
  - `/fleet/` (the 14 classes, no photos).
- **Still draft:**
  - built but held: nepal-taxi (+ Gorakhpur, Raxaul); luxury, wedding, shoot, bus, self-drive, bike and corporate;
  - waiting on data or owner answers: the Pune hub (C7), every route (distances), every vehicle (B3/F1);
  - `/cabs/`, which publishes only once it lists ≥ 3 entries.
- **Templates** (REBUILD_PLAN §4):
  - `ServicePage` for hubs and × city, with the luxury register;
  - the city hub, with a branch block linking to Google Maps and no embedded map (no verified geo);
  - `RoutePage`: when nothing is priced, its fare table becomes "choose a car" links into `/book/`;
  - `VehiclePage`: own photos only.
  - Routes use `app/[service]`, `[service]/[city]`, `cabs/[city]/[route]` and `fleet/[vehicle]` with `dynamicParams = false`, instead of 13 static folders: one template, and only live slugs are built. The plan's static folders were an implementation note, not a requirement.
- **Sections:** FAQ (`<details>` + FAQPage JSON-LD), CTA band with the three closes, services grid, fleet strip (keyboard-scrollable region), how booking works, route list (milestones), Prose. Service JSON-LD added.
- **Copy** in `src/data/copy/`, following the §5 voice and truth rules. My own review removed several unverifiable claims: "started in Gorakhpur", "trips we run most", a roof carrier, "on a budget", airport proximity, and a town not in the data. Word counts are 203–245 on hubs and 200–260 on × city pages.
- **Distances pipeline:** `npm run distances:fetch` (Google Routes API → `docs/route-distances.csv`; keeps the owner's review columns; Nepal via the D1 border waypoint), then `npm run distances:apply` (reviewed rows → `src/data/route-distances.generated.ts` → route data). Dry-run proven with a stubbed API; not run for real (no key).
- **Fixed a Phase 1 redirect bug:** `NextURL` dropped the trailing slash, so legacy URLs reached hub pages in two hops (301 then 308). They now arrive in one 301 with the query kept. It was invisible while every destination was `/`.
- **qa:** a static page that calls `notFound()` (the unpublished `/cabs/`) is built as Next's 404 error shell. qa now skips those, and fails if a *published* path is one. `npm run qa -- --similarity` lists the closest page pairs.

### Verification
- `npm run check` ✅ — 107 unit tests (3 DB tests skipped), qa OK on 14 pages. Highest near-duplicate score 0.18 (limit 0.35).
- `npm run test:e2e` ✅ — 22 tests. New: every sitemap page renders at 360 and 1280 with one H1, a way to book, live-only breadcrumbs, no serious axe issues and no sideways scroll; drafts answer 404; service pages open the right widget tab.
- `npm run redirects:check` ✅ all 158 legacy URLs, one hop. With `--launch`, URLs landing on `/` went from **155 → 86**. Most of the rest are vehicles, bikes, shoots, luxury and Nepal pages (B3/F1, Phase 5) plus about, contact and FAQ (Phase 6).
- Screenshots at 360, 768 and 1280 reviewed for home, hub, × city, city hub and fleet, and in dev for the route and vehicle template previews (`/styleguide/route/`, `/styleguide/vehicle/`). Fixed: breadcrumb contrast on dark pages, and the "Get a quote" wall on route tables.
- **Lighthouse mobile (local, `next start`, lighthouse 12):**
  - Accessibility, Best Practices and SEO score 100 on every page tested.
  - **Performance: home 72–82, hubs 83–89, `/fleet/` 78–89.** Target was ≥ 90, so not met locally.
  - Fixes applied: the logo was the LCP element and lazy-loaded at 768 px wide (now eager, 1x/2x at its shown size); five fonts (~300 KB) were preloaded (now Latin only, ~100 KB); the hero's fade-in hid the LCP text for ~2 s (movement kept, fade removed).
  - `experimental.inlineCss` was tried and reverted: it doubled the CSS into the RSC payload (HTML 256 KB) and scored lower.
  - What's left is the React/Next runtime (~150 KB gzipped) in Lighthouse's simulated slow 4G. The local numbers are pessimistic: the CPU benchmark index is ~1000 and scores swing ±6 between runs. Carried into Phase 7, measured with PageSpeed Insights on the VPS.

### Not done / limits
- 4B route content: waits for L3 (key) → reviewed CSV → D1. The template is built and previewed.
- No hero photo, trust line, "why Taxiverz", reviews, Nepal band or packages on home: each needs verified facts or photos (F1, H2, D1–D3).
- Next logs `Error: Internal: NoFallbackError` once for each 404 under a dynamic route (for example `/nepal-taxi/`). The response is a correct 404; the line is log noise to filter in Phase 8 logging.

### Dependencies
None added. Lighthouse ran via `npx lighthouse@12`.

### Plan (as approved)

### Scan
- `validate:data`: 14 vehicle classes published; **everything else is draft**. 13 services and 12 service × city pages have no intro or FAQs yet. 42 cities: only Gorakhpur and Pune are branches (the other 40 need 3 published routes). All 56 routes are missing verified distances and content. 81 vehicles are waiting on B3 (fleet confirmed) and F1 (own photos).
- No `.env.local`, so **no `GOOGLE_MAPS_API_KEY`**: `fetch-distances` can't run, and no route can pass its gate this phase.
- Hotfix still not live (`/whatsapp-forms.js` → 404), so no merge yet.
- `qa` already has the near-duplicate check (Jaccard > 0.35). Lighthouse isn't installed; I'll run it with `npx lighthouse` and system Chrome rather than adding a dependency.
- Not yet built: breadcrumbs, `components/sections/`, `components/cards/`, Service / BreadcrumbList / FAQPage JSON-LD builders.

### Plan
1. **Templates and sections** (§4): Breadcrumbs (skipping unpublished hubs), FAQ accordion, CTA band with the three closes, services grid, fleet-by-class strip (scroll-snap), "how booking works" steps, service hero with the right widget tab. JSON-LD builders: Service, BreadcrumbList, FAQPage.
2. **Service hubs** `/{service}/` and **service × city** `/{service}/{city}/`: static folders rendering one shared template (standard and luxury register).
3. **City hub** `/cabs/{city}/`:
   - Widget, services in the city, published routes grouped by region (hidden when there are none).
   - Local packages by class.
   - Airports and stations from `places`.
   - Branch block: address, hours only if known, and a click-to-load map facade.
   - FAQs.
4. **`/cabs/` directory**: lists published city hubs and routes. It publishes only once it has ≥ 3 entries, so it never goes out as a thin page.
5. **Fleet**:
   - `/fleet/` lists the 14 published classes by tier: name, "Dzire, Etios or similar", seats, luggage, "Check fare". No photos until F1 is answered.
   - The `/fleet/{vehicle}/` template is built and tested against fixtures, but every vehicle stays draft (B3/F1).
6. **Home**:
   - Add sections backed by real data: services (published hubs only), fleet by class, how booking works, FAQ about booking.
   - Hidden until verified or published: hero photo (F1), trust line and "why Taxiverz" (need verified proofs), popular routes, Nepal band (D1–D3, Phase 5), reviews, packages.
7. **Copy.** I write every intro, local-specifics block and FAQ as data, in the §5 voice.
   - Taxiverz facts come only from `business.ts` and owner answers. No 24/7, no response times, no prices, no fleet counts, no border rules.
   - Place facts (stations, airport, landmarks, highways) are public and checkable. Every FAQ answer must be true today.
   - Everything I write goes on an owner review list in OWNER_TODO.
8. **What publishes in 4A** (if the gates pass):
   - Hubs: outstation-cabs, one-way-cabs, airport-taxi, local-car-rental, tempo-traveller.
   - The same five × Gorakhpur.
   - The Gorakhpur city hub and `/fleet/`.
   - Built but kept draft: nepal-taxi (+ Gorakhpur, Raxaul) until the D-questions and Phase 5. Luxury, wedding, shoot, bus, self-drive, bike and corporate wait for B3/F1 and Phase 5. The Pune hub waits for C7.
9. **Nav and footer** show only published pages (already enforced). Update `legacy-url-map` effective destinations and report the `redirects:check --launch` count before and after.
10. **Before 4B:** write `scripts/fetch-distances.ts` (Routes API; Nepal routes through the crossing Taxiverz uses — D1 — as a waypoint). It writes `docs/route-distances.csv` with legacy vs Google km and time. It's unit-tested with a mocked API, but not run: no key.
11. **4B — route template:** built and tested with fixture routes (fare table from the engine, facts card, stops, FAQs, related links, CTA band). **Route content batches wait for the reviewed distances CSV and D1**, because the prose cites distance, time and the border crossing. Writing it now would mean guessing.
12. **Checks:**
    - `npm run check`.
    - e2e: every published page renders, has one H1 and a working widget or enquiry.
    - axe on each template.
    - Screenshots at 360, 768 and 1280.
    - Lighthouse mobile ≥ 90 on home, one service hub and `/fleet/`. The acceptance says "one route and one vehicle", but none can be published yet; the templates get audited on the styleguide fixtures.

### Decisions to confirm
- **A. Copy publishes when it passes its gate.** It sits in the repo only and nothing deploys before Phase 8; you review it from the OWNER_TODO list. Alternative: keep it all draft until you've read it.
- **B. The 4A publish set** in step 8: five cab-service hubs + Gorakhpur pages, the Gorakhpur hub and `/fleet/`. Nepal, the luxury/enquiry verticals and Pune wait.
- **C. Split route content (4B) out** until `GOOGLE_MAPS_API_KEY`, the reviewed CSV and D1 are in. The route template is still built now.

### Owner inputs that would unlock more pages
L3 (Maps key) → routes → more city hubs and `/cabs/` · B3 + F1 → vehicle pages and luxury/wedding/shoot · C7 → Pune hub and Pune services · D1–D3 → Nepal pages · B1/B2 → real fares everywhere.

### Dependencies
None planned.

---

## Phase 3 — Fare engine and booking funnel (2026-09-28)

Owner said "go" with the three proposals below: 14 classes published (Open 4×4 enquiry-only), SMTP email sink, `/book/` live but noindex and out of the sitemap.

### Done
- **Fare engine** `src/lib/pricing/` — pure `computeFare` for one way, round trip, local packages and airport; any missing input → `on-request` with a reason. Shared by the widget, `/book/` and the server recompute. `src/config/pricing.ts` is `status: 'draft'` with every policy `null` (added `parkingIncluded`, RATE_CARD "Parking" row).
- **Included / not included lists only state rate-card facts.** On-request quotes show no lists; priced quotes list tolls, parking, GST and Nepal charges only when the config says so. (A first draft hard-coded "Fuel included, parking excluded" — removed as invented.)
- **Fare index** `/fare-index.json` (static, 2.6 KB gzipped): places, verified distances only, live classes.
- **Widget** `FareWidget` (4 tabs, ARIA combobox `PlaceCombobox`, keyboard tabs) above the fold on the home page and on `/book/`. Client JS it adds ≈ 3 KB gzipped; page total ≈ 199 KB gzipped, of which ~150 KB is the React/Next runtime.
- **Funnel** `/book/` (state in the URL) → car cards cheapest first + call-back form → `?class=` trip details → contact → **Confirm booking · Book on WhatsApp · Call to book** → `/book/confirmed/?ref=`. Draft kept in sessionStorage. If the API fails, WhatsApp opens with the same summary and ref.
- **Lead API** `POST /api/leads/` — Zod, honeypot, 3 s minimum fill time, 5 per IP per 10 min, server-side fare recompute, ref `TVZ-YYMMDD-XXXX` (IST, no look-alike characters). Postgres outbox (`leads`, `lead_deliveries`, migration `drizzle/0000_*.sql`); sinks email (SMTP), Telegram, signed webhook — each on only when configured. DB unreachable → direct delivery. Nothing stored or delivered → 503 with the ref → WhatsApp fallback. Cron endpoints `POST /api/leads/retry/` (backoff 1/5/30/120/720 min) and `/api/leads/maintenance/` (24-month purge), Bearer `LEADS_RETRY_TOKEN`. Logs carry the ref only, never personal data (unit-tested).
- **Tracking** — GTM via `@next/third-parties` only when `NEXT_PUBLIC_GTM_ID` is valid; typed `track()`; attribution (gclid/gbraid/wbraid/utm_*, landing page, referrer; 90 days) attached to every lead; call/WhatsApp clicks tracked by `data-placement` (header, mobile-nav, sticky-bar, footer, home-hero, booking-*).

### Verification
- `npm run check` ✅ — 91 unit tests pass (3 DB tests skipped: no `TEST_DATABASE_URL`), pricing line coverage ≥ 90 % gate, qa OK.
- `npm run test:e2e` ✅ — 16 tests at 360 px and 1280 px: home → Gorakhpur to Kathmandu → Sedan → details → contact → confirmation (API mocked); WhatsApp link carries the summary and ref; call link; API failure → WhatsApp fallback; keyboard tabs and combobox; `/book/` noindex and not in the sitemap; no horizontal scroll at 360 px; axe: no serious/critical issues.
- Smoke on `next start`: 422 invalid, 200 spam (silent), 503 + ref with no sinks, 401 cron without token.
- Screenshots at 360 and 1280 reviewed (home, `/book/`, results, class step, confirmation).

### Not done / limits
- Every fare shows "Get a quote" until the rate card (B1/B2) and verified distances (B5, L3) arrive — by design.
- The DB integration test (`tests/unit/outbox.db.test.ts`) has not run: the local PostgreSQL needs a password. Run with `TEST_DATABASE_URL` pointing at a throwaway database.
- VPS cron entries for retry/maintenance are Phase 8.

### Dependencies added
`drizzle-orm`, `pg`, `drizzle-kit`, `nodemailer`, `@next/third-parties`, `@axe-core/playwright`, `@vitest/coverage-v8`, `server-only` (keeps `src/config/env.ts` and `src/server/**` out of client bundles), `@types/pg`, `@types/nodemailer`.

### Plan (as approved)

### Scan
- Hotfix still not live (`/whatsapp-forms.js` → 404 on taxiverz.com), so `main` is unchanged and no merge yet.
- PostgreSQL 18 runs locally on :5432, but there is no `.env.local`/`DATABASE_URL`, so no credentials.
- Data: every rate is `null` (RATE_CARD unanswered), every route distance is unverified, all vehicle classes are draft. So every fare the engine produces today is **"on request"**. The engine is still fully built and tested, against fixture rates.
- Versions: drizzle-orm 0.45.3, drizzle-kit 0.31.11, pg 8.23, nodemailer 10.0, @axe-core/playwright 4.13, @next/third-parties 16.3.6.

### Plan
1. **Fare engine** `src/lib/pricing/` (pure). One way, round trip (days from max driving km/day, nights, tolls × 2), local packages, airport (fixed fares if configured, else one-way with an airport minimum), enquire-mode → "from" price only when verified. Minimum km, night charge, GST (rate and included/extra from config), rounding, reverse routes reuse the route distance, and any missing input → `on-request` with a reason. Output `{ status, reason, total, lines, included, excluded, assumptions, isEstimate }`. Vitest with fixture rates, ≥ 90 % line coverage on `lib/pricing` (adds `@vitest/coverage-v8`).
2. **Fare index**: a slim static JSON (places + aliases, verified route distances and tolls, live class rates; no prose), generated at build and lazy-loaded by the widget on first interaction. Target widget JS + index ≤ ~40 KB gzipped.
3. **Widget**: accessible `PlaceCombobox` (ARIA combobox, keyboard, touch, free text allowed → "exact fare on WhatsApp"), `FareWidget` with 4 tabs (One way · Round trip · Local · Airport), two inputs and "Check fare", trust line from verified facts only (none yet, so hidden). Placed above the fold on the home page.
4. **Funnel** `/book/` (noindex, dynamic, state in the URL, draft in sessionStorage):
   - results: class cards cheapest first, "Sedan — Dzire, Etios or similar", availability note, "Request a call back";
   - trip details: date, time, return date; fare updates live;
   - contact and close: name, mobile (+91 default, +977 allowed), optional email, pickup address, consent notice, unticked WhatsApp opt-in; **Confirm booking · Book on WhatsApp · Call to book** side by side;
   - `/book/confirmed/?ref=`.
   - One shared WhatsApp message builder (summary + ref). If the API fails, WhatsApp opens with the same summary.
5. **`POST /api/leads`**: Zod, honeypot, minimum fill time, per-IP rate limit (in memory: one VPS instance), server-side fare recompute, ref `TVZ-YYMMDD-XXXX`.
   - **Outbox** (Drizzle + `pg`): `leads` + `lead_deliveries`, migrations in `drizzle/`.
   - **Sinks**: email (SMTP via nodemailer), generic webhook, Telegram — each on only when its env vars are set.
   - Immediate delivery attempt, backoff retries via token-protected `POST /api/leads/retry`, 24-month purge via `POST /api/leads/maintenance` (both for the VPS cron). Database unreachable → deliver directly and log without personal data.
6. **Tracking**: typed `track()` → `dataLayer`; GTM via `@next/third-parties` only when `NEXT_PUBLIC_GTM_ID` is set; gclid/gbraid/wbraid/utm_* + landing page + referrer captured on first visit, kept 90 days, attached to every lead.
7. **Tests**:
   - Unit: engine, WhatsApp builder, ref generator, anti-spam, lead service with mocked DB and sinks, including "DB down → direct delivery".
   - Integration: against local Postgres when `DATABASE_URL` is set, otherwise skipped.
   - Playwright (acceptance): home → Gorakhpur to Kathmandu → pick a class → details → submit (sinks mocked) → confirmation. Also checks the WhatsApp link carries the summary and ref, the call link is right, the flow works by keyboard and at 360px, and axe finds no serious issues.

### Decisions to confirm
- **Publish the vehicle classes now** (they pass their gate) so the funnel and fare results work end to end, showing "Get a quote" / "exact fare on WhatsApp" until the rate card is filled. Proposed: the 7 car classes + tempo traveller, Urbania and Winger (14); Open 4×4 stays enquiry-only. Without this, `/book/` has nothing to show and no route can ever pass its gate.
- **Email sink = SMTP (nodemailer)** rather than Resend: it works with the owner's existing mailbox and Hostinger mail with no domain verification step. Resend can be added later behind the same interface.
- `/book/` counts as a live, linkable page (so "Check fare"/"Book" appear in the header and sticky bar) but stays out of the sitemap (noindex).

### Owner inputs (none block the build)
- **`DATABASE_URL`** for local development: create database `taxiverz` and a user on the local PostgreSQL 18 (cmd commands will be provided). Without it the outbox code falls back to direct delivery and the DB integration test is skipped.
- **Lead sinks** (G2): SMTP host/user/password and the inbox that receives leads; optional Telegram bot token + chat id; optional webhook URL. Without them: outbox + WhatsApp fallback only.
- **Rate card** (B1/B2) for real fares.

### Dependencies to add (with reasons)
`drizzle-orm` + `pg` (outbox — owner decision), `drizzle-kit` (migrations), `nodemailer` (SMTP email sink), `@next/third-parties` (GTM loader named in the plan), `@axe-core/playwright` (axe in e2e, plan acceptance), `@vitest/coverage-v8` (the ≥ 90 % coverage gate), `@types/pg`, `@types/nodemailer`.

---

## Phase 2 — Data layer and migration (started 2026-09-28)

### Scan
- No `.env.local`, so no `GOOGLE_MAPS_API_KEY`: `scripts/fetch-distances.ts` is skipped this phase (owner told). Place coordinates stay `null`.
- 3 Aug cleanup (`Downloads/taxiverz.com/public_html/`): 111 compressed images in `assets/img/` (19 MB, ≤ 1600px, lowercase-hyphenated names), 61 originals in `_dev/original-images/`, old → new name pairs in its `.htaccess` (`Redirect 301` lines), and 11 vehicles shown with `placeholder.svg` (`_dev/README.md`).
- `sharp` 0.35.5 already installed (via Next) → made a direct devDependency.

### Plan
1. Copy the cleanup's images, name map and placeholder list into `legacy/cleanup-2026-08-03/` (committed, so the migration is reproducible from the repo).
2. Zod schemas: City, Place, Route, VehicleClass, Vehicle, Service, ServiceCity. (Package, Destination, Review, Client and FAQ schemas arrive with their data in Phases 5–6 — no empty stubs.)
3. Data: cities and places (Hindi names, aliases, airports, stations, border points; geo `null`); 56 routes (legacy distance, time and via kept in a `legacy` field; verified distance `null` until the owner-reviewed CSV; long-distance `ownerConfirmed: false`; all draft); 15 vehicle classes from RATE_CARD (every rate `null`, since nothing is confirmed); vehicles (54 legacy pages + those named without a page, all draft until B3); 13 services and the service × city allow-list.
4. `lib/content` accessors as the only way to read data; `published.ts` becomes data-driven.
5. `validate:data`: §5 gates, unique slugs, references resolve, images exist, placeholder scan, URL-map targets match data slugs.
6. `scripts/migrate-images.ts` (sharp): WebP, ≤ 2000px, metadata stripped → `public/images/{fleet,shoots,places}/`; each image viewed to fix mismatches (Gypsy/Jeep) and tagged `source: own | stock | render | unknown`; writes `docs/IMAGE_MAP.md`.
7. Unit tests: schemas, accessors, gates, image references.

### Decision (owner didn't choose; strict default applied)
Vehicle gate "≥ 1 real image" = an image the owner has confirmed shows their own vehicle (F1). Until then every vehicle page is draft.

### Done
- **Image source in the repo:** `legacy/cleanup-2026-08-03/` — 111 images (byte-identical to the cleanup), its README (placeholder list), its `.htaccess` as `htaccess.txt`, and `name-map.json` (110 legacy → cleaned name pairs; every legacy image accounted for).
- **Images viewed, all 110** (contact sheets). None is recognisably Taxiverz's own: most are AI renders on grey (many with an orange caption baked in), the rest stock photos. Model mismatches: both "Urbania" exteriors, the "26-seater", the captioned "Force Urbania", "BMW 520d" (a 3 Series body), the older Innova on the Crysta page. **Correction:** the Gypsy/Jeep *filenames* are swapped but each legacy page shows the right vehicle.
- **`scripts/migrate-images.ts` + `scripts/image-manifest.ts`** (`npm run images:migrate`, sharp): 92 images → `public/images/{fleet,shoots,packages}/*.webp` (≤ 2000px, metadata stripped; 6.6 MB total vs 19 MB cleanup / 51 MB legacy), each tagged `source` (`render`/`stock`/`unknown`), `bakedInText`, `modelMismatch`; 19 skipped with reasons. Writes `src/data/images.generated.ts` and `docs/IMAGE_MAP.md`. The script fails if any cleanup image is neither migrated nor listed as skipped.
- **Schemas** (`src/lib/schemas/content.ts`): City, Place, Route (with a reference-only `legacy` block), VehicleClass, Vehicle (+ image), Service (with sub-pages), ServiceCity, FAQ.
- **Data** (`src/data/`): 42 cities (Hindi names, aliases, states), 16 more places (8 airports, 6 stations, 2 border points; codes only where certain — Pokhara's left null), 56 routes (legacy distance/time/via/places-to-visit and 31 audit flags kept for Phase 4B; verified distance null), 15 vehicle classes (rates null), 81 vehicles (54 legacy pages + 27 named without a page; per-model rate slots for enquire-mode vehicles, all null; conflicts in `flags`), 13 services (shoot types as sub-pages), 12 service × city pages.
- **`lib/content`**: `data.ts` parses everything with Zod once; `gates.ts` = the §5 gates (+ a service-hub gate: 150-word intro and 4 FAQs, not in §5); `index.ts` accessors return live entities only (published + gate passing); `published.ts` is now data-driven (static `/` + live content + `/cabs/` and `/fleet/` once they have something to list).
- **`validate:data`**: schemas, uniqueness (cities and places share one id space), references, route slug form, `isInternational` vs country, images on disk, placeholder scan over all data, published-must-pass-gate, legacy-map coverage **and every map target/fallback must match a data entity or planned page** (packages/destinations listed as waiting for Phase 5). Prints published vs draft with reasons (`--verbose` lists each draft). Data is loaded dynamically so bad data is reported, not a crash.
- **Tests:** 31 unit tests (13 new: data invariants, URL-map ↔ data consistency, aliases/codes, images on disk, every gate, nothing published yet).

### Counts — published vs draft
| Entity | Published | Draft | Why the drafts are drafts |
|---|---|---|---|
| Vehicle classes | 0 | 15 | status draft — they pass their gate; they go live with the fare engine in Phase 3 once rates exist |
| Services | 0 | 13 | no intro / FAQs yet (Phases 4A–5) |
| Service × city | 0 | 12 | hub not published; no local content / FAQs (Phase 4A) |
| Cities | 0 | 42 | no intro (Phase 4A); 40 also need 3 published routes (only Gorakhpur and Pune are branches) |
| Routes | 0 | 56 | distance unverified (no Maps key yet), no content/stops/FAQs (Phase 4B), no live vehicle class; 11 also long-distance unconfirmed (E3) |
| Vehicles | 0 | 81 | not confirmed in the fleet (B3), no owner-confirmed photo (F1); 30 also have no agreed seat count |

### Verification
- `npm run check` ✅ (lint, Prettier, typecheck, 31 tests, validate:data, build, qa). `redirects:check` ✅ (still all → `/`, as nothing is published).
- Negative test: marking a draft route `published` makes `validate:data` fail and list all six reasons.

### Not done this phase
- `scripts/fetch-distances.ts`: skipped — no `.env.local` / `GOOGLE_MAPS_API_KEY` (owner told). Precondition for Phase 4B.
- Package, Destination, Review, Client, FAQ-page schemas: with their data in Phases 5–6 (no empty stubs).

### Dependencies
`sharp` (0.35.5, already installed by Next) made a direct devDependency for the image script.

---

## Phase 1 — Foundation (started 2026-09-28)

### Plan (all done)
1. ✅ Merge `main` (live snapshot) into `nextjs-rebuild`; `git mv` the legacy site into `legacy/`.
2. Scaffold Next.js by hand (the folder isn't empty): Next 16.3.6, React 19.3, TypeScript 6.0.3 strict (not 7.0: typescript-eslint supports < 6.1), App Router, `src/`, Tailwind 4.3 CSS-first tokens, `@/*` alias.
3. `next.config.ts`: `trailingSlash`, AVIF/WebP, `output: 'standalone'`, security headers, `poweredByHeader: false`. Legacy redirects: `src/proxy.ts`, scoped to `.html` paths — one lookup table built from `legacy-url-map.json`, case-insensitive, `%20`/space-tolerant, exact **301**, one hop to the effective destination (target if published, else fallback, else `/`). One mechanism instead of `next.config` redirects plus a proxy, because every legacy URL needs the case and encoding handling anyway.
4. Tooling: ESLint 9 flat config (`eslint-config-next`; ESLint 10 isn't supported by the React/import plugins yet), Prettier, Vitest, Playwright, `tsx`; scripts `dev build start lint typecheck test test:e2e validate:data qa check redirects:check`; `.gitattributes`, `.editorconfig`, `engines`, `.env.example`, Zod-validated `src/config/env.ts`.
5. Design: `docs/DESIGN.md` (tokens, type, spacing, registers, wireframes, components, self-review against the template tells), then tokens, fonts, primitives (Button, Price, Badge, Container, Section, Milestone) and a dev-only `/styleguide/`.
6. Config: `business.ts` (audit + owner defaults; unknowns `null`), `site.ts`, `pricing.ts` (`status: 'draft'`), `tracking.ts`.
7. Shell: root layout (`en-IN`, `metadataBase`, GSC token, default OG), Header + MobileNav sheet, Footer (both branches), StickyActionBar, SkipLink, Breadcrumbs, `not-found.tsx`. Links render only for published paths (Phase 1: `/`), so there are no dead links.
8. SEO core: `buildMetadata`, JSON-LD builders (Organization, WebSite, LocalBusiness) + `<JsonLd>`, `robots.ts`, `sitemap.ts`.
9. `scripts/check-redirects.ts` against `next start`.
10. `npm run check` = lint + typecheck + test + validate:data + build + qa (qa runs after build because it scans rendered HTML). Screenshots of home and `/styleguide/` at 360px and 1280px.

### Done
- **Legacy:** `main` merged in (`--allow-unrelated-histories`), all 296 files `git mv`'d to `legacy/` (byte-exact; `legacy/** -text` in `.gitattributes`).
- **Scaffold:** Next.js 16.3.6 (Turbopack), React 19.3, TypeScript 6.0.3 strict (`noUncheckedIndexedAccess`), Tailwind 4.3, ESLint 9 flat config (`core-web-vitals` + `typescript`, no warnings allowed), Prettier (+ Tailwind class sorting), Vitest 5, Playwright 1.63 (system Chrome), `tsx`. `.gitattributes`, `.editorconfig`, `engines`, `.env.example`, Zod `src/config/env.ts` (empty values = unset).
- **Checked against the bundled Next 16 docs** (`node_modules/next/dist/docs`, as its AGENTS.md requires): `proxy.ts` replaces middleware (Node runtime); `images.qualities` is now required; `priority` is deprecated for `preload`; `next lint` is gone; `.html` paths are exempt from the trailing-slash redirect, so legacy URLs reach the proxy in one hop.
- **Design:** `docs/DESIGN.md` (tokens with measured contrast, type scale, spacing, two registers, milestone spec, wireframes, component inventory, template-tell self-review, style-guide review in §11). Tokens in `globals.css` `@theme`; Mukta + Anek Latin via `next/font`; primitives Button, Price, Badge, Container, Section, Milestone, VisuallyHidden, WhatsAppIcon; `/styleguide/` as `page.dev.tsx` — `pageExtensions` include `dev.tsx` only under `next dev`, so it never exists in a production build.
- **Brand assets:** `public/images/brand/logo.png` (the legacy logo, background made transparent, design unchanged), favicon/apple icon cropped from the logo's car, default OG image 1200×630.
- **Config:** `business.ts` (audit + owner answers; unknowns `null`, e.g. geo, hours, GSTIN, socials), `site.ts` (nav/footer definitions), `pricing.ts` (`status: 'draft'`, all rates `null`), `tracking.ts`; `lib/content/published.ts` is the single publish registry (Phase 1: `/` only).
- **Shell:** root layout (`lang="en-IN"`, `metadataBase`, GSC token, viewport `width=device-width, initial-scale=1, viewport-fit=cover`), SkipLink, Header, MobileNav (Radix Dialog sheet; shown only when there are published nav links), Footer (both branches), StickyActionBar (safe-area padded; Book appears once `/book/` exists), Breadcrumbs (+ BreadcrumbList JSON-LD), `not-found.tsx`. Home: H1, intro from confirmed facts, Call and WhatsApp.
- **SEO core:** `buildTitle` (≤ 60), `buildMetadata` (canonical, OG, Twitter, robots; description ≤ 155), JSON-LD builders (Organization, WebSite, LocalBusiness per branch, BreadcrumbList; nulls dropped, never ratings), `<JsonLd>`, `robots.ts`, `sitemap.ts` (published only).
- **Redirects:** `src/proxy.ts` + `lib/redirects/legacy.ts` — all 156 pages + 2 aliases, case- and `%20`-insensitive, exact 301, one hop, query string kept (UTM survives), effective destination = target if published → fallback if published → `/`.
- **Scripts:** `validate:data` (business schema, placeholder scan of config, legacy map schema and 100 % coverage of `legacy/`), `qa` (rendered HTML: placeholders in text/attributes/JSON-LD, one H1, title/description length and uniqueness, self-canonical, og:image, alt, dead links, distinct nav links, lang, exact viewport, no rating markup, near-duplicates), `redirects:check`.

### Verification
- `npm run check` ✅ — lint (0 warnings), Prettier, typecheck, 16 unit tests, validate:data, build (all pages static), qa.
- `qa` negative test: a planted page with `₹--`, two H1s, `href="#"`, an image without alt and AggregateRating → all 9 problems reported, exit 1.
- `redirects:check` ✅ — 158 legacy URLs × exact/lower/upper case = 335 requests, all 301 in one hop; destination `/` answers 200 (it's the only published page so far).
- `test:e2e` ✅ — 6/6 (home, legacy redirect, 404) at 360px and 1280px.
- Screenshots at 360px and 1280px of home, 404 and `/styleguide/`: no horizontal scroll, no console errors on production pages. Findings and fixes in `docs/DESIGN.md §11`.

### Decisions
- One redirect mechanism (proxy) instead of `next.config` redirects + a proxy: every legacy URL needs case/encoding handling anyway, and the proxy gives an exact 301 (config redirects give 308).
- The style guide uses `pageExtensions` rather than `notFound()` in production: `notFound()` during a static build produced an empty error shell that failed `qa` (no `lang`, no H1).
- `qa` runs after `build` in `check` (it needs the rendered HTML).
- Organization + WebSite JSON-LD on the home page only; LocalBusiness per branch on the home page (contact and branch city hubs get it in their phases).
- `next start` is used for tests; production runs the standalone server in Docker (Phase 8).

### Dependencies added (see plan list above)
`@radix-ui/react-dialog`, `node-html-parser`, `prettier-plugin-tailwindcss` (class sorting keeps diffs stable), `rimraf`, `cross-env`, `@eslint/eslintrc` (peer of the flat config). `vite-tsconfig-paths` was tried and removed — Vite now resolves tsconfig paths natively.

### Next step
Owner review of Phase 1. Phase 2 (data layer and migration) needs `docs/RATE_CARD.md` answers for real prices; it can start without them (rates stay `null`, pricing `draft`).

### Dependencies (beyond the CLAUDE.md stack)
- `@radix-ui/react-dialog` — the mobile nav sheet (the shadcn/ui Sheet is built on it; copied in as source, restyled).
- `node-html-parser` — `npm run qa` parses the rendered HTML. Considered: cheerio (heavier), regex (unreliable for attribute and text scanning).
- `rimraf`, `cross-env` — cross-platform npm scripts (CLAUDE.md Windows rule).

## Live snapshot and hotfix (2026-09-28)

- **Snapshot proof.** Every file in the 3 Aug server backup (296 files) was fetched from https://taxiverz.com and compared — 156 HTML, 20 CSS, 3 JS, 110 images and the rest: **all 295 servable files match byte for byte** (`.htaccess` returns 403, as it should). A first pass through Hostinger's CDN returned 102 JPEG/PNG files with different bytes; all were pixel-identical (lossless CDN re-compression), and a second pass answered by the origin server matched exactly. Live headers match the backup's `.htaccess` (`no-cache, no-store` block, http → https 301, gzip). Secrets scan: only the public Web3Forms access key; no logs or server-only folders. Committed to `main` as `snapshot: live site 2026-09-28` (`default.php` is Hostinger's stock page but is served live, so it's included).
- **Hotfix** (`hotfix/live-site`, 158 files changed + new `whatsapp-forms.js`):
  - self-canonical on 154 pages (the 2 junk files have no `<head>`); og/twitter/JSON-LD URLs; robots.txt Sitemap line; `/index.html` out of sitemap.xml;
  - **23 dead forms** (not 20 — live also has alert-only booking modals on the wedding and airport pages, plus an unreachable modal on the home page) now open WhatsApp with everything typed; fake "submitted" alerts removed from `script.js` and three inline scripts; placeholder Web3Forms keys removed; the 117 working Web3Forms forms untouched;
  - fabricated AggregateRating, "#1"/"4.8" claims (6 places), both visitor counters (the helicopter page showed a hard-coded "1,24,582"), placeholder testimonials removed;
  - Nepal documents text replaced as approved; the "Visa Assistance" bullet and the unverified "International driving permits" card removed with it;
  - 8576000074 → 8576000083 (19×, 8 pages); `.htaccess` caching block and www → apex from the 3 Aug cleanup; 3 hotlinked images replaced with local ones; 5 broken links fixed (the cleanup fixed them by rewriting the whole nav, so the same targets were applied as one-line edits).
  - **Verified:** audit extractor re-run (no placeholder canonicals, ratings, testimonials, counters, broken links, hotlinks or second number left) and a Chrome browser test (Playwright): all 23 forms open `wa.me/918576000083` with every typed value and show a status line; no JS errors or alerts on the 21 pages; Quick Booking still works; Web3Forms forms unchanged — 46/46 checks passed.
- **Upload file:** `C:\taxiverz\hotfix-upload.zip` (159 files, all for the `public_html` root; list in `hotfix-upload-files.txt` beside it). Both are git-ignored locally.
- **Merge dry-run (2026-09-28):** hotfix → `main` → `nextjs-rebuild` in a scratch worktree: no conflicts; all 158 changed files land in `legacy/` via rename detection. The one new file, `whatsapp-forms.js`, lands at the repo root (git can't rename a file that didn't exist). Procedure for the real merge: `git merge --no-commit main`, `git mv whatsapp-forms.js legacy/`, check `git ls-files` shows no other legacy file at the root, commit.

## Owner decisions (2026-09-28)

Recorded in `CLAUDE.md` (rules), `docs/REBUILD_PLAN.md` (spec) and `docs/OWNER_TODO.md` (answers):
- **A1:** the kit governs; the old spec is retired (`docs/archive/old-spec.md`).
- **C1:** the live site is current; `main` = snapshot of live; the 3 Aug cleanup is not shipped.
- **Hotfix track** (`REBUILD_PLAN §7.H`), fares **by vehicle class**, **redirect fallbacks**, legacy blog post → **`/destinations/gorakhpur/places-to-visit/`**, **verified distances** via `scripts/fetch-distances.ts` before 4B, **long-distance routes** draft until confirmed (11 flagged in the URL map), **VPS hosting**, **Postgres lead outbox** (Drizzle).
- Defaults: +91 85760 00083 is the only public number; "Taxiverz" in copy; logo unchanged.
- `docs/RATE_CARD.md` created for the owner to correct.

New dependencies for Phase 3 (owner-decided): `drizzle-orm`, `drizzle-kit`, `pg` — lead outbox. Considered: Prisma (heavier client and engine, a code generator in the build) and raw `pg` (no typed schema or migrations).

Old spec (`docs/archive/old-spec.md`) — read once. All ten points that beat the kit were adopted into `CLAUDE.md` on owner request: placeholder scan on rendered output; no dead CTAs; distinct nav links; exact viewport with safe-area padding; class wording; no per-km on luxury cards; Accessibility ≥ 95 and SEO = 100; verified-only reviews; no stubs; `inputmode="tel"`.

---

## Repository move (2026-09-28)

- The project now lives in `C:\taxiverz`, a clone of `github.com/pratik-walunj/taxiverz-` (empty before this). Branch `nextjs-rebuild` is pushed to origin.
- Moved in: `CLAUDE.md` and `PROMPTS.md` at the repo root; `docs/REBUILD_PLAN.md`, the four Phase 0 docs, and `docs/competitor-analysis.pdf` (copied from `Downloads/Taxiverz-Competitor-Analysis.pdf`; the kit zip wasn't found).
- The older spec (`Downloads/CLAUDE.md`, 15 Sep) is archived at `docs/archive/old-spec.md`. The Downloads original was renamed `OLD-SPEC-CLAUDE.md` so it no longer loads.
- **The legacy site is not in this repo.** It lives in `github.com/pratik-walunj/Taxiverz` (`main` @ `650489a`, the exact commit the audit was run against). Phase 1 step 1 ("move the legacy site into `legacy/`") has to bring it in from there.
- The local repo in `Downloads/Taxiverz-main/Taxiverz-main/` described under Phase 0 below is left as it was. It isn't used any more.
- In the Phase 0 notes below, `docs/CLAUDE.md` now means the root `CLAUDE.md`, and `Downloads/CLAUDE.md` means `docs/archive/old-spec.md`.

---

## Phase 0 — Scan and audit (2026-09-28)

### Plan
1. Check the environment; create branch `nextjs-rebuild`.
2. Inventory every legacy file.
3. Extract page data (titles, meta, canonicals, H1s, JSON-LD, phones, emails, prices, distances, forms, links, images) from the repo **and** from the server snapshot, and compare them.
4. Write `docs/AUDIT.md`: confirm or correct plan §1.
5. Build and validate `docs/legacy-url-map.json`.
6. Write `docs/OWNER_TODO.md` from plan §9 plus audit findings.
7. Commit docs only. Report and stop.

### Done
- Environment: Node 24.14.1, npm 11.11.0, git 2.53. The folder **was not a git repo**. Initialised a local repo:
  - `main`: commit 1 = legacy site exactly as received (no file changed); commit 2 = the rebuild kit docs (`docs/CLAUDE.md`, `docs/PROMPTS.md`, `docs/REBUILD_PLAN.md`) as received.
  - `nextjs-rebuild`: Phase 0 docs.
  - Local `core.autocrlf=false` so the legacy baseline is stored byte-for-byte.
  - Nothing pushed; no remote configured (OWNER_TODO A2).
- Inventory: 294 files; 156 HTML; 104 images (50.7 MB, 16 over 1 MB); 20 CSS; 3 JS; helper and junk files.
- Compared the repo with the live server snapshot (`Downloads/taxiverz.com/public_html_BACKUP_2026-08-03`, whose `index.html` matches what taxiverz.com serves today). Same 156 files; 55 differ in content. Read-only GET probes of the live site confirmed `robots.txt`, sitemap, caching headers and case-sensitive URLs.
- `docs/AUDIT.md` written. Plan §1 is largely confirmed; corrections are in AUDIT §13.
- `docs/legacy-url-map.json` **created** (it wasn't in the kit): 156/156 files mapped, validated (coverage, case collisions, URL format, no self-loops); 135 distinct targets; 56 route URLs; fallbacks for targets that may be unpublished; 2 aliases for broken internal links.
- `docs/OWNER_TODO.md` written: 45 items in 10 groups.
- Competitor report read from `Downloads/taxiverz-competitor-analysis (2).md` (text version of the PDF). `docs/competitor-analysis.pdf` isn't in the repo.

### Counts
| | |
|---|---|
| Legacy HTML pages | 156 (routes 57 files → 56 routes + 1 unverifiable; vehicles 54; services 16; shoots 16; Nepal 4; info 5; home/junk 3) |
| Pages with placeholder prices | 67 (repo) / 88 (live) |
| Pages missing a meta description | 140 |
| Pages missing a canonical / with a placeholder canonical | 152 / 4 |
| Pages reachable only via JS | 62; orphans 16; in sitemap 77 |
| Forms that send nothing | 20 |
| Near-duplicate route pairs (Jaccard > 0.35) | 52 |
| Legacy URL map | 156 entries: 142 high, 7 medium, 7 needs-owner confidence |
| Owner questions | 45 (6 of them live-site fixes) |

### Decisions made
- Treated `docs/CLAUDE.md` + `REBUILD_PLAN.md` as the working spec for the URL map. Phase 0 is stack-neutral; the conflict with `Downloads/CLAUDE.md` is escalated (OWNER_TODO A1).
- URL map schema: `target` + `fallback` + `confidence`. Redirects can go live before every target page is published, and the Phase 7 "every target returns 200" assertion still holds.
- `banaras` → `varanasi` in slugs. `siwan-chhapra` → `siwan`. The Lucknow duplicate and the two 2×2 bus pages are consolidated. The blog post maps to `/destinations/gorakhpur/places-to-visit/` (deviation from plan §7 Phase 5, flagged).
- Legacy image URLs are not mapped (see report).
- No new dependency added (none needed for Phase 0; audit scripts were stdlib Python, kept outside the repo).

### Next step
Owner answers A1 (spec) and A2 (repo). Then Phase 1 per the chosen spec.
