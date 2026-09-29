import type { Review } from '@/lib/schemas/content'

/**
 * Real reviews the owner is allowed to quote (OWNER_TODO F3). Empty until the
 * owner supplies them; /reviews/ and the home reviews section stay hidden.
 * Each entry: the customer's permission, `source` google (with URL) or direct,
 * and `verifiedAt` — the date the owner checked it.
 */
export const reviews: Review[] = []
