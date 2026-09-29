import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { eq } from 'drizzle-orm'
import { Pool } from 'pg'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import * as schema from '@/server/db/schema'
import { drizzleOutbox } from '@/server/leads/outbox-drizzle'
import type { LeadRecord } from '@/server/leads/types'

/**
 * Runs against a throwaway database only: TEST_DATABASE_URL=postgres://… npm test
 * Skipped otherwise, so `npm run check` needs no database.
 */
const url = process.env.TEST_DATABASE_URL

describe.skipIf(!url)('Postgres outbox', () => {
  const pool = new Pool({ connectionString: url })
  const db = drizzle(pool, { schema })
  const store = drizzleOutbox(db)
  const at = new Date('2026-09-28T06:30:00Z')
  const lead = (ref: string, phone: string, createdAt = at): LeadRecord => ({
    ref,
    type: 'booking',
    name: 'Test Rider',
    phone,
    email: null,
    pickupAddress: null,
    message: null,
    trip: { type: 'one-way', from: 'gorakhpur', to: 'kathmandu' },
    details: null,
    fromLabel: 'Gorakhpur',
    toLabel: 'Kathmandu',
    vehicleLabel: 'Sedan',
    fare: null,
    clientTotal: null,
    whatsappOptIn: false,
    attribution: null,
    page: '/book/',
    userAgent: null,
    createdAt,
  })

  beforeAll(async () => {
    await migrate(db, { migrationsFolder: 'drizzle' })
    await db.delete(schema.leads).where(eq(schema.leads.page, '/book/'))
  })
  afterAll(async () => {
    await db.delete(schema.leads).where(eq(schema.leads.page, '/book/'))
    await pool.end()
  })

  it('saves a lead with its deliveries and returns them when due', async () => {
    await store.save(lead('TVZ-260928-AAAA', '+919800000001'), ['email', 'telegram'])
    await store.markSent('TVZ-260928-AAAA', 'email', at)
    const due = await store.due(new Date(at.getTime() + 1000), 10)
    expect(due.map((d) => d.sink)).toEqual(['telegram'])
    expect(due[0]?.lead).toMatchObject({
      ref: 'TVZ-260928-AAAA',
      fromLabel: 'Gorakhpur',
      vehicleLabel: 'Sedan',
    })
    expect(due[0]?.lead.trip).toEqual({ type: 'one-way', from: 'gorakhpur', to: 'kathmandu' })
  })

  it('backs off and gives up', async () => {
    const later = new Date(at.getTime() + 60 * 60_000)
    await store.markFailed('TVZ-260928-AAAA', 'telegram', 'down', 1, later)
    expect(await store.due(new Date(at.getTime() + 1000), 10)).toEqual([])
    expect(await store.due(later, 10)).toHaveLength(1)
    await store.markFailed('TVZ-260928-AAAA', 'telegram', 'down', 6, null)
    expect(await store.due(new Date(later.getTime() + 1e9), 10)).toEqual([])
  })

  it('purges by last contact, which a new lead from the same phone refreshes', async () => {
    const old = new Date('2024-01-01T00:00:00Z')
    await store.save(lead('TVZ-240101-BBBB', '+919800000002', old), [])
    await store.save(lead('TVZ-240101-CCCC', '+919800000003', old), [])
    await store.save(lead('TVZ-260928-DDDD', '+919800000003', at), [])
    expect(await store.purge(new Date('2024-09-28T00:00:00Z'))).toBe(1)
    const refs = (await db.select({ ref: schema.leads.ref }).from(schema.leads)).map((r) => r.ref)
    expect(refs).not.toContain('TVZ-240101-BBBB')
    expect(refs).toContain('TVZ-240101-CCCC')
  })
})
