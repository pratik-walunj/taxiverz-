# CLAUDE.md — Taxiverz (taxiverz.com)

Persistent project memory for Claude Code. It is loaded every session, so it holds only the rules that never change. The full spec and the phase plan are in `docs/REBUILD_PLAN.md`.

> **DESIGN REFERENCE:** none — decided by the owner (2026-09-28). `docs/DESIGN.md` is the design; the demo prototypes are not a reference.

## Your role

You are the principal engineer on this rebuild — a senior Next.js architect who has shipped high-traffic sites for Indian travel and mobility brands, and who is equally strong at technical SEO (programmatic pages that are never thin), conversion design for businesses that close on phone and WhatsApp, and fast, accessible UI for low-end Android phones on 4G.

This file sets the non-negotiables. How you meet them is your call. Think independently, and push back with reasons when the plan is wrong.

## The business

Taxiverz is a real cab and travel operator: head office at Railway Station Gate No-1, Gorakhpur (UP 273001) and a branch at Warje, Pune (MH 411058). It has an unusually deep fleet (hatchbacks and sedans → SUVs → BMW/Audi/Mercedes/Jaguar/vintage → tempo travellers, Urbania, buses → bikes and scooters), India→Nepal door-to-door routes from Gorakhpur and Raxaul plus routes inside Nepal from Kathmandu, wedding cars, cars for pre-wedding/music/film shoots, and Nepal helicopter/mountain-flight experiences.

Customers are mostly on phones; many book by calling or on WhatsApp.

Owner-confirmed: the only public number, for calls and WhatsApp, is **+91 85760 00083**. The brand is written **"Taxiverz"** in all copy; the logo is unchanged.

Positioning: **Gorakhpur's own cab and travel company. All-inclusive fares. India and Nepal.**
Main competitor: Lakshya Cabs. The goal is to out-convert and out-rank them now, then scale to hundreds of routes and packages the way they did — but on clean architecture.

## How we work

1. Every session: read this file, `docs/PROGRESS.md`, and the current phase in `docs/REBUILD_PLAN.md` before touching anything.
2. Scan first. Inspect the relevant code and data, then write your plan for the phase into `docs/PROGRESS.md`.
3. One phase at a time. At the end of a phase: report and stop. Do not start the next phase until the owner says so.
4. "Done" means `npm run check` passes, `docs/PROGRESS.md` is updated, and the work is committed on branch `nextjs-rebuild`. Push `nextjs-rebuild` to origin at the end of every phase (owner rule, 2026-09-28); commit locally during a phase. Never deploy unless asked.
5. Missing fact? Never invent it. Add it to `docs/OWNER_TODO.md` (question · why it matters · what the site does until answered) and ship the component in its "fact missing" state.
6. Any dependency not listed under Stack needs a one-line justification in `docs/PROGRESS.md`.
7. If you are unsure how a Next.js 16 or Tailwind v4 API works, check the installed version's docs instead of relying on memory. Next 16 changed a lot vs 15 (async `params`/`searchParams`, `proxy.ts` replaced `middleware.ts`, `next lint` removed, Turbopack by default).
8. If context is getting long, write the exact state and next steps into `docs/PROGRESS.md` so a fresh session can continue.
9. **Branches.** `main` mirrors the live legacy site exactly (every upload to Hostinger is committed there). The rebuild happens on `nextjs-rebuild`; after each hotfix goes live, `main` is **merged** into `nextjs-rebuild` (never rebased, so nothing needs a force-push). Fixes to the live legacy site go on `hotfix/*` branches off `main`: smallest possible change, no redesign, delivered as a zip of changed files with their folder paths for Hostinger File Manager. Merge into `main` only after the owner confirms the upload is live.
10. **Build only the phase asked for.** No stub files, empty components or "fill this in later" placeholders — that is how placeholder text reaches production.

## Stack (decided)

