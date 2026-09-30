import { describe, expect, it } from 'vitest'
import { contentPaths } from '@/lib/content'
import { packages, services, vehicles } from '@/lib/content/data'
import {
  destinationGate,
  packageGate,
  packageVariantGate,
  postGate,
  serviceGate,
  subPageGate,
  VERTICAL_VEHICLES,
} from '@/lib/content/gates'
import { leadInputSchema } from '@/lib/schemas/lead'
import type { Package, Vehicle } from '@/lib/schemas/content'
import { leadText, webhookPayload } from '@/server/leads/sinks'
import type { LeadRecord } from '@/server/leads/types'

const service = (slug: string) => services.find((s) => s.slug === slug)!
const liveLuxury: Vehicle = {
  ...vehicles.find((v) => v.tier === 'luxury')!,
  ownerConfirmed: true,
  status: 'published',
}

describe('enquiry verticals', () => {
  it('stay draft until a fitting vehicle is live', () => {
    for (const slug of Object.keys(VERTICAL_VEHICLES))
      expect(serviceGate(service(slug), { liveVehicles: [] }), slug).toContain(
        'no live vehicle for this service yet (B3 fleet + F1 photos)',
      )
  })

  it('open once a fitting vehicle is live — and only for that vertical', () => {
    expect(serviceGate(service('wedding-cars'), { liveVehicles: [liveLuxury] })).toEqual([])
    expect(serviceGate(service('bus-rental'), { liveVehicles: [liveLuxury] })).not.toEqual([])
  })

  it('never gate fare-widget or corporate services on vehicles', () => {
    for (const slug of ['outstation-cabs', 'nepal-taxi', 'corporate-car-rental'])
      expect(serviceGate(service(slug), { liveVehicles: [] }), slug).toEqual([])
  })

  it('keep shoot types behind their hub, with copy ready', () => {
    const shoot = service('shoot-car-rental')
    expect(shoot.subPages).toHaveLength(6)
    for (const sp of shoot.subPages) {
      expect(subPageGate(sp, { isServicePublished: () => false }, shoot.slug)).toEqual([
        'its service hub is not published',
      ])
      expect(subPageGate(sp, { isServicePublished: () => true }, shoot.slug), sp.slug).toEqual([])
    }
  })
})

describe('Phase 5 publish set', () => {
  it('publishes Nepal, corporate, the guides and (since 2026-09-30) the vehicle verticals', () => {
    const paths = contentPaths()
    for (const p of [
      '/nepal-taxi/',
      '/nepal-taxi/gorakhpur/',
      '/nepal-taxi/raxaul/',
      '/corporate-car-rental/',
      '/destinations/',
      '/destinations/gorakhpur/places-to-visit/',
      '/destinations/lumbini/best-time-to-visit/',
    ])
      expect(paths, p).toContain(p)
    // Vehicle-dependent verticals publish now that their vehicles do (2026-09-30); self-drive
    // has no self-drive vehicle, packages no verified price, the blog no owner approval.
    for (const p of ['/wedding-cars/', '/shoot-car-rental/', '/bus-rental/', '/bike-rental/'])
      expect(paths, p).toContain(p)
    for (const p of ['/self-drive-car-rental/', '/packages/', '/blog/'])
      expect(paths, p).not.toContain(p)
  })
})

describe('packages', () => {
  const complete: Package = {
    ...packages[0]!,
    summary: 'A complete sample package used only by this test, with a long enough summary.',
    intro: Array.from({ length: 120 }, (_, i) => `word${i}`).join(' '),
    itinerary: [{ day: 1, title: 'Day one', text: 'Sample.' }],
    inclusions: ['Car and driver'],
    exclusions: ['Meals'],
    price: { amount: 10000, per: 'group', verified: true },
  }

  it('need an itinerary, inclusions, exclusions and a verified price', () => {
    expect(packageGate(complete)).toEqual([])
    expect(packageGate({ ...complete, price: { ...complete.price, verified: false } })).toContain(
      'no verified price',
    )
    expect(packageGate({ ...complete, exclusions: [] })).toContain(
      'inclusions and exclusions not both listed',
    )
  })

  it('publish a from-city variant only with its own verified price', () => {
    expect(
      packageVariantGate({
        origin: 'gorakhpur',
        price: { amount: 9000, per: 'group', verified: true },
        notes: null,
      }),
    ).toEqual([])
    expect(
      packageVariantGate({
        origin: 'gorakhpur',
        price: { amount: null, per: null, verified: false },
        notes: null,
      }),
    ).toEqual(['no verified price for this origin'])
  })

  it('migrates the two legacy packages as drafts', () => {
    expect(packages.map((p) => [p.slug, p.status])).toEqual([
      ['nepal-helicopter-charter', 'draft'],
      ['everest-mountain-flight', 'draft'],
    ])
  })
})

describe('destinations and blog', () => {
  it('need a guide and their own overview', () => {
    const d = {
      place: 'kushinagar',
      summary: 'x'.repeat(60),
      overview: Array(90).fill('w').join(' '),
      status: 'published' as const,
    }
    expect(destinationGate(d, 1)).toEqual([])
    expect(destinationGate(d, 0)).toContain('no published guide')
  })

  it('publish posts only with owner approval', () => {
    const post = {
      slug: 'x',
      title: 'X',
      summary: 'x'.repeat(60),
      date: '2026-09-29',
      related: [],
      ownerApproved: false,
      status: 'published' as const,
    }
    expect(postGate(post)).toEqual(['not approved by the owner'])
    expect(postGate({ ...post, ownerApproved: true })).toEqual([])
  })
})

describe('enquiry leads', () => {
  const base = {
    type: 'enquiry-corporate' as const,
    contact: { name: 'Asha', phone: '+919876543210' },
    consent: { whatsappOptIn: false },
    page: '/corporate-car-rental/',
    startedAt: 1,
  }

  it('accept company details and check the GSTIN format', () => {
    const ok = leadInputSchema.parse({
      ...base,
      details: { company: 'Sample Pvt Ltd', gstin: '09aaacs1234a1z5', monthlyTrips: '11–50' },
    })
    expect(ok.details?.gstin).toBe('09AAACS1234A1Z5')
    expect(() => leadInputSchema.parse({ ...base, details: { gstin: '12345' } })).toThrow()
  })

  it('carry the details to email, Telegram and the webhook', () => {
    const lead = {
      ref: 'TVZ-260929-ABCD',
      type: 'enquiry-wedding',
      name: 'Asha',
      phone: '+919876543210',
      email: null,
      pickupAddress: null,
      message: null,
      trip: null,
      details: { subject: 'Wedding cars', occasion: 'Baraat', date: '2026-12-05', groupSize: 40 },
      fromLabel: null,
      toLabel: null,
      vehicleLabel: null,
      fare: null,
      clientTotal: null,
      whatsappOptIn: false,
      attribution: null,
      page: '/wedding-cars/',
      userAgent: null,
      createdAt: new Date('2026-09-29T00:00:00Z'),
    } satisfies LeadRecord
    const text = leadText(lead)
    for (const line of [
      'About: Wedding cars',
      'Occasion: Baraat',
      'Date: 2026-12-05',
      'People: 40',
    ])
      expect(text).toContain(line)
    expect(webhookPayload(lead).details).toEqual(lead.details)
  })
})
