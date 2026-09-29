import type {
  City,
  Destination,
  Guide,
  Post,
  Package,
  Place,
  Route,
  Service,
  ServiceCity,
  Vehicle,
  VehicleClass,
} from '@/lib/schemas/content'
import {
  cities,
  destinations,
  guides,
  posts,
  packages,
  places,
  routes,
  serviceCities,
  services,
  vehicleClasses,
  vehicles,
} from './data'
import {
  cityGate,
  destinationGate,
  guideGate,
  postGate,
  packageGate,
  packageVariantGate,
  routeGate,
  serviceCityGate,
  serviceGate,
  subPageGate,
  vehicleClassGate,
  vehicleGate,
  VERTICAL_VEHICLES,
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
export const packagePath = (slug: string) => `/packages/${slug}/`
export const destinationPath = (place: string) => `/destinations/${place}/`
export const guidePath = (g: Pick<Guide, 'place' | 'guide'>) =>
  `/destinations/${g.place}/${g.guide}/`
export const postPath = (slug: string) => `/blog/${slug}/`
export const packageVariantPath = (slug: string, origin: string) =>
  `/packages/${slug}/from-${origin}/`

// ---------------------------------------------------------------- live sets (computed in dependency order)

const liveClasses = vehicleClasses.filter(
  (c) => c.status === 'published' && vehicleClassGate(c).length === 0,
)
const liveVehicles = vehicles.filter((v) => v.status === 'published' && vehicleGate(v).length === 0)
const liveServices = services.filter(
  (s) => s.status === 'published' && serviceGate(s, { liveVehicles }).length === 0,
)

const baseCtx = {
  liveVehicles,
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
const livePackages = packages.filter((p) => p.status === 'published' && packageGate(p).length === 0)

const liveGuides = guides.filter((g) => g.status === 'published' && guideGate(g).length === 0)
const liveDestinations = destinations.filter(
  (d) =>
    d.status === 'published' &&
    destinationGate(d, liveGuides.filter((g) => g.place === d.place).length).length === 0,
)
const livePosts = posts.filter((p) => p.status === 'published' && postGate(p).length === 0)

const liveSubPages = liveServices.flatMap((s) =>
  s.subPages
    .filter((sp) => sp.status === 'published' && subPageGate(sp, gateContext, s.slug).length === 0)
    .map((sp) => ({ service: s.slug, ...sp })),
)

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
export const getPackages = (): Package[] => livePackages
export const getDestinations = (): Destination[] => liveDestinations
export const getDestination = (place: string): Destination | undefined =>
  liveDestinations.find((d) => d.place === place)
export const getGuides = (place?: string): Guide[] =>
  liveGuides.filter((g) => !place || g.place === place)
export const getGuide = (place: string, guide: string): Guide | undefined =>
  liveGuides.find((g) => g.place === place && g.guide === guide)
export const getPosts = (): Post[] => livePosts.toSorted((a, b) => b.date.localeCompare(a.date))
export const getPost = (slug: string): Post | undefined => livePosts.find((p) => p.slug === slug)
export const getPackage = (slug: string): Package | undefined =>
  livePackages.find((p) => p.slug === slug)
/** Live `from-{city}` variants of a live package (each needs its own verified price). */
export const getPackageVariants = (pkg: Package) =>
  pkg.variants.filter((v) => packageVariantGate(v).length === 0)
export type LiveSubPage = (typeof liveSubPages)[number]
export const getSubPages = (service?: string): LiveSubPage[] =>
  liveSubPages.filter((sp) => !service || sp.service === service)
export const getSubPage = (service: string, slug: string): LiveSubPage | undefined =>
  liveSubPages.find((sp) => sp.service === service && sp.slug === slug)
/** Live vehicles that fit an enquiry vertical (empty for fare-widget services). */
export function getVehiclesFor(service: string): Vehicle[] {
  const fits = VERTICAL_VEHICLES[service]
  return fits ? liveVehicles.filter(fits) : []
}
export const getServiceCity = (service: string, city: string): ServiceCity | undefined =>
  liveServiceCities.find((sc) => sc.service === service && sc.city === city)
export const getServiceCitiesFor = (service: string): ServiceCity[] =>
  liveServiceCities.filter((sc) => sc.service === service)
export const getServiceCitiesIn = (city: string): ServiceCity[] =>
  liveServiceCities.filter((sc) => sc.city === city)

/** Airports, stations and border points that belong to a city (for its hub page). */
export const getPlacesIn = (city: string): Place[] => places.filter((p) => p.citySlug === city)

/** Pages the /cabs/ directory lists; it publishes only with at least three (no thin hub). */
const DIRECTORY_MIN = 3
const directoryEntries = () => liveCities.length + liveRoutes.length

// ---------------------------------------------------------------- publishing

/** Every page path that exists because of data (hubs appear once they have something to list). */
export function contentPaths(): string[] {
  const paths = [
    ...liveServices.map((s) => servicePath(s.slug)),
    ...liveServiceCities.map(serviceCityPath),
    ...liveSubPages.map((sp) => `/${sp.service}/${sp.slug}/`),
    ...liveCities.map((c) => cityPath(c.slug)),
    ...liveRoutes.map(routePath),
    ...liveVehicles.map((v) => vehiclePath(v.slug)),
  ]
  if (directoryEntries() >= DIRECTORY_MIN) paths.push('/cabs/')
  for (const p of livePackages) {
    paths.push(packagePath(p.slug))
    for (const v of getPackageVariants(p)) paths.push(packageVariantPath(p.slug, v.origin))
  }
  if (livePackages.length) paths.push('/packages/')
  // A guide's page exists once the guide is live; its overview needs its own text too.
  paths.push(...liveGuides.map(guidePath), ...liveDestinations.map((d) => destinationPath(d.place)))
  if (liveDestinations.length) paths.push('/destinations/')
  paths.push(...livePosts.map((p) => postPath(p.slug)))
  if (livePosts.length) paths.push('/blog/')
  // The fleet hub lists vehicle classes, so it is live as soon as one class is.
  if (liveClasses.length) paths.push('/fleet/')
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
    report(
      'services',
      services,
      liveServices,
      (s) => s.slug,
      (s) => serviceGate(s, { liveVehicles }),
    ),
    report(
      'shoot types',
      services.flatMap((s) => s.subPages.map((sp) => ({ service: s.slug, ...sp }))),
      liveSubPages,
      (sp) => `${sp.service}/${sp.slug}`,
      (sp) => subPageGate(sp, gateContext, sp.service),
    ),
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
    report('packages', packages, livePackages, (p) => p.slug, packageGate),
    report('destination guides', guides, liveGuides, guidePath, guideGate),
    report(
      'destinations',
      destinations,
      liveDestinations,
      (d) => d.place,
      (d) => destinationGate(d, liveGuides.filter((g) => g.place === d.place).length),
    ),
    report('blog posts', posts, livePosts, (p) => p.slug, postGate),
  ]
}

export {
  cities as allCities,
  guides as allGuides,
  posts as allPosts,
  packages as allPackages,
  routes as allRoutes,
  services as allServices,
  serviceCities as allServiceCities,
  vehicleClasses as allVehicleClasses,
  vehicles as allVehicles,
}