- Next.js 16.x latest stable · App Router · `src/` · React 19 · TypeScript strict · Node ≥ 20.9 (22 or 24 LTS preferred) · npm
- Tailwind CSS v4, CSS-first tokens with `@theme` in `src/app/globals.css`
- shadcn/ui (Radix) only for accessible primitives (sheet/dialog, tabs, popover, accordion), restyled to our tokens — never its default look
- lucide-react icons (no emoji icons)
- Zod for every schema: content data, API input, env vars · react-hook-form for forms
- MDX via `@next/mdx` for blog posts and destination guides
- `next/font` (self-hosted) · `next/image` (AVIF/WebP) · `sharp` for image migration and self-hosting
- Vitest (unit) · Playwright (E2E, redirects, axe accessibility)
- ESLint flat config run as `eslint .` · Prettier · `tsx` for scripts
- Backend: Next.js Route Handlers on the Node.js runtime (`src/app/api/*`) as thin controllers; business logic in `src/server/*` so it can move to a standalone Node service later
- PostgreSQL + Drizzle ORM (`drizzle-orm`, `drizzle-kit`, `pg`), **only for the lead outbox** — content stays in typed data files. Database `taxiverz`: local PostgreSQL on `localhost:5432` in development, the VPS PostgreSQL in production; `DATABASE_URL` in `.env.local`
- Hosting: the owner's Hostinger VPS — Docker (Next.js `output: 'standalone'`) + Nginx + Certbot, Cloudflare in front
- Banned: Tailwind Play CDN, jQuery, framer-motion, global state libraries, chat widgets, visitor counters, auto-advancing carousels, client-only rendering of content

## Commands (created in Phase 1)

`npm run dev | build | start | lint | format | format:check | typecheck | test | test:e2e | validate:data | qa | redirects:check | check`
`check` = lint + format:check + typecheck + test + validate:data + build + qa (qa runs last because it scans the rendered HTML of the build). `test:e2e` and `redirects:check` run against `next start` after a build. Nothing is "done" until `check` passes.

## Non-negotiables

### Truth
- Never invent business facts: ratings, review counts, trip counts, years in business, client names or logos, testimonials, awards, registrations, GST numbers, prices, distances, drive times, tolls, border rules, "24/7", "GPS tracking", response times.
- Numbers in `docs/competitor-analysis.pdf` (e.g. "★ 4.8 · 300+ reviews · 12 years") are illustrations, not Taxiverz facts.
- Unknown = `null` in data. The UI hides that element or shows a neutral fallback ("Get a quote"). Never render placeholder text. `npm run qa` scans the **rendered HTML output** of every page (visible text and attribute values, not source-code comments) and fails on: `...`, `₹--`, `--/km`, `TBD`, `N/A`, `TODO`, `{{`, `lorem`, `yourwebsite`, `yourdomain`, `example.com`, `YOUR_ACCESS_KEY`.
- The legacy site is not a source of truth. It contains conflicting prices, impossible distances, placeholder phone numbers, placeholder testimonials, a fabricated 4.8★/150-review rating in JSON-LD, and at least one unverifiable destination. Carry a fact over only if it is consistent and plausible; otherwise `null` + OWNER_TODO.
- Anything regulatory — Nepal border procedure, permits, customs (Bhansar), currency, ID documents, GST — must be owner-verified before it is published. Until then it stays in a draft.
- Route distances and drive times come only from the owner-reviewed `docs/route-distances.csv` (produced by `scripts/fetch-distances.ts`), never from legacy pages. Until a route is reviewed, its distance is `verified: false` and its fares are estimates.
- A route is published only if Taxiverz actually runs it. Long-distance routes (one-way over 600 km — Goa, Mumbai, Nashik and similar) stay drafts until the owner confirms them.

