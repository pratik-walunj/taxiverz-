import { createHmac } from 'node:crypto'
import { describe, expect, it, vi } from 'vitest'
import type { Env } from '@/config/env'
import { buildFareIndex } from '@/lib/pricing/build-index'
import { leadInputSchema, type LeadInput } from '@/lib/schemas/lead'
import { captureAttribution, getAttribution } from '@/lib/tracking/attribution'
import { tripSummaryLines, whatsappTripMessage } from '@/lib/trip-summary'
import { clientIp, looksAutomated, MIN_FILL_MS, RateLimiter } from '@/server/leads/antispam'
import { makeReference, REFERENCE_PATTERN } from '@/server/leads/reference'
import {
  BACKOFF_MINUTES,
  purgeExpiredLeads,
  retryDueDeliveries,
  submitLead,
  type LeadDeps,
} from '@/server/leads/service'
import {
  enabledSinks,
  leadSubject,
  leadText,
  telegramSink,
  webhookPayload,
  webhookSink,
} from '@/server/leads/sinks'
import type { DueDelivery, LeadRecord, OutboxStore, Sink } from '@/server/leads/types'

const NOW = new Date('2026-09-28T06:30:00Z')
const index = buildFareIndex()

function input(over: Partial<LeadInput> = {}): LeadInput {
  return leadInputSchema.parse({
    type: 'booking',
    trip: {
      type: 'one-way',
      from: 'gorakhpur',
      to: 'kathmandu',
      classSlug: 'sedan',
      date: '2026-10-05',
      time: '07:30',
    },
    contact: { name: 'Test Rider', phone: '+919876543210' },
    consent: { whatsappOptIn: false },
    website: '',
    startedAt: NOW.getTime() - 20_000,
    page: '/book/',
    ...over,
  })
}

class MemoryStore implements OutboxStore {
  saved: { lead: LeadRecord; sinks: string[] }[] = []
  sent: string[] = []
  failed: { sink: string; attempts: number; next: Date | null }[] = []
  dueList: DueDelivery[] = []
  purgedBefore: Date | null = null
  constructor(private readonly broken = false) {}
  async save(lead: LeadRecord, sinks: string[]) {
    if (this.broken) throw new Error('connect ECONNREFUSED')
    this.saved.push({ lead, sinks })
  }
  async markSent(_ref: string, sink: string) {
    this.sent.push(sink)
  }
  async markFailed(_ref: string, sink: string, _e: string, attempts: number, next: Date | null) {
    this.failed.push({ sink, attempts, next })
  }
  async due() {
    return this.dueList
  }
  async purge(before: Date) {
    this.purgedBefore = before
    return 3
  }
}

const sink = (name: string, ok = true): Sink & { got: LeadRecord[] } => {
  const got: LeadRecord[] = []
  return {
    name,
    got,
    async deliver(lead) {
      if (!ok) throw new Error(`${name} down`)
      got.push(lead)
    },
  }
}

function deps(over: Partial<LeadDeps> = {}): LeadDeps & { logs: Record<string, unknown>[] } {
  const logs: Record<string, unknown>[] = []
  return {
    store: new MemoryStore(),
    sinks: [sink('email')],
    limiter: new RateLimiter(5, 600_000),
    fareIndex: () => index,
    now: () => NOW,
    log: (e) => logs.push(e),
    logs,
    ...over,
  }
}

const meta = { ip: '203.0.113.9', userAgent: 'test' }

