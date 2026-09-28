import { z } from 'zod'
import { cities as rawCities } from '@/data/cities'
import { places as rawPlaces } from '@/data/places'
import { routes as rawRoutes } from '@/data/routes'
import { serviceCities as rawServiceCities, services as rawServices } from '@/data/services'
import { vehicleClasses as rawVehicleClasses } from '@/data/vehicle-classes'
import { vehicles as rawVehicles } from '@/data/vehicles'
import {
  citySchema,
  placeSchema,
  routeSchema,
  serviceCitySchema,
  serviceSchema,
  vehicleClassSchema,
  vehicleSchema,
} from '@/lib/schemas/content'

/**
 * The single place data files are loaded. Everything is parsed with Zod once;
 * invalid data fails the build here, not in a page.
 */
export const cities = z.array(citySchema).parse(rawCities)
export const places = z.array(placeSchema).parse(rawPlaces)
export const routes = z.array(routeSchema).parse(rawRoutes)
export const vehicleClasses = z.array(vehicleClassSchema).parse(rawVehicleClasses)
export const vehicles = z.array(vehicleSchema).parse(rawVehicles)
export const services = z.array(serviceSchema).parse(rawServices)
export const serviceCities = z.array(serviceCitySchema).parse(rawServiceCities)
