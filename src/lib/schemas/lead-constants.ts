/**
 * Plain constants shared by the lead schema and client forms. Kept free of Zod
 * so importing them in a client component doesn't ship the validator (~60 KB).
 */

/** GSTIN: 2-digit state code, PAN, entity number, "Z", checksum (format check only). */
export const GSTIN_PATTERN = /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/
