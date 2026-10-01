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
| 5 — Premium and growth verticals | ✅ done 2026-09-29 — pushed; premium, bus, self-drive, bike and packages publish when the owner supplies vehicles/prices |
| 6 — Trust and support | ✅ done 2026-09-29 — pushed; terms, refund, reviews and payment notice publish when the owner supplies H1/F3 |
| 7 — SEO hardening, QA, performance | ✅ done 2026-09-29 — pushed; budgets met except LCP/performance score (reasons and fix plan below) |
| 7.5 — Full site and redesign (owner request) | ✅ done 2026-09-30 — pushed; not deployed |
| 7.6 — Every legacy page and section back (owner request) | ✅ done 2026-10-01 — pushed; 149 of 156 legacy URLs have their own page |
| 8 | not started |

---

---

## 7.6 — Every legacy page and section back (owner request, 2026-10-01)

The owner asked for every page and section of the old site, with the same content. An audit compared each of the 156 legacy pages with where its URL lands now and which of its headings have no counterpart.

### Before → after
- Legacy URLs landing on their own new page: **125 → 149** of 156. Rendered pages: 138 → 163.
- Back: 11 long-distance routes (Agra, Dehradun, Delhi, Goa, Indore, Jaipur, Kolkata, Mumbai, Nashik, Ujjain, Delhi → Gorakhpur; owner confirmed E3 by asking for every legacy route), Swift Dzire, Honda City, Maruti Ertiga, Audi A4/A6/A8, BMW 320d and X1, Jaguar XF and XJ L, both vintage cars, the 3×2 bus and luxury car rental in Gorakhpur.
- Still not on their own page (7):
  - BMW 520d and Jaguar XE: the only pictures show other models;
  - non-AC bus and sleeper bus: no picture at all;
  - the helicopter charter and the Everest mountain flight: third-party services with no confirmed operator or price (D-items);
  - self-drive: E5.
  The text for the four vehicles is written and held back (`publish: false`) until photos arrive (OWNER_TODO L13).

### Sections restored
- **Vehicle pages:** "Why choose the …" (3–6 highlights per vehicle, from the legacy page, fact-checked, for all vehicles) and "Ways to hire the …" (the live services the vehicle is booked under: local, outstation, one-way, airport; or wedding, luxury and shoots; or bus).
- **Route pages:** "Service features" (how every booking works, nothing promised about the car) and "Places to visit in …" with a link to the destination guide where one exists.
- **Home page:** the legacy fleet showcase, model by model: everyday cars, luxury and vintage cars, tempo travellers, vans and buses, as scrollable rows.
- Left out on purpose: legacy price tables (unverified, B-items), "What our customers say" (no verified reviews, F3), "24/7" and "best/#1" claims, and engine and feature specs we can't confirm for the car supplied.

### Images
- `scripts/migrate-images.ts` gains `cropCaption`: it finds the orange name bar along the bottom of the legacy renders and crops it off, failing if no bar is found. 20 pictures are now usable.
- The "Jaguar XE" render is an XF (its plate and body match), so it is flagged as the wrong model.
- The MUV class card uses the Ertiga. The 3×2 bus page uses the coach picture (representative).

### Checks
- `npm run check` passes (135 unit tests; qa on 163 pages, near-duplicate check passed).
- links:check: 162 pages, 1,870 URLs. bundle: 194.5 KB maximum.
- redirects: 158 legacy URLs in one hop. `--launch`: only the self-drive URL lands on `/` (L11).

---

## 7.5 — Full site and redesign (owner request, 2026-09-30)

The owner asked for the whole site end to end, with an attractive, fast, high-converting home page and a hero slider, then for a more expressive, responsive UI with Unsplash photos in the heroes.

### Owner decisions (2026-09-30)
- **Images:** use the old site's vehicle images, each labelled "Representative image" (`Picture`, `isRepresentativeImage`), until Taxiverz's own photos arrive (F1). Images with baked-in captions or the wrong model are still excluded (the MUV/Ertiga card shows a placeholder for that reason).
- **Hero:** an auto-advancing slider, allowed only as the home hero (CLAUDE.md updated). It pauses on hover, focus, a hidden tab and as soon as a form field is used; it never auto-plays under reduced motion; it has pause, previous, next and dots.
- **Content:** old-site text with the facts checked. `routeGate` no longer needs a verified distance (long-distance routes still wait for E3). `vehicleGate` = usable image + summary + intro of 100+ words.
- **Deploy:** GitHub only.

