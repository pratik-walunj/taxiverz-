import type { Review } from '@/lib/schemas/content'

/**
 * Real reviews the owner is allowed to quote (OWNER_TODO F3). Empty until the
 * owner supplies them; /reviews/ and the home reviews section stay hidden.
 * Each entry needs the customer's permission (`permission: true`).
 */
export const reviews: Review[] = []
