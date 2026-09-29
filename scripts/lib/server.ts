import { spawn, type ChildProcess } from 'node:child_process'

/**
 * Starts `next start` on a port (after `npm run build`) unless BASE_URL points
 * at an already running server, and waits until it answers. Shared by the
 * link checker, the bundle report and the performance runner.
 */
export async function withServer<T>(port: number, run: (base: string) => Promise<T>): Promise<T> {
  const external = process.env.BASE_URL
  const base = external ?? `http://127.0.0.1:${port}`
  let server: ChildProcess | undefined
  if (!external)
    server = spawn(
      process.execPath,
      ['node_modules/next/dist/bin/next', 'start', '-p', String(port)],
      {
        stdio: 'ignore',
        env: { ...process.env, NODE_ENV: 'production' },
      },
    )
  try {
    await waitForServer(`${base}/`)
    return await run(base)
  } finally {
    server?.kill()
  }
}

export async function waitForServer(url: string, timeoutMs = 90_000) {
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

/** Every indexable page, read from the running server's sitemap. */
export async function sitemapPaths(base: string): Promise<string[]> {
  const xml = await (await fetch(`${base}/sitemap.xml`)).text()
  return [...xml.matchAll(/<loc>https:\/\/taxiverz\.com(\/[^<]*)<\/loc>/g)].map((m) => m[1]!)
}
