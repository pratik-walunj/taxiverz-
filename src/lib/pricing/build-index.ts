import { pricing } from '@/config/pricing'
import { allRoutes, getPlaces, getVehicleClasses } from '@/lib/content'
import type { FareIndex } from './fare-index'

/** Server only: assembles the fare index from content. Only verified distances are included. */
export function buildFareIndex(): FareIndex {
  return {
    places: getPlaces().map((p) => ({
      id: p.id,
      name: p.name,
      nameHi: p.nameHi,
      aliases: p.aliases,
      type: p.type,
      code: p.code,
      city: p.citySlug,
      country: p.country,
    })),
    routes: allRoutes
      .filter((r) => r.distanceKm !== null && r.verified.distance)
      .map((r) => ({
        origin: r.origin,
        destination: r.destination,
        distanceKm: r.distanceKm!,
        tolls: r.tolls,
        permitCharges: r.isInternational ? r.permitCharges : 0,
        borderCharges: r.isInternational ? r.borderCharges : 0,
        isInternational: r.isInternational,
      })),
    classes: getVehicleClasses().map((c) => ({
      slug: c.slug,
      name: c.name,
      representativeModels: c.representativeModels,
      seats: c.seats,
      luggage: c.luggage,
      tollClass: c.tollClass,
      rates: c.rates,
      sortOrder: c.sortOrder,
    })),
    config: pricing,
  }
}
