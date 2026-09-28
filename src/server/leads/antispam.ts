/** Anti-spam without a captcha (REBUILD_PLAN §3.5): honeypot, minimum fill time, per-IP rate limit. */

export const MIN_FILL_MS = 3000

/** True when the submission looks automated: honeypot filled, or submitted faster than a person can. */
export function looksAutomated(
  input: { website?: string; startedAt: number },
  now: number,
): boolean {
  if (input.website && input.website.trim() !== '') return true
  const elapsed = now - input.startedAt
  return elapsed < MIN_FILL_MS || elapsed > 24 * 60 * 60 * 1000
}

/**
 * Sliding-window limiter kept in memory. The site runs as one process on one
 * VPS, so this is enough; behind several instances it would move to Postgres.
 */
export class RateLimiter {
  private hits = new Map<string, number[]>()

  constructor(
    private readonly limit: number,
    private readonly windowMs: number,
  ) {}

  /** Records a hit and returns whether it is allowed. */
  allow(key: string, now: number): boolean {
    const recent = (this.hits.get(key) ?? []).filter((t) => now - t < this.windowMs)
    if (recent.length >= this.limit) {
      this.hits.set(key, recent)
      return false
    }
    recent.push(now)
    this.hits.set(key, recent)
    if (this.hits.size > 10_000) this.sweep(now)
    return true
  }

  private sweep(now: number) {
    for (const [key, times] of this.hits)
      if (times.every((t) => now - t >= this.windowMs)) this.hits.delete(key)
  }
}

/** Client IP behind Cloudflare and Nginx. */
export function clientIp(headers: Headers): string {
  return (
    headers.get('cf-connecting-ip') ??
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    headers.get('x-real-ip') ??
    'unknown'
  )
}
