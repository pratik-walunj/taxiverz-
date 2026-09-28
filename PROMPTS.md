# Taxiverz rebuild — Claude Code prompts

## One-time setup (5 minutes)

1. Extract this kit into the root of your Taxiverz repo so you end up with:
   ```
   CLAUDE.md
   PROMPTS.md
   docs/REBUILD_PLAN.md
   docs/legacy-url-map.json
   docs/competitor-analysis.pdf
   ```
2. Optional: if one of your demo prototypes is the look you want, put its URL on the DESIGN REFERENCE line at the top of `CLAUDE.md` (and copy the demo's source code into `docs/design-reference/` if you have it).
3. In a cmd terminal inside the repo folder:
   ```
   git add -A
   git commit -m "docs: add rebuild kit"
   claude
   ```

---

## Prompt 1 — Kickoff (Phase 0: scan and audit)

```
Read CLAUDE.md, then docs/REBUILD_PLAN.md end to end. Skim docs/competitor-analysis.pdf (sections 1, 5, 6, 11, 12, 14, 18) for background — the plan already distils it, and §1 of the plan lists where the report is out of date.

Execute Phase 0 only. The legacy site is read-only in this phase: no code changes, no file moves.

Deliver docs/AUDIT.md, docs/OWNER_TODO.md, docs/PROGRESS.md and a verified docs/legacy-url-map.json, committed on a new branch nextjs-rebuild.

Then report: counts, the 10 most important findings, every decision you need from me (grouped, most important first), and anything in the plan you disagree with and why. Stop there.
```

---

## Prompt 2 — Give your answers to the owner questions

Write your answers under each question in `docs/OWNER_TODO.md`, or paste them into chat:

```
My answers to OWNER_TODO are below (and/or written in docs/OWNER_TODO.md). Record each one in the right config or data file (or note where it will go once that file exists), mark those items answered, and list what is still open. Don't start the next phase.

<paste answers here>
```

Unanswered questions don't block anything — the site ships in its safe "fact missing" state and fills in later. Answer the pricing questions early, though: the fare engine is the heart of the site.

---

## Prompt 3 — Run a phase (repeat for Phases 1 → 8)

Type `/clear` first so every phase starts with a fresh context, then:

```
Read CLAUDE.md, docs/PROGRESS.md and Phase <N> in docs/REBUILD_PLAN.md.

Scan first: inspect everything relevant to this phase and write your plan into docs/PROGRESS.md. Show me the plan and wait for my "go".

After "go": implement Phase <N> completely, run npm run check until it passes, update docs/PROGRESS.md and docs/OWNER_TODO.md, commit, and report as the plan specifies. Then stop.
```

Want it to run without the pause? Replace `Show me the plan and wait for my "go".` with `Then implement without waiting.`

### If a phase runs out of context (likely in Phase 4B, the route content)

```
Update docs/PROGRESS.md with exactly where you are (what's done, what's left, open issues), commit, and stop.
```

Then `/clear` and:

```
Read CLAUDE.md and docs/PROGRESS.md. Continue Phase <N> from where it stopped, same rules as before. For route content: batches of 8–10, validate:data + qa after each batch, one commit per batch.
```

---

## Prompt 4 — Hostile review (run before saying "continue" to the next phase)

```
Before we move on, review Phase <N> as three hostile reviewers: a senior engineer, an SEO lead and a conversion specialist. Check it against CLAUDE.md and the phase's acceptance criteria. Look at the pages at 360px and 1280px. List every issue by severity, fix the critical and high ones, re-run npm run check, commit, and report what changed.
```

---

## Growth-mode prompts (after launch)

### Add routes
```
Add these routes following the §5 gates in docs/REBUILD_PLAN.md:
<origin> → <destination>, <destination>, …
Distances and drive times I know: <list, or "none — mark them unverified">.
Write unique content for each (intro, route guide, stops, 4+ route-specific FAQs), wire the internal links, run npm run check, commit. Report which routes had to stay draft and why.
```

### Add a new origin city
```
Add <City> as an origin city: city data (with Hindi name and aliases), the city hub, and routes to: <list>. Publish the hub only if it passes its §5 gate. Add it to the footer lists if it deserves a place there. npm run check, commit, report.
```

### Add a service × city page
```
Add the <service> page for <city>. What is true about our operation there: <vehicles, areas, airports, venues, anything specific>. Write local specifics — not a template with the city name swapped. §5 gates, npm run check, commit.
```

### Add a vehicle
```
Add this vehicle: <name>, <seats>, <tier>, rates: <…>, photos in <folder>. Run the photos through the image script, publish the vehicle page, and include it in the fare engine where it belongs. npm run check, commit.
```

### Add a package
```
Add a package: <name>, <days/nights>, itinerary <…>, inclusions <…>, exclusions <…>, price <…> from <city>. Variants from other cities: <city: price and what changes>. Create from-{city} pages only for variants with real differences. npm run check, commit.
```

### Add a blog post or destination guide
```
Write a <blog post | destination guide> on "<topic>" for travellers from Gorakhpur and eastern UP. Link it to the relevant route, package and service pages. Keep it as a draft and give me a list of every factual claim I need to confirm.
```

### Monthly health check
```
Run a full health check: npm run check, the redirect check against production (<url>), Lighthouse mobile on home / one route / one vehicle, broken links, pages still in draft and why, and OWNER_TODO items still open. Fix what you can; report the rest.
```
