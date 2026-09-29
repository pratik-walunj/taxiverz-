import { notFound } from 'next/navigation'
import { VehiclePage } from '@/components/templates/VehiclePage'
import { getVehicle, getVehicleClass, getVehicles, vehiclePath } from '@/lib/content'
import { buildMetadata, buildTitle } from '@/lib/seo/metadata'

/** Vehicle pages — only vehicles confirmed in the fleet with their own photos (§5 gate). */
export const dynamicParams = false

export function generateStaticParams() {
  return getVehicles().map((v) => ({ vehicle: v.slug }))
}

type Params = Promise<{ vehicle: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const v = getVehicle((await params).vehicle)
  if (!v) return {}
  return buildMetadata({
    image: null,
    title: buildTitle([`${v.name} on Rent in Gorakhpur`]),
    description: `Book the ${v.name}${v.seats ? ` (${v.seats} seats)` : ''} with Taxiverz: prices, specs and photos. Enquire on WhatsApp or call to book.`,
    path: vehiclePath(v.slug),
  })
}

export default async function VehicleRoutePage({ params }: { params: Params }) {
  const v = getVehicle((await params).vehicle)
  if (!v) notFound()
  return (
    <VehiclePage
      vehicle={v}
      vehicleClass={v.classSlug ? (getVehicleClass(v.classSlug) ?? null) : null}
    />
  )
}
