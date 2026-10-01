import { RouteCard } from '@/components/cards/RouteCard'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { isPublished } from '@/lib/content/published'
import type { Route } from '@/lib/schemas/content'

/** Published routes as fleet-style cards with their milestone (DESIGN.md §6), optionally grouped. Hidden when empty. */
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
    <Section labelledBy={`${id}-title`} className="cv-auto">
      <SectionHeading
        id={`${id}-title`}
        eyebrow={eyebrow}
        title={title}
        action={isPublished('/cabs/') ? { href: '/cabs/', label: 'All routes' } : null}
      />
      {[...groups].map(([group, list]) => (
        <div key={group || 'all'} className="mt-6">
          {group && <h3 className="text-h3 font-semibold">{group}</h3>}
          <div
            role="region"
            aria-label={group || title}
            tabIndex={0}
            className="-mx-4 mt-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0"
          >
            <ul className="flex snap-x snap-mandatory gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {list.map((r) => (
                <li
                  key={r.slug}
                  className="w-[82%] max-w-80 shrink-0 snap-start sm:w-auto sm:max-w-none"
                >
                  <RouteCard route={r} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </Section>
  )
}
