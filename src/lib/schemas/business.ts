import { z } from 'zod'

/** Unknown facts are `null`; the UI hides them. See docs/OWNER_TODO.md. */
const e164India = z.string().regex(/^\+91[6-9]\d{9}$/, 'Indian mobile number in E.164 form')

export const branchSchema = z.object({
  id: z.string().regex(/^[a-z-]+$/),
  label: z.string().min(1),
  isHeadOffice: z.boolean(),
  streetAddress: z.string().min(1),
  locality: z.string().min(1),
  city: z.string().min(1),
  region: z.string().min(1),
  postalCode: z.string().regex(/^\d{6}$/),
  country: z.literal('IN'),
  geo: z.object({ lat: z.number(), lng: z.number() }).nullable(),
  hours: z.string().nullable(),
  mapsUrl: z.string().url().nullable(),
  googleBusinessUrl: z.string().url().nullable(),
})

export const businessSchema = z.object({
  brandName: z.literal('Taxiverz'),
  legalName: z.string().nullable(),
  tagline: z.string().nullable(),
  phone: e164India,
  whatsapp: e164India,
  email: z.string().email().nullable(),
  branches: z.array(branchSchema).min(1),
  foundedYear: z.number().int().min(1950).nullable(),
  gstin: z
    .string()
    .regex(/^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/)
    .nullable(),
  socials: z.object({
    instagram: z.string().url().nullable(),
    facebook: z.string().url().nullable(),
    youtube: z.string().url().nullable(),
  }),
  sisterSites: z.array(z.object({ label: z.string(), url: z.string().url() })),
  googleSiteVerification: z.string().min(10),
  claims: z.object({
    available24x7: z.boolean().nullable(),
    gpsTracked: z.boolean().nullable(),
    callbackMinutes: z.number().int().positive().nullable(),
  }),
  /** Registrations, permits and licences the owner can prove (F2). */
  registrations: z.array(z.object({ label: z.string().min(1), value: z.string().min(1) })),
  /** Booking policies (H1). null = not decided: the terms and refund pages stay draft. */
  policies: z.object({
    freeCancellationHours: z.number().int().nonnegative().nullable(),
    advancePercent: z.number().min(0).max(100).nullable(),
    refundDays: z.number().int().positive().nullable(),
  }),
  /** How customers can pay, e.g. "UPI", "Cash to the driver" (H1). */
  paymentMethods: z.array(z.string().min(1)),
  /** The only official accounts payments go to; shown in the payment-safety notice (H1). */
  paymentAccounts: z.array(z.object({ label: z.string().min(1), value: z.string().min(1) })),
  /** DPDP Act grievance officer (H1). Until named, privacy requests go to the business contacts. */
  grievanceOfficer: z
    .object({ name: z.string().min(1), email: z.string().email(), phone: e164India.nullable() })
    .nullable(),
  /** The date the owner last reviewed each policy page (YYYY-MM-DD). */
  policyReviewed: z.object({
    privacy: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .nullable(),
    terms: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .nullable(),
    refund: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .nullable(),
  }),
})

export type Business = z.infer<typeof businessSchema>
export type Branch = z.infer<typeof branchSchema>
