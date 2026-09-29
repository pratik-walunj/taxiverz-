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

/** Footer link groups; same publish rule. At most ~60 links in total. */
export const footerGroups: readonly { title: string; links: readonly NavItem[] }[] = [
  {
    title: 'Services',
    links: [
      { label: 'Outstation cabs', href: '/outstation-cabs/' },
      { label: 'One-way cabs', href: '/one-way-cabs/' },
      { label: 'Airport taxi', href: '/airport-taxi/' },
      { label: 'Car rental with driver', href: '/local-car-rental/' },
      { label: 'India–Nepal taxi', href: '/nepal-taxi/' },
      { label: 'Wedding cars', href: '/wedding-cars/' },
      { label: 'Tempo traveller', href: '/tempo-traveller/' },
      { label: 'Corporate travel', href: '/corporate-car-rental/' },
    ],
  },
  {
    title: 'Travel guides',
    links: [
      { label: 'Gorakhpur', href: '/destinations/gorakhpur/' },
      { label: 'Kushinagar', href: '/destinations/kushinagar/' },
      { label: 'Ayodhya', href: '/destinations/ayodhya/' },
      { label: 'Varanasi', href: '/destinations/varanasi/' },
      { label: 'Lumbini', href: '/destinations/lumbini/' },
    ],
  },
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
