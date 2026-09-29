import { z } from 'zod'

/**
 * Content schemas (REBUILD_PLAN §3.1). `null` always means "not known yet":
 * the UI hides the element or shows a neutral fallback. Only `published`
 * entities that pass their §5 gate get pages, links, sitemap entries and JSON-LD.
 */

export const slug = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'lowercase-hyphenated slug')
export const status = z.enum(['published', 'draft'])
export const geo = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
})
const country = z.enum(['IN', 'NP'])
const nullableText = z.string().trim().min(1).nullable()

/** One or two sentences: the meta description and the card text. */
const summary = z.string().trim().min(50).max(155).nullable()

export const faqSchema = z.object({ q: z.string().min(1), a: z.string().min(1) })

// ---------------------------------------------------------------- places

export const citySchema = z.object({
  slug,
  name: z.string().min(1),
  nameHi: z.string().min(1).nullable(),
  aliases: z.array(z.string().min(1)),
  state: z.string().min(1),
  country,
  geo: geo.nullable(),
  /** Taxiverz has an office here. */
  isBranch: z.boolean(),
  /** Routes start here (a city hub may exist). */
  isOrigin: z.boolean(),
  summary,
  intro: nullableText,
  faqs: z.array(faqSchema),
  status,
})

export const placeSchema = z.object({
  id: slug,
  name: z.string().min(1),
  nameHi: z.string().min(1).nullable(),
  aliases: z.array(z.string().min(1)),
  type: z.enum(['city', 'town', 'area', 'airport', 'station', 'border']),
  /** IATA code for airports, station code for railway stations. */
  code: z
    .string()
    .regex(/^[A-Z]{2,5}$/)
    .nullable(),
  citySlug: slug.nullable(),
  country,
  geo: geo.nullable(),
})

// ---------------------------------------------------------------- routes

export const routeSchema = z.object({
  origin: slug,
  destination: slug,
  slug,
  status,
  /** Required for long-distance routes (> 600 km one way) before publishing (§5). */
  ownerConfirmed: z.boolean(),
  /** From the owner-reviewed docs/route-distances.csv only. */
  distanceKm: z.number().positive().nullable(),
  durationMins: z.number().int().positive().nullable(),
  verified: z.object({
    distance: z.boolean(),
    duration: z.boolean(),
    tolls: z.boolean(),
    border: z.boolean(),
  }),
  via: z.array(z.string().min(1)),
  isInternational: z.boolean(),
  /** Place id of the border point used, once the owner confirms it (D1). */
  borderCrossing: slug.nullable(),
  tolls: z.object({
    car: z.number().nonnegative().nullable(),
    lcv: z.number().nonnegative().nullable(),
    bus: z.number().nonnegative().nullable(),
  }),
  permitCharges: z.number().nonnegative().nullable(),
  borderCharges: z.number().nonnegative().nullable(),
  bestDepartureTime: nullableText,
  roadNotes: nullableText,
  stops: z.array(z.object({ name: z.string().min(1), note: nullableText })),
  content: z.object({
    intro: nullableText,
    routeGuide: nullableText,
    tips: z.array(z.string().min(1)),
  }),
  faqs: z.array(faqSchema),
  featured: z.boolean(),
  relatedPackages: z.array(slug),
  legacyUrls: z.array(z.string().startsWith('/')),
  /**
   * What the legacy pages said. Reference for Phase 4B only — never rendered,
   * never used for fares (docs/AUDIT.md §5).
   */
  legacy: z.object({
    distanceKm: z.number().positive().nullable(),
    durationText: nullableText,
    via: z.array(z.string().min(1)),
    placesToVisit: z.array(z.string().min(1)),
    flags: z.array(z.string().min(1)),
  }),
})

// ---------------------------------------------------------------- vehicles

const perKm = z.number().positive().nullable()
const amount = z.number().nonnegative().nullable()
const localPackage = z.object({
  hours: z.number().int().positive(),
  km: z.number().int().positive(),
  price: amount,
})