### Done
- **Content:** agent-written copy for 45 routes (`src/data/routes/copy/`) and 42 vehicles (`src/data/copy/vehicles-*.ts`), reviewed against the facts file. Luxury, wedding, shoot, bus and bike services publish; self-drive stays draft (no self-drive vehicle, E5). TVS Duet stays draft (not a real model name).
- **Scenery:** 10 Unsplash photos, self-hosted at 1920 px WebP in `public/images/scenes/` and credited on the page (list in `docs/IMAGE_MAP.md`). They are used only where the photo shows the place: Nepal, Kathmandu, Nagarkot, Pokhara and Varanasi routes and guides, and the wedding pages.
- **Home:** hero slider (4 slides, only those whose link is live), the fare box overlapping the hero, trust cards, picture service cards, fleet strip, popular routes, a Nepal photo band, a weddings photo band, how booking works, why Taxiverz, guides, a corporate band, the FAQ and a closing photo band.
- **New UI pieces:** `HeroSection` (dark photo hero when a scene exists), `PhotoBand`, `SectionHeading`, `Picture`.
- **Fixes found on screenshots (360 / 1280):**
  - the fare box was white-on-white inside dark heroes;
  - names were lowercased in headings ("india–nepal taxi"; new `inSentence`);
  - on phones the route hero put a long intro above the fare box (now heading → fare box → intro);
  - vehicle pages had no call to action above the fold (summary, spec chips, "Check the fare" and WhatsApp added);
  - the booking-steps line was mis-placed and was invalid markup inside `<ol>`.
- **Build:** `experimental.staticGenerationMaxConcurrency: 3` stops the share-image renderer failing under load. `tsconfig.check.json` keeps the typecheck away from a running dev server's `.next/dev`.

### Checks
- `npm run check`: lint, format, typecheck, 135 unit tests, validate:data, build, qa (138 pages, near-duplicate check passed).
- e2e: 40 passed, 2 skipped. links:check: 137 pages, 1,516 URLs, all 200. bundle:report: largest page `/book/` 194.5 KB (budget 210). redirects:check: 158 legacy URLs, all one hop.
- redirects:check `--launch`: 1 problem left — `/self-drive-car-rental-in-gorakhpur.html` would land on `/` because self-drive is unpublished (OWNER_TODO L11).
- No page scrolls sideways at 360 or 1280 px.
- Lighthouse mobile (3 runs, median; machine CPU benchmark 575–1536, so noisy): home 86 (was 51 before the redesign), `/outstation-cabs/gorakhpur/` 93, `/cabs/gorakhpur/` 82, Kushinagar guide 92, `/fleet/` 92. Accessibility 100 and SEO 100 on all of them; CLS ≤ 0.031; TBT ≤ 181 ms. LCP is still 2.8–3.9 s against the 2.5 s budget (the same local-throttling cause and fix plan as in Phase 7; re-measure on the real host in Phase 8).

### Next step
The owner reviews the site locally (`npm run dev`, cmd) and the copy flagged in OWNER_TODO L11–L12. Then Phase 8 (hosting) on "go".

---

## Phase 7 — SEO hardening, QA, performance (2026-09-29)

Owner said "go" with all four recommendations: (A) fallback chains, (B) the 410 mechanism, (C) `lighthouse` pinned, (D) a native `<dialog>` instead of Radix.

### Done
- **Redirects:**
  - The legacy map gains `fallbacks` (tried in order after `fallback`): luxury cars → `/fleet/`, Raxaul routes → `/nepal-taxi/raxaul/`, Kathmandu-origin routes → `/nepal-taxi/`, buses → `/tempo-traveller/`, other-origin routes → `/outstation-cabs/`, the old all-routes page → `/cabs/gorakhpur/`, wedding → `/fleet/`. 45 entries in all.
  - A `gone: true` entry answers **410 Gone** with a small page (home link, phone), unless its target is published again. No entry is marked yet; that waits for the owner.
  - `redirects:check` expects 410 for gone entries.
- **SEO:**
  - Share images (`next/og`, `src/lib/og.tsx`, generated at build) for service pages, service × city and shoot types, city hubs, routes (with a milestone showing the verified km), vehicles, packages, guides and destination overviews. `buildMetadata({ image: null })` points `og:image` at the trailing-slash URL: Next's own link omits the slash, which would cost scrapers a 308.
  - `/llms.txt` from data. robots disallows `/api/`. The sitemap carries `lastModified` for guides and posts.
  - The footer's Services, Popular routes and Travel guides groups come from data (published only), capped at 60 links.
- **qa gains:**
  - a JSON-LD structure check (`src/lib/seo/jsonld-check.ts`: required properties per `@type`, no empty values, no unknown types, never AggregateRating/Review);
  - `og:title`, `og:description` and `og:url`; breadcrumbs on every page except home; JSON-LD present on every indexable page.
- **The review schema now follows CLAUDE.md:** `source` is google | direct, a Google review needs its URL, and `verifiedAt` is required.
- **New tools:**
  - `npm run links:check`: crawls the sitemap; every internal link and asset must answer 200 (or one redirect to a 200), and internal links must end in a slash.
  - `npm run bundle:report`: gzipped JS per page, budget 210 KB, `--verbose` for chunks.
  - `npm run perf`: Lighthouse via the pinned `lighthouse` 12.8.2 dev dependency; 3 runs, median, CPU benchmark printed; `--low-end` (6× CPU with the full Slow 4G profile); `--assert`.
  - `npm run test:templates`: axe on the draft templates via their dev previews, in a separate `next dev` with its own build folder (`NEXT_DIST_DIR=.next-templates`) so it never collides with the production build `check` typechecks.
  - `tests/e2e/inp.spec.ts`: Event Timing at 4× CPU on the fare box and the mobile menu, plus the menu focus test.
