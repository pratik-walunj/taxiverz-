'use client'

import { useEffect } from 'react'
import type { TrackingEvent } from '@/config/tracking'
import { track, type TrackParams } from '@/lib/tracking/track'

/** Fires one tracking event when a server-rendered view appears (e.g. fare_results). */
export function TrackOnMount({ event, params }: { event: TrackingEvent; params?: TrackParams }) {
  const key = JSON.stringify(params ?? {})
  useEffect(() => {
    track(event, JSON.parse(key) as TrackParams)
  }, [event, key])
  return null
}
