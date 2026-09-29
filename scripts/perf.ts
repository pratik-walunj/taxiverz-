/**
 * npm run perf — Lighthouse (mobile defaults: Slow 4G, 4× CPU) on the key
 * templates, 3 runs each, median reported, on `next start` after a build.
 * Prints the CPU benchmark of every run: under ~800 the machine is busy and
 * the numbers are pessimistic (Lighthouse calibrates for ~1000+).
 *   --low-end   6× CPU instead of 4× (the plan's low-end run)
 *   --assert    exit 1 when a CLAUDE.md budget is missed
 *   --runs=N    runs per URL (default 3)
 * Extra arguments that start with "/" replace the default URL list.
 */
import * as chromeLauncher from 'chrome-launcher'
import lighthouse from 'lighthouse'
import { withServer } from './lib/server'

const PORT = 3180
const DEFAULT_URLS = [
  '/',
  '/outstation-cabs/gorakhpur/',
  '/cabs/gorakhpur/',
  '/destinations/kushinagar/places-to-visit/',
  '/fleet/',
]
const args = process.argv.slice(2)
const urls = args.filter((a) => a.startsWith('/'))
const runs = Number(args.find((a) => a.startsWith('--runs='))?.split('=')[1] ?? 3)
const lowEnd = args.includes('--low-end')
const assert = args.includes('--assert')

/** CLAUDE.md "Performance" budgets. */
const BUDGET = { performance: 90, accessibility: 95, seo: 100, lcp: 2500, cls: 0.05 }

const median = (xs: number[]) => xs.toSorted((a, b) => a - b)[Math.floor(xs.length / 2)]!

async function main() {
  await withServer(PORT, async (base) => {
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless=new'] })
    const misses: string[] = []
    try {
      console.log(
        `Lighthouse mobile${lowEnd ? ' (low-end: 6× CPU)' : ''}, ${runs} runs each, median:`,
      )
      for (const path of urls.length ? urls : DEFAULT_URLS) {
        const samples: {
          perf: number
          a11y: number
          seo: number
          lcp: number
          tbt: number
          cls: number
          bench: number
        }[] = []
        for (let i = 0; i < runs; i++) {
          const result = await lighthouse(`${base}${path}`, {
            port: chrome.port,
            output: 'json',
            logLevel: 'error',
            onlyCategories: ['performance', 'accessibility', 'seo'],
            ...(lowEnd && { throttling: { cpuSlowdownMultiplier: 6 } as never }),
          })
          const lhr = result!.lhr
          samples.push({
            perf: Math.round((lhr.categories.performance!.score ?? 0) * 100),
            a11y: Math.round((lhr.categories.accessibility!.score ?? 0) * 100),
            seo: Math.round((lhr.categories.seo!.score ?? 0) * 100),
            lcp: lhr.audits['largest-contentful-paint']!.numericValue ?? 0,
            tbt: lhr.audits['total-blocking-time']!.numericValue ?? 0,
            cls: lhr.audits['cumulative-layout-shift']!.numericValue ?? 0,
            bench: lhr.environment.benchmarkIndex,
          })
        }
        const m = {
          perf: median(samples.map((s) => s.perf)),
          a11y: median(samples.map((s) => s.a11y)),
          seo: median(samples.map((s) => s.seo)),
          lcp: median(samples.map((s) => s.lcp)),
          tbt: median(samples.map((s) => s.tbt)),
          cls: median(samples.map((s) => s.cls)),
        }
        console.log(
          `  ${path.padEnd(44)} perf ${m.perf}  a11y ${m.a11y}  seo ${m.seo}  LCP ${Math.round(m.lcp)} ms  TBT ${Math.round(m.tbt)} ms  CLS ${m.cls.toFixed(3)}  (CPU benchmark ${samples.map((s) => Math.round(s.bench)).join('/')})`,
        )
        if (m.perf < BUDGET.performance)
          misses.push(`${path}: performance ${m.perf} < ${BUDGET.performance}`)
        if (m.a11y < BUDGET.accessibility)
          misses.push(`${path}: accessibility ${m.a11y} < ${BUDGET.accessibility}`)
        if (m.seo < BUDGET.seo) misses.push(`${path}: SEO ${m.seo} < ${BUDGET.seo}`)
        if (m.lcp >= BUDGET.lcp) misses.push(`${path}: LCP ${Math.round(m.lcp)} ms ≥ ${BUDGET.lcp}`)
        if (m.cls >= BUDGET.cls) misses.push(`${path}: CLS ${m.cls.toFixed(3)} ≥ ${BUDGET.cls}`)
      }
    } finally {
      await chrome.kill()
    }
    if (misses.length) {
      console.log(`\n${misses.length} budget miss(es):`)
      misses.forEach((m) => console.log(`  - ${m}`))
      if (assert) process.exitCode = 1
    } else console.log('\nAll budgets met.')
  })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