describe('submitLead', () => {
  it('stores, delivers and labels the trip on the server', async () => {
    const store = new MemoryStore()
    const email = sink('email')
    const res = await submitLead(input(), meta, deps({ store, sinks: [email] }))
    expect(res).toMatchObject({ status: 'ok', stored: true, delivered: ['email'] })
    expect(store.saved[0]?.sinks).toEqual(['email'])
    expect(store.sent).toEqual(['email'])
    const lead = email.got[0]!
    expect(lead.ref).toMatch(REFERENCE_PATTERN)
    expect(lead.fromLabel).toBe('Gorakhpur')
    expect(lead.toLabel).toBe('Kathmandu')
    expect(lead.vehicleLabel).toMatch(/^Sedan/)
    expect(lead.fare?.status).toBe('on-request')
  })

  it('delivers directly when the database is down', async () => {
    const email = sink('email')
    const d = deps({ store: new MemoryStore(true), sinks: [email] })
    const res = await submitLead(input(), meta, d)
    expect(res).toMatchObject({ status: 'ok', stored: false, delivered: ['email'] })
    expect(email.got).toHaveLength(1)
    expect(d.logs.map((l) => l.event)).toContain('lead-outbox-unavailable')
  })

  it('schedules a retry when a sink fails but the lead is stored', async () => {
    const store = new MemoryStore()
    const res = await submitLead(input(), meta, deps({ store, sinks: [sink('telegram', false)] }))
    expect(res.status).toBe('ok')
    expect(store.failed[0]).toEqual({
      sink: 'telegram',
      attempts: 1,
      next: new Date(NOW.getTime() + BACKOFF_MINUTES[0]! * 60_000),
    })
  })

  it('reports undelivered when nothing could store or deliver it', async () => {
    const res = await submitLead(
      input(),
      meta,
      deps({ store: null, sinks: [sink('email', false)] }),
    )
    expect(res.status).toBe('undelivered')
    expect(res).toHaveProperty('ref')
  })

  it('drops automated submissions quietly', async () => {
    const email = sink('email')
    const res = await submitLead(input({ website: 'http://spam' }), meta, deps({ sinks: [email] }))
    expect(res.status).toBe('spam')
    expect(email.got).toHaveLength(0)
  })

  it('rate-limits one IP', async () => {
    const d = deps({ limiter: new RateLimiter(2, 600_000) })
    await submitLead(input(), meta, d)
    await submitLead(input(), meta, d)
    expect((await submitLead(input(), meta, d)).status).toBe('rate-limited')
    expect((await submitLead(input(), { ...meta, ip: '198.51.100.1' }, d)).status).toBe('ok')
  })

  it('never logs personal data', async () => {
    const d = deps({ store: new MemoryStore(true), sinks: [sink('email', false)] })
    await submitLead(
      input({ contact: { name: 'Asha Verma', phone: '+919812345678', email: 'asha@example.com' } }),
      meta,
      d,
    )
    const text = JSON.stringify(d.logs)
    for (const secret of ['Asha', '9812345678', 'asha@example.com', meta.ip])
      expect(text).not.toContain(secret)
  })
})

describe('retry and retention', () => {
  const due = (attempts: number, sinkName = 'email'): DueDelivery => ({
    lead: { ref: 'TVZ-260928-ABCD' } as LeadRecord,
    sink: sinkName,
    attempts,
  })

  it('marks a successful retry as sent', async () => {
    const store = new MemoryStore()
    store.dueList = [due(1)]
    expect(await retryDueDeliveries({ store, sinks: [sink('email')], now: () => NOW })).toEqual({
      retried: 1,
      sent: 1,
    })
    expect(store.sent).toEqual(['email'])
  })

  it('backs off, then gives up after the last step', async () => {
    const store = new MemoryStore()
    store.dueList = [due(1), due(BACKOFF_MINUTES.length)]
    await retryDueDeliveries({
      store,
      sinks: [sink('email', false)],
      now: () => NOW,
      log: () => {},
    })
    expect(store.failed[0]).toEqual({
      sink: 'email',
      attempts: 2,
      next: new Date(NOW.getTime() + BACKOFF_MINUTES[1]! * 60_000),
    })
    expect(store.failed[1]?.next).toBeNull()
  })

  it('gives up on a sink that is no longer configured', async () => {
    const store = new MemoryStore()
    store.dueList = [due(1, 'telegram')]
    await retryDueDeliveries({ store, sinks: [], now: () => NOW })
    expect(store.failed[0]?.next).toBeNull()
  })

  it('does nothing without a database', async () => {
    expect(await retryDueDeliveries({ store: null, sinks: [] })).toEqual({ retried: 0, sent: 0 })
    expect(await purgeExpiredLeads({ store: null })).toEqual({ deleted: 0 })
  })

  it('purges leads 24 months after last contact', async () => {
    const store = new MemoryStore()
    expect(await purgeExpiredLeads({ store, now: () => NOW })).toEqual({ deleted: 3 })
    expect(store.purgedBefore?.toISOString()).toBe('2024-09-28T06:30:00.000Z')
  })
})

