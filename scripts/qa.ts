/**
 * npm run qa — scans the RENDERED HTML of every prerendered page in .next/
 * (visible text and attribute values, JSON-LD; not source comments) and fails
 * on placeholder text and on the SEO/accessibility rules in CLAUDE.md.
 * Run after `next build`.
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { parse, type HTMLElement } from 'node-html-parser'
import { isPublished } from '../src/lib/content/published'

const APP_DIR = join('.next', 'server', 'app')
const SITE = 'https://taxiverz.com'
const TITLE_MAX = 60
const DESCRIPTION_MAX = 155
const VIEWPORT = 'width=device-width, initial-scale=1, viewport-fit=cover'
const NEAR_DUPLICATE = 0.35

export const PLACEHOLDER =
  /(\.\.\.|₹\s*--|--\s*\/\s*km|\bTBD\b|\bN\/A\b|\bTODO\b|\{\{|\blorem\b|yourwebsite|yourdomain|example\.com|YOUR_ACCESS_KEY|YOUR-KEY-HERE)/i

interface Page {
  file: string
  path: string
  html: string
  root: HTMLElement
  noindex: boolean
}

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    return statSync(full).isDirectory() ? walk(full) : name.endsWith('.html') ? [full] : []
  })
}

function toPath(file: string): string {
  const rel = relative(APP_DIR, file)
    .split(sep)
    .join('/')
    .replace(/\.html$/, '')
  if (rel === 'index') return '/'
  return `/${rel.replace(/\/index$/, '')}/`
}

function visibleText(root: HTMLElement): string {
  const clone = parse(root.toString(), { comment: false })
  clone.querySelectorAll('script, style, noscript, template').forEach((n) => n.remove())
  return clone.textContent.replace(/\s+/g, ' ').trim()
}

function shingles(text: string): Set<string> {
  const words = text.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []
  const out = new Set<string>()
  for (let i = 0; i + 5 <= words.length; i++) out.add(words.slice(i, i + 5).join(' '))
  return out
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (!a.size || !b.size) return 0
  let inter = 0
  for (const s of a) if (b.has(s)) inter++
  return inter / (a.size + b.size - inter)
}

function main() {
  if (!existsSync(APP_DIR)) {
    console.error('qa: .next/server/app not found — run `npm run build` first.')
    process.exit(1)
  }

  const all: Page[] = walk(APP_DIR)
    .map((file) => {
      const html = readFileSync(file, 'utf8')
      const root = parse(html, { comment: false })
      const robots = root.querySelector('meta[name="robots"]')?.getAttribute('content') ?? ''
      return { file, path: toPath(file), html, root, noindex: /noindex/i.test(robots) }
    })
    .filter((p) => !p.path.startsWith('/_global-error'))

  const errors: string[] = []
  const fail = (page: Page, msg: string) => errors.push(`${page.path} — ${msg}`)

  // A static page that called notFound() (an unpublished hub such as /cabs/) is built as
  // Next's 404 error shell. That is correct for a draft; a published page must never be one.
  const isErrorShell = (p: Page) =>
    p.root.querySelector('html')?.getAttribute('id') === '__next_error__'
  for (const p of all.filter(isErrorShell)) {
    if (isPublished(p.path)) fail(p, 'published page was built as a 404 error shell')
  }
  const pages = all.filter((p) => !isErrorShell(p))
  const titles = new Map<string, string>()
  const descriptions = new Map<string, string>()

  for (const page of pages) {
    const { root } = page

    // Placeholder text in visible text, attribute values and JSON-LD (never in comments).
    const text = visibleText(root)
    const hit = text.match(PLACEHOLDER)
    if (hit) fail(page, `placeholder text "${hit[0]}" in visible text`)
    for (const el of root.querySelectorAll('*')) {
      if (el.tagName === 'SCRIPT' && el.getAttribute('type') !== 'application/ld+json') continue
      for (const [name, value] of Object.entries(el.attributes)) {
        if (name === 'class' || name === 'style') continue
        const m = value.match(PLACEHOLDER)
        if (m) fail(page, `placeholder "${m[0]}" in <${el.tagName.toLowerCase()} ${name}>`)
      }
    }

    // JSON-LD: valid JSON, never self-serving ratings.
    for (const s of root.querySelectorAll('script[type="application/ld+json"]')) {
      const raw = s.textContent
      if (PLACEHOLDER.test(raw)) fail(page, 'placeholder text inside JSON-LD')
      try {
        JSON.parse(raw)
      } catch {
        fail(page, 'invalid JSON-LD')
      }
      if (/"@type"\s*:\s*"(AggregateRating|Review)"/.test(raw))
        fail(page, 'AggregateRating/Review markup about Taxiverz')
    }

    // Links: no dead CTAs.
    for (const a of root.querySelectorAll('a')) {
      const href = a.getAttribute('href')
      if (href === undefined || href === '' || href === '#' || href.startsWith('javascript:'))
        fail(page, `dead link <a href="${href ?? ''}"> "${a.textContent.trim().slice(0, 40)}"`)
    }
    // Every navigation link goes to a distinct page.
    for (const nav of root.querySelectorAll('nav')) {
      const hrefs = nav.querySelectorAll('a').map((a) => a.getAttribute('href') ?? '')
      const dupes = hrefs.filter(
        (h, i) => hrefs.indexOf(h) !== i && !h.startsWith('tel:') && !h.startsWith('https://wa.me'),
      )
      if (dupes.length)
        fail(
          page,
          `nav "${nav.getAttribute('aria-label') ?? ''}" repeats ${[...new Set(dupes)].join(', ')}`,
        )
    }
    // Images need an alt attribute (empty is fine for decorative images).
    for (const img of root.querySelectorAll('img')) {
      if (img.getAttribute('alt') === undefined)
        fail(page, `<img src="${img.getAttribute('src')}"> has no alt`)
    }

    // Document-level rules.
    if (root.querySelector('html')?.getAttribute('lang') !== 'en-IN')
      fail(page, 'html lang is not en-IN')
    const viewport = root.querySelector('meta[name="viewport"]')?.getAttribute('content')
    if (viewport !== VIEWPORT) fail(page, `viewport is "${viewport}" (want "${VIEWPORT}")`)
    const h1s = root.querySelectorAll('h1').length
    if (h1s !== 1) fail(page, `${h1s} <h1> elements (want exactly 1)`)

    if (page.noindex) continue

    const title = root.querySelector('title')?.textContent.trim() ?? ''
    if (!title) fail(page, 'missing <title>')
    else if (title.length > TITLE_MAX)
      fail(page, `title is ${title.length} chars (max ${TITLE_MAX})`)
    if (title && titles.has(title)) fail(page, `duplicate title with ${titles.get(title)}`)
    titles.set(title, page.path)

    const description =
      root.querySelector('meta[name="description"]')?.getAttribute('content') ?? ''
    if (!description) fail(page, 'missing meta description')
    else if (description.length > DESCRIPTION_MAX)
      fail(page, `description is ${description.length} chars (max ${DESCRIPTION_MAX})`)
    if (description && descriptions.has(description))
      fail(page, `duplicate description with ${descriptions.get(description)}`)
    descriptions.set(description, page.path)

    const canonical = root.querySelector('link[rel="canonical"]')?.getAttribute('href')
    if (canonical !== `${SITE}${page.path}`)
      fail(page, `canonical is "${canonical}" (want "${SITE}${page.path}")`)
    if (!root.querySelector('meta[property="og:image"]')) fail(page, 'missing og:image')
  }

  // Near-duplicate indexable pages.
  const indexable = pages.filter((p) => !p.noindex)
  const sets = indexable.map((p) => shingles(visibleText(p.root.querySelector('main') ?? p.root)))
  const pairs: { a: string; b: string; score: number }[] = []
  for (let i = 0; i < indexable.length; i++)
    for (let j = i + 1; j < indexable.length; j++) {
      const score = jaccard(sets[i]!, sets[j]!)
      pairs.push({ a: indexable[i]!.path, b: indexable[j]!.path, score })
      if (score > NEAR_DUPLICATE)
        errors.push(
          `${indexable[i]!.path} ~ ${indexable[j]!.path} — near-duplicate content (Jaccard ${score.toFixed(2)})`,
        )
    }

  // `npm run qa -- --similarity` lists the closest pairs, to see the margin under the limit.
  if (process.argv.includes('--similarity'))
    pairs
      .toSorted((x, y) => y.score - x.score)
      .slice(0, 8)
      .forEach((p) => console.log(`  ${p.score.toFixed(2)}  ${p.a} ~ ${p.b}`))

  if (errors.length) {
    console.error(`qa found ${errors.length} problem(s) in ${pages.length} rendered pages:`)
    errors.forEach((e) => console.error(`  - ${e}`))
    process.exit(1)
  }
  console.log(`qa OK — ${pages.length} rendered pages checked (${indexable.length} indexable).`)
}

main()
