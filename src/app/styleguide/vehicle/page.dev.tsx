import type { Metadata } from 'next'
import { VehiclePage } from '@/components/templates/VehiclePage'
import { allVehicleClasses, allVehicles } from '@/lib/content'
import type { Vehicle } from '@/lib/schemas/content'

/**
 * Dev-only preview of the vehicle template with SAMPLE data: the photo is a
 * legacy image marked "own" only here, and every price is a layout fixture.
 * Real vehicle pages need B3 (fleet confirmed) and F1 (own photos).
 */
export const metadata: Metadata = {
  title: { absolute: 'Vehicle template preview | Taxiverz' },
  robots: { index: false, follow: false },
}

export default async function VehicleTemplatePreview({
  searchParams,
}: {
  searchParams: Promise<{ v?: string }>
}) {
  const slug = (await searchParams).v ?? 'innova-crysta'
  const base = allVehicles.find((v) => v.slug === slug) ?? allVehicles[0]!
  const fixture: Vehicle = {
    ...base,
    seats: base.seats ?? 7,
    useCase: 'Sample use case for layout review.',
    images: base.images.map((i) => ({
      ...i,
      source: 'own',
      bakedInText: false,
      modelMismatch: false,
    })),
    rates: base.rates && {
      ...base.rates,
      wedding: { hours: 4, price: 12345, extraHour: 999 },
      outstationPerKm: 99,
      extraHour: 999,
    },
  }
  const vehicleClass = allVehicleClasses.find((c) => c.slug === fixture.classSlug) ?? null
  return <VehiclePage vehicle={fixture} vehicleClass={vehicleClass} />
}
