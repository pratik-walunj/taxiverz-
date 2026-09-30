/**
 * A name as it reads mid-sentence: "Luxury car rental" → "luxury car rental",
 * but proper nouns keep their capital ("India–Nepal taxi" stays as it is).
 */
const PROPER = /^(India|Nepal|Gorakhpur|Tempo|Urbania|Force|Tata|Toyota|Maruti)\b/

export function inSentence(name: string): string {
  return PROPER.test(name) ? name : name.charAt(0).toLowerCase() + name.slice(1)
}
