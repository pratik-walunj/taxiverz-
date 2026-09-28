import type { Metadata } from 'next'
import { site } from '@/config/site'

export const TITLE_MAX = 60
export const DESCRIPTION_MAX = 155

/**
 * Joins title segments with " | ", dropping segments from the end (keeping
 * the brand last) until the result fits in TITLE_MAX characters.
 */
export function buildTitle(segments: readonly string[], brand: string = site.name): string {
  const parts = segments.filter(Boolean)
  while (parts.length > 1 && [...parts, brand].join(' | ').length > TITLE_MAX) parts.pop()
  const title = [...parts, brand].join(' | ')
  if (title.length > TITLE_MAX) throw new Error(`Title too long (${title.length}): ${title}`)
  return title
}

/** Absolute canonical URL for a site path; paths always end in "/". */
export function absoluteUrl(path: string): string {
  if (!path.startsWith('/')) throw new Error(`Path must start with "/": ${path}`)
  const withSlash = path.endsWith('/') ? path : `${path}/`
  return new URL(withSlash, site.url).toString()
}

export interface PageMeta {
  /** Full title, already built with buildTitle. */
  title: string
  description: string
  path: string
  image?: string
  noindex?: boolean
}

export function buildMetadata({ title, description, path, image, noindex }: PageMeta): Metadata {
  if (title.length > TITLE_MAX) throw new Error(`Title over ${TITLE_MAX} characters: ${title}`)
  if (description.length > DESCRIPTION_MAX)
    throw new Error(
      `Description over ${DESCRIPTION_MAX} characters (${description.length}): ${description}`,
    )
  const url = absoluteUrl(path)
  const ogImage = image ?? site.defaultOgImage
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      siteName: site.name,
      url,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
  }
}
