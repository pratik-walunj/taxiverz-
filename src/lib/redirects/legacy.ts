import legacyMap from '../../../docs/legacy-url-map.json'
import { isPublished as defaultIsPublished } from '@/lib/content/published'

export interface LegacyEntry {
  legacyPath: string
  target: string
  fallback?: string | null
}

const entries: LegacyEntry[] = [
  ...legacyMap.entries.map((e) => ({
    legacyPath: e.legacyPath,
    target: e.target,
    fallback: e.fallback,
  })),
  ...legacyMap.aliases.map((a) => ({ legacyPath: a.legacyPath, target: a.target, fallback: null })),
]

/** Case-insensitive, encoding-insensitive key: "/Tempo%20Traveller13.HTML" → "/tempo traveller13.html". */
export function legacyKey(pathname: string): string {
  let decoded = pathname
  try {
    decoded = decodeURIComponent(pathname)
  } catch {
    // malformed escape: fall back to the raw path
  }
  return decoded.toLowerCase()
}

/** Target if published, otherwise fallback if published, otherwise the home page. */
export function effectiveDestination(
  entry: LegacyEntry,
  isPublished: (path: string) => boolean = defaultIsPublished,
): string {
  if (isPublished(entry.target)) return entry.target
  if (entry.fallback && isPublished(entry.fallback)) return entry.fallback
  return '/'
}

export function buildLegacyTable(
  isPublished: (path: string) => boolean = defaultIsPublished,
): ReadonlyMap<string, string> {
  const table = new Map<string, string>()
  for (const entry of entries) {
    const key = legacyKey(entry.legacyPath)
    if (table.has(key))
      throw new Error(`Duplicate legacy path (case-insensitive): ${entry.legacyPath}`)
    table.set(key, effectiveDestination(entry, isPublished))
  }
  return table
}

export const legacyEntries: readonly LegacyEntry[] = entries
