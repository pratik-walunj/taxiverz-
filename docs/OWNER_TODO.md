# Owner to-do — open questions

Maintained by Claude Code. Seeded from `REBUILD_PLAN.md §9` plus the Phase 0 audit (`docs/AUDIT.md`).

Each item has three parts: the question, why it matters, and what the site does until it's answered. Nothing is invented while an item is open: unknown facts are `null` and the site hides them or shows a neutral fallback.

Answer inline under any item (write **Answer:**), or paste answers into chat.

Status: 🔴 blocks the next phase · 🟠 needed before launch · 🟢 can come later.

---

## A. Decisions that block Phase 1

**A1 🔴 Which spec governs the build?**
There are two `CLAUDE.md` files and they contradict each other. `Downloads/CLAUDE.md` (15 Sep) specifies Next.js 15 + NestJS + Prisma + PostgreSQL in a pnpm/Turborepo monorepo, the Demo IV/III look and `/search?…` booking URLs. `docs/CLAUDE.md` (28 Sep, shipped with REBUILD_PLAN) specifies one Next.js 16 app with npm, no database in v1 and `/book/` URLs. See AUDIT §14.
- *Why:* it decides the repo layout, hosting, the database and the booking URLs. These are expensive to reverse.
- *Until answered:* Phase 1 doesn't start. Recommendation (see report): follow `docs/CLAUDE.md` + REBUILD_PLAN and delete or rename the older file so Claude Code stops loading it.
- **Answer (2026-09-28):** the kit governs — `CLAUDE.md` + `docs/REBUILD_PLAN.md` (one Next.js 16 app, `/book/` URLs). The old spec is retired to `docs/archive/old-spec.md`.

**A2 🔴 Is there a GitHub repo for this site?**
The folder wasn't a git repository. It looks like a zip download of a `Taxiverz` repo. Phase 0 initialised a fresh local repo (`main` = the legacy site as received, `nextjs-rebuild` = Phase 0 docs).
- *Why:* if a remote repo exists, the rebuild should continue from a clone of it. Otherwise the histories are unrelated and merging later is painful.
- *Until answered:* work stays in the local repo; nothing is pushed.
- **Answer (2026-09-28):** use `github.com/pratik-walunj/taxiverz-` (a new, empty repo), cloned to `C:\taxiverz`. The legacy site stays in `github.com/pratik-walunj/Taxiverz` and is brought in during Phase 1.

**A3 🟠 Design reference.**
Is one of the four demo prototypes the look you want, or should the plan's default "premium regional operator" direction be used? The older spec says to combine Demo IV/III/II/I.
- *Why:* Phase 1 writes `DESIGN.md` and the style guide.
- *Until answered:* follow whichever spec A1 selects.
- **Answer (2026-09-28):** no demo reference. `docs/DESIGN.md` is the design.

---

## B. Pricing — the fare engine needs these most

**B1 🔴 Pricing model, per vehicle.** For each vehicle or class you actually run: one-way ₹/km, round-trip ₹/km, minimum km per day, driver allowance per day, night charge (amount and hours — 10 PM–6 AM everywhere except the S-Class page, which says 9:30 PM–6:30 AM), extra km and extra hour, local package prices (6h/60, 8h/80, 12h/120 km). Also: GST rate, and whether it's included or extra. How are tolls, state permits and Nepal border charges passed on? Does "garage to garage" apply to all vehicles or only luxury?
- *Why:* the site's core promise is an all-inclusive total before contact details. Without real rates every fare shows "Get a quote".
- *Until answered:* `pricing.status = 'draft'`; fares say "Estimated fare" or "on request"; no price schema.
- **In progress:** fill in `docs/RATE_CARD.md` (every field the fare engine needs, pre-filled with legacy values + "?"). Fares are priced by vehicle class (owner decision 2026-09-28).

