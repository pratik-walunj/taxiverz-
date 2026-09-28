# Legacy audit — taxiverz.com (Phase 0)

Written 2026-09-28. Read-only scan; no legacy file was changed or moved.

Everything below was measured from files, not taken from the plan. Where this audit disagrees with `REBUILD_PLAN.md` §1, the correction is listed in §13.

---

## 0. Sources and method

| Source | What it is | Used for |
|---|---|---|
| `Taxiverz-main/` (this repo) | Zip of the GitHub repo, 294 files, 156 `.html` | Primary inventory |
| `Downloads/taxiverz.com/public_html_BACKUP_2026-08-03/` | Server snapshot. Its `index.html` is byte-identical to what `https://taxiverz.com/` serves today | What Google sees |
| `Downloads/taxiverz.com/public_html/` | An **unshipped** cleanup dated 2026-08-03 (new `.htaccess`, `/assets/img/`, `_dev/`, fixed `robots.txt`, 154-URL sitemap) | Context only. It is not live: `/robots.txt` still says `yourwebsite.com`, `/assets/img/bmw-320d.png` is 404 |
| Live probes (read-only GET) | `robots.txt`, `sitemap.xml`, headers, a few URLs | Confirming live behaviour |
| `Downloads/taxiverz-competitor-analysis (2).md` | Text version of `competitor-analysis.pdf` (§1, 5, 6, 11, 12, 14, 18 read) | Background |

Extraction scripts (Python stdlib; kept outside the repo) parsed every page for title, meta, canonical, H1/H2, JSON-LD, phones, emails, prices, distances, forms, links and images.

### Repo vs live — they have diverged

Same 156 HTML files on both, but **55 pages differ in content** (ignoring line endings). Neither is simply newer:

- **Live blanks prices the repo still shows.** On live, the home, `car-rental.html`, `outstation-cab-rental-gorakhpur.html`, `local-taxi-booking-gorakhpur.html`, `airport-taxi-service-gorakhpur.html`, `wedding.html` and 12 route pages show `... INR` where the repo has numbers. Live has 88 pages with placeholder prices; the repo has 67.
- **The repo drops promo H1s that live still has.** 5 live route H1s read "…Get Upto ₹200 Off Use "TAXIVERZ100"", and `gorakhpur-to-lucknow-taxi.html` says ₹500 with the same code.
- **The repo "via" lines are richer.** For example, repo `gorakhpur-to-kathmandu.html` says "Gorakhpur → Raxaul → Birgunj → Kathmandu"; live says "Gorakhpur → Kathmandu".
- The live home page has extra fleet-card CSS that isn't in the repo.

**Consequence:** prices and route facts are taken from both copies and shown side by side. Neither copy counts as a source of truth. OWNER_TODO C1 asks which copy is current.

---

## 1. Environment (plan §7 Phase 0 step 1)

