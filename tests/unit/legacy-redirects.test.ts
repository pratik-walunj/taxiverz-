import { describe, expect, it } from 'vitest'
import {
  buildLegacyTable,
  GONE,
  effectiveDestination,
  legacyEntries,
  legacyKey,
  legacyUrlsLandingOnHome,
} from '@/lib/redirects/legacy'

describe('legacy redirects', () => {
  it('covers all 156 legacy pages plus the 2 aliases', () => {
    expect(legacyEntries.length).toBe(158)
  })

  it('matches case-insensitively and with or without %20', () => {
    expect(legacyKey('/Gypsy.html')).toBe(legacyKey('/gypsy.HTML'))
    expect(legacyKey('/tempo%20traveller13.html')).toBe('/tempo traveller13.html')
  })

  it('uses the target when published, else the fallback, else home', () => {
    const entry = {
      legacyPath: '/x.html',
      target: '/fleet/audi-a4/',
      fallback: '/luxury-car-rental/',
    }
    expect(effectiveDestination(entry, (p) => p === '/fleet/audi-a4/')).toBe('/fleet/audi-a4/')
    expect(effectiveDestination(entry, (p) => p === '/luxury-car-rental/')).toBe(
      '/luxury-car-rental/',
    )
    expect(effectiveDestination(entry, () => false)).toBe('/')
  })

  it('never points a legacy URL at another legacy URL (one hop)', () => {
    const table = buildLegacyTable(() => true)
    for (const dest of table.values()) {
      expect(dest.endsWith('/')).toBe(true)
      expect(table.has(legacyKey(dest))).toBe(false)
    }
  })

  it('sends the Kathmandu route to its route page once published', () => {
    const table = buildLegacyTable(() => true)
    expect(table.get(legacyKey('/gorakhpur-to-kathmandu.html'))).toBe(
      '/cabs/gorakhpur/gorakhpur-to-kathmandu/',
    )
  })

  it('launch rule: only the home/junk entries may land on / once every target is published', () => {
    expect(legacyUrlsLandingOnHome(() => true)).toEqual([])
  })

  it('launch rule: flags every other URL while its target and fallback are unpublished', () => {
    const onHome = legacyUrlsLandingOnHome((p) => p === '/')
    expect(onHome).toContain('/gorakhpur-to-kathmandu.html')
    expect(onHome).not.toContain('/index.html')
    expect(onHome).not.toContain('/popular-routes-section.html')
    expect(onHome.length).toBe(158 - 3)
  })

  it('tries fallbacks in order after the first fallback', () => {
    const entry = {
      legacyPath: '/audi-a4.html',
      target: '/fleet/audi-a4/',
      fallback: '/luxury-car-rental/',
      fallbacks: ['/fleet/', '/'],
    }
    expect(effectiveDestination(entry, (p) => p === '/fleet/')).toBe('/fleet/')
    expect(effectiveDestination(entry, (p) => p === '/luxury-car-rental/' || p === '/fleet/')).toBe(
      '/luxury-car-rental/',
    )
  })

  it('answers 410 for a discontinued offer, unless its page comes back', () => {
    const entry = {
      legacyPath: '/bajaj-pulsar.html',
      target: '/fleet/bajaj-pulsar/',
      fallback: '/bike-rental/',
      gone: true,
    }
    expect(effectiveDestination(entry, (p) => p === '/bike-rental/')).toBe(GONE)
    expect(effectiveDestination(entry, (p) => p === '/fleet/bajaj-pulsar/')).toBe(
      '/fleet/bajaj-pulsar/',
    )
  })

  it('launch: only shoots, bikes and self-drive still land on / today', () => {
    const map = new Map(legacyEntries.map((e) => [e.legacyPath, e]))
    for (const path of legacyUrlsLandingOnHome()) {
      const t = map.get(path)!.target
      expect(t, path).toMatch(/^\/(shoot-car-rental|bike-rental|self-drive-car-rental|fleet)\//)
    }
  })
})