**B2 🔴 Resolve conflicting prices** (full table in AUDIT §4):
- Swift Dzire: ₹8, 10, 11, 12, 14, 20, 27 and 29 per km on different pages. ₹1,200/day on two pages.
- Innova Crysta: ₹14/km (own page, home) vs ₹18/km (car-rental-service, Nepal page).
- Fortuner: ₹40/km vs ₹25/km (Nepal page).
- Mercedes S-Class: ₹50/km, local ₹8,000 (own page) vs ₹100/km, wedding ₹25,000 (home).
- Jaguar XE: ₹10,000 wedding / ₹55/km (own page) vs ₹25,000 / ₹100/km (home). Jaguar XF: ₹14,000 / ₹70 vs ₹30,000 / ₹120.
- BMW 520d: ₹20,000 / ₹90 / corporate ₹15,000 (own page) vs ₹16,000 / ₹80 / ₹8,000 (home).
- Corporate ₹8,000 for Audi A8 and Q7 — same as an A4?
- The ₹/day prices on car-rental.html (e.g. BMW 320d ₹4,200/day): what are they — self-drive, or 8h/80 km with driver?
- *Why:* one rate per vehicle, one place (CLAUDE.md).
- *Until answered:* conflicting values are `null`.

**B3 🟠 Which vehicles are really in your fleet?** Please tick the ones you own or reliably arrange:
- *Cars with pages:* WagonR, Dzire, City, Verna, Innova Crysta, Fortuner, Scorpio, XUV700, Gypsy, Jeep, BMW 320d / 520d / X1 / convertible, Audi A4 / A6 / A8 / Q3 / Q5 / Q7, Mercedes C / E / S / Maybach / SLK, Jaguar XE / XF / XJL, vintage cars.
- *Named but with no page:* Ertiga (used in every route fare table), Etios, Tata Winger, Volvo bus, Toyota Hiace, Defender, Thar, Hilux, Range Rover, Audi A5 convertible, Jaguar F-Type, BMW X3, Endeavour, Ambassador, Bentley, Rolls-Royce, GMC Yukon, the 8 off-road bikes.
- *Group:* TT 13/17/20/26, Urbania 13/17, 2×2 AC bus, 3×2 bus, non-AC bus, sleeper bus.
- *Bikes:* 13 bikes and scooters.
- *Why:* nothing that isn't really available may appear on the new site.
- *Until answered:* only vehicles with pages are migrated, as drafts.
- **In progress:** tick-list at the bottom of `docs/RATE_CARD.md`.

**B4 🟠 Missing prices:** tempo travellers (the hub says ₹24/26/30/35 per km for 13/17/20/26 seats — still right?), Urbania, all buses, all bikes/scooters, Mercedes SLK, BMW 320d, BMW X1, the BMW convertible, vintage cars, self-drive rates.
- *Until answered:* "Get a quote" or enquiry form.

**B5 🟠 Route distances and times.** Please confirm or correct the routes flagged in AUDIT §5. Worst: Gorakhpur→Kathmandu (280 vs 350 km; which border do you use?), →Raxaul 150, →Butwal 190, →Patna 190, →Nainital 420, →Chitrakoot 280, →Dehradun 1,075, →Delhi 871/822/750, →Deoria 35/53, →Maharajganj 90/57; Raxaul→Lumbini 120, →Janakpur 80; Ayodhya→Prayagraj 288; Muktinath 10–12 h. Do you know toll counts or toll amounts per route?
- *Until answered:* every distance is `verified: false`; fares are labelled estimates.

**B6 🟢 Promo code "TAXIVERZ100" (up to ₹200 / ₹500 off).** Is it live? What are the terms?
- *Until answered:* not shown (no discounts or "was" prices without real terms).

**B7 🟢 Airport fares.** Do you have fixed Gorakhpur-airport fares? Legacy says "₹300 base".
- *Until answered:* airport fares use one-way pricing with an airport minimum.

---

## C. Business facts, brand, contact

