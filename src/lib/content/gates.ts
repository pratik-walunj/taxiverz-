import type {
  City,
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

export interface GateContext {
  publishedClassCount: number
  publishedRoutesFrom: (origin: string) => number
  isServicePublished: (slug: string) => boolean
}

export function routeGate(route: Route, ctx: GateContext): string[] {
  const reasons: string[] = []
  if (route.distanceKm === null || !route.verified.distance)
    reasons.push('distance not verified (needs a reviewed row in docs/route-distances.csv)')
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
export function serviceGate(service: Service): string[] {
  const reasons: string[] = []
  if (!service.summary) reasons.push('no summary (meta description)')
  if (wordCount(service.intro) < 150) reasons.push('intro under 150 words')
  if (service.faqs.length < 4) reasons.push('fewer than 4 FAQs')
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

export function vehicleGate(vehicle: Vehicle): string[] {
  const reasons: string[] = []
  if (!vehicle.ownerConfirmed) reasons.push('not confirmed as part of the fleet (B3)')
  const usable = vehicle.images.filter(
    (i) => i.source === 'own' && !i.bakedInText && !i.modelMismatch,
  )
  if (usable.length === 0) reasons.push('no owner-confirmed photo of the vehicle (F1)')
  if (vehicle.category !== 'bike' && vehicle.seats === null) reasons.push('seat count unknown')
  return reasons
}
