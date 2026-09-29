import { ogContentType, ogImage, ogSize } from '@/lib/og'
import { getCity } from '@/lib/content'
// Same pages as the route itself, so every image is generated at build.
export { generateStaticParams } from './page'

export const size = ogSize
export const contentType = ogContentType
export const alt = 'Taxi service'

/** Share image for this page type (lib/og.tsx), generated at build. */
export default async function Image({ params }: { params: Promise<{ city: string }> }) {
  const c = getCity((await params).city)
  return ogImage({ title: `Taxi service in ${c?.name ?? 'Gorakhpur'}`, kicker: 'Taxiverz' })
}
