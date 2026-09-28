import { footerGroups, mainNav, type NavItem } from '@/config/site'
import { isPublished } from '@/lib/content/published'

/** Only links to published pages are ever rendered. */
export function publishedNav(): NavItem[] {
  return mainNav.filter((item) => isPublished(item.href))
}

export function publishedFooterGroups() {
  return footerGroups
    .map((group) => ({ ...group, links: group.links.filter((l) => isPublished(l.href)) }))
    .filter((group) => group.links.length > 0)
}

/** "Book" appears only once the booking funnel exists. */
export function bookingPath(): string | null {
  return isPublished('/book/') ? '/book/' : null
}
