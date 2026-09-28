/**
 * npm run redirects:check — starts the production server (`next start`, after
 * `npm run build`) and proves every legacy URL in docs/legacy-url-map.json:
 *   - answers 301 in ONE hop to its effective destination (target if published,
 *     else fallback, else /), for the exact path, a lower-case and an upper-case variant;
 *   - the destination itself answers 200.
 * Set BASE_URL to check an already running server instead (e.g. production).
 */
import { spawn, type ChildProcess } from 'node:child_process'
import { buildLegacyTable, legacyEntries, legacyKey } from '../src/lib/redirects/legacy'

const PORT = 3100
const external = process.env.BASE_URL
const base = external ?? `http://127.0.0.1:${PORT}`

async function waitForServer(url: string, timeoutMs = 60_000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, { redirect: 'manual' })
      if (res.status < 500) return
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 500))
  }
  throw new Error(`Server at ${url} did not start within ${timeoutMs / 1000}s`)
}

function variants(path: string): string[] {
  const upper = path.replace(/\.html$/i, '.HTML')
  return [...new Set([path, path.toLowerCase(), upper])]
}

async function main() {
  let server: ChildProcess | undefined
  if (!external) {
    server = spawn(
      process.execPath,
      ['node_modules/next/dist/bin/next', 'start', '-p', String(PORT)],
      {
        stdio: 'ignore',
        env: { ...process.env, NODE_ENV: 'production' },
      },
    )
  }
  const errors: string[] = []
  let checked = 0
  try {
    await waitForServer(`${base}/`)
    const table = buildLegacyTable()
    const destinations = new Set<string>()

    for (const entry of legacyEntries) {
      const expected = table.get(legacyKey(entry.legacyPath))!
      destinations.add(expected)
      for (const path of variants(entry.legacyPath)) {
        checked++
        const res = await fetch(`${base}${path}`, { redirect: 'manual' })
        const location = res.headers.get('location')
        if (res.status !== 301) {
          errors.push(`${path}: status ${res.status} (want 301)`)
          continue
        }
        const target = location ? new URL(location, base) : null
        if (!target || target.pathname !== expected)
          errors.push(`${path}: → ${location} (want ${expected})`)
      }
    }

    // One hop: every destination answers 200 itself (no second redirect).
    for (const dest of destinations) {
      const res = await fetch(`${base}${dest}`, { redirect: 'manual' })
      if (res.status !== 200) errors.push(`destination ${dest}: status ${res.status} (want 200)`)
    }

    // Query strings (e.g. UTM tags) survive the redirect.
    const sample = legacyEntries[0]!
    const res = await fetch(`${base}${sample.legacyPath}?utm_source=gbp`, { redirect: 'manual' })
    if (!res.headers.get('location')?.includes('utm_source=gbp'))
      errors.push('query string is dropped on redirect')

    if (errors.length) {
      console.error(`redirects:check found ${errors.length} problem(s):`)
      errors.slice(0, 50).forEach((e) => console.error(`  - ${e}`))
      process.exitCode = 1
    } else {
      console.log(
        `redirects:check OK — ${legacyEntries.length} legacy URLs, ${checked} requests, all 301 in one hop; ${destinations.size} destination(s) answer 200.`,
      )
    }
  } finally {
    server?.kill()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
