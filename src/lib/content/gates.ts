import type {
  City,
  Destination,
  Guide,
  Post,
  Package,
  Route,
  Service,
  ServiceCity,
  Vehicle,
  VehicleClass,
} from '@/lib/schemas/content'

/**
 * Publish gates (REBUILD_PLAN §5). Each returns the reasons an entity can't be
 * published yet; an empty list means it may be published. `validate:data`
 * fails when a `published` entity has reasons, and reports why each draft is a draft.
 */

export const LONG_DISTANCE_KM = 600

export function wordCount(text: string | null): number {
  return text ? (text.trim().match(/\S+/g)?.length ?? 0) : 0
}

export function isLongDistance(route: Route): boolean {
  const km = route.distanceKm ?? route.legacy.distanceKm
  return km !== null && km > LONG_DISTANCE_KM
}

/**
 * Enquiry verticals sell specific vehicles, so they publish only once at least
 * one fitting vehicle is live (owner decision 2026-09-29, Phase 5 "A"). A live
 * vehicle is already fleet-confirmed (B3) with its own photo (F1).
 */
export const VERTICAL_VEHICLES: Record<string, (v: Vehicle) => boolean> = {
  'luxury-car-rental': (v) => v.tier === 'luxury' && v.category === 'car',
  'wedding-cars': (v) => v.tier === 'luxury' && v.category === 'car',
  'shoot-car-rental': (v) => v.tier === 'luxury' && v.category === 'car',
  'bus-rental': (v) => v.bodyType === 'bus',
  'self-drive-car-rental': (v) => v.selfDrive === true,
  'bike-rental': (v) => v.category === 'bike',
}

export interface GateContext {
  /** Live vehicles, for the enquiry verticals' gate. */
  liveVehicles: readonly Vehicle[]
  publishedClassCount: number
  publishedRoutesFrom: (origin: string) => number
  isServicePublished: (slug: string) => boolean
}

/**
 * Owner decision 2026-09-30: route pages publish with the old site's content,
 * fact-checked, before distances are verified — an unverified distance is
 * simply not shown and fares stay "Get a quote". Long-distance routes still
 * need the owner to confirm Taxiverz runs them (E3).
 */
export function routeGate(route: Route, ctx: GateContext): string[] {
  const reasons: string[] = []
  if (isLongDistance(route) && !route.ownerConfirmed)
    reasons.push('long-distance route not confirmed by the owner (E3)')
  if (wordCount(route.content.intro) < 80) reasons.push('intro under 80 words')
  if (wordCount(route.content.routeGuide) < 150) reasons.push('route guide under 150 words')
  if (route.stops.length < 3) reasons.push('fewer than 3 stops or sights')
  if (route.faqs.length < 4) reasons.push('fewer than 4 route-specific FAQs')
  if (ctx.publishedClassCount === 0) reasons.push('no published vehicle class to price or quote')
  return reasons
}

export function cityGate(city: City, ctx: GateContext): string[] {
  const reasons: string[] = []
  if (!city.isBranch && ctx.publishedRoutesFrom(city.slug) < 3)
    reasons.push('not a branch city and fewer than 3 published routes from it')
  if (!city.summary) reasons.push('no summary (meta description)')
  if (wordCount(city.intro) < 150) reasons.push('intro under 150 words')
  return reasons
}

/** Not in §5: a hub page needs real content too, so the same bar as a city hub plus FAQs. */
export function serviceGate(service: Service, ctx: Pick<GateContext, 'liveVehicles'>): string[] {
  const reasons: string[] = []
  const fits = VERTICAL_VEHICLES[service.slug]
  if (fits && !ctx.liveVehicles.some(fits))
    reasons.push('no live vehicle for this service yet (B3 fleet + F1 photos)')
  if (!service.summary) reasons.push('no summary (meta description)')
  if (wordCount(service.intro) < 150) reasons.push('intro under 150 words')
  if (service.faqs.length < 4) reasons.push('fewer than 4 FAQs')
  return reasons
}

