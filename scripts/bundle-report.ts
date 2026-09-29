/**
 * npm run bundle:report — gzipped JavaScript each sitemap page loads on first
 * visit (the scripts in its HTML), on `next start` after a build. Fails when a
 * page goes over the budget, so a heavy import (e.g. Zod in a client form)
 * can't slip in unnoticed. `--verbose` lists the chunks of the heaviest page.
 */
import { gzipSync } from 'node:zlib'
import { sitemapPaths, withServer } from './lib/server'

const PORT = 3170
/** Per-page budget in KB gzipped (Phase 7: ~200 KB today, React/Next is ~150 KB of it). */
export const BUDGET_KB = 210

async function main() {
  await withServer(PORT, async (base) => {
    const sizes = new Map<string, number>()
    const size = async (src: string) => {
      if (!sizes.has(src)) {
        const buf = Buffer.from(await (await fetch(`${base}${src}`)).arrayBuffer())
        sizes.set(src, gzipSync(buf, { level: 9 }).length)
      }
      return sizes.get(src)!
    }
    const rows: { page: string; kb: number; chunks: [string, number][] }[] = []
    for (const page of ['/', ...(await sitemapPaths(base)).filter((p) => p !== '/'), '/book/']) {
      const html = await (await fetch(`${base}${page}`)).text()
      const srcs = [
        ...new Set([...html.matchAll(/\/_next\/static\/chunks\/[^"'\s]+\.js/g)].map((m) => m[0])),
      ]
      const chunks: [string, number][] = []
      for (const s of srcs) chunks.push([s.split('/').pop()!, await size(s)])
      rows.push({ page, kb: chunks.reduce((t, [, b]) => t + b, 0) / 1024, chunks })
    }
    rows.sort((a, b) => b.kb - a.kb)
    const over = rows.filter((r) => r.kb > BUDGET_KB)
    console.log(`Gzipped JS per page (budget ${BUDGET_KB} KB):`)
    for (const r of rows)
      console.log(
        `  ${r.kb.toFixed(1).padStart(6)} KB  ${r.page}${r.kb > BUDGET_KB ? '  ← over budget' : ''}`,
      )
    if (process.argv.includes('--verbose')) {
      console.log(`\nChunks on ${rows[0]!.page}:`)
      for (const [name, b] of rows[0]!.chunks.toSorted((a, b) => b[1] - a[1]))
        console.log(`  ${(b / 1024).toFixed(1).padStart(6)} KB  ${name}`)
    }
    if (over.length) {
      console.error(`bundle:report: ${over.length} page(s) over ${BUDGET_KB} KB`)
      process.exitCode = 1
    }
  })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
