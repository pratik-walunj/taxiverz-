# Progress log

Phase plan: `docs/REBUILD_PLAN.md §7`. Open questions: `docs/OWNER_TODO.md`. Legacy audit: `docs/AUDIT.md`.

| Phase | Status |
|---|---|
| 0 — Scan and audit | ✅ done 2026-09-28, awaiting owner review |
| 7.H — Live-site hotfix | ✅ built on `hotfix/live-site` (pushed); ⏳ owner uploads `hotfix-upload.zip` and confirms it's live → merge into `main` → merge `main` into `nextjs-rebuild` |
| 1 — Foundation | ready to start when the owner says so (A1 answered) |
| 2–8 | not started |

---

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
