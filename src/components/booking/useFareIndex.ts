'use client'

import { useCallback, useState } from 'react'
import type { FareIndex } from '@/lib/pricing/fare-index'

let pending: Promise<FareIndex> | null = null

/** Loads /fare-index.json once, on first interaction (never in the initial page load). */
export function useFareIndex() {
  const [index, setIndex] = useState<FareIndex | null>(null)
  const [failed, setFailed] = useState(false)
  const load = useCallback(() => {
    if (index) return
    pending ??= fetch('/fare-index.json').then((r) => {
      if (!r.ok) throw new Error(`fare index ${r.status}`)
      return r.json() as Promise<FareIndex>
    })
    pending.then(setIndex).catch(() => {
      pending = null
      setFailed(true)
    })
  }, [index])
  return { index, failed, load }
}
