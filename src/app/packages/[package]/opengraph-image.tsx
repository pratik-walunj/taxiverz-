import { ogContentType, ogImage, ogSize } from '@/lib/og'
import { getPackage } from '@/lib/content'
// Same pages as the route itself, so every image is generated at build.
export { generateStaticParams } from './page'

export const size = ogSize
export const contentType = ogContentType
export const alt = 'Tour package'

/** Share image for this page type (lib/og.tsx), generated at build. */
export default async function Image({ params }: { params: Promise<{ package: string }> }) {
  const p = getPackage((await params).package)
  return ogImage({ title: p?.name ?? 'Tour package', kicker: 'Taxiverz package' })
}
