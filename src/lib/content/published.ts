import { contentPaths } from '@/lib/content'

/**
 * Paths that exist and are published. Links, the sitemap and redirect
 * targets only ever point at these: the static pages plus everything whose
 * data is published and passes its §5 gate (lib/content).
 */
const staticPublishedPaths: readonly string[] = ['/']

let cache: readonly string[] | undefined

export function getPublishedPaths(): readonly string[] {
  cache ??= [...staticPublishedPaths, ...contentPaths()]
  return cache
}

export function isPublished(path: string): boolean {
  return getPublishedPaths().includes(path)
}
