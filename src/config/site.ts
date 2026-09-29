export const site = {
  name: 'Taxiverz',
  url: 'https://taxiverz.com',
  locale: 'en-IN',
  defaultOgImage: '/images/brand/og-default.jpg',
} as const

export interface NavItem {
  label: string
  href: string
}

/**
 * Main navigation in display order. Items render only when their page is
 * published (see lib/content/published.ts), so no link is ever dead.
 */
export const mainNav: readonly NavItem[] = [
  { label: 'Cabs', href: '/cabs/' },
  { label: 'Nepal', href: '/nepal-taxi/' },
  { label: 'Luxury & wedding', href: '/luxury-car-rental/' },
  { label: 'Fleet', href: '/fleet/' },
  { label: 'Packages', href: '/packages/' },
  { label: 'Corporate', href: '/corporate-car-rental/' },
  { label: 'Contact', href: '/contact/' },
]

/**
 * Static footer groups (company, partners); same publish rule. The Services,
 * Routes and Travel guides groups are generated from data in lib/nav.ts.
 * At most ~60 links in total (CLAUDE.md).
 */
export const footerGroups: readonly { title: string; links: readonly NavItem[] }[] = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about/' },
      { label: 'Contact', href: '/contact/' },
      { label: 'FAQ', href: '/faq/' },
      { label: 'Terms', href: '/terms/' },
      { label: 'Privacy', href: '/privacy/' },
      { label: 'Refund policy', href: '/refund-policy/' },
      { label: 'Reviews', href: '/reviews/' },
    ],
  },
  {
    title: 'Partners',
    links: [
      { label: 'Attach your taxi', href: '/attach-your-taxi/' },
      { label: 'Drive with us', href: '/drive-with-us/' },
    ],
  },
]
