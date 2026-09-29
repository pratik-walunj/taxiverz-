/**
 * npm run validate:data — checks every data and config source:
 *   - business config and all content data against their Zod schemas
 *   - unique slugs and ids; every reference resolves
 *   - published entities pass their §5 gate
 *   - every referenced image exists in public/
 *   - no placeholder strings anywhere in data or config
 *   - docs/legacy-url-map.json: covers every legacy page, and every target and
 *     fallback points at an entity that exists in the data (or a planned page)
 * Then prints published vs draft per entity, with the reasons each draft is a draft.
 * `--verbose` lists every draft.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { z } from 'zod'
import { business } from '../src/config/business'
import { businessSchema } from '../src/lib/schemas/business'
import type * as ContentModule from '../src/lib/content'
import type * as DataModule from '../src/lib/content/data'
import type * as LegacyModule from '../src/lib/redirects/legacy'

const errors: string[] = []
const fail = (msg: string) => errors.push(msg)
const verbose = process.argv.includes('--verbose')

// ---- business config
const b = businessSchema.safeParse(business)
if (!b.success) b.error.issues.forEach((i) => fail(`business.${i.path.join('.')}: ${i.message}`))

// ---- content data (schemas are applied when lib/content/data loads)
// Loaded dynamically so invalid data is reported instead of crashing the import.
let content: typeof ContentModule | undefined
let data: typeof DataModule | undefined
let legacy: typeof LegacyModule | undefined
try {
  data = await import('../src/lib/content/data')
  content = await import('../src/lib/content')
  legacy = await import('../src/lib/redirects/legacy')
} catch (err) {
  if (err instanceof z.ZodError)
    err.issues.slice(0, 30).forEach((i) => fail(`data.${i.path.join('.')}: ${i.message}`))
  else fail(`data failed to load: ${(err as Error).message}`)
}

// ---- placeholder strings in any value
const PLACEHOLDER =
  /(\.\.\.|₹\s*--|--\/km|\bTBD\b|\bN\/A\b|\bTODO\b|\{\{|lorem|yourwebsite|yourdomain|example\.com|YOUR_ACCESS_KEY)/i
const walk = (value: unknown, path: string) => {
  if (typeof value === 'string' && PLACEHOLDER.test(value))
    fail(`${path}: placeholder text "${value}"`)
  else if (Array.isArray(value)) value.forEach((v, i) => walk(v, `${path}[${i}]`))
  else if (value && typeof value === 'object')
    Object.entries(value).forEach(([k, v]) => walk(v, `${path}.${k}`))
}
walk(business, 'business')

const dupes = (ids: string[]) => ids.filter((id, i) => ids.indexOf(id) !== i)

if (data && content) {
  const {
    cities,
    places,
    routes,
    vehicleClasses,
    vehicles,
    services,
    serviceCities,
    packages,
    destinations,
    guides,
    posts,
  } = data
  walk(
    {
      cities,
      places,
      routes,
      vehicleClasses,
      vehicles,
      services,
      serviceCities,
      packages,
      destinations,
      guides,
      posts,
    },
    'data',
  )

  // ---- uniqueness
  const citySlugs = new Set(cities.map((c) => c.slug))
  const serviceSlugs = new Set(services.map((s) => s.slug))
  const classSlugs = new Set(vehicleClasses.map((c) => c.slug))
  const vehicleSlugs = new Set(vehicles.map((v) => v.slug))
  const checks: [string, string[]][] = [
    ['city', cities.map((c) => c.slug)],
    [
      'place (cities + places share one id space)',
      [...cities.map((c) => c.slug), ...places.map((p) => p.id)],
    ],
    ['route', routes.map((r) => r.slug)],
    ['vehicle class', vehicleClasses.map((c) => c.slug)],
    ['vehicle', vehicles.map((v) => v.slug)],
    ['service', services.map((s) => s.slug)],
    ['service × city', serviceCities.map((sc) => `${sc.service}/${sc.city}`)],
    ['legacy URL claimed by a route', routes.flatMap((r) => r.legacyUrls)],
    ['legacy URL claimed by a vehicle', vehicles.flatMap((v) => v.legacyUrls)],
    ['package', packages.map((p) => p.slug)],
    ['destination', destinations.map((d) => d.place)],
    ['guide', guides.map((g) => `${g.place}/${g.guide}`)],
    ['blog post', posts.map((p) => p.slug)],
  ]
  for (const [what, ids] of checks)
    for (const d of new Set(dupes(ids))) fail(`duplicate ${what}: ${d}`)

  // ---- references
  for (const r of routes) {
    if (!citySlugs.has(r.origin)) fail(`route ${r.slug}: unknown origin ${r.origin}`)
    if (!citySlugs.has(r.destination)) fail(`route ${r.slug}: unknown destination ${r.destination}`)
    if (r.slug !== `${r.origin}-to-${r.destination}`)
      fail(`route ${r.slug}: slug must be {origin}-to-{destination}`)
    if (r.borderCrossing && !places.some((p) => p.id === r.borderCrossing && p.type === 'border'))
      fail(`route ${r.slug}: borderCrossing ${r.borderCrossing} is not a border place`)
    const nepal = [r.origin, r.destination].some(
      (s) => cities.find((c) => c.slug === s)?.country === 'NP',
    )
    if (nepal !== r.isInternational) fail(`route ${r.slug}: isInternational should be ${nepal}`)
  }
  for (const p of places)
    if (p.citySlug && !citySlugs.has(p.citySlug)) fail(`place ${p.id}: unknown city ${p.citySlug}`)
  for (const v of vehicles)
    if (v.classSlug && !classSlugs.has(v.classSlug))
      fail(`vehicle ${v.slug}: unknown class ${v.classSlug}`)
  for (const c of vehicleClasses)
    if (c.imageFrom && !vehicleSlugs.has(c.imageFrom))
      fail(`class ${c.slug}: unknown imageFrom ${c.imageFrom}`)
  for (const sc of serviceCities) {
    if (!serviceSlugs.has(sc.service))
      fail(`service × city ${sc.service}/${sc.city}: unknown service`)
    if (!citySlugs.has(sc.city)) fail(`service × city ${sc.service}/${sc.city}: unknown city`)
  }

  for (const d of destinations)
    if (!citySlugs.has(d.place)) fail(`destination ${d.place}: unknown city`)
  for (const g of guides)
    if (!citySlugs.has(g.place)) fail(`guide ${g.place}/${g.guide}: unknown city`)
  for (const p of packages)
    for (const v of p.variants)
      if (!citySlugs.has(v.origin)) fail(`package ${p.slug}: unknown variant origin ${v.origin}`)

  // ---- MDX bodies: every guide and post has one; published guides have ≥ 400 words (§5)
  const mdxWords = (file: string) =>
    readFileSync(file, 'utf8')
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, ' ') // MDX comments
      .replace(/^(import|export) .*$/gm, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\]\([^)]*\)/g, ' ') // link targets
      .match(/[\p{L}\p{N}]+/gu)?.length ?? 0
  for (const g of guides) {
    const file = join('content', 'destinations', g.place, `${g.guide}.mdx`)
    if (!existsSync(file)) fail(`guide ${g.place}/${g.guide}: missing ${file}`)
    else if (g.status === 'published' && mdxWords(file) < 400)
      fail(`guide ${g.place}/${g.guide} is published but has ${mdxWords(file)} words (need 400)`)
    else if (PLACEHOLDER.test(readFileSync(file, 'utf8').replace(/\{\/\*[\s\S]*?\*\/\}/g, '')))
      fail(`guide ${g.place}/${g.guide}: placeholder text in the body`)
  }
  for (const p of posts) {
    const file = join('content', 'blog', `${p.slug}.mdx`)
    if (!existsSync(file)) fail(`blog post ${p.slug}: missing ${file}`)
  }

  // ---- images exist
  for (const v of vehicles)
    for (const img of v.images)
      if (!existsSync(join('public', img.src))) fail(`vehicle ${v.slug}: missing image ${img.src}`)

  // ---- published entities must pass their gates
  const report = content.contentReport()
  const byId = (entity: string) => report.find((r) => r.entity === entity)!
  const statusOf: [string, { status: string; id: string }[]][] = [
    ['vehicle classes', vehicleClasses.map((c) => ({ status: c.status, id: c.slug }))],
    ['services', services.map((s) => ({ status: s.status, id: s.slug }))],
    [
      'service × city',
      serviceCities.map((sc) => ({ status: sc.status, id: content!.serviceCityPath(sc) })),
    ],
    ['cities', cities.map((c) => ({ status: c.status, id: c.slug }))],
    ['routes', routes.map((r) => ({ status: r.status, id: r.slug }))],
    ['vehicles', vehicles.map((v) => ({ status: v.status, id: v.slug }))],
    ['packages', packages.map((p) => ({ status: p.status, id: p.slug }))],
    ['destination guides', guides.map((g) => ({ status: g.status, id: content!.guidePath(g) }))],
    ['destinations', destinations.map((d) => ({ status: d.status, id: d.place }))],
    ['blog posts', posts.map((p) => ({ status: p.status, id: p.slug }))],
  ]
  for (const [entity, items] of statusOf)
    for (const item of items.filter((i) => i.status === 'published')) {
      const draft = byId(entity).drafts.find((d) => d.id === item.id)
      if (draft)
        fail(`${entity} ${item.id} is published but fails its gate: ${draft.reasons.join('; ')}`)
    }
}

// ---- legacy URL map
const pathRe = /^\/([a-z0-9]+(-[a-z0-9]+)*\/)*$/
const entrySchema = z.object({
  legacyPath: z.string().startsWith('/'),
  file: z.string().endsWith('.html'),
  type: z.string(),
  target: z.string().regex(pathRe),
  fallback: z.string().regex(pathRe).nullable(),
  confidence: z.enum(['high', 'medium', 'needs-owner']),
  inSitemap: z.boolean(),
  linkedFrom: z.enum(['anchor', 'js-only', 'orphan']),
  note: z.string(),
})
const mapSchema = z.object({
  entries: z.array(entrySchema),
  aliases: z.array(
    z.object({
      legacyPath: z.string().startsWith('/'),
      target: z.string().regex(pathRe),
      note: z.string(),
    }),
  ),
})
const map = mapSchema.safeParse(JSON.parse(readFileSync('docs/legacy-url-map.json', 'utf8')))
const pendingTargets = new Set<string>()
if (!map.success)
  map.error.issues
    .slice(0, 20)
    .forEach((i) => fail(`legacy-url-map.${i.path.join('.')}: ${i.message}`))
else {
  const legacyFiles = readdirSync('legacy')
    .filter((f) => f.toLowerCase().endsWith('.html'))
    .sort()
  const mapped = map.data.entries.map((e) => e.file).sort()
  const missing = legacyFiles.filter((f) => !mapped.includes(f))
  const extra = mapped.filter((f) => !legacyFiles.includes(f))
  if (missing.length)
    fail(`legacy-url-map: ${missing.length} legacy pages not mapped: ${missing.join(', ')}`)
  if (extra.length) fail(`legacy-url-map: entries without a legacy file: ${extra.join(', ')}`)
  for (const e of map.data.entries)
    if (decodeURIComponent(e.legacyPath.slice(1)) !== e.file)
      fail(`legacy-url-map: ${e.legacyPath} does not encode ${e.file}`)
  try {
    legacy?.buildLegacyTable()
  } catch (err) {
    fail(`legacy-url-map: ${(err as Error).message}`)
  }

  // Every target/fallback must name something the data defines (or a planned page).
  if (data) {
    const { cities, routes, vehicles, services, serviceCities, packages, guides } = data
    const plannedStatic = [
      '/',
      '/cabs/',
      '/fleet/',
      '/about/',
      '/contact/',
      '/faq/',
      '/reviews/',
      '/terms/',
      '/privacy/',
      '/refund-policy/',
      '/attach-your-taxi/',
      '/drive-with-us/',
      '/blog/',
      '/packages/',
      '/destinations/',
    ]
    const known = new Set<string>([
      ...plannedStatic,
      ...cities.map((c) => `/cabs/${c.slug}/`),
      ...routes.map((r) => `/cabs/${r.origin}/${r.slug}/`),
      ...vehicles.map((v) => `/fleet/${v.slug}/`),
      ...services.map((s) => `/${s.slug}/`),
      ...services.flatMap((s) => s.subPages.map((p) => `/${s.slug}/${p.slug}/`)),
      ...serviceCities.map((sc) => `/${sc.service}/${sc.city}/`),
      ...packages.map((p) => `/packages/${p.slug}/`),
      ...guides.map((g) => `/destinations/${g.place}/${g.guide}/`),
    ])
    const targets = [
      ...map.data.entries.flatMap((e) => [e.target, ...(e.fallback ? [e.fallback] : [])]),
      ...map.data.aliases.map((a) => a.target),
    ]
    for (const t of new Set(targets)) {
      if (known.has(t)) continue
      fail(`legacy-url-map: target ${t} matches no data entity or planned page`)
    }
  }
}

if (errors.length) {
  console.error(`validate:data found ${errors.length} problem(s):`)
  errors.forEach((e) => console.error(`  - ${e}`))
  process.exit(1)
}

console.log(
  `validate:data OK — schemas, references, gates, images, placeholders and the legacy map (${map.success ? map.data.entries.length : 0} pages) all check out.`,
)
if (pendingTargets.size)
  console.log(`  legacy-map targets waiting for Phase 5 data: ${[...pendingTargets].join(', ')}`)
if (content) {
  console.log('\nPublished vs draft:')
  for (const r of content.contentReport()) {
    const tally = new Map<string, number>()
    r.drafts.forEach((d) =>
      d.reasons.forEach((reason) => tally.set(reason, (tally.get(reason) ?? 0) + 1)),
    )
    console.log(`  ${r.entity}: ${r.published} published, ${r.drafts.length} draft (of ${r.total})`)
    for (const [reason, n] of [...tally].sort((a, b) => b[1] - a[1]))
      console.log(`      ${n} × ${reason}`)
    if (verbose) r.drafts.forEach((d) => console.log(`        - ${d.id}: ${d.reasons.join('; ')}`))
  }
}