| Check | Result |
|---|---|
| `node -v` | v24.14.1 (≥ 20.9 ✔) |
| `npm -v` | 11.11.0 |
| git | 2.53.0.windows.2. **The folder was not a git repository.** It was initialised for this phase (see PROGRESS.md) |
| Python | 3.14.3 (used only for the audit scripts) |
| `gh` CLI | not installed, so the GitHub remote couldn't be checked |
| Nested folder | The repo sits at `Downloads/Taxiverz-main/Taxiverz-main/`. The kit's `CLAUDE.md` is at `docs/CLAUDE.md`, not the repo root. A **different, older** `CLAUDE.md` sits at `Downloads/CLAUDE.md` (see §14) |
| Kit files missing | `docs/legacy-url-map.json` (created in this phase) and `docs/competitor-analysis.pdf` (it's in `Downloads/` as `Taxiverz-Competitor-Analysis.pdf`) |

---

## 2. Inventory

### 2.1 Files

| Kind | Count | Size |
|---|---|---|
| HTML pages | 156 | 3.3 MB |
| Images (png/jpg/jpeg/webp/avif) | 104 | **50.7 MB** |
| CSS | 20 (`style.css` 79 KB + 19 per-page/fix files) | 0.16 MB |
| JS | 3 (`script.js`, `create-jaguar-pages.js`, `fix-audi-hamburger.js`) | 22 KB |
| Helpers / junk | `add_routes_section.py`, `add-mobile-css.bat`, `mercedes-s-class.zip`, `index-backup.html` (46 bytes), `popular-routes-section.html` (fragment), `luxury-car-hero.jpg` (**0 bytes**) | |
| Config | `.htaccess`, `robots.txt`, `sitemap.xml`, `.vscode/` | |
| **Total** | 294 files | 53.7 MB |

### 2.2 Pages by type

| Type | Files | Notes |
|---|---|---|
| Routes | **57 files → 56 routes** + `gorakhpur-to-mankapuram.html` (unverifiable) | Gorakhpur → 39 destinations (+ `-lucknow-taxi` duplicate), Raxaul → 7, Kathmandu → 5, Ayodhya → 2, reverse Varanasi/Lucknow/Delhi → Gorakhpur 3 |
| Vehicles — cars | 30 | 18 luxury (BMW ×4, Audi ×6, Mercedes ×5, Jaguar ×3), 2 vintage, 10 standard (WagonR, Dzire, City, Verna, Innova Crysta, Fortuner, Scorpio, XUV700, Gypsy, Jeep) |
| Vehicles — group | 11 | Tempo traveller 13/17/20/26, Urbania 13/17, 2×2 AC bus (two pages), 3×2 bus, non-AC bus, sleeper bus |
| Vehicles — bikes/scooters | 13 | |
| Gorakhpur service / keyword pages | 12 | incl. `car-rental.html` (fleet list) and `tours.html` (all-routes list, titled "Local Taxi") |
| Other service pages | 4 | wedding, bike rental, off-road bikes, tempo traveller hub |
| Shoot-car pages | 16 | |
| Nepal | 4 | `international-taxi`, `gorakhpur-to-nepal`, `helicopter-nepal`, `Mountain-Flight-Nepal` |
| Info | 5 | about, contact, faq, blog (one 218-word post), hindi (45 words) |
| Home + junk | 3 | `index.html`, `index-backup.html`, `popular-routes-section.html` |
| **Total** | **156** | |

**Vehicles named on the site with no page:** Ertiga (on 55 pages, including every route fare table), Toyota Etios (29 pages), Tata Winger, Volvo bus, Toyota Hiace ("Only for Nepal"), Land Rover Defender, Mahindra Thar, Toyota Hilux, Range Rover, Audi A5 convertible, Jaguar F-Type, BMW X3, Ford Endeavour, Ambassador (white/black), vintage Jeep, Royal Enfield + sidecar, Bentley Continental/Mulsanne, Rolls-Royce Phantom, GMC Yukon Denali, and 8 off-road bikes (Himalayan, Duke 390, CB350, Dominar 400, Apache RTR 200, FZ25, Xpulse 200, Gixxer 250). **Any of these that isn't actually in the fleet must not reach the new site** (OWNER_TODO B3).

### 2.3 How pages are reached

| Reach | Pages | Meaning |
|---|---|---|
| Crawlable `<a href>` from another page | 78 | |
| **JS only** (`onclick="window.location.href=…"` buttons) | **62** | Every vehicle page, the shoot pages and the bike pages. Crawlers don't follow these, so **the whole fleet is invisible to Google except through the sitemap — and the sitemap lists only 77 of 156 pages** |
| Orphans (referenced by no page) | 16 | blog, faq, cab-in-gorakhpur, gorakhpur-cab-service, gorakhpur-to-lucknow-taxi, helicopter-nepal, Mountain-Flight-Nepal, hindi, the 5 bus/tempo-hub pages, off-road-bikes, and the 2 junk files |

### 2.4 Images

- 104 images, 50.7 MB. **16 are over 1 MB**: `hero passion pro.png` 3.1 MB, `tvs deut.png` 2.6, `20seating.png` 2.5, `helicopterhero.png` 2.3, `Romantic Vidio Shoot.png` 2.2, `maybACH.png` 1.9, `SLK.png` 1.8, `bmw x1.png` 1.4, `bmw 520d.png` 1.4, `audi a6.png` 1.3, `bmw 320d.png` 1.3, `bmw m convertible.png` 1.3, `c class.png` 1.2, `s class.png` 1.1, `caro2.jpg` 1.1, `e class.png` 1.0.
- 48 filenames contain spaces, parentheses, `&` or capitals.
- 8 are unreferenced: `caro1.jpg`, `caro2.jpg`, `caro2.jpeg`, `car13.jpeg`, `car14.jpeg`, `bmw1.jpg`, `thar1.png`, `luxury-car-hero.jpg` (0 bytes).
- **31 image references point at files that don't exist.** Among them: `./taxiverz.avif` on 9 pages, 13 `*.jpeg` names on the luxury/self-drive pages (`audi-a4.jpeg`, `bmw-z4-convertible.jpeg` …), 8 on `car-rental.html` (Bentley, Rolls-Royce, GMC, Ambassador …), `None Ac bus.png`, `sleeperbus.png`, and 4 `* tampu traveller.png`.
- 2 images are hotlinked from Unsplash (bus pages) and 1 from `tempotravellerhire.in` (a competitor's blog), on `tamputraveller.html`.
- Images that aren't this company's own cars: the Unsplash and competitor-blog hotlinks for certain. The rest need the owner to confirm which photos show their own vehicles (OWNER_TODO F1). Gypsy and Jeep images are reported swapped. That needs a visual check in Phase 2 — this scan didn't render images.

---

## 3. Business facts found

| Fact | Value on site | Where / how often | Confidence |
|---|---|---|---|
| Name | "Taxiverz" in all copy. "TAXIVERZ TRAVEL SOLUTIONS" in 6 footers (tempo/Urbania pages). The "TaxiVerz" wordmark exists only in the logo raster | everywhere | Legal name unknown |
| Head office | Railway Station Gate No-1, Gorakhpur, UP 273001 | 84 pages; JSON-LD on home | consistent |
| Branch | Shop No-4, Chaudhari Heights, above Swarna Hotel, Warje, Pune, Maharashtra 411058 | 34 pages (footers of routes and tempo pages); **not** on the contact page | consistent |
| Geo | 26.7606, 83.3732 (Gorakhpur railway station area) | home meta + JSON-LD | plausible |
| Phone (primary) | +91 85760 00083 | 529 occurrences on 154 pages; `tel:` 89×; WhatsApp `wa.me/918576000083` | consistent |
| Phone (second) | +91 85760 00074 | 19× on 8 pages: 5 bus/tempo-hub pages, Fortuner, S-Class, home tempo cards | purpose unknown |
| Placeholder phone | "+91 98765 43210" | **input placeholder** on 5 bus/tempo forms (not shown as a contact number) | remove |
| Email | cabtaxiverz@gmail.com (141× on 111 pages); info@taxiverz.com (42× on 42 pages, route and tempo footers) | | which one gets leads is unknown |
| Placeholder email | john@example.com | **input placeholder** on 5 forms | remove |
| Instagram | `instagram.com/travel_nepal_club` | 42 pages | different brand name |
| Facebook | `facebook.com/share/1Bpqo1dubB/` (share link, not a page URL) | 42 pages | unknown owner |
| Sister sites | nepaltoursandtravels.com, luxurycarrentalss.com | home + helicopter footers | owner to confirm |
| GSC token | `23ajximOhjcSaplr5OFe6VXTGeWWE8bWWp-hZwpNMpI` | 5 pages | keep (CLAUDE.md) |
| Web3Forms key | `160ce8ff-c9a7-4e52-84b3-c3415c3cc08d` (public by design) | 118 forms | which inbox it delivers to is unknown |
| Hours | "24/7" claimed on 63 pages; JSON-LD `Mo-Su 00:00-23:59` | | unverified claim |
| Brand colour | `#ff5800` (745 occurrences in HTML/CSS/JS); the Tailwind-CDN pages use `#d88d0e` | | |
| Copyright | © 2024 on 112 pages, © 2026 on 23 | | |
| Years in business, GST, registrations, fleet size, driver count | **not stated anywhere** | | unknown |

**Claims to remove as unverified:** "#1" (3 pages), "4.8/5" and JSON-LD AggregateRating 4.8/150 (home, faq), "500+ cities" (home hero and chatbot), "GPS tracking" (12 pages), "Quick pickup within 10 minutes" (taxi-rental-near-me), "Our transparent pricing includes all border charges and tolls" (Kathmandu page, contradicted by "Toll, Parking, Border Tax Extra" on vehicle pages), the three testimonials (Rahul Sharma / Priya Patel / Amit Kumar), and the "Total Visitors" counter. The counter increments the visitor's **own** `localStorage`, so it's meaningless as well as unverifiable.

---

## 4. Vehicles — every price found

Legend: **V** = the vehicle's own page · **H** = home card (`index.html`) · **CR** = `car-rental.html` · **CRS** = `car-rental-service-in-gorakhpur.html` · **(L)** = live differs from the repo. `…` = placeholder. All prices are as shown on the site; none is verified.

### 4.1 Standard cars

| Vehicle | Seats shown | Outstation ₹/km, min km/day | Local packages | Night | Other prices found | Conflicts |
|---|---|---|---|---|---|---|
| WagonR | 4+1 (V) · 5 (H) | 10, 200 (V, H) | 8h/80, 12h/120: `₹...` (V); extra km ₹10 | ₹200 (H) | driver allowance `₹.../day` (V) | H blank on live (L). CR repo swaps this card for Dzire |
| Swift Dzire | 4+1 (V) · 4 (CR) · 5 (H) | 11, 200 (V) · 10 CNG / 11 diesel (H) | `₹...` (V); extra km ₹10 | ₹200 (H) | ₹1,200/day (CR, CRS) · ₹8/km (CRS; CR meta "starting ₹8/km") · ₹12/km (airport page, Lucknow page FAQ, chatbot) · ₹12–15/km outstation (blog) · route tables ₹14–29/km | **₹8 / 10 / 11 / 12 / 14 / 20 / 27 / 29 per km** on different pages |
| Honda City | 4+1 (V) · 5 (H) | 20, 200 | `₹...` | ₹300 | driver allowance `₹...` | |
| Hyundai Verna | 4+1 (V) · 5 (H) | 20, 200 | `₹...` | ₹300 | ₹1,400/day (CR) | ₹1,400/day vs ₹20/km × 200 km |
| Innova Crysta | 7+1 & 6+1 | 14, 250 | 6h/60 ₹2,000 · 8h/80 ₹2,600 · 12h/120 ₹3,000 (V = H) | ₹300 | ₹2,700/day + ₹18/km (CRS) · "Innova" ₹2,200/day (CR) · ₹18/km (international-taxi) · route tables ₹18–58/km · `00 INR/KM` (Bagaha) | ₹14 vs ₹18 vs ₹35–58/km |
| Mahindra Scorpio | 7+1 & 6+1 | 16, 250 | 6h/60 ₹2,200 (V) · + 8h/80 ₹2,800, 12h/120 ₹3,200 (H) | ₹400 | ₹2,800/day (CR) | consistent across V/H |
| Mahindra XUV700 | 7+1 | 38, 200 | "Custom" | ₹500 | | H blank on live |
| Toyota Fortuner | 7+1 | 40, 200 | 8h/80 ₹4,000; extra km ₹40, extra hour ₹400 | ₹500 | ₹3,200/day (CR) · ₹25/km (international-taxi) | ₹25 vs ₹40/km |
| Maruti Gypsy | 4+1 (V) · 6 (CR) | 25, 200 | `₹.....` 8h/80; extra km ₹25, extra hour ₹250 | ₹300 | ₹2,200/day (CR) | seats 5 vs 6 |
| Jeep (model unknown) | 5+1 | 30, 200 | `₹....` 8h/80; extra km ₹30, extra hour ₹300 | ₹400 | ₹3,500/day "Luxury SUV" (CR) | |

### 4.2 Luxury cars — the home card and the vehicle page often disagree

Format: wedding package / outstation ₹/km (min km) / corporate package.

| Vehicle | Own page (V) | Home card (H) | Other | Verdict |
|---|---|---|---|---|
| BMW 320d | "Call for price" everywhere | ₹12,000 (16h) / ₹60 (200) / ₹8,000 | ₹4,200/day (CR) | conflict |
| BMW 520(d) | ₹20,000 (16h) / ₹90 (200) / ₹15,000 | ₹16,000 / ₹80 / ₹8,000 | ₹4,800/day (CR) | **conflict** |
| BMW X1 | "Call for price" | ₹12,000 / ₹60 / ₹8,000, typed "Luxury Sedan" | ₹5,000/day (CR) | conflict; it's an SUV |
| "BMW MZ Convertible" | "Call for price", 2 seats | ₹25,000 / ₹100 (250) / ₹15,000, "5 seats, Luxury Sedan" | CR calls it a Z4 | **not a real model**; seats conflict |
| Audi A4 | ₹8,000 (14h) / ₹70 (200) / ₹8,000 | same | ₹4,200/day (CR) | consistent |
| Audi A6 | ₹16,000 (14h) / ₹80 / ₹8,000 | same | ₹4,800/day (CR) | consistent |
| Audi A8 | ₹25,000 (14h) / ₹100 (250) / ₹8,000 | same | ₹5,800/day (CR) | corporate ₹8,000 looks wrong for an A8 |
| Audi Q3 | ₹8,000 / ₹80 / ₹8,000 | same, but summary line `₹--/km` | ₹4,500/day (CR) | |
| Audi Q5 | ₹16,000 / ₹80 / ₹8,000 | same | | |
| Audi Q7 | ₹25,000 / ₹100 (250) / ₹8,000, 7 seats | corporate `₹-----`, 5 seats | ₹6,500/day (CR) | seats conflict |
| Mercedes C-Class | ₹12,000 (16h) / ₹60 / ₹8,000 (8h/**60** km) | same | ₹4,500/day (CR) | |
| Mercedes E-Class | ₹16,000 / ₹80 / ₹8,000 | same | ₹5,200/day (CR) | |
| Mercedes S-Class | local ₹8,000+ 8h/80 · outstation **₹50** (250) · extra km ₹50 · night ₹500 **21:30–06:30** · "No refund on cancellation" | ₹25,000 / **₹100** (250) / ₹8,000 | | **₹50 vs ₹100/km**; night window differs from every other page (22:00–06:00) |
| Mercedes Maybach | ₹30,000 (16h) / ₹120 (250) / ₹25,000; washing ₹800 | same | | consistent |
| Mercedes SLK | "Call for price", seats 2+1 | every field `₹--`, typed "Sedan", 5 seats | ₹9,000/day (CR) | **seats 2 vs 5** |
| Jaguar XE | ₹10,000 (16h) / ₹55 / ₹7,500 (8h/60) | ₹25,000 / ₹100 (250) / ₹15,000 | ₹4,000/day (CR) | **conflict (2–2.5×)** |
| Jaguar XF | ₹14,000 / ₹70 / ₹8,000 | ₹30,000 / ₹120 / ₹25,000 | | **conflict (2–3×)** |
| Jaguar XJL | ₹18,000 / ₹85 / ₹10,000 | every field `₹--` | ₹5,500/day (CR) | page has prices; home doesn't |
| Vintage classic / vintage luxury | no prices | | Ambassador ₹3,000/day, vintage Jeep ₹4,000 (CR "election" section); "Royal vintage" ₹15,000/day (wedding page) | which cars exist is unknown |

Common to luxury pages: "Extra hour ₹500", "Night ₹500 (10 PM–6 AM)", "Washing ₹500", "Garage to garage", "Toll, parking extra".

### 4.3 Group vehicles

| Vehicle | Prices found | Notes |
|---|---|---|
| Tempo traveller 13 / 17 / 20 / 26 | own pages `₹....` · hub (`tamputraveller.html`) **₹24 / 26 / 30 / 35 per km** · home `₹--/km` · airport page "Tempo 12+" ₹20/km | 26-seater page says "25 passengers + 1 driver" |
| Force Urbania 13 / 17 | own pages `₹....` · home `₹--/km` · home "Force Urbania 10–13 seater" ₹25/km | footers name the Pune branch only |
| Tata Winger | home ₹20/km (12–15 seats) | no page |
| Volvo bus | home ₹28/km (30–35 seats) | no page |
| 2×2 AC bus (`2-2-ac-bus.html`) | min 250 km/day, night ₹500, no rate | 45–50 seats |
| 2×2 luxury bus (`luxurybus.html`) | local ₹12,000 8h/80 · extra hour ₹1,500 · outstation ₹65/km, min 300 | **identical prices to the 3×2 bus** |
| 3×2 luxury bus | local ₹12,000 · ₹65/km, min 300 | 50–60 seats |
| Non-AC bus | local ₹9,000 8h/80 · ₹45/km, min 250–300 | |
| Sleeper bus | AC ₹75/km · non-AC ₹55/km, min 300 | "Live location sharing" claim |

### 4.4 Bikes and scooters

All 13 bike/scooter pages show `₹...` for daily, weekly and monthly plans, with km limits filled in (e.g. Activa 100 km/day, 2,500 km/month). `off-road-bikes.html` prices 8 bikes that have no pages (₹500–1,200/day). "TVS Duet" isn't a TVS model (the Duet was a Hero scooter).

### 4.5 Pricing structure the legacy site uses (keep the structure, verify the numbers)

- Outstation: ₹/km × max(actual km, min km/day × days). Min 200 km/day (cars) or 250 (Innova, Scorpio, A8, Q7, S-Class, Maybach, buses), 300 (big buses). "Garage to garage."
- Driver allowance: "included" on most vehicle pages; `₹.../day` on WagonR, Dzire, City and Verna. It's never a number.
- Night charge: ₹200 (hatch/sedan), ₹300 (City, Verna, Innova, Gypsy), ₹400 (Scorpio, Jeep), ₹500 (SUVs, luxury, buses); 10 PM–6 AM (S-Class page: 21:30–06:30).
- Local packages: 6h/60, 8h/80, 12h/120 km; extra km and extra hour rates.
- Luxury: wedding package (14h or 16h) + extra hour; corporate 8h/80 (some 8h/60); washing ₹500–800.
- Extras listed everywhere: toll, parking, state/border tax. GST is mentioned on 4 pages ("GST … extra"). No GST rate is ever stated.

---

## 5. Routes — legacy facts and plausibility

**Plausibility check:** the "Check" column uses rough road distances from general geographic knowledge. **They are not verified figures and must not be published.** They only flag values that look wrong by a wide margin. All 56 distances start `verified: false` in Phase 2.

Fares: repo one-way tables are shown as Dzire/Ertiga/Etios/Innova ₹ per km. `..` = placeholder. Live has blanked every route fare table that the repo still fills.

### 5.1 From Gorakhpur (39 + duplicate + Mankapuram)

| Destination | Legacy km / time | Legacy "via" (repo) | Repo fare ₹/km | Check |
|---|---|---|---|---|
| Agra | 651 / 10–11 h | Lucknow–Kanpur | — | ok. cab-service page says 603 |
| Ayodhya | 135 / 3–4 h | Basti–Gonda | `..` | ok. Gonda isn't on NH27 |
| Azamgarh | 110 / — | direct | `..` | ok |
| Bagaha | 110 / 2–3 h | **Barhaj** | 14/16/18/**00** | via is the wrong direction; Innova `00` |
| Ballia | 175 / 3–4 h | direct | 14/16/18/18 (live `...`) | ok |
| Banaras → varanasi | 209 / — | Deoria–Mau | `..` | ok. 224 on cab-service, 230 on the reverse page |
| Basti | 60 / — | direct | `..` | ~70. The local-taxi page says 68 |
| Bodhgaya | 364 / 7–8 h | **Basti**–Chhapra–Patna–Gaya | — | Basti is the wrong direction |
| Butwal | 190 / 5–6 h | Sonauli–Bhairahawa | 27/30/32/54 | **implausible**: ~120–130 km |
| Chitrakoot | 280 / 5–6 h | — | "from ₹4,500" | **implausible**: well over 400 km |
| Chitwan | 200 / 4–5 h | Sonauli–Bhairahawa–Narayanghat | — | low: ~250+ km |
| Dehradun | 1,075 / 15–17 h | Lucknow–Bareilly–Moradabad | 14/16/18/18 | high: ~850–900 km |
| Delhi | 871 / 12–14 h | — | `₹....`; "₹14,500 onwards" elsewhere | **conflict**: 750 (reverse page), 822 (cab-service) |
| Deoria | 35 / 1 h | direct | `..` | **conflict**: 53 on the local-taxi page; ~50–55 |
| Goa | 2,100 / 32–34 h | Mumbai | — | distance plausible; is this route really offered? |
| Gopalganj | 120 / 2.5 h | — | "from ₹2,500" | ok |
| Indore | 1,050 / 17–18 h | Lucknow–Bhopal | — | ok-ish |
| Jaipur | 850 / 14–15 h | Lucknow–Agra | — | ok-ish |
| Janakpur (NP) | 324 / 6–7 h | **Sonauli–Bhairahawa** | `..` | via is wrong: Janakpur is east (Raxaul/Bhitthamore side) |
| Kanpur | 380 / 7–8 h | Basti–Gonda–Lucknow | — | ok. cab-service says 359 |
| Kathmandu (NP) | 280 / 7–8 h | Raxaul–Birgunj | `...` | **implausible, and conflicts** with `gorakhpur-to-nepal.html` (350 km, 10–12 h, via Sonauli). Either border is well over 350 km and ~9–12 h |
| Kolkata | 750 / 13–14 h | Patna–Bardhaman | — | low-ish: ~800+ |
| Kushinagar | 55 / — | direct | `..` | ok |
| Lucknow | 270 / 5–6 h | Basti–Gonda–Barabanki | `..` | ok. 269 on the `-taxi` duplicate and cab-service; 280 on the reverse page |
| Lumbini (NP) | 125 / 3–4 h | Sonauli–Bhairahawa | — | ok |
| Maharajganj | 90 / — | direct | 20/22/23/35 | **conflict**: 57 on the local-taxi page; ~55–60 |
| Manokamana (NP) | 320 / 8–9 h | **Raxaul–Kathmandu**–Manokamana | — | via backtracks: Manokamana is ~100 km *before* Kathmandu |
| Mau | 140 / 3 h | direct | `..` | high-ish: ~110 |
| Muktinath (NP) | 450 / 10–12 h | Sonauli–Bhairahawa–Pokhara | 19/22/24/40 | distance ok; **10–12 h is not realistic** (mountain road past Beni/Jomsom). Regulatory (area permits, vehicle change) → owner |
| Mumbai | 1,650 / 26–28 h | Lucknow–Bhopal–Indore | — | ok |
| Nainital | 420 / 8–9 h | Bareilly–Haldwani | — | **implausible**: ~650–700 km |
| Nashik | 1,450 / 23–24 h | Bhopal–Indore | — | ok-ish |
| Patna | 190 / 4 h | **Basti**–Chhapra | `..` | **implausible**: ~250–270 km; Basti is the wrong direction |
| Pokhara (NP) | 280 / 7–8 h | Sonauli–Bhairahawa–Butwal | — | distance ok; time optimistic |
| Prayagraj | 320 / 6–7 h | Azamgarh–Jaunpur | — | conflict: 287 on cab-service ("Allahabad") |
| Raxaul | 150 / 3 h | — | "from ₹3,200" | **implausible**: ~220–240 km |
| Siddharthnagar | 75 / 2 h | direct | 20/22/23/35 | low-ish: ~90–100 |
| Siwan (Chhapra) | 140 / 3 h | Siwan–Chhapra | 20/22/23/35 | Siwan and Chhapra are two towns |
| Ujjain | 1,100 / 18–19 h | Lucknow–Bhopal | — | ok-ish |
| *Lucknow (`-taxi` dup)* | 269 / 5–6 h | — | "₹1,700 starting", ₹12/km FAQ | ₹1,700 for 269 km = ₹6.3/km, impossible against ₹10+/km elsewhere |
| *Mankapuram* | 200 / 5–6 h | Sonauli–Bhairahawa | 29/39/35/58 | **place can't be verified**; described as a Nepal town |

### 5.2 Other origins

| Route | Legacy km / time | Via | Fares | Check |
|---|---|---|---|---|
| Raxaul → Kathmandu | 150 / 4–5 h | Birgunj | `..` | shortest road ~135–150 km but slower; ok-ish |
| Raxaul → Pokhara | 350 / 9–10 h | **Kathmandu** | `..` | via is a detour; direct via Narayanghat is shorter |
| Raxaul → Chitwan | 180 / 5–6 h | — | `..` | ok-ish (~150) |
| Raxaul → Janakpur | 80 / 2–3 h | Birgunj | `..` | **low**: ~130–170 |
| Raxaul → Lumbini | 120 / 3–4 h | Birgunj | `..` | **implausible**: ~280+ |
| Raxaul → Manokamana | 250 / 7–8 h | **Kathmandu** | `..` | via is a detour (~190 direct) |
| Raxaul → Muktinath | 450 / 12–14 h | Kathmandu–Pokhara | `..` | time unrealistic; regulatory → owner |
| Kathmandu → Pokhara | 200 / 6–7 h | Mugling–Dumre | ₹8,500 / 11,200 / 16,500 (sedan/SUV/TT) | ok |
| Kathmandu → Chitwan | 150 / 4–5 h | Mugling–Narayanghat | ₹6,800 / 9,200 / 13,500 | ok |
| Kathmandu → Manokamana | 104 / 3–4 h | Mugling–Kurintar | ₹5,500 / 7,500 / 11,000 (live `...`) | ok |
| Kathmandu → Nagarkot | 32 / — | Bhaktapur | ₹3,200 / 4,500 / 6,800 (live `...`) | ok |
| Kathmandu → Janakpur | 390 / 8–9 h | Bardibas–**Lahan** | ₹12,500 / 16,800 / 24,000 (live `...`) | Lahan is past Janakpur; via Sindhuli (BP highway) is ~225 km |
| Ayodhya → Kushinagar | 190 / 4–5 h | Basti–Gorakhpur | 20/23/25/39 | ok |
| Ayodhya → Prayagraj | 288 / 5–6 h | Sultanpur–Amethi | 14/16/18/18 | high: ~165–175 km |
| Varanasi (Banaras) → Gorakhpur | 230 / 4–5 h | — | sedan ₹4,000, Ertiga ₹4,500 | ok |
| Lucknow → Gorakhpur | 280 / 5–6 h | — | sedan ₹4,000, Ertiga ₹4,500 | ₹4,000 here vs ₹1,700 on the forward page |
| Delhi → Gorakhpur | 750 / 12–14 h | — | sedan ₹14,500, Ertiga ₹15,000 | conflicts with 871/822 |

**Also found:** `gorakhpur-cab-service.html` has a 15-row fare table (e.g. Gorakhpur–Delhi 822 km ₹5,800, which is ₹7/km). `local-taxi-booking-gorakhpur.html` lists 14 nearby towns with distances and fares ₹200–750 (repo; live `...`). Three pages mention card routes that have no page: Palpa, Narayanghat (international-taxi), Noida, Bareilly, Ghaziabad, Sitapur (cab-service table). Kathmandu-origin pages quote a "Tempo Traveller (12 Seater)", a size that doesn't match any tempo-traveller page.

### 5.3 Content quality

Route bodies are 137–859 words. After removing site-wide boilerplate, **52 route pairs are near-duplicates** (5-word-shingle Jaccard > 0.35; worst Azamgarh ~ Mau 0.61, Ballia ~ Basti 0.58, Chitwan ~ Lumbini 0.50). Six luxury vehicle pages are near-duplicates (Jaguar XE ~ Mercedes C-Class 0.60). Shoot and bike pages aren't (max 0.12). **No route page meets the §5 gates as-is.** Route content is rewritten in Phase 4B; the legacy text is at most a source of "places to visit" names.

---

## 6. Other priced offers

| Page | Offer | Legacy numbers |
|---|---|---|
| `airport-taxi-service-gorakhpur.html` | Pickup / drop "₹300 base"; sedan ₹12, SUV ₹16, hatchback ₹10, tempo ₹20 per km | all `...` on live |
| `blog.html` | Station transfer ₹150–300, airport ₹800–1,200, local from ₹10/km, outstation ₹12–15/km | |
| `taxi-rental-near-me-gorakhpur.html` | "₹50 base", pickup "within 10 minutes" | unverifiable promise |
| `wedding.html` | Luxury sedan ₹8,000/day, premium SUV ₹12,000, royal vintage ₹15,000, decorated hatch ₹5,000; packages Basic ₹15,000, Premium ₹35,000, Royal ₹75,000 | all `...` on live |
| `international-taxi.html` | "From" fares: Nepal ₹4,500, Kathmandu ₹8,500, Pokhara ₹9,500, Chitwan ₹7,800, Manokamana ₹6,500, Muktinath ₹12,500, Janakpur ₹5,200, Palpa ₹8,200, Lumbini ₹4,800, Butwal ₹5,200, Narayanghat ₹6,800; Innova ₹18, Fortuner ₹25, Hiace ₹28 per km | a Kathmandu one-way can't be ₹8,500 at ₹18/km × 370 km |
| `outstation-cab-rental-gorakhpur.html`, `tours.html` | "₹X onwards" for every route (₹800 Deoria … ₹14,500 Delhi) | live: all `...` |
| `off-road-bikes.html` | 8 bikes ₹500–1,200/day | |
| `helicopter-nepal.html`, `Mountain-Flight-Nepal.html` | all `₹.....` | operator unknown |
| Promo code | "TAXIVERZ100 — up to ₹200 off" (₹500 on one page) | 5 live H1s + 1 repo H1 |

---

## 7. Forms and integrations

| Channel | Count | Status |
|---|---|---|
| Web3Forms POST with the real key | ~115 forms | **Work**, assuming the key is active. Where they deliver is unknown (OWNER_TODO G1) |
| Web3Forms with a **placeholder key** (`YOUR_ACCESS_KEY_HERE` / `YOUR-KEY-HERE`) | **7 forms**: luxury3-2bus, luxurybus, noneacbus, sleeperbus, tamputraveller, Mountain-Flight-Nepal, Music-Video-Shoots | **Leads lost** (submission rejected) |
| `<form>` with no action and no handler (browser reloads the page) | **10 forms**: tempo traveller 13/17/20/26, urbania 13/17, **wedding.html**, **international-taxi.html**, helicopter-nepal, off-road-bikes | **Leads lost** |
| JS `preventDefault()` + "submitted!" alert, nothing sent | **3**: home contact form (intercepted by `script.js` even though it has a Web3Forms action), `local-taxi-booking-gorakhpur` booking modal, `car-rental` booking modal | **Leads lost; user told it worked** |
| Home "Quick booking" → `wa.me/918576000083` with pickup, drop, date, time and car type | 1 | Works. **Keep the idea** |
| Floating WhatsApp button | home and others | Works |
| Chatbot (`script.js`) | home | Canned answers; repeats "500+ cities" and "₹8/km local, ₹12/km outstation" |
| Visitor counter | home, helicopter | Fake (counts the visitor's own visits in `localStorage`) |
| Analytics / GTM / pixel | 0 | None anywhere |
| Maps embed (contact) | 1 | Hand-made `pb=` string with dummy IDs, pointing at "Gorakhpur Railway Station", not a business listing |

**20 forms on 20 pages silently lose leads — including the wedding and Nepal pages, two of the three moats.** This is the most expensive live defect after the canonical.

---

## 8. SEO state

| Item | Finding |
|---|---|
| Canonical | Missing on 152 pages. Placeholder on 4: `index.html`, `blog.html`, `hindi.html` → `yourwebsite.com`; `car-rental.html` → `yourdomain.com` |
| `og:url` / `og:image` | Only on home (`yourwebsite.com`) and car-rental (`yourdomain.com`); `twitter:image` also placeholder |
| `robots.txt` | `Sitemap: https://yourwebsite.com/sitemap.xml`; odd `Allow: /services` lines. **Live today** |
| `sitemap.xml` | 78 URLs (77 files + `/`; both `/` and `/index.html`); 79 pages missing, including all vehicle, bike and shoot pages |
| Titles | 154 present; 2 empty (junk files); 1 duplicate pair (cab-in-gorakhpur / gorakhpur-cab-service); 8 over 60 characters |
| Meta description | **Missing on 140 of 156 pages** |
| H1 | 149 pages with exactly one; 2 with two (home, about); 5 with none (airport, local-taxi-booking, outstation-cab-rental, and the 2 junk files) |
| Meta keywords | 4 pages. Geo meta and Dublin Core on home |
| Structured data | 5 pages: home (TaxiService + Offer catalog + **AggregateRating 4.8/150, fabricated**), faq (FAQPage, whose first answer is "#1 rated … 4.8/5"), car-rental (LocalBusiness), hindi (TaxiService), blog (Article) |
| Viewport | `width=device-width, initial-scale=1.0` on 154 pages. **Pinch-zoom is not disabled** (good) |
| Rendering | Static HTML (good), but 20 pages load the Tailwind Play CDN (styling done in the browser at runtime) |
| Internal links | 11 pages link to 5 URLs that don't exist on a case-sensitive server: `luxury-shoots.html` (11×), `celebration-shoots.html`, `couple-portraits.html`, `romantic-convertibles.html`, `vlog-shooting.html`. 322 `href="#"` on 54 pages |
| Caching | `.htaccess` sends `no-cache, no-store` for everything; confirmed live |
| Server | Hostinger (hcdn); case-sensitive (`/gypsy.html` → 404); extensionless URLs 404 |
| Hreflang | none; `hindi.html` is a 45-word stub |

---

## 9. Defects not covered above

- **Nepal document advice is wrong and contradictory.** `international-taxi.html` says Indians need a passport with 6 months' validity, a visa "on arrival", a COVID vaccination certificate and an international driving permit. Route-page FAQs say (correctly, in general) that no visa is needed. 14 pages mention visas. **Regulatory copy must be owner-verified; nothing from `international-taxi.html` migrates.**
- "Our transparent pricing includes all border charges and tolls" (Kathmandu page) contradicts "Toll, parking, border tax extra" on the vehicle pages.
- The S-Class page states "No refund will be applicable in case of booking cancellation". No policy pages exist anywhere (terms, privacy, refund).
- Vehicle type errors: BMW X1 typed "Luxury Sedan"; SLK typed "Sedan" with 5 seats; "BMW MZ Convertible"; "TVS Duet"; 26-seater described as 25+1.
- The home page has three separate booking forms. The main "Get Fare Quote" widget has no pickup or drop field.
- Promo code H1s ("Get Upto ₹200 Off Use TAXIVERZ100") on live route pages.
- `script.js` drives a carousel (auto-advancing), the fake counter and the chatbot — all banned in the new stack.
- `.htaccess` has no redirects at all, so there's nothing legacy to preserve beyond the 156 URLs.

---

## 10. Legacy copy worth keeping

Very little text survives as-is. Keep the *ideas* and a few facts; rewrite everything:

- **The WhatsApp quick-booking pattern** (trip summary pre-filled into `wa.me`). It becomes "Book on WhatsApp" in the funnel.
- **Route "places to visit" names** (Gorakhnath Temple, Ramgarh Taal, Gita Press, Maya Devi Temple, Janaki Mandir, Phewa Lake, Sauraha …). They're useful seed lists for the route guides and destination pages. Descriptions are generic and must be rewritten.
- **The local-destination list with distances** from `local-taxi-booking-gorakhpur.html` (Kauriram 31, Gagaha 44, Barhalganj 62, Bansgaon 29, GIDA 14, Sahjanwa 21, Khalilabad 33, Pipraich 20, Khajani 26, Sikriganj 42, Campierganj 37 km). It seeds the Places dataset and the local-rental page. Distances unverified.
- **Pricing structure** (§4.5): min km/day, garage-to-garage, night window, 6/8/12-hour packages, wedding hours + extra hour, corporate 8h/80.
- **Service breadth** as a checklist: wedding, shoots (6 intents), bikes, buses, Nepal inside-country routes, helicopter/mountain flight (drafts).
- **Blog post topics**: the Gorakhpur places list becomes `/destinations/gorakhpur/places-to-visit/`.
- **Nothing** from testimonials, ratings, "#1", "500+ cities", the chatbot, the Nepal document list, or any fare table.

---

## 11. Brand

- Logo: orange car over a charcoal "TaxiVerz" wordmark. Raster only (`taxiverz.avif` 7.6 KB, `taxiverz.jpeg` 58 KB); no SVG. The tagline "Luxury on the Move" appears **only in the logo image**, never in site text.
- Colours in use: `#ff5800` (main pages), `#d88d0e` (Tailwind-CDN pages). Font Awesome via cdnjs on 151 pages; Google Fonts on 1.

---

## 12. Legacy URL map (`docs/legacy-url-map.json`)

The file didn't exist in the kit. It was **created** here from the real files and validated.

- **Coverage: 156 / 156** HTML files. Paths are %20-encoded where needed. No two entries collide case-insensitively. Every target is lowercase, hyphenated and has a trailing slash. No self-loops.
- Each entry has: `legacyPath`, `file`, `type`, `target`, `fallback` (used while the target page is unpublished), `confidence` (142 high / 7 medium / 7 needs-owner), `inSitemap`, `linkedFrom` (anchor / js-only / orphan) and `note`.
- 135 distinct targets. The 57 route files map to **56** route URLs (the Lucknow duplicate is consolidated).
- `aliases`: 2 broken internal links that were never files (`/luxury-shoots.html`, `/couple-portraits.html`). The other 3 broken links are case variants of real files, which case-insensitive matching already covers.

Mapping decisions worth reviewing:

| Decision | Why |
|---|---|
| `banaras` → `varanasi` in route slugs | Plan §3.2 makes Varanasi canonical with Banaras/Kashi as aliases |
| `gorakhpur-to-siwan-chhapra` → `…-to-siwan/` | Two towns; the 140 km fits Siwan (needs-owner) |
| `gorakhpur-to-mankapuram` → `/nepal-taxi/gorakhpur/` | Place unverifiable (needs-owner) |
| `2-2-ac-bus` and `luxurybus` → one `/fleet/luxury-bus-2x2/` | Same vehicle type |
| `bmw-mz-convertible`, `TVS-duet` → service hubs | Model names are wrong; repoint once confirmed |
| `Jeep` → `/fleet/jeep/` | Model unknown (needs-owner); slug should name the model |
| `blog.html` → `/destinations/gorakhpur/places-to-visit/` | The post *is* a places-to-visit guide and the URL tree has that slot. The plan says "migrate to the blog"; flagged in the report |
| Shoot pages → 6 intent pages + hub | Titles decide: "Pre-Wedding" → pre-wedding, "Post-Wedding"/"Couple" → post-wedding, advertisement + fashion → ads-and-fashion, YouTube + vlog → youtube-and-vlogs; celebration, luxury, vintage → hub |
| `helicopter-nepal`, `Mountain-Flight-Nepal` → `/packages/…/` with fallback `/nepal-taxi/` | Drafts until the operator and prices are confirmed |
| `hindi.html` → `/` | Until a `/hi/` version exists |
| Image URLs | **Not mapped.** 104 legacy image URLs will 404 after launch. Low value; see the report |

---

## 13. Plan §1 — confirmed and corrected

| Plan §1 claim | Audit |
|---|---|
| 156 pages, ~20 per-page CSS, helper scripts and junk | ✔ confirmed (20 CSS incl. `style.css`). Also a **0-byte** `luxury-car-hero.jpg` |
| ~51 MB images, several 1–3 MB PNGs | ✔ 50.7 MB, 16 over 1 MB |
| 20 pages load the Tailwind Play CDN; no analytics | ✔ |
| Routes 58 → 56 | **Correction:** 57 route files (+ Mankapuram, + `gorakhpur-to-nepal` counted under Nepal) → 56 routes. Counts per origin ✔ |
| Vehicles 54 (30/11/13) | ✔ |
| Service/keyword 12, other service 4, shoots 16, Nepal 4, info 5, home+leftovers 3 | ✔ |
| `sitemap.xml` 78 of 156, includes `/` and `/index.html` | ✔ (77 files + `/`) |
| Canonicals missing on most, placeholder on four | ✔ 152 missing; 4 placeholder |
| Two H1s on home | ✔ (also about.html; 3 service pages have none) |
| `.htaccess` no-cache | ✔ confirmed live |
| Dzire ₹10 / "₹8" / ₹29 | ✔ and more: ₹11, ₹12, ₹14, ₹20, ₹27 on other pages |
| Kathmandu 280 via Raxaul vs 350 via Sonauli | ✔ |
| BMW X1 "sedan", SLK 5 seats, "MZ Convertible", blank prices on XJL/SLK/TT/Urbania | ✔. **Correction:** Jaguar XJL has full prices on its own page; only the home card is blank |
| Visa assistance offered | ✔ and worse: passport, visa-on-arrival and COVID certificate on `international-taxi.html` |
| Phones: 8576000083 (525), 8576000074 (19) | ✔ (529 / 19) |
| **Fake numbers 9876543210, 8234567890, 7012590923 on 6 pages** | **Correction.** 9876543210 is an input *placeholder* on 5 forms. **8234567890 and 7012590923 aren't phone numbers**: they're digits inside a Google Maps embed URL and an Unsplash photo ID |
| Emails 141 / 42 / john@example.com | ✔. john@example.com is an input placeholder |
| Placeholder testimonials; AggregateRating 4.8/150; "#1 rated, 4.8/5" | ✔ |
| Gypsy/Jeep images swapped | Not verified here (needs a visual check in Phase 2) |
| Instagram `travel_nepal_club` | ✔ |
| Logo tagline "Luxury on the Move"; accent `#ff5800` | Tagline only in the raster logo. `#ff5800` has 745 occurrences, not 134 |
| Lead intake: Web3Forms, WhatsApp quick booking, chatbot, visitor counter | ✔, but **20 forms send nothing** (§7). The plan doesn't mention this |
| Report correction: no structured data → there is | ✔ |

**Not in the plan at all:** repo/live divergence (§0), the unshipped Aug-3 cleanup, JS-only vehicle links (§2.3), 140 missing meta descriptions, 31 missing image files, the competitor-blog hotlink, promo-code H1s, the second conflicting `CLAUDE.md`.

---

## 14. Spec conflict — two CLAUDE.md files

| | `Downloads/CLAUDE.md` (15 Sep; loaded automatically by Claude Code) | `docs/CLAUDE.md` (28 Sep; ships with REBUILD_PLAN) |
|---|---|---|
| Stack | Next.js **15**, **NestJS + Prisma + PostgreSQL 18**, **pnpm + Turborepo** monorepo, JWT admin | Next.js **16**, single app, **npm**, **no database in v1**, Route Handlers + `src/server/*` |
| Booking URL | `/search?trip=&from=&to=` + `/booking/{ref}/` | `/book/?type=…` + `/book/confirmed/` (noindex) |
| Services | 9 hubs | 13 hubs (+ nepal-taxi, shoot-car-rental, bus-rental, bike-rental) and `/cabs/` directory |
| Design | Demo IV base, navy `#102A43` + amber, combine the four prototypes | "DESIGN REFERENCE: none"; default "premium regional operator" with orange `#FF5A00` + milestone motif |
| Vehicle model | Class-based (Demo III) | Per-vehicle rates, tiers |
| Routes to 301 | "25 live route pages" | 156 URLs |

Phase 0 is independent of the stack, so work went ahead. **Phase 1 can't start until one spec is chosen** (OWNER_TODO A1). The URL map follows `REBUILD_PLAN.md §2.1`. Every route, city, fleet and service-×-city target is also valid under the older spec. Only `nepal-taxi`, `shoot-car-rental`, `bus-rental`, `bike-rental` and `/cabs/` are extra hubs the older spec doesn't list.

---

## Addendum (2026-09-28) — corrections from the live snapshot

The live site (now `main`) was re-scanned for the hotfix. Where it differs from this audit, which used the GitHub copy:
- **Dead forms: 23 on live, not 20.** Besides the 20 in §7, the wedding and airport pages have booking modals that show "Booking request submitted!" and send nothing, and the home page has a booking modal that nothing opens. 117 forms post to Web3Forms with the real key.
- The helicopter page shows a hard-coded visitor count of **1,24,582**; `taxi-rental-near-me-gorakhpur.html` shows "4.8★ rating"; the S-Class page has "What Makes Us #1".
- `https://www.taxiverz.com` fails with a certificate error (OWNER_TODO L4). `.avif` files are served as `text/plain` (L6).
- Earlier today Hostinger's CDN served losslessly re-compressed JPEG/PNG files; the origin files are unchanged.
- **Gypsy/Jeep images (§13):** viewing the images in Phase 2 shows the *filenames* are swapped (`jeep.png` is a Gypsy, `gypsy.jpeg` is an open jeep) but each legacy page displays the right vehicle. The plan's "images are swapped" claim is wrong. See `docs/IMAGE_MAP.md`.