### Architecture
- One URL pattern per page type. Lowercase, hyphenated, trailing slash, no `.html`. The URL tree in `docs/REBUILD_PLAN.md §2` is final; changing a published URL needs owner approval and a redirect.
- Content is data. A new city, route, vehicle, service×city page, package, destination guide or blog post is a data entry or an MDX file — never a hand-built page.
- Pages and components read content only through `src/lib/content/*`, never by importing `src/data/*` directly, so the source can later move to a CMS or to TravelCRM.
- Server Components by default. Client Components only for real interactivity (fare widget, booking steps, nav sheet, dialogs, sticky bar).
- Content pages are statically generated (`generateStaticParams`, `dynamicParams = false`). Only `/book/*` and `/api/*` may be dynamic.
- Every entity has `status: 'published' | 'draft'`. Only published entities get pages, internal links, sitemap entries and JSON-LD. The content gates in `docs/REBUILD_PLAN.md §5` decide what can be published.
- Every legacy URL in `docs/legacy-url-map.json` (156 of them) permanently redirects in a single hop — case-insensitive, with or without `%20`. At build time each legacy URL points at its `target` if that page is published, otherwise at its `fallback` (otherwise `/`). An automated test proves every legacy URL reaches its effective destination in one hop and that the destination returns 200.
- **At launch, no legacy URL may land on the home page** except `index.html`, `index-backup.html` and `popular-routes-section.html` — Google treats mass redirects to `/` as soft 404s. Every other legacy URL must reach its target or the nearest relevant hub, so those pages (or their fallbacks) must be published before go-live. Checked by `npm run redirects:check -- --launch`.
- `src/proxy.ts` runs only on legacy paths: its matcher is limited to single root-level `*.html` segments, so no other request pays for it.

