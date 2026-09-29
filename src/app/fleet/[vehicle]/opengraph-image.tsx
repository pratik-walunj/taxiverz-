import { ogContentType, ogImage, ogSize } from '@/lib/og'
import { getVehicle } from '@/lib/content'
// Same pages as the route itself, so every image is generated at build.
export { generateStaticParams } from './page'

export const size = ogSize
export const contentType = ogContentType
export const alt = 'Vehicle on rent'

/** Share image for this page type (lib/og.tsx), generated at build. */
export default async function Image({ params }: { params: Promise<{ vehicle: string }> }) {
  const v = getVehicle((await params).vehicle)
  return ogImage({ title: `${v?.name ?? 'Car'} on rent`, kicker: 'Taxiverz fleet' })
}
