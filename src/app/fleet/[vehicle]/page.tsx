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
    // Drops "in Gorakhpur" when a long model name would push the title past 60 characters.
    title: buildTitle([`${v.name} on Rent`, 'Gorakhpur']),
    // Each vehicle's own summary (data/copy/vehicles-*.ts); the gate requires one.
    description: v.summary ?? `The ${v.name} with Taxiverz, Gorakhpur.`,
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
