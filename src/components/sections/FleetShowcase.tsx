import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { VehicleCard } from '@/components/cards/VehicleCard'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getVehicles } from '@/lib/content'
import type { Vehicle } from '@/lib/schemas/content'

/** Cards per row on the home page; the fleet page lists every model (keeps the page light: INP). */
const PER_ROW = 6

/** Up to n vehicles, one make at a time, so a row shows a spread of makes. */
function varied(list: readonly Vehicle[], n: number): Vehicle[] {
  const byMake = new Map<string, Vehicle[]>()
  for (const v of list) byMake.set(v.make, [...(byMake.get(v.make) ?? []), v])
  const queues = [...byMake.values()]
  const out: Vehicle[] = []
  for (let i = 0; out.length < n && queues.some((q) => q.length > i); i++)
    for (const q of queues) if (q[i] && out.length < n) out.push(q[i]!)
  return out
}

/**
 * The model-by-model fleet the legacy home page showed (everyday cars, the
 * luxury collections by make, tempo travellers and buses), as scrollable rows
 * of live vehicles. Server-rendered; no script.
 */
const GROUPS: { title: string; fits: (v: Vehicle) => boolean }[] = [
  { title: 'Everyday cars', fits: (v) => v.category === 'car' && v.tier !== 'luxury' },
  { title: 'Luxury and vintage cars', fits: (v) => v.category === 'car' && v.tier === 'luxury' },
  { title: 'Tempo travellers, vans and buses', fits: (v) => v.category === 'group' },
]

export function FleetShowcase() {
  const live = getVehicles()
  const groups = GROUPS.map((g) => ({
    ...g,
    vehicles: live
      .filter(g.fits)
      .toSorted((a, b) => a.make.localeCompare(b.make) || a.name.localeCompare(b.name)),
  })).filter((g) => g.vehicles.length > 0)
  if (groups.length === 0) return null
  const total = groups.reduce((n, g) => n + g.vehicles.length, 0)
  return (
    <Section labelledBy="showcase-title" className="cv-auto">
      <SectionHeading
        id="showcase-title"
        eyebrow="Our fleet"
        title="Popular cars, vans and buses"
        intro={`A few from each group — all ${total} models are on the fleet page. Open one for its details and how to book it.`}
        action={{ label: 'Whole fleet', href: '/fleet/' }}
      />
      {groups.map((g) => (
        <div key={g.title} className="mt-10">
          <h3 className="font-heading text-xl font-bold">
            {g.title}{' '}
            <span className="text-muted text-base font-normal">({g.vehicles.length})</span>
          </h3>
          <ul
            className="-mx-4 mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:px-0"
            aria-label={g.title}
          >
            {varied(g.vehicles, PER_ROW).map((v) => (
              <li key={v.slug} className="w-[82%] max-w-80 shrink-0 snap-start sm:w-80">
                <VehicleCard vehicle={v} describe={false} />
              </li>
            ))}
            {g.vehicles.length > PER_ROW && (
              <li className="w-[60%] max-w-60 shrink-0 snap-start">
                <Link
                  href="/fleet/#vehicles-title"
                  className="rounded-panel border-line hover:border-brand bg-mist group flex h-full min-h-60 flex-col items-center justify-center gap-3 border-2 border-dashed p-6 text-center transition-colors"
                >
                  <span className="font-heading text-3xl font-extrabold">{g.vehicles.length}</span>
                  <span className="font-semibold">See all {g.title.toLowerCase()}</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="text-brand-deep size-6 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </li>
            )}
          </ul>
        </div>
      ))}
    </Section>
  )
}
