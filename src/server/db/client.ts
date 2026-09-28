import 'server-only'
import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

export type Db = NodePgDatabase<typeof schema>

let db: Db | null | undefined

/** One pool per process, created on first use. Null when DATABASE_URL is unset. */
export function getDb(databaseUrl: string | undefined): Db | null {
  if (db !== undefined) return db
  if (!databaseUrl) return (db = null)
  const pool = new Pool({
    connectionString: databaseUrl,
    max: 5,
    // Fail fast: a lead must never wait long for the outbox; it falls back to direct delivery.
    connectionTimeoutMillis: 3000,
    idleTimeoutMillis: 30_000,
  })
  pool.on('error', (err) =>
    console.error(JSON.stringify({ event: 'db-pool-error', message: err.message })),
  )
  return (db = drizzle(pool, { schema }))
}