**C1 🔴 Which copy of the site is current?** The GitHub copy and what's live on Hostinger differ on 55 pages (AUDIT §0). Live has blanked most prices to "... INR". There is also an unshipped cleanup in `Downloads/taxiverz.com/public_html/` dated 3 Aug 2026. Who edits the live site, and was that cleanup meant to go live?
- *Why:* tells us which prices were withdrawn on purpose.
- *Until answered:* both are treated as untrusted; nothing is published from either without your confirmation.
- **Answer (2026-09-28):** the live site is current. `main` becomes a snapshot of the owner's fresh `public_html` download. The 3 Aug cleanup is not shipped; worth-keeping parts are reported separately.

**C2 🟠 Brand.** "Taxiverz" or "TaxiVerz"? Keep the tagline "Luxury on the Move"? It's only in the logo image. Is there an SVG or vector logo? What is the legal name — some footers say "Taxiverz Travel Solutions"?
- *Until answered:* "Taxiverz" in text; raster logo; legal name `null`.
- **Partial answer (2026-09-28):** "Taxiverz" in all copy; logo unchanged. Tagline, vector logo and legal name still open.

**C3 🟠 Phones.** Confirm +91 85760 00083 as the one public number and the WhatsApp number. What is +91 85760 00074 for (bus and tempo pages)?
- *Until answered:* 0083 everywhere; 0074 not used.
- **Answer (2026-09-28):** +91 85760 00083 is the only public number, for calls and WhatsApp.
- **Done in the hotfix:** 8576000074 replaced with 8576000083 on all 8 pages (live after upload).

**C4 🟠 Email.** Which inbox should receive leads: cabtaxiverz@gmail.com (111 pages) or info@taxiverz.com (42 pages)? Does info@taxiverz.com exist?
- *Until answered:* cabtaxiverz@gmail.com shown; lead email sink not configured.

**C5 🟠 Social accounts.** Is Instagram `travel_nepal_club` Taxiverz's own account? What is the Facebook page URL (legacy uses a share link)? YouTube?
- *Until answered:* no social links.

**C6 🟢 Sister sites.** Should the new site link to nepaltoursandtravels.com and luxurycarrentalss.com? Are they yours?
- *Until answered:* no links.

**C7 🟠 Branches and hours.** Is the Gorakhpur office address exactly as on your Google Business Profile? Office hours? Is phone/WhatsApp really answered 24/7? What runs from Pune (services, vehicles, hours)? Google Business Profile links for both branches.
- *Until answered:* addresses shown; hours hidden; no "24/7" claim; no Pune service pages.

---

## D. Nepal operations (regulatory copy stays draft until verified)

**D1 🟠 Borders and vehicles.** Which crossings do you use (Sonauli–Bhairahawa, Raxaul–Birgunj, others)? Do Indian vehicles drive through to Kathmandu or Pokhara, or do passengers switch vehicles at the border?

**D2 🟠 Charges.** How are Bhansar (vehicle customs permit), per-day vehicle fees and other border charges handled and priced?

**D3 🟠 Documents.** What do you tell Indian, Nepali and foreign passengers to carry? (The legacy Nepal page says passport + visa + COVID certificate — this will not be migrated.)

**D4 🟢 Drivers.** Do you have Nepali-speaking drivers? Can they be named?

**D5 🟠 Muktinath.** How is it done (vehicle change at Beni or Jomsom, area permits, number of days)?

**D6 🟢 Nepal fleet.** The site says "Toyota Hiace — only for Nepal". Do you have Nepal-registered vehicles or a partner in Nepal? Who runs the Kathmandu-origin routes?
- *Why (D1–D6):* Nepal is the main moat, and wrong border information costs trust and money.
- *Until answered:* Nepal routes publish with verified facts only; border blocks stay draft.

**D7 🟢 Helicopter charter and Everest mountain flight.** Who operates them, at what price? Should they live on Taxiverz or on nepaltoursandtravels.com?
- *Until answered:* drafts; legacy URLs redirect to `/nepal-taxi/`.

---

## E. Unverified pages and names

