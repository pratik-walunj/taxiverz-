import { ogContentType, ogImage, ogSize } from '@/lib/og'
import { getCity, getService, getSubPage } from '@/lib/content'
import { inSentence } from '@/lib/sentence'
// Same pages as the route itself, so every image is generated at build.
export { generateStaticParams } from './page'

export const size = ogSize
export const contentType = ogContentType
export const alt = 'Taxiverz service'

/** Share image for this page type (lib/og.tsx), generated at build. */
export default async function Image({
  params,
}: {
  params: Promise<{ service: string; city: string }>
}) {
  const { service, city } = await params
  const s = getService(service)
  const sub = getSubPage(service, city)
  const title = sub
    ? `Cars for ${inSentence(sub.name)}`
    : `${s?.name ?? 'Taxiverz'} in ${getCity(city)?.name ?? city}`
  return ogImage({ title, kicker: 'Taxiverz' })
}
