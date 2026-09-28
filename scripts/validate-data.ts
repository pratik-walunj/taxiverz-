/**
 * npm run validate:data — checks every data/config source against its schema.
 * Phase 1: business config and docs/legacy-url-map.json. Phase 2 adds content data.
 */
import { readFileSync, readdirSync } from 'node:fs'
import { z } from 'zod'
import { business } from '../src/config/business'
import { businessSchema } from '../src/lib/schemas/business'
import { buildLegacyTable } from '../src/lib/redirects/legacy'

const errors: string[] = []
const fail = (msg: string) => errors.push(msg)

// ---- business config
const b = businessSchema.safeParse(business)
if (!b.success) b.error.issues.forEach((i) => fail(`business.${i.path.join('.')}: ${i.message}`))

// ---- placeholder strings in config values
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
  for (const e of map.data.entries) {
    if (decodeURIComponent(e.legacyPath.slice(1)) !== e.file)
      fail(`legacy-url-map: ${e.legacyPath} does not encode ${e.file}`)
  }
  try {
    buildLegacyTable()
  } catch (err) {
    fail(`legacy-url-map: ${(err as Error).message}`)
  }
}

if (errors.length) {
  console.error(`validate:data found ${errors.length} problem(s):`)
  errors.forEach((e) => console.error(`  - ${e}`))
  process.exit(1)
}
console.log(
  `validate:data OK — business config valid; legacy map covers ${map.success ? map.data.entries.length : 0} pages.`,
)
