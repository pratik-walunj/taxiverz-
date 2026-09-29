import type { MetadataRoute } from 'next'
import { getGuides, getPosts, guidePath, postPath } from '@/lib/content'
import { getPublishedPaths, unlistedPaths } from '@/lib/content/published'
import { absoluteUrl } from '@/lib/seo/metadata'

/** Published, indexable pages only (lib/content/published.ts), with dates where the data has them. */
export default function sitemap(): MetadataRoute.Sitemap {
  const dated = new Map<string, string>([
    ...getGuides().map((g) => [guidePath(g), g.updated] as const),
    ...getPosts().map((p) => [postPath(p.slug), p.date] as const),
  ])
  return getPublishedPaths()
    .filter((path) => !unlistedPaths.has(path))
    .map((path) => {
      const date = dated.get(path)
      return { url: absoluteUrl(path), ...(date && { lastModified: date }) }
    })
}
