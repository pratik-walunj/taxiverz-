import Link from 'next/link'
import { Milestone } from '@/components/ui/Milestone'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getCity, routePath } from '@/lib/content'
import { isPublished } from '@/lib/content/published'
import type { Route } from '@/lib/schemas/content'

/** Published routes as milestone cards (DESIGN.md §6), optionally grouped. Hidden when empty. */
export function RouteList({
  title,
  routes,
  groupBy,
  id = 'routes',
  eyebrow = 'Routes',
}: {
  title: string
  routes: readonly Route[]
  groupBy?: (r: Route) => string
  id?: string
  eyebrow?: string
}) {
  if (routes.length === 0) return null
  const groups = new Map<string, Route[]>()
  for (const r of routes) {
    const key = groupBy ? groupBy(r) : ''
    groups.set(key, [...(groups.get(key) ?? []), r])
  }
  return (
    <Section labelledBy={`${id}-title`}>
      <SectionHeading
        id={`${id}-title`}
        eyebrow={eyebrow}
        title={title}
        action={isPublished('/cabs/') ? { href: '/cabs/', label: 'All routes' } : null}
      />
      {[...groups].map(([group, list]) => (
        <div key={group || 'all'} className="mt-6">
          {group && <h3 className="text-h3 font-semibold">{group}</h3>}
          <ul className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {list.map((r) => {
              const to = getCity(r.destination)
              const from = getCity(r.origin)
              return (
                <li key={r.slug}>
                  <Link
                    href={routePath(r)}
                    className="rounded-panel group hover:bg-mist flex flex-col items-center gap-2 p-3 text-center transition hover:-translate-y-1"
                  >
                    <Milestone
                      nameEn={to?.name ?? r.destination}
                      nameHi={to?.nameHi ?? null}
                      km={r.distanceKm}
                    />
                    <span className="group-hover:text-brand-deep font-semibold">
                      {from?.name} to {to?.name}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </Section>
  )
}
