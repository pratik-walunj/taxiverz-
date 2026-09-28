import type { MetadataRoute } from 'next'
import { getPublishedPaths, unlistedPaths } from '@/lib/content/published'
import { absoluteUrl } from '@/lib/seo/metadata'

/** Published, indexable pages only (lib/content/published.ts). */
export default function sitemap(): MetadataRoute.Sitemap {
  return getPublishedPaths()
    .filter((path) => !unlistedPaths.has(path))
    .map((path) => ({ url: absoluteUrl(path) }))
}