**E1 🟠 "Mankapuram".** The page calls it a Nepal town reached via Sonauli–Bhairahawa. What place is meant?
- *Until answered:* not a route; redirects to `/nepal-taxi/gorakhpur/`.

**E2 🟢 "Siwan (Chhapra)".** Two towns. Is one route enough (Siwan), or do you want both?
- *Until answered:* one route, Siwan.

**E3 🟠 Long-distance routes.** Do you really run Goa (2,100 km), Mumbai, Nashik, Indore, Ujjain, Dehradun, Jaipur and Kolkata?
- *Until answered:* they migrate as drafts; the redirect falls back to `/cabs/gorakhpur/`.

**E4 🟠 Model names.** Which Jeep? Which BMW convertible (the page says "MZ", the image "M convertible", car-rental "Z4")? "TVS Duet" — Hero Duet or another scooter? Which Maybach? Which vintage cars (make, model, colour)?
- *Until answered:* those pages stay draft; redirects point to the service hub.

**E5 🟢 Self-drive.** Which cars are really available self-drive (legacy lists BMW, Mercedes, Audi, Jaguar, Defender)? Deposit, age and licence rules, km limits?
- *Until answered:* self-drive is enquiry-only with no car list.

**E6 🟢 Election-campaign cars and off-road bikes.** Are these real offers?
- *Until answered:* not migrated.

---

## F. Proof and photos

