import { ogContentType, ogImage, ogSize } from '@/lib/og'
import { getCity, getRoute } from '@/lib/content'
// Same pages as the route itself, so every image is generated at build.
export { generateStaticParams } from './page'

export const size = ogSize
export const contentType = ogContentType
export const alt = 'Route taxi'

/** Share image for this page type (lib/og.tsx), generated at build. */
export default async function Image({
  params,
}: {
  params: Promise<{ city: string; route: string }>
}) {
  const { city, route } = await params
  const r = getRoute(city, route)
  const title = r
    ? `${getCity(r.origin)?.name} to ${getCity(r.destination)?.name} taxi`
    : 'Taxiverz'
  return ogImage({
    title,
    kicker: 'One way & round trip',
    km: r?.verified.distance ? r.distanceKm : null,
  })
}
