import { footerGroups, mainNav, type NavItem } from '@/config/site'
import {
  destinationPath,
  getCity,
  getDestinations,
  getRoutes,
  getServices,
  routePath,
  servicePath,
} from '@/lib/content'
import { isPublished } from '@/lib/content/published'

/** Only links to published pages are ever rendered. */
export function publishedNav(): NavItem[] {
  return mainNav.filter((item) => isPublished(item.href))
}

/** Footer cap (CLAUDE.md: curated lists, about 60 links at most). */
export const FOOTER_LINK_LIMIT = 60
const ROUTE_LINKS = 10

/**
 * Footer groups: services, top routes and travel guides from data (published
 * only), then the static company and partner lists. Trimmed to the cap.
 */
export function publishedFooterGroups(): { title: string; links: NavItem[] }[] {
  const routes = getRoutes()
    .toSorted((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, ROUTE_LINKS)
  const fromData = [
    {
      title: 'Services',
      links: getServices().map((s) => ({ label: s.name, href: servicePath(s.slug) })),
    },
    {
      title: 'Popular routes',
      links: routes.map((r) => ({
        label: `${getCity(r.origin)?.name} to ${getCity(r.destination)?.name}`,
        href: routePath(r),
      })),
    },
    {
      title: 'Travel guides',
      links: getDestinations().map((d) => ({
        label: getCity(d.place)?.name ?? d.place,
        href: destinationPath(d.place),
      })),
    },
  ]
  const statics = footerGroups.map((g) => ({
    title: g.title,
    links: g.links.filter((l) => isPublished(l.href)),
  }))
  let budget = FOOTER_LINK_LIMIT
  return [...fromData, ...statics]
    .map((g) => {
      const links = g.links.slice(0, Math.max(0, budget))
      budget -= links.length
      return { ...g, links }
    })
    .filter((g) => g.links.length > 0)
}

/** "Book" appears only once the booking funnel exists. */
export function bookingPath(): string | null {
  return isPublished('/book/') ? '/book/' : null
}
