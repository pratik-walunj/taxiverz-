import { ogContentType, ogImage, ogSize } from '@/lib/og'
import { getCity } from '@/lib/content'
// Same pages as the route itself, so every image is generated at build.
export { generateStaticParams } from './page'

export const size = ogSize
export const contentType = ogContentType
export const alt = 'Travel guide'

/** Share image for this page type (lib/og.tsx), generated at build. */
export default async function Image({ params }: { params: Promise<{ place: string }> }) {
  const name = getCity((await params).place)?.name ?? 'Travel'
  return ogImage({ title: `${name} travel guide`, kicker: 'Taxiverz travel guides' })
}