- **Performance fixes:**
  - The mobile menu is a native `<dialog>` (Radix removed, about 16 KB less).
  - The first keystroke in the Pickup box took **1.2 s**, half of it the browser loading a Devanagari font to show Hindi names in the suggestions. Hindi names now show only when the query is in Hindi (they still match as search terms).
  - The heading font (Anek) is no longer preloaded, and Mukta's unused 500 weight is gone. Text never waits on the heading font: `/fleet/` LCP went from 3.36 s to 2.86 s on the same machine, at the cost of a small swap shift (CLS 0.03).

### Budgets (CLAUDE.md) — met, or reason and fix plan
Measured with `npm run perf` on `next start`, Lighthouse 12.8.2 mobile, medians of 3. The CPU benchmark varied 360–1340 during the session because the owner's own browser was busy; results below 800 are pessimistic.

| Budget | Result | Status |
|---|---|---|
| Accessibility ≥ 95 | 100 on every page measured | ✅ |
| SEO = 100 | 100 on every page measured | ✅ |
| CLS < 0.05 | 0.000–0.034 | ✅ |
| JS per page | 184–194 KB gzipped (budget 210; was ~203) | ✅ |
| INP < 200 ms | 304–488 ms worst case at 4× on this machine (fare box and menu), was 880–1,224 ms | ⚠ reason below |
| LCP < 2.5 s | 2.9–3.3 s (4×); 3.1–3.7 s (6× low-end) | ❌ reason below |
| Performance ≥ 90 | 81–89 (4×; home 89); 70–89 (6×) | ❌ reason below |

- **Why LCP and the score miss.** On every page the LCP element is text that has arrived by about 1 s in the simulation (TTFB about 0.5 s, no load delay). The rest is *render delay*: Lighthouse's model counts the early CSS, the preloaded body fonts and the ~150 KB React/Next runtime as work before the text can paint on Slow 4G. What we control is already cut: fonts, the logo, the fade, Radix, Zod. The runtime is the floor for this stack.
- **Fix plan for LCP and the score:**
  - (1) Measure on the VPS with PageSpeed Insights (real server, HTTP/2 and Brotli through Cloudflare, a calibrated machine), Phase 8.
  - (2) If still short, try Next's Partial Prerendering / `experimental.optimizeCss` for the critical CSS.
  - (3) Self-host a subset of Mukta (Latin + ₹ only).
  - (4) Load the fare widget's client code after first paint (it is above the fold on home).
  - Each will be measured before it is kept.
- **Why INP isn't asserted at 200 ms here:** this PC's CPU benchmark is often 500–700, so a 4× throttle here is roughly 6–8× the calibrated device. The tests guard against regressions at 1,000 ms (they would have caught the 1.2 s bug) and log every sample.
  - **Fix plan:** web-vitals INP reported to GA4 from real visitors (Phase 8), with the 200 ms budget checked on field data. The remaining first-keystroke cost is the first render of the suggestion list; if field data shows it above budget, render the list container on focus rather than on the first character.
- **Route and vehicle pages** (named in the budget) have no published page yet. Their templates pass axe and have no sideways scroll or layout shift in the dev previews. Lighthouse runs on the first real route and vehicle as soon as they publish; they share the layout, fonts and runtime of the pages above.

### Verification
- `npm run check` ✅ — 135 unit tests; qa OK on 39 pages with the new SEO and JSON-LD checks.
- e2e ✅ 40 passed (2 skipped: the menu tests are mobile-only). `test:templates` ✅ 14/14 (7 previews × 2 widths).
- `links:check` ✅ 38 pages, 60 internal URLs, all 200. `bundle:report` ✅ all pages ≤ 194 KB.
- `redirects:check` ✅ 158 URLs, one hop. With `--launch`, URLs landing on `/` went **79 → 34**: 16 shoot pages, 15 bikes, self-drive and 2 more, all waiting on B3/E5/E6 (publish, or mark `gone`).

### Not done / limits
- The launch rule is not yet met (34 URLs). It can only be closed by the owner: confirm the vehicles (pages publish and absorb them), or say the offer is discontinued (`gone: true` → 410).
- Share images use the default sans font (the brand fonts are woff2-only through next/font). The title renders in regular weight.
- Next adds `.next-templates` type paths to `tsconfig.json` on each template run; they're kept.

### Dependencies
Added `lighthouse` 12.8.2 (dev, pinned). Removed `@radix-ui/react-dialog`.

### Plan (as approved)