export const vehicleClassSchema = z.object({
  slug,
  name: z.string().min(1),
  representativeModels: z.array(z.string().min(1)).min(1),
  seats: z.number().int().positive().nullable(),
  luggage: z.number().int().nonnegative().nullable(),
  ac: z.boolean().nullable(),
  tollClass: z.enum(['car', 'lcv', 'bus']),
  useCase: nullableText,
  /** Vehicle slug whose confirmed photo represents the class. */
  imageFrom: slug.nullable(),
  rates: z.object({
    oneWayPerKm: perKm,
    roundTripPerKm: perKm,
    minKmPerDay: z.number().int().positive().nullable(),
    oneWayMinKm: z.number().int().positive().nullable(),
    driverAllowancePerDay: amount,
    nightCharge: amount,
    local: z.array(localPackage),
    extraKm: amount,
    extraHour: amount,
  }),
  sortOrder: z.number().int(),
  status,
})

export const vehicleImageSchema = z.object({
  src: z.string().startsWith('/images/'),
  alt: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  /** own = owner-confirmed photo of a Taxiverz vehicle (F1). Only `own` counts for the §5 gate. */
  source: z.enum(['own', 'stock', 'render', 'unknown']),
  /** Caption or label baked into the pixels (e.g. an orange "Audi A4" bar): never usable as a photo. */
  bakedInText: z.boolean(),
  /** The picture shows a different model than the vehicle (docs/IMAGE_MAP.md). */
  modelMismatch: z.boolean(),
})

export const vehicleSchema = z.object({
  slug,
  name: z.string().min(1),
  make: z.string().min(1),
  model: z.string().min(1).nullable(),
  classSlug: slug.nullable(),
  category: z.enum(['car', 'group', 'bike']),
  tier: z.enum(['economy', 'comfort', 'premium', 'luxury', 'group', 'bike']),
  bodyType: z.enum([
    'hatchback',
    'sedan',
    'muv',
    'suv',
    'open-4x4',
    'pickup',
    'convertible',
    'coupe',
    'van',
    'bus',
    'motorcycle',
    'scooter',
    'vintage',
  ]),
  seats: z.number().int().positive().nullable(),
  luggage: z.number().int().nonnegative().nullable(),
  ac: z.boolean().nullable(),
  useCase: nullableText,
  bookingMode: z.enum(['instant', 'enquire']),
  selfDrive: z.boolean().nullable(),
  images: z.array(vehicleImageSchema),
  /** Per-model rates, only for enquire-mode vehicles (luxury, vintage, buses, bikes). */
  rates: z
    .object({
      wedding: z.object({
        hours: z.number().int().positive().nullable(),
        price: amount,
        extraHour: amount,
      }),
      corporate: z.object({
        hours: z.number().int().positive().nullable(),
        km: z.number().int().positive().nullable(),
        price: amount,
      }),
      outstationPerKm: perKm,
      minKmPerDay: z.number().int().positive().nullable(),
      local: z.array(localPackage),
      extraKm: amount,
      extraHour: amount,
      nightCharge: amount,
      washing: amount,
      perDay: amount,
      perWeek: amount,
      perMonth: amount,
    })
    .nullable(),
  /** The owner has confirmed Taxiverz runs or reliably supplies it (RATE_CARD §6, B3). */
  ownerConfirmed: z.boolean(),
  status,
  legacyUrls: z.array(z.string().startsWith('/')),
  /** Known problems carried over from the legacy site (docs/AUDIT.md §4). */
  flags: z.array(z.string().min(1)),
})

// ---------------------------------------------------------------- services

export const serviceSchema = z.object({
  slug,
  name: z.string().min(1),
  register: z.enum(['standard', 'luxury']),
  sells: z.enum(['fare-widget', 'enquiry', 'corporate-enquiry']),
  widgetTab: z.enum(['one-way', 'round-trip', 'local', 'airport']).nullable(),
  /** Sub-pages that are not cities (shoot-car-rental's shoot types). */
  subPages: z.array(z.object({ slug, name: z.string().min(1) })),
  summary,
  intro: nullableText,
  faqs: z.array(faqSchema),
  status,
})

export const serviceCitySchema = z.object({
  service: slug,
  city: slug,
  summary,
  intro: nullableText,
  faqs: z.array(faqSchema),
  status,
})

export type City = z.infer<typeof citySchema>
export type Place = z.infer<typeof placeSchema>
export type Route = z.infer<typeof routeSchema>
export type VehicleClass = z.infer<typeof vehicleClassSchema>
export type Vehicle = z.infer<typeof vehicleSchema>
export type VehicleImage = z.infer<typeof vehicleImageSchema>
export type Service = z.infer<typeof serviceSchema>
export type ServiceCity = z.infer<typeof serviceCitySchema>
export type Faq = z.infer<typeof faqSchema>
