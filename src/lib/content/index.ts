import type {
  City,
  Place,
  Route,
  Service,
  ServiceCity,
  Vehicle,
  VehicleClass,
} from '@/lib/schemas/content'
import { cities, places, routes, serviceCities, services, vehicleClasses, vehicles } from './data'
import {
  cityGate,
  routeGate,
  serviceCityGate,
  serviceGate,
  vehicleClassGate,
  vehicleGate,
  type GateContext,
} from './gates'

/**
 * The only way pages and components read content (CLAUDE.md). "Live" means
 * status `published` AND the §5 gate passes; drafts never get pages or links.
 */

// ---------------------------------------------------------------- paths

export const routePath = (r: Pick<Route, 'origin' | 'slug'>) => `/cabs/${r.origin}/${r.slug}/`
export const cityPath = (slug: string) => `/cabs/${slug}/`
export const servicePath = (slug: string) => `/${slug}/`
export const serviceCityPath = (sc: Pick<ServiceCity, 'service' | 'city'>) =>
  `/${sc.service}/${sc.city}/`
export const vehiclePath = (slug: string) => `/fleet/${slug}/`

// ---------------------------------------------------------------- live sets (computed in dependency order)

const liveClasses = vehicleClasses.filter(
  (c) => c.status === 'published' && vehicleClassGate(c).length === 0,
)
const liveServices = services.filter((s) => s.status === 'published' && serviceGate(s).length === 0)

const baseCtx = {
  publishedClassCount: liveClasses.length,
  isServicePublished: (slug: string) => liveServices.some((s) => s.slug === slug),
}
const liveRoutes = routes.filter(
  (r) =>
    r.status === 'published' &&
    routeGate(r, { ...baseCtx, publishedRoutesFrom: () => 0 }).length === 0,
)
export const gateContext: GateContext = {
  ...baseCtx,
  publishedRoutesFrom: (origin) => liveRoutes.filter((r) => r.origin === origin).length,
}
const liveCities = cities.filter(
  (c) => c.status === 'published' && cityGate(c, gateContext).length === 0,
)
const liveServiceCities = serviceCities.filter(
  (sc) => sc.status === 'published' && serviceCityGate(sc, gateContext).length === 0,
)
const liveVehicles = vehicles.filter((v) => v.status === 'published' && vehicleGate(v).length === 0)

// ---------------------------------------------------------------- accessors (live only unless stated)

export const getCities = (): City[] => liveCities
export const getCity = (slug: string): City | undefined => cities.find((c) => c.slug === slug)

/** Autocomplete dataset: every known city (live or not — people travel to draft destinations too) plus airports, stations and border points. */
export function getPlaces(): Place[] {
  const cityPlaces: Place[] = cities.map((c) => ({
    id: c.slug,
    name: c.name,
    nameHi: c.nameHi,
    aliases: c.aliases,
    type: 'city',
    code: null,
    citySlug: c.slug,
    country: c.country,
    geo: c.geo,
  }))
  return [...cityPlaces, ...places]
}

export const getRoutes = (): Route[] => liveRoutes
export const getRoutesFrom = (origin: string): Route[] =>
  liveRoutes.filter((r) => r.origin === origin)
export const getRoute = (origin: string, slug: string): Route | undefined =>
  liveRoutes.find((r) => r.origin === origin && r.slug === slug)

export const getVehicleClasses = (): VehicleClass[] => liveClasses
export const getVehicleClass = (slug: string): VehicleClass | undefined =>
  liveClasses.find((c) => c.slug === slug)

export const getVehicles = (): Vehicle[] => liveVehicles
export const getVehicle = (slug: string): Vehicle | undefined =>
  liveVehicles.find((v) => v.slug === slug)

export const getServices = (): Service[] => liveServices
export const getService = (slug: string): Service | undefined =>
  liveServices.find((s) => s.slug === slug)
export const getServiceCities = (): ServiceCity[] => liveServiceCities

// ---------------------------------------------------------------- publishing

/** Every page path that exists because of data (hubs appear once they have something to list). */
export function contentPaths(): string[] {
  const paths = [
    ...liveServices.map((s) => servicePath(s.slug)),
    ...liveServiceCities.map(serviceCityPath),
    ...liveCities.map((c) => cityPath(c.slug)),
    ...liveRoutes.map(routePath),
    ...liveVehicles.map((v) => vehiclePath(v.slug)),
  ]
  if (liveCities.length) paths.push('/cabs/')
  if (liveVehicles.length) paths.push('/fleet/')
  return paths
}

// ---------------------------------------------------------------- reporting (validate:data)

export interface EntityReport {
  entity: string
  total: number
  published: number
  drafts: { id: string; reasons: string[] }[]
}

export function contentReport(): EntityReport[] {
  const report = <T>(
    entity: string,
    all: T[],
    live: T[],
    id: (x: T) => string,
    gate: (x: T) => string[],
  ) => ({
    entity,
    total: all.length,
    published: live.length,
    drafts: all
      .filter((x) => !live.includes(x))
      .map((x) => {
        const reasons = gate(x)
        return {
          id: id(x),
          reasons: reasons.length ? reasons : ['status is draft (passes its gate)'],
        }
      }),
  })
  return [
    report('vehicle classes', vehicleClasses, liveClasses, (c) => c.slug, vehicleClassGate),
    report('services', services, liveServices, (s) => s.slug, serviceGate),
    report('service × city', serviceCities, liveServiceCities, serviceCityPath, (sc) =>
      serviceCityGate(sc, gateContext),
    ),
    report(
      'cities',
      cities,
      liveCities,
      (c) => c.slug,
      (c) => cityGate(c, gateContext),
    ),
    report(
      'routes',
      routes,
      liveRoutes,
      (r) => r.slug,
      (r) => routeGate(r, gateContext),
    ),
    report('vehicles', vehicles, liveVehicles, (v) => v.slug, vehicleGate),
  ]
}

export {
  cities as allCities,
  routes as allRoutes,
  services as allServices,
  serviceCities as allServiceCities,
  vehicleClasses as allVehicleClasses,
  vehicles as allVehicles,
}