describe('reference', () => {
  it('is dated in India time and avoids look-alike characters', () => {
    const ref = makeReference(new Date('2026-09-28T20:00:00Z'), () => 0)
    expect(ref).toBe('TVZ-260929-2222')
    for (let i = 0; i < 200; i++) expect(makeReference()).toMatch(REFERENCE_PATTERN)
    expect(REFERENCE_PATTERN.test('TVZ-260928-O1IL')).toBe(false)
  })
})

describe('anti-spam', () => {
  it('flags honeypots and impossible fill times', () => {
    const now = NOW.getTime()
    expect(looksAutomated({ startedAt: now - 20_000 }, now)).toBe(false)
    expect(looksAutomated({ startedAt: now - MIN_FILL_MS + 1 }, now)).toBe(true)
    expect(looksAutomated({ startedAt: now - 2 * 86_400_000 }, now)).toBe(true)
    expect(looksAutomated({ website: 'x', startedAt: now - 20_000 }, now)).toBe(true)
  })

  it('lets a window pass after it expires', () => {
    const limiter = new RateLimiter(1, 1000)
    expect(limiter.allow('a', 0)).toBe(true)
    expect(limiter.allow('a', 500)).toBe(false)
    expect(limiter.allow('a', 1500)).toBe(true)
  })

  it('reads the client IP behind Cloudflare and Nginx', () => {
    expect(
      clientIp(new Headers({ 'cf-connecting-ip': '1.1.1.1', 'x-forwarded-for': '2.2.2.2' })),
    ).toBe('1.1.1.1')
    expect(clientIp(new Headers({ 'x-forwarded-for': '2.2.2.2, 10.0.0.1' }))).toBe('2.2.2.2')
    expect(clientIp(new Headers())).toBe('unknown')
  })
})

describe('lead input', () => {
  it('needs a name except on call-back requests', () => {
    expect(() => input({ contact: { name: '', phone: '+919876543210' } })).toThrow()
    expect(input({ type: 'callback', contact: { name: '', phone: '+919876543210' } }).type).toBe(
      'callback',
    )
  })

  it('accepts Indian and Nepali mobiles only', () => {
    expect(() => input({ contact: { name: 'A', phone: '+9779812345678' } })).not.toThrow()
    expect(() => input({ contact: { name: 'A', phone: '+15551234567' } })).toThrow()
  })
})