/** Shoot types: the same bar as a service hub, and the hub must be live. */
export function subPageGate(
  sp: Service['subPages'][number],
  ctx: Pick<GateContext, 'isServicePublished'>,
  service: string,
): string[] {
  const reasons: string[] = []
  if (!ctx.isServicePublished(service)) reasons.push('its service hub is not published')
  if (!sp.summary) reasons.push('no summary (meta description)')
  if (wordCount(sp.intro) < 150) reasons.push('intro under 150 words')
  if (sp.faqs.length < 4) reasons.push('fewer than 4 FAQs')
  return reasons
}

export function serviceCityGate(sc: ServiceCity, ctx: GateContext): string[] {
  const reasons: string[] = []
  if (!ctx.isServicePublished(sc.service)) reasons.push('its service hub is not published')
  if (!sc.summary) reasons.push('no summary (meta description)')
  if (wordCount(sc.intro) < 200) reasons.push('under 200 words of local specifics')
  if (sc.faqs.length < 4) reasons.push('fewer than 4 FAQs')
  return reasons
}

/** A class can be offered once its name and models are set; missing rates show "on request". */
export function vehicleClassGate(vc: VehicleClass): string[] {
  return vc.representativeModels.length ? [] : ['no representative models']
}

/** A picture that may be shown for the vehicle: no caption baked in, the right model. */
export const isUsableImage = (i: Vehicle['images'][number]) => !i.bakedInText && !i.modelMismatch
/** Not the owner's own photo: shown with a "representative image" label (owner decision 2026-09-30). */
export const isRepresentative = (i: Vehicle['images'][number]) => i.source !== 'own'

/**
 * Owner decision 2026-09-30: vehicle pages publish with the old site's images
 * (labelled "representative image" until the owner's own photos arrive, F1)
 * and fact-checked copy. Unknown seats are hidden, not a blocker.
 */
export function vehicleGate(vehicle: Vehicle): string[] {
  const reasons: string[] = []
  if (!vehicle.images.some(isUsableImage)) reasons.push('no usable image (caption baked in or wrong model)')
  if (!vehicle.summary) reasons.push('no summary (meta description)')
  if (wordCount(vehicle.intro) < 100) reasons.push('description under 100 words')
  return reasons
}

const priced = (p: Package['price']) => p.amount !== null && p.verified

/** §5 package gate: complete itinerary, inclusions and exclusions, a verified price. */
export function packageGate(pkg: Package): string[] {
  const reasons: string[] = []
  if (!pkg.summary) reasons.push('no summary (meta description)')
  if (wordCount(pkg.intro) < 100) reasons.push('intro under 100 words')
  if (pkg.itinerary.length === 0) reasons.push('no itinerary')
  if (pkg.inclusions.length === 0 || pkg.exclusions.length === 0)
    reasons.push('inclusions and exclusions not both listed')
  if (!priced(pkg.price)) reasons.push('no verified price')
  return reasons
}

/** A from-{city} variant needs its own verified price (REBUILD_PLAN §2.1). */
export function packageVariantGate(variant: Package['variants'][number]): string[] {
  return priced(variant.price) ? [] : ['no verified price for this origin']
}

/**
 * Guides: a summary here; the ≥ 400-word body rule and "no regulatory claims
 * unless owner-verified" are checked on the MDX file by validate:data.
 */
export function guideGate(g: Guide): string[] {
  return g.summary ? [] : ['no summary (meta description)']
}

/** A destination overview needs its own text and at least one live guide. */
export function destinationGate(d: Destination, liveGuideCount: number): string[] {
  const reasons: string[] = []
  if (!d.summary) reasons.push('no summary (meta description)')
  if (wordCount(d.overview) < 80) reasons.push('overview under 80 words')
  if (liveGuideCount === 0) reasons.push('no published guide')
  return reasons
}

/** Blog posts go live only when the owner has approved them (§5). */
export function postGate(p: Post): string[] {
  const reasons: string[] = []
  if (!p.ownerApproved) reasons.push('not approved by the owner')
  if (!p.summary) reasons.push('no summary (meta description)')
  return reasons
}
