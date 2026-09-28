import { z } from 'zod'
import { TRIP_TYPES } from '@/lib/pricing/types'

/** What the browser sends to POST /api/leads (REBUILD_PLAN §3.5). Shared by client and server. */

export const LEAD_TYPES = [
  'booking',
  'callback',
  'enquiry-luxury',
  'enquiry-wedding',
  'enquiry-shoot',
  'enquiry-group',
  'enquiry-corporate',
  'enquiry-package',
  'enquiry-bike',
  'partner-attach',
  'partner-driver',
  'contact',
] as const
export type LeadType = (typeof LEAD_TYPES)[number]

/** +91 mobile (10 digits, starts 6–9) or +977 mobile (10 digits, starts 9). */
export const phoneE164 = z
  .string()
  .regex(
    /^(\+91[6-9]\d{9}|\+9779\d{9})$/,
    'Enter a valid Indian (+91) or Nepali (+977) mobile number',
  )

const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
const time = z.string().regex(/^\d{2}:\d{2}$/)
const shortText = (max: number) => z.string().trim().max(max)

export const tripInputSchema = z.object({
  type: z.enum(TRIP_TYPES as [string, ...string[]]),
  from: shortText(80).nullable(),
  to: shortText(80).nullable(),
  fromText: shortText(80).optional(),
  toText: shortText(80).optional(),
  pkg: shortText(10).nullable().optional(),
  date: date.optional(),
  time: time.optional(),
  returnDate: date.optional(),
  classSlug: shortText(40).optional(),
})

export const attributionSchema = z
  .object({
    gclid: shortText(200),
    gbraid: shortText(200),
    wbraid: shortText(200),
    utm_source: shortText(200),
    utm_medium: shortText(200),
    utm_campaign: shortText(200),
    utm_term: shortText(200),
    utm_content: shortText(200),
    landingPage: shortText(500),
    referrer: shortText(500),
    firstVisitAt: shortText(40),
  })
  .partial()

const leadBaseSchema = z.object({
  type: z.enum(LEAD_TYPES),
  trip: tripInputSchema.optional(),
  contact: z.object({
    name: shortText(80).default(''),
    phone: phoneE164,
    email: z.string().trim().email().max(120).optional().or(z.literal('')),
    pickupAddress: shortText(200).optional(),
    message: shortText(1000).optional(),
  }),
  consent: z.object({ whatsappOptIn: z.boolean() }),
  /** The total the visitor saw; the server recomputes and keeps its own. */
  clientTotal: z.number().nonnegative().nullable().optional(),
  attribution: attributionSchema.optional(),
  page: shortText(300),
  /** Honeypot: a hidden field real visitors leave empty. */
  website: z.string().max(200).optional(),
  /** When the form was first shown (ms since epoch), for the minimum fill time. */
  startedAt: z.number().int().positive(),
})

export const leadInputSchema = leadBaseSchema.superRefine((lead, ctx) => {
  // A call-back request is phone-only; every other lead needs a name.
  if (lead.type !== 'callback' && !lead.contact.name)
    ctx.addIssue({ code: 'custom', path: ['contact', 'name'], message: 'Enter your name' })
})

export type LeadInput = z.infer<typeof leadInputSchema>
export type LeadInputDraft = z.input<typeof leadInputSchema>
export type TripInput = z.infer<typeof tripInputSchema>
export type Attribution = z.infer<typeof attributionSchema>

export const leadResponseSchema = z.object({
  ok: z.boolean(),
  ref: z.string().nullable(),
  message: z.string().optional(),
})
export type LeadResponse = z.infer<typeof leadResponseSchema>
