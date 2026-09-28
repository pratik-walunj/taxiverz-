import 'server-only'
import { timingSafeEqual } from 'node:crypto'
import { env } from '@/config/env'
import { buildFareIndex } from '@/lib/pricing/build-index'
import type { FareIndex } from '@/lib/pricing/fare-index'
import { getDb } from '@/server/db/client'
import { RateLimiter } from './antispam'
import { drizzleOutbox } from './outbox-drizzle'
import type { LeadDeps } from './service'
import { enabledSinks } from './sinks'

/** Production wiring for the lead service: sinks and outbox from env, one limiter per process. */

// 5 leads per 10 minutes per IP.
const limiter = new RateLimiter(5, 10 * 60 * 1000)
let fareIndex: FareIndex | undefined

export function leadDeps(): LeadDeps {
  const db = getDb(env.DATABASE_URL)
  return {
    store: db ? drizzleOutbox(db) : null,
    sinks: enabledSinks(env),
    limiter,
    fareIndex: () => (fareIndex ??= buildFareIndex()),
  }
}

/** Bearer-token check for the cron endpoints. Disabled (always false) when LEADS_RETRY_TOKEN is unset. */
export function authorisedCron(header: string | null): boolean {
  const token = env.LEADS_RETRY_TOKEN
  if (!token || !header?.startsWith('Bearer ')) return false
  const given = Buffer.from(header.slice(7))
  const expected = Buffer.from(token)
  return given.length === expected.length && timingSafeEqual(given, expected)
}
