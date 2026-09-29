import { ogContentType, ogImage, ogSize } from '@/lib/og'
import { getGuide } from '@/lib/content'
// Same pages as the route itself, so every image is generated at build.
export { generateStaticParams } from './page'

export const size = ogSize
export const contentType = ogContentType
export const alt = 'Travel guide'

/** Share image for this page type (lib/og.tsx), generated at build. */
export default async function Image({
  params,
}: {
  params: Promise<{ place: string; guide: string }>
}) {
  const { place, guide } = await params
  return ogImage({
    title: getGuide(place, guide)?.title ?? 'Travel guide',
    kicker: 'Taxiverz travel guide',
  })
}
