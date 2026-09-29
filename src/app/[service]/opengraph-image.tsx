import { ogContentType, ogImage, ogSize } from '@/lib/og'
import { getService } from '@/lib/content'
// Same pages as the route itself, so every image is generated at build.
export { generateStaticParams } from './page'

export const size = ogSize
export const contentType = ogContentType
export const alt = 'Taxiverz service'

/** Share image for this page type (lib/og.tsx), generated at build. */
export default async function Image({ params }: { params: Promise<{ service: string }> }) {
  const s = getService((await params).service)
  return ogImage({ title: s?.name ?? 'Taxiverz', kicker: 'Taxiverz · Gorakhpur' })
}
