import { z } from 'zod'
import { cities as rawCities } from '@/data/cities'
import { destinations as rawDestinations, guides as rawGuides } from '@/data/destinations'
import { posts as rawPosts } from '@/data/blog'
import { packages as rawPackages } from '@/data/packages'
import { places as rawPlaces } from '@/data/places'
import { routes as rawRoutes } from '@/data/routes'
import { serviceCities as rawServiceCities, services as rawServices } from '@/data/services'
import { vehicleClasses as rawVehicleClasses } from '@/data/vehicle-classes'
import { vehicles as rawVehicles } from '@/data/vehicles'
import {
  citySchema,
  destinationSchema,
  guideSchema,
  postSchema,
  packageSchema,
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
export const packages = z.array(packageSchema).parse(rawPackages)
export const destinations = z.array(destinationSchema).parse(rawDestinations)
export const guides = z.array(guideSchema).parse(rawGuides)
export const posts = z.array(postSchema).parse(rawPosts)