### Scan
- **Launch redirect rule:** 79 legacy URLs still land on `/`, in these groups:

  | Count | Legacy pages | Current fallback | Nearest published page |
  |---|---|---|---|
  | 21 | luxury-car pages | `/luxury-car-rental/` (draft) | `/fleet/` |
  | 16 | shoot pages | `/shoot-car-rental/` (draft) | none |
  | 15 | bikes and scooters | `/bike-rental/` (draft) | none |
  | 7 | Raxaul routes | `/cabs/raxaul/` (draft) | `/nepal-taxi/raxaul/` |
  | 5 | Kathmandu-origin routes | `/cabs/kathmandu/` (draft) | `/nepal-taxi/` |
  | 5 | buses | `/bus-rental/` (draft) | `/tempo-traveller/` |
  | 5 | Ayodhya, Varanasi, Delhi and Lucknow routes | `/cabs/` (draft) | `/outstation-cabs/` |
  | 5 | others: self-drive, wedding, the old all-routes page, the S-Class page | draft | — |

- **Performance** (local, noisy; CPU benchmark swings 190–1000): home 72–82; hubs and guides 75–89. Accessibility, Best Practices and SEO score 100 everywhere measured.
  - JavaScript is about 200 KB gzipped per page, of which about 150 KB is React/Next. Radix Dialog (MobileNav only) is about 16 KB; lucide about 10 KB.
  - Fonts: Mukta Latin (4 weights) plus Anek Latin (variable, 44 KB).
- **Budgets can't be measured on the named templates yet:** CLAUDE.md sets them on home, *a route page* and *a vehicle page*, and no route or vehicle is published (distances, B3/F1).
- **Not built yet:** dynamic OG images, `llms.txt`, a link checker, a bundle report, a JSON-LD structure check, a canonical check in qa, INP measurement. robots doesn't disallow `/api/`.
- **Mismatch:** the review schema doesn't follow CLAUDE.md, which requires `source` = google | direct (with URL) and a non-null `verifiedAt`. Phase 6 used a different shape; I'll fix it here.
- Hotfix still not live.

### Plan
1. **Legacy map: fallback chains.** Change `fallback` to an ordered `fallbacks` list; the effective destination is target, then the first published fallback, then `/`. Add the nearest-relevant second fallbacks from the table above. Expected: **79 → ~31** landing on `/`, just the shoots and bikes. Every redirect still takes one hop.
2. **Discontinued offers → 410 Gone** (decision B): a `gone` flag in the map, so a legacy URL for something Taxiverz doesn't offer answers 410 with a helpful page rather than a soft-404 redirect to home. The flag stays unset until the owner says an offer is gone (E6 bikes, B3 cars, the shoot types).
3. **SEO checks in `qa`:**
   - canonical = the page's own URL;
   - OG title, description and image present;
   - title ≤ 60 and description ≤ 155 on the rendered page;
   - JSON-LD structure per `@type` (Organization, WebSite, LocalBusiness, BreadcrumbList, FAQPage, Service, Article, TouristTrip, BlogPosting — required properties present, no empty values);
   - breadcrumbs on every page except home;
   - builder unit tests for every JSON-LD builder.
4. **Dynamic OG images** (`next/og`), one design in the brand style (logo, page title, a milestone for routes), for service pages, city hubs, routes, vehicles, packages and guides, generated at build. Previews matter because links get shared on WhatsApp. The default stays `og-default.jpg`.
5. **Link checker** `npm run links:check`: crawls every sitemap page on `next start` and checks every internal link, image and asset answers 200 (or redirects in one hop to a 200). Fails on anything else.
6. **Bundle report** `npm run bundle:report`: gzipped JS per sitemap route with the top chunks; budget 210 KB gzipped per route (today ~200), and fail if a route exceeds it.
7. **Performance work:**
   - replace Radix Dialog in MobileNav with a native `<dialog>` (focus trap, Esc and inert background handled natively; about −16 KB, and one dependency removed);
   - check what each remaining first-party chunk carries;
   - Anek Latin: preload the one weight used above the fold, or subset.
8. **Measurement discipline:**
   - add `lighthouse` as a pinned dev dependency and `npm run perf`: 3 runs per URL (median), mobile defaults (Slow 4G, 4× CPU), printing the CPU benchmark so noisy runs are visible;
   - a low-end run at 6× CPU;
   - INP measured with Playwright (CPU throttled 4×, typing in the fare box, switching tabs, opening the menu, recording Event Timing).
