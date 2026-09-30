import Link from 'next/link'
import { ArrowRight, FileText, MapPinned } from 'lucide-react'
import { scenes } from '@/config/imagery'
import { PhotoBand } from '@/components/ui/PhotoBand'
import { NEPAL_DOCUMENTS } from '@/data/copy/verticals'
import { getServiceCitiesFor, getCity, serviceCityPath, servicePath } from '@/lib/content'
import { isPublished } from '@/lib/content/published'

/**
 * The India–Nepal band over a photo of the hills near Pokhara (REBUILD_PLAN §4
 * home, DESIGN.md). Only verified or owner-given facts: the two crossings as
 * places, the origins with live pages, and the owner's own document sentence.
 * The border block (steps, Bhansar, charges) is added once D1–D3 are answered.
 */
export function NepalBand({ showHubLink = true }: { showHubLink?: boolean }) {
  if (!isPublished(servicePath('nepal-taxi'))) return null
  const origins = getServiceCitiesFor('nepal-taxi')
  return (
    <PhotoBand scene={scenes.nepalValley} labelledBy="nepal-band-title">
      <div className="max-w-2xl">
        <p className="text-champagne inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase">
          <span aria-hidden="true" className="bg-champagne h-0.5 w-6" />
          India to Nepal
        </p>
        <h2 id="nepal-band-title" className="text-h1 mt-3 font-extrabold tracking-tight">
          Into Nepal by road, from Gorakhpur and Raxaul
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          <li className="bg-night/50 rounded-panel ring-ivory/15 p-4 ring-1 backdrop-blur-sm">
            <MapPinned aria-hidden="true" className="text-champagne size-6" />
            <p className="mt-2">
              Two crossings serve this side: Sonauli–Bhairahawa, near Lumbini, and Raxaul–Birgunj,
              on the way to Kathmandu. We confirm the crossing and how your journey is arranged when
              you book.
            </p>
          </li>
          <li className="bg-night/50 rounded-panel ring-ivory/15 p-4 ring-1 backdrop-blur-sm">
            <FileText aria-hidden="true" className="text-champagne size-6" />
            <p className="mt-2">{NEPAL_DOCUMENTS}</p>
          </li>
        </ul>
        <ul className="mt-8 flex flex-wrap gap-3">
          {origins.map((sc) => (
            <li key={sc.city}>
              <Link
                href={serviceCityPath(sc)}
                className="bg-ivory text-night hover:bg-champagne rounded-control inline-flex min-h-12 items-center px-5 font-semibold transition-colors"
              >
                Nepal taxi from {getCity(sc.city)?.name ?? sc.city}
              </Link>
            </li>
          ))}
          {showHubLink && (
            <li>
              <Link
                href={servicePath('nepal-taxi')}
                className="text-champagne group inline-flex min-h-12 items-center gap-2 px-2 font-semibold"
              >
                All about travelling to Nepal
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </li>
          )}
        </ul>
      </div>
    </PhotoBand>
  )
}