describe('sinks', () => {
  const lead: LeadRecord = {
    ref: 'TVZ-260928-ABCD',
    type: 'booking',
    name: 'Test Rider',
    phone: '+919876543210',
    email: null,
    pickupAddress: null,
    message: null,
    trip: {
      type: 'one-way',
      from: 'gorakhpur',
      to: 'kathmandu',
      date: '2026-10-05',
      time: '07:30',
    },
    details: null,
    fromLabel: 'Gorakhpur',
    toLabel: 'Kathmandu',
    vehicleLabel: 'Sedan — Dzire, Etios or similar',
    fare: null,
    clientTotal: null,
    whatsappOptIn: false,
    attribution: { gclid: 'abc' },
    page: '/book/',
    userAgent: null,
    createdAt: NOW,
  }
  const env = {} as Env

  it('write the lead out for people and for CRMs', () => {
    expect(leadSubject(lead)).toBe('New booking TVZ-260928-ABCD — Gorakhpur to Kathmandu')
    expect(leadText(lead)).toContain('+919876543210')
    expect(webhookPayload(lead)).toMatchObject({
      ref: lead.ref,
      from: 'Gorakhpur',
      quotedFare: null,
      attribution: { gclid: 'abc' },
    })
  })

  it('are enabled only when configured', () => {
    expect(enabledSinks(env)).toEqual([])
    expect(
      enabledSinks({
        ...env,
        TELEGRAM_BOT_TOKEN: 't',
        TELEGRAM_CHAT_ID: '1',
        LEAD_WEBHOOK_URL: 'https://x.test/',
      }).map((s) => s.name),
    ).toEqual(['telegram', 'webhook'])
  })

  it('sign webhooks and use the ref as the idempotency key', async () => {
    const fetchImpl = vi.fn(async () => new Response('ok'))
    const s = webhookSink(
      { ...env, LEAD_WEBHOOK_URL: 'https://x.test/', LEAD_WEBHOOK_SECRET: 'k' },
      fetchImpl,
    )!
    await s.deliver(lead)
    const [, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit]
    const headers = init.headers as Record<string, string>
    expect(headers['Idempotency-Key']).toBe(lead.ref)
    expect(headers['X-Taxiverz-Signature']).toBe(
      createHmac('sha256', 'k')
        .update(init.body as string)
        .digest('hex'),
    )
  })

  it('throw on a failed HTTP delivery so the outbox retries', async () => {
    const down = async () => new Response('no', { status: 502 })
    await expect(
      telegramSink({ ...env, TELEGRAM_BOT_TOKEN: 't', TELEGRAM_CHAT_ID: '1' }, down)!.deliver(lead),
    ).rejects.toThrow('502')
    await expect(
      webhookSink({ ...env, LEAD_WEBHOOK_URL: 'https://x.test/' }, down)!.deliver(lead),
    ).rejects.toThrow('502')
  })
})

describe('attribution', () => {
  class MemoryStorage {
    data = new Map<string, string>()
    getItem = (k: string) => this.data.get(k) ?? null
    setItem = (k: string, v: string) => void this.data.set(k, v)
  }
  const storage = () => new MemoryStorage() as unknown as Storage

  it('keeps the first touch until a new ad click replaces it', () => {
    const s = storage()
    const t = NOW.getTime()
    captureAttribution(new URL('https://taxiverz.com/?utm_source=google&gclid=one'), '', s, t)
    captureAttribution(new URL('https://taxiverz.com/book/'), 'https://example.com/', s, t + 1000)
    expect(getAttribution(s, t + 2000)).toMatchObject({
      gclid: 'one',
      utm_source: 'google',
      landingPage: '/?utm_source=google&gclid=one',
    })
    captureAttribution(new URL('https://taxiverz.com/?gclid=two'), '', s, t + 3000)
    expect(getAttribution(s, t + 4000)?.gclid).toBe('two')
  })

  it('expires after 90 days', () => {
    const s = storage()
    captureAttribution(new URL('https://taxiverz.com/?gclid=one'), '', s, 0)
    expect(getAttribution(s, 91 * 86_400_000)).toBeUndefined()
    expect(getAttribution(undefined)).toBeUndefined()
  })
})

describe('trip summary', () => {
  it('builds the WhatsApp message with the reference and the trip', () => {
    const msg = whatsappTripMessage({
      ref: 'TVZ-260928-ABCD',
      tripType: 'one-way',
      from: 'Gorakhpur',
      to: 'Kathmandu',
      date: '2026-10-05',
      time: '07:30',
      vehicle: 'Sedan',
      total: null,
    })
    expect(msg).toMatch(/^Hi Taxiverz/)
    expect(msg).toContain('Booking ref: TVZ-260928-ABCD')
    expect(msg).toContain('Route: Gorakhpur to Kathmandu')
    expect(tripSummaryLines({ from: 'Gorakhpur' })).toContain('From: Gorakhpur')
  })
})