9. **The route and vehicle budgets:** measured on their dev previews for layout and CLS only (dev builds aren't representative for LCP/TBT). A written reason and fix plan for the rest: they're measured on the first real route and vehicle as soon as those publish.
10. **Also:**
    - robots disallows `/api/`;
    - `/llms.txt` summarising the business and its published pages (from data);
    - the footer's Services and Travel guides lists come from data (published only, ≤ 60 links);
    - sitemap `lastModified` from data where known (guides);
    - fix the review schema per CLAUDE.md.
11. **Checks:** axe on every template, including the draft ones through the dev previews in a separate Playwright project; the full e2e suite; `redirects:check --launch`; everything above.

### Decisions to confirm
- **A. Fallback chains to the nearest relevant published page**, as in the table (luxury cars → `/fleet/`, Raxaul and Kathmandu routes → the Nepal pages, buses → `/tempo-traveller/`, other routes → `/outstation-cabs/`). Alternative: leave them landing on `/` until their own pages publish.
- **B. Build the 410 Gone mechanism now** and use it only when you confirm an offer is discontinued (bikes, shoots or specific cars). Alternative: always redirect.
- **C. Add `lighthouse` (pinned) as a dev dependency** for repeatable runs. Alternative: keep `npx lighthouse@12` ad hoc.
- **D. Replace Radix Dialog with a native `<dialog>`** in the mobile menu. Alternative: keep Radix and its ~16 KB.

### Owner inputs that would unlock more
B3/F1 → vehicle pages measurable and the luxury/shoot legacy URLs resolved · L3 → route pages measurable · E6 → bikes published or marked gone.

---

## Phase 6 — Trust and support (2026-09-29)

Owner said "go" with all four recommendations:
- (A) About with confirmed facts only;
- (B) Privacy now, with the business contacts until a grievance officer is named;
- (C) terms, refund and the payment notice held until H1;
- (D) both partner pages.

### Done
- **Published:**
  - `/contact/` — both offices, one number, email, Google Maps links and a contact form. Hours and Google reviews links appear when configured.
  - `/about/` — confirmed facts only; the story and credentials render once the owner supplies them.
  - `/faq/` — 17 new questions in 6 groups, each group linking to its page.
  - `/privacy/` — generated from config.
  - `/attach-your-taxi/` and `/drive-with-us/`.
  - Old `about.html`, `contact.html` and `faq.html` now reach their pages.
- **Built, held by rule (`lib/content/static-pages.ts`):**
  - `/terms/` publishes when cancellation hours, advance %, refund days, payment methods and the owner's review date are all set.
  - `/refund-policy/` needs cancellation hours, refund days and the review date.
  - `/reviews/` needs at least one real review with permission (`src/data/reviews.ts`; no Review JSON-LD, ever).
  - The payment-safety notice (contact, terms, booking confirmation) renders once `paymentAccounts` is set.
- **Config:** `business.ts` gains `registrations`, `policies`, `paymentMethods`, `paymentAccounts`, `grievanceOfficer` and `policyReviewed`, all empty or null (F2, H1).
- **Privacy policy** (`lib/policies.ts`) says only what the code does:
  - what each form collects;
  - where it goes;
  - the browser storage used (trip draft for the session, attribution for 90 days);
  - analytics only if GTM or Clarity is actually enabled at build;
  - 24-month retention; DPDP Act 2023 rights; the Data Protection Board; under-18s.
  - It names no payment, cancellation or refund terms (unit-tested).
- **Forms:** `EnquiryForm` gains `kind` (`contact`, `attach`, `driver` alongside `enquiry` and `corporate`). The lead details gain vehicle, year, permit, licence, years driving and languages, and flow through to the email, Telegram and webhook text. Every form's consent line, and the booking flow's, links to `/privacy/`.

### Verification
- `npm run check` ✅ — 127 unit tests; qa OK on 39 pages; highest near-duplicate score 0.24 (`/about/` ~ `/cabs/gorakhpur/`).
- e2e ✅ 36 tests:
  - new: contact form (message required, reference); attach form (vehicle and city required, details sent); legacy about, contact and FAQ URLs; terms, refund and reviews answer 404;
  - the sitemap walk now allows for policy pages (inform, don't sell) and counts lead forms as a way to act; its timeout scales with the page count.
- `redirects:check` ✅ one hop for all; with `--launch`, URLs landing on `/` went **82 → 79**.
- Screenshots at 360, 768 and 1280: contact, about, FAQ, privacy, drive-with-us. Fixed: partner forms now require the fields their labels imply (city; licence for drivers).
- Lighthouse: accessibility, best practices and SEO 100 on `/contact/`, `/about/` and `/privacy/`. Performance 47–68 was measured with the machine heavily loaded (CPU benchmark 190–495 — the owner's own browser was busy), so it isn't comparable; carried into Phase 7.

### Not done / limits
- No terms, refund policy, payment notice, reviews, hours, credentials or story: each waits for owner input (H1, F3, C7, F2).
- Privacy names `cabtaxiverz@gmail.com`, the phone and the head office for requests until a grievance officer is set; C4 (which inbox receives leads) is still open.
- `docs/PRIVACY_POLICY_DRAFT.md` is superseded by `/privacy/`; left in `docs/` as the owner-review record.

### Dependencies
None added.

### Plan (as approved)

### Scan
- Hotfix still not live: no merge yet.
- **Owner facts Phase 6 depends on — none answered yet:**
  - the company's story and credentials (F2: year started, registrations, GSTIN);
  - reviews and the Google Business Profile link (F3) and clients (F4);
  - policies (H1: cancellation window, advance, refund timeline, payment methods, official payment accounts, grievance contact);
  - promises (H2: 24/7, callback time);
  - hours (C7) and which inbox receives leads (C4).
- **What's already confirmed:** the brand, the one phone and WhatsApp number, both branch addresses, the email used on the legacy site (`cabtaxiverz@gmail.com`), the service list, the car classes, 24-month lead retention (L2), and how the booking funnel works.
- **The business config lacks the policy fields in REBUILD_PLAN §3.1:** `policies`, `paymentMethods`, payment accounts, `responseTimeMins`, `registrations`, grievance contact.
- **Legacy URLs:** `about.html`, `contact.html` and `faq.html` target `/about/`, `/contact/` and `/faq/`, and currently land on `/` at launch.
- The partner lead types `partner-attach` and `partner-driver` already exist in the lead schema.

### Plan
1. **Config:** add the §3.1 fields to `business.ts` and its schema, all `null` or empty until the owner answers. Every page below renders only what is set.
2. **Contact** `/contact/`:
   - both branches (address, call, WhatsApp, Google Maps link; hours only when C7 is answered), the email, and a contact form (lead type `contact`, same pipeline and WhatsApp fallback);
   - LocalBusiness JSON-LD for each branch.
3. **About** `/about/`:
   - confirmed facts only: who we are and where (Gorakhpur head office at the station, Pune branch), what we run (the live services and car classes), how booking works, and how we handle your details;
   - no founding year, trip counts, awards or "trusted by" lines until F2 and F4. A story section appears when the owner writes it.
4. **FAQ** `/faq/`:
   - general questions grouped as Booking, Fares, Cars, Nepal, Airport and local, Enquiries and corporate;
   - answers only from confirmed facts; each group links to the page with more detail. FAQPage JSON-LD.
   - Written fresh rather than copying page FAQs (the near-duplicate rule).
5. **Policies**, one template rendering sections from config, each marked "reviewed by Taxiverz on {date}" only once reviewed:
   - **Privacy** `/privacy/`: everything the site controls today — what we collect in each form, why, the sinks (email, Telegram, webhook, WhatsApp), analytics (GTM, and Clarity if enabled), attribution storage for 90 days, 24-month retention, your rights under India's DPDP Act 2023, how to ask for deletion, changes.
   - **Terms** `/terms/` and **Refund policy** `/refund-policy/`: built, but **draft until H1**. They would otherwise have to invent cancellation and refund terms.
6. **Reviews** `/reviews/`: a data file for real reviews only (name or initials, date, trip, source), plus the template. Unpublished until F3. The home and contact pages link to the Google profile once `googleBusinessUrl` is set.
7. **Partner pages** `/attach-your-taxi/` and `/drive-with-us/`:
   - Short, factual pages with forms. Attach-your-taxi asks for vehicle, model, year, permit type and city; drive-with-us asks for licence type, years driving, city and languages.
   - Lead types `partner-attach` and `partner-driver`; no promises of earnings or volume.
8. **Payment-safety notice:** "We only take payment via …", shown on `/book/confirmed/`, the contact page and the terms, **only once official payment accounts are configured** (H1). Hidden until then.
9. **Links:** the footer's Company group lights up as pages publish, and gains a Partners group. Consent text on the booking and enquiry forms links to `/privacy/`.
10. **Checks:**
    - `npm run check`; e2e for the contact and partner forms (mocked API, WhatsApp fallback); the sitemap walk; drafts answer 404.
    - Screenshots at 360, 768 and 1280.
    - `redirects:check --launch` count; Lighthouse on `/contact/`.

### Decisions to confirm
- **A. Publish About now with confirmed facts only**, with the story added when you write it. Alternative: hold About until F2.
- **B. Publish Privacy now.** For deletion requests and grievances it would name the business email `cabtaxiverz@gmail.com`, the phone and the head-office address until you name a grievance officer (H1). Its retention clause is your 24-month decision. Alternative: hold Privacy, but the booking and enquiry forms already collect personal data, and the DPDP Act expects a notice.
- **C. Terms, refund policy and the payment-safety notice stay draft until H1**, because each would need promises only you can make.
- **D. Publish the two partner pages** (attach your taxi, drive with us). Alternative: hold them if you're not taking partners right now.

### Owner inputs that would unlock more
F2 → About story and credentials · F3 → reviews · H1 → terms, refund and payment notice · H2 → response-time line on contact · C7 → hours · C4 → the right lead inbox.

---

## Phase 5 — Premium and growth verticals (2026-09-29)

Owner said "go" with all four recommendations:
- (A) the vehicle-dependent verticals stay draft until vehicles are live;
- (B) Nepal pages publish now with public facts and the owner's document sentence;
- (C) nine destination guides;
- (D) MDX.

### Done
- **Now published (19 new pages, 33 indexable in total):**
  - `/nepal-taxi/`, `/nepal-taxi/gorakhpur/`, `/nepal-taxi/raxaul/`;
  - `/corporate-car-rental/`;
  - `/destinations/` plus 5 destination overviews (Gorakhpur, Kushinagar, Ayodhya, Varanasi, Lumbini) and 9 guides (places to visit × 5; best time to visit × 4).
  - The home page gains the dark "India to Nepal" band. The footer gains "Corporate travel" and a Travel guides group.
  - Old `blog.html` now lands on `/destinations/gorakhpur/places-to-visit/`.
- **Built, copy written, draft by rule:**
  - luxury, wedding and shoot hubs plus the 6 shoot types; bus, self-drive and bike rental.
  - The **vehicle gate** (`VERTICAL_VEHICLES` in `lib/content/gates.ts`) keeps each one unpublished until a fitting vehicle is live. A live vehicle already needs fleet confirmation (B3) and its own photo (F1). Their copy is `publish: false` for the same reason; flip it when the vehicles arrive.
  - Dev preview: `/styleguide/service/?s=wedding-cars`, `?s=shoot-car-rental&t=pre-wedding`.
- **Enquiry forms:**
  - `EnquiryForm` covers luxury, wedding, shoot, bus, self-drive, bike and package enquiries; with `corporate` it adds company, GSTIN (format-checked, optional) and trips per month.
  - Same pipeline as bookings: a reference number on success, and the same details handed to WhatsApp if saving fails.
  - The lead schema gains an optional `details` object, stored in the new `details` jsonb column (migration `drizzle/0001_*.sql`) and included in email, Telegram and the webhook. New lead type `enquiry-self-drive`.
- **Packages:**
  - Zod schema, gate (itinerary, inclusions, exclusions, **verified price**), hub, template and `from-{city}` variant route (each variant needs its own verified price). TouristTrip JSON-LD, with an Offer only when the price is verified.
  - Helicopter charter and Everest mountain flight migrated as drafts; the legacy claims are kept as notes only (D7).
- **Destinations and blog (MDX):**
  - `@next/mdx` with bodies in `content/`; metadata in Zod-checked TypeScript (`src/data/destinations.ts`, `src/data/blog.ts`), so the publish list stays synchronous for the proxy and sitemap.
  - `validate:data` checks every guide and post has its file and every published guide has ≥ 400 words.
  - 3 blog drafts from report §12.4: Buddhist circuit by car, Gorakhpur to Kathmandu by road, planning wedding cars. Each is `ownerApproved: false`, with MDX comments listing the owner facts needed.
  - `content/` is excluded from Prettier: it rewrote `{/* … */}` MDX comments into visible text.
- **Copy review (my own)** removed or softened:
  - Business claims: "trained driver", "on a budget", "cheaper", buses in the corporate text, and "the places our passengers travel to most".
  - Facts I couldn't back up: Raxaul's train list, the Butwal–Pokhara direction, and where Ramgarh Tal sits in the city.
  - A gendered reference to the driver.
- **Performance regression caught and fixed:** `EnquiryForm` imported a constant from the Zod lead schema, shipping Zod (~60 KB gzipped) on every service page, including those without a form. The constant now lives in `lib/schemas/lead-constants.ts`, and `qa` fails if any client chunk contains Zod.

### Verification
- `npm run check` ✅ — 119 unit tests (3 DB tests skipped), qa OK on 33 pages; highest near-duplicate score 0.19.
- `npm run test:e2e` ✅ — 30 tests at 360 and 1280:
  - every sitemap page (one H1, a way to book, axe, no sideways scroll);
  - the corporate form (GSTIN error, reference on success, WhatsApp fallback carrying the company);
  - an MDX guide renders with no comments leaking;
  - `blog.html` → the Gorakhpur guide;
  - drafts (wedding, shoot, bus, packages, blog) answer 404.
- `redirects:check` ✅ all 158 legacy URLs in one hop. With `--launch`, URLs landing on `/` went **86 → 82**. Most of the rest wait on B3/F1 (vehicles, shoots, luxury, bikes) or on Phase 6 (about, contact, FAQ).
- Screenshots at 360, 768 and 1280: Nepal × Gorakhpur, corporate, guide, destination, home, and dev previews of wedding and pre-wedding. Fixed: phone-field borders invisible on dark forms.
- **Lighthouse mobile:**
  - Accessibility, Best Practices and SEO 100 on every page tested.
  - Performance, measured while the machine was loaded (CPU benchmark 570–850, against ~1,000 in Phase 4): Kushinagar guide 84, `/outstation-cabs/` 76, `/nepal-taxi/` 75, corporate 68 (the heaviest client form).
  - Carried into Phase 7 with the Phase 4 note.

### Not done / limits
- Nothing about border steps, Bhansar, charges or whether vehicles cross (D1–D3). The Nepal pages say "we confirm the crossing and how the journey is arranged when you book".
- "How to reach from Gorakhpur" guides wait for verified distances (L3).
- The luxury, wedding, shoot, bus, self-drive and bike × Gorakhpur pages have no copy yet. They can't publish before their hubs; they'll be written when the hubs can go live.
- `npm audit`: 4 moderate advisories, all in `drizzle-kit`'s bundled esbuild (a dev-only tool, pre-existing); none from the MDX packages.

### Dependencies added
`@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx`.

### Plan (as approved)

### Scan
- Hotfix still not live (`/whatsapp-forms.js` → 404): no merge yet.
- **Owner answers Phase 5 depends on — none in yet:**
  - B3: fleet not confirmed — no luxury car, bus, self-drive car or bike is confirmed.
  - F1: no own photos.
  - D1–D3: border, charges, documents.
  - D7: helicopter and mountain-flight operator.
  - E5/E6: self-drive and bikes.
- The only owner-given Nepal wording is the hotfix sentence (2026-09-28): "Indian citizens don't need a visa for Nepal. Carry a valid passport or Voter ID card. Call or WhatsApp us for the full document checklist before you travel."
- **Legacy URLs waiting on Phase 5 targets:** 16 shoot pages, 3 bike, 2 luxury, 3 Nepal, 3 bus (via `/bus-rental/`), 1 self-drive, 1 wedding, 2 packages, and 1 destination (`blog.html`).
- **No data yet** for packages, destinations or blog; no `content/` folder.
- **Leads:** the lead schema already has the enquiry types (`enquiry-luxury`, `-wedding`, `-shoot`, `-group`, `-corporate`, `-package`, `-bike`) but no fields for occasion, date, group size or company details.

### Plan
1. **Enquiry forms**:
   - One `EnquiryForm` (name, mobile, date, pickup city, group size, occasion, message) for luxury, wedding, shoot, bus, self-drive and bike.
   - One `CorporateForm` (company, GSTIN — optional and format-checked, monthly trips, contact).
   - Both post to `/api/leads/` with their lead type and use the same WhatsApp fallback and reference number as bookings.
   - A new optional `details` object in the lead schema, stored in a new `details` jsonb column (migration `0001`). Sinks and the webhook payload include it.
2. **Premium verticals (luxury register):**
   - Luxury car rental, wedding cars, and cars for shoots (a hub plus the 6 shoot types at `/shoot-car-rental/{type}/`), built on `ServicePage`.
   - The hero offers "Enquire" instead of a fare box; pages list the confirmed vehicles for the vertical; photo-led layout.
   - **They stay draft until B3 confirms at least one vehicle for that vertical and F1 gives at least one own photo.** Copy is written now so they publish the moment those arrive.
3. **Nepal:**
   - The nepal-taxi hub, Gorakhpur and Raxaul pages, with a dark "India to Nepal" band.
   - Copy uses public facts only: crossings as places, Lumbini, Kathmandu, Pokhara. Documents use only the owner's own sentence above.
   - Border steps, Bhansar, charges and whether vehicles cross stay out until D1–D3. The route list appears once routes publish.
4. **Corporate** `/corporate-car-rental/` with its form. No claims about GST invoices, credit terms or clients (F4) until confirmed.
5. **Group, self-drive and bikes:**
   - Bus rental, self-drive and bike rental: page, copy and enquiry form, **draft until B3/E5/E6**.
   - Tempo traveller is already live.
6. **Packages:**
   - Zod schema: itinerary days, inclusions, exclusions, price, operator, `from-{city}` variants.
   - Hub, template and variant route.
   - Helicopter charter and Everest mountain flight migrated as drafts (D7).
   - The hub publishes only once it has a published package; none can be published yet (no verified price).
7. **Destinations (MDX):**
   - `@next/mdx` with an exported, Zod-validated `metadata` per file in `content/destinations/{place}/{guide}.mdx`.
   - Overview `/destinations/{place}/`, live once one of its guides is; hub `/destinations/`, live once it has any.
   - **Write and publish:**
     - `gorakhpur/places-to-visit` (the `blog.html` target);
     - places-to-visit and best-time-to-visit for Kushinagar, Ayodhya, Varanasi and Lumbini.
     - 9 guides, ≥ 400 words each, public facts only, nothing regulatory.
   - `how-to-reach-from-gorakhpur` waits for verified distances.
8. **Blog (MDX):**
   - `/blog/` and `/blog/{slug}/`: live only when the owner sets `published`.
   - Write 3 drafts from the report's §12.4 long-tail topics, picked when I read it at build time.
9. **Internal links:** destination guide ↔ city hub ↔ service pages; the footer adds Destinations when it's live.
10. **Checks:**
    - `npm run check`; e2e for the enquiry and corporate forms (API mocked, including the WhatsApp fallback) and the sitemap walk (axe, one H1, a way to book); qa similarity report.
    - Screenshots at 360, 768 and 1280, including dev previews of the draft luxury and shoot pages.
    - `redirects:check --launch` count before and after.
    - Lighthouse on one guide.

### Decisions to confirm
- **A. Premium, bus, self-drive and bike pages stay draft until B3 (and F1 for luxury, wedding and shoot)**, but are fully built. Alternative: publish them now as enquiry-only pages with no vehicles or photos. I don't recommend it: thin pages making implied fleet claims.
- **B. Publish the Nepal hub + Gorakhpur + Raxaul now** with public facts and your document sentence only. Alternative: wait for D1–D3.
- **C. Publish nine destination guides** as listed. Alternative: only the Gorakhpur guide the legacy map needs.
- **D. MDX dependencies:** `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx`. Alternative: plain TypeScript copy as in Phase 4, with no new dependencies but clumsier for long guides with headings and lists.

### Owner inputs that would unlock more
B3 + F1 → luxury, wedding, shoot and vehicle pages · E5/E6 → self-drive and bikes · D1–D3 → Nepal border block · D7 → helicopter and mountain-flight packages · L3 → routes and how-to-reach guides.

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
