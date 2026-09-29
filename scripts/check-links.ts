/**
 * npm run links:check — crawls every page in the sitemap on `next start`
 * (after `npm run build`; or BASE_URL for a live server) and checks every
 * internal link, image, stylesheet, script and icon it references:
 *   - answers 200, or redirects ONCE to something that answers 200;
 *   - internal links point at trailing-slash paths (no redirect hop at all).
 * External links (WhatsApp, phone, email, Google Maps) are not fetched.
 */
import { parse } from 'node-html-parser'
import { sitemapPaths, withServer } from './lib/server'

const PORT = 3160

async function status(base: string, url: string) {
  const res = await fetch(`${base}${url}`, { redirect: 'manual' })
  return { status: res.status, location: res.headers.get('location') }
}

async function main() {
  await withServer(PORT, async (base) => {
    const pages = await sitemapPaths(base)
    const refs = new Map<string, Set<string>>() // url → pages that use it
    const add = (url: string | undefined, page: string) => {
      if (!url || !url.startsWith('/') || url.startsWith('//')) return
      const clean = url.split('#')[0]!
      if (!clean) return
      if (!refs.has(clean)) refs.set(clean, new Set())
      refs.get(clean)!.add(page)
    }
    const errors: string[] = []
    for (const page of pages) {
      const res = await fetch(`${base}${page}`)
      if (res.status !== 200) {
        errors.push(`${page}: sitemap page answers ${res.status}`)
        continue
      }
      const root = parse(await res.text())
      for (const a of root.querySelectorAll('a[href]')) {
        const href = a.getAttribute('href')!
        add(href, page)
        const path = href.split(/[?#]/)[0]!
        if (
          href.startsWith('/') &&
          !href.startsWith('/_next/') &&
          !/\.[a-z0-9]+$/i.test(path) &&
          !path.endsWith('/')
        )
          errors.push(`${page}: link ${href} has no trailing slash (costs a redirect)`)
      }
      for (const el of root.querySelectorAll('img[src], script[src]'))
        add(el.getAttribute('src'), page)
      for (const el of root.querySelectorAll('link[href]')) add(el.getAttribute('href'), page)
      for (const img of root.querySelectorAll('img[srcset]'))
        for (const part of img.getAttribute('srcset')!.split(','))
          add(part.trim().split(/\s+/)[0], page)
    }

    for (const [url, from] of refs) {
      const first = await status(base, url)
      let ok = first.status === 200
      if ([301, 307, 308].includes(first.status) && first.location) {
        const next = await status(
          base,
          new URL(first.location, base).pathname + new URL(first.location, base).search,
        )
        ok = next.status === 200
      }
      if (!ok) errors.push(`${url} → ${first.status} (used on ${[...from].slice(0, 3).join(', ')})`)
    }

    if (errors.length) {
      console.error(`links:check found ${errors.length} problem(s):`)
      errors.slice(0, 60).forEach((e) => console.error(`  - ${e}`))
      process.exitCode = 1
    } else
      console.log(
        `links:check OK — ${pages.length} pages, ${refs.size} internal URLs, all answer 200.`,
      )
  })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