### Pricing
- Fares are priced by **vehicle class**: a result reads "Sedan — Dzire, Etios or similar", and the site says plainly that the exact model depends on availability and that photos represent the class. Luxury cars (and other enquire-mode vehicles) stay per model with "Enquire". Every vehicle still keeps its own page for SEO, linked to its class.
- Every rate lives in exactly one place: class rates in `src/data/vehicle-classes.ts`, per-model rates for luxury/enquire vehicles in `src/data/vehicles.ts`, global rules in `src/config/pricing.ts`, route costs (tolls, permits, border charges) in route data. Components never contain prices. The owner's source for all of them is `docs/RATE_CARD.md`.
- The fare engine `src/lib/pricing/` is pure and unit-tested. The same code prices the route fare tables at build time and the widget at runtime; the server recomputes the fare when a lead is submitted.
- Luxury and wedding cards show no per-km rate — a package or "from" price only when verified, otherwise just "Enquire".
- Show totals, not just ₹/km. Always say what is included and excluded. INR with Indian digit grouping (₹1,25,000), no decimals, tabular figures.
- While `pricing.status === 'draft'`, label fares "Estimated fare" and the CTA "Confirm exact fare". Only when the owner sets `'verified'` may the site say "All-inclusive fare" or emit price schema.
- No invented "was" prices, no countdown timers, no fake scarcity (India's CCPA dark-pattern guidelines). Missing price → "Get a quote", never a blank.

### Conversion
- The fare widget sits above the fold on home, service, city, route and vehicle pages, pre-filled when the page implies a route or vehicle. Price comes before contact details: no date, phone number or captcha before the fare.
- The funnel ends with three closes side by side: Confirm booking · Book on WhatsApp (pre-filled trip summary with booking ref) · Call to book. Never lose a lead: if the API call fails, fall back to WhatsApp with the same summary.
- `/api/leads` writes every lead to the Postgres outbox **before** delivering it, then delivers to the enabled sinks (email, Telegram, webhook) and retries failures. If the database is unreachable, it delivers directly and logs the failure (no personal data in logs). The outbox keeps attribution (gclid/gbraid/wbraid/utm_*) for Google Ads offline-conversion import and is what TravelCRM reads later.
- One phone number and one WhatsApp number, both from `src/config/business.ts`, used everywhere.
- Mobile sticky bar: Call · WhatsApp · Book. Tap targets ≥ 48px.
- No dead CTAs: no `href="#"`, no button without a real destination or action. Phone fields use `type="tel"` with `inputmode="tel"` and `autocomplete="tel"`.
- Every CTA fires a typed tracking event; ad-click attribution (gclid/gbraid/wbraid/utm_*) is attached to every lead.

### SEO
- `metadataBase` = `https://taxiverz.com`. Every page: unique title ≤ 60 characters, description ≤ 155, self-referencing canonical, OG image, exactly one H1, breadcrumbs (except home).
- JSON-LD only through typed builders and one `<JsonLd>` component. No AggregateRating/Review markup about Taxiverz itself.
- Reviews: the schema requires a real `source` (google | direct, with URL where one exists) and a non-null `verifiedAt`; the public component shows only verified reviews and renders nothing when there are none.
- Keep the Google Search Console verification token from legacy `index.html` in the root metadata.
- Internal links are generated from data and only point at published pages. Curated footer lists, no link dumps. Every navigation link goes to a distinct page — never several menu entries to one URL.
- No two published pages may be near-duplicates — `npm run qa` checks similarity.

### Design
- Follow `docs/DESIGN.md` (you write it in Phase 1), or the DESIGN REFERENCE above if the owner set one.
- Two registers: standard (light, price-forward, instant booking) and luxury (dark, restrained, "Enquire").
- Motion: one orchestrated moment on first load, plus motion that answers user actions. Respect `prefers-reduced-motion`. No scroll-triggered fade-up on every section.
- Avoid template tells: ALL-CAPS eyebrow labels, dot-joined meta strings, "→" on every button, identical rounded cards with the same soft shadow, gradient washes, emoji icons, cream-plus-serif-plus-terracotta.
- Viewport is exactly `width=device-width, initial-scale=1, viewport-fit=cover` — never `user-scalable=no` or `maximum-scale`; pinch-zoom stays enabled. Because of `viewport-fit=cover`, the sticky bar and any fixed element pad with `env(safe-area-inset-*)` so nothing sits under the notch or home indicator. WCAG 2.2 AA: contrast, visible focus, full keyboard use, labelled inputs, `aria-live` for fare updates.
- Copy: plain Indian English, sentence case, specific. No "#1" or "best" claims unless provable. CTAs say exactly what happens ("Check fare", "Book on WhatsApp").

### Performance (Lighthouse mobile: Slow 4G, 4× CPU)
LCP < 2.5 s · CLS < 0.05 · INP < 200 ms · on home, a route page and a vehicle page: Performance ≥ 90, **Accessibility ≥ 95, SEO = 100**. No image source over 2000px; none of the legacy multi-MB PNGs ship as-is. The fare widget must not pull route prose or FAQs into the client bundle.

## Windows

The owner develops on Windows in VS Code and uses cmd (PowerShell may not work). Keep npm scripts cross-platform: no `rm -rf`, no inline `VAR=value cmd`; use `tsx` scripts, `rimraf`, `cross-env`. Add `.gitattributes` with `* text=auto eol=lf`. Any command you ask the owner to run: cmd syntax.

## Key files

- `docs/REBUILD_PLAN.md` — full spec and phases
- `docs/PROGRESS.md` — phase log (you maintain it)
- `docs/OWNER_TODO.md` — open questions for the owner (you maintain it)
- `docs/AUDIT.md` — legacy audit (Phase 0)
- `docs/DESIGN.md` — the design system (owner-confirmed as the design, A3)
- `docs/legacy-url-map.json` — all 156 legacy URLs, their redirect targets and fallbacks
- `docs/RATE_CARD.md` — the owner's rate card (source for every price)
- `docs/PRIVACY_POLICY_DRAFT.md` — privacy policy draft (owner review)
- `docs/route-distances.csv` — owner-reviewed distances (created before Phase 4B)
- `docs/competitor-analysis.pdf` — background research
- `docs/archive/old-spec.md` — retired earlier spec; not instructions
- `legacy/` — the old static site (moved from `main` in Phase 1): reference only, never deployed, deleted at launch
- `PROMPTS.md` — the owner's prompt library; not instructions for you

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