**F1 🟠 Real photos** of your own cars, drivers and office. This is the single biggest visual upgrade available. Which existing images show your own vehicles? (Two bus images are Unsplash stock; the tempo hub image is hotlinked from a competitor's blog.)
- *Until answered:* use only images you confirm; flag the rest in `IMAGE_MAP.md`.

**F2 🟠 Credentials.** Year started, trips or customers served, GSTIN, registrations and permits (tourist permits, All-India permit), insurance. Only what is true and provable.
- *Until answered:* none shown.

**F3 🟠 Reviews.** Your Google Business Profile link. Any reviews you're allowed to quote (name or initials, date, trip).
- *Until answered:* the reviews section is hidden. The fake testimonials and the 4.8/150 rating are removed.

**F4 🟢 Clients.** Corporate or wedding clients who gave written permission to be named.
- *Until answered:* none.

---

## G. Leads and tracking

**G1 🔴 Where do Web3Forms submissions go today?** Which inbox is the key `160ce8ff…` registered to, and is it checked? Also: **20 legacy forms send nothing** (AUDIT §7), including the wedding and Nepal enquiry forms. Is that a surprise?
- *Why:* tells us which sink to build first and whether leads have been lost.
- *Until answered:* the new site falls back to WhatsApp for every lead.
- **Answer (2026-09-28):** no new Web3Forms key for now. The dead forms (23 on live — see the AUDIT addendum) open WhatsApp 918576000083 pre-filled with everything typed; the 117 forms that already post to Web3Forms stay as they are. Which inbox the existing key `160ce8ff…` delivers to is still unknown.

**G2 🟠 Lead routing.** Lead email, WhatsApp Business number, optional Telegram alert, when TravelCRM should start receiving website leads, GTM / GA4 / Google Ads IDs.
- *Until answered:* sinks disabled except WhatsApp fallback; no tracking IDs.

---

## H. Policies and promises

**H1 🟠 Policies.** Free-cancellation window, advance payment, refund timeline, payment methods, the official accounts or UPI IDs for the payment-safety notice, grievance contact. (The S-Class page currently says "No refund on cancellation".)
- *Until answered:* policy pages are generated from `null` config and marked "owner review"; no promises in the funnel.

**H2 🟠 Service promises.** Is 24/7 true? What callback time can you always keep? GPS tracking? "Pickup within 10 minutes"?
- *Until answered:* none claimed.

---

## I. Fix on the live site now (outside the rebuild)

**Approved 2026-09-28** as the hotfix track (`REBUILD_PLAN.md §7.H`, branch `hotfix/live-site`). I1–I5 are in that hotfix, built and waiting for the owner's upload (`hotfix-upload.zip`); I6 (noindex on the Vercel prototypes) is done in the Vercel projects, not in this repo.

**I1 🔴** `index.html`, `blog.html`, `hindi.html` canonical → `https://yourwebsite.com`; `car-rental.html` → `https://yourdomain.com`; `og:url`/`og:image`/`twitter:image` on home. `robots.txt` Sitemap line → `yourwebsite.com`.
**I2 🔴** 20 lead forms that send nothing (list in AUDIT §7).
**I3 🟠** Remove the fake AggregateRating (4.8/150), the "#1 rated 4.8/5" FAQ answer, the three placeholder testimonials, the visitor counter, "500+ cities".
**I4 🟠** Nepal page: remove the passport/visa/COVID document list.
**I5 🟠** `.htaccess`: remove the `no-cache, no-store` block.
**I6 🟠** Set `noindex` on the four Vercel demo prototypes (older CLAUDE.md §9).

---

## L. New questions (2026-09-28)

**L1 🔴 Live-site download.** The instructions point to `C:	axiverz-live`, which doesn't exist. Where is the fresh `public_html` download?
- *Until answered:* no snapshot on `main`, no hotfix.
- **Answer (2026-09-28):** use the 3 Aug server backup after proving it matches live. Proven: all 295 servable files fetched over HTTPS match byte for byte, and the headers match its `.htaccess`. Committed to `main` as `snapshot: live site 2026-09-28`.

**L2 🟠 Lead data retention.** How long may lead records (name, phone, trip) be kept in the outbox before deletion or anonymisation? Needed for the privacy policy (DPDP Act).
- *Until answered:* no automatic deletion; the privacy policy says "as long as needed to serve the booking" and is marked for owner review.
- **Answer (2026-09-28):** 24 months after the last contact, then delete. In `REBUILD_PLAN.md §3.5` and `docs/PRIVACY_POLICY_DRAFT.md` (marked for owner review).

**L3 🟠 Google Maps API key** for `scripts/fetch-distances.ts` (Routes API enabled, billing on the Google Cloud project), in `.env.local` as `GOOGLE_MAPS_API_KEY`. Needed before Phase 4B.
- *Until answered:* distances stay unverified; no route page is published.
- **Noted (2026-09-28):** the owner adds it before Phase 4B.

**L4 🔴 `https://www.taxiverz.com` shows a certificate error.** The SSL certificate doesn't cover `www`: `http://www…` redirects to `https://www…`, which then fails with "certificate not valid for this name". The hotfix's www → apex redirect can't run until the certificate covers `www`. Fix in hPanel → Security → SSL: issue or reinstall the certificate for both `taxiverz.com` and `www.taxiverz.com`.
- *Until answered:* anyone typing `www.taxiverz.com` gets a security warning instead of the site.

**L5 🟠 Hostinger CDN and caching.** Earlier today images came through Hostinger's CDN (losslessly re-compressed); later the origin server answered directly. After uploading the hotfix, purge the CDN cache in hPanel if the CDN is on. With the new caching rules, CSS, JS and images are cached for a year, so any later edit to `script.js`, `style.css`, `whatsapp-forms.js` or an image needs a new file name (or `?v=2` on the reference) plus a CDN purge.
- *Until answered:* nothing — a reminder for every future upload.

**L6 🟢 `.avif` files are served as `text/plain`** (including the logo `taxiverz.avif`). Most browsers still show them; the proper fix is one `.htaccess` line (`AddType image/avif .avif`). Left out of this hotfix because its scope was fixed — say if you want it.

---

## K. Hosting (Phase 8)

**K1 🟢** Vercel Pro (the Hobby plan is non-commercial) or your Hostinger VPS (Docker + Nginx)?
- *Until answered:* the build stays host-neutral (`output: 'standalone'`).
- **Answer (2026-09-28):** Hostinger VPS — Docker (standalone output) + Nginx + Certbot, Cloudflare in front.

---

## Answered

*(none yet)*
