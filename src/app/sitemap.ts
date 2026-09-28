import type { MetadataRoute } from 'next'
import { getPublishedPaths } from '@/lib/content/published'
import { absoluteUrl } from '@/lib/seo/metadata'

/** Published pages only (lib/content/published.ts). */
export default function sitemap(): MetadataRoute.Sitemap {
  return getPublishedPaths().map((path) => ({ url: absoluteUrl(path) }))
}
