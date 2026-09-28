/**
 * Paths that exist and are published. Links, the sitemap and redirect
 * targets only ever point at these. Phase 2 adds data-driven paths
 * (routes, vehicles, services…) from src/data via this module.
 */
const staticPublishedPaths: readonly string[] = ['/']

export function getPublishedPaths(): readonly string[] {
  return staticPublishedPaths
}

export function isPublished(path: string): boolean {
  return getPublishedPaths().includes(path)
}
