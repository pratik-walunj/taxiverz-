'use client'

import { useId, useMemo, useRef, useState } from 'react'
import type { FareIndexPlace } from '@/lib/pricing/fare-index'
import { cx } from '@/lib/cx'

export interface PlaceValue {
  /** Known place id, or null for free text. */
  id: string | null
  text: string
}

const TYPE_LABEL: Record<FareIndexPlace['type'], string> = {
  city: 'City',
  town: 'Town',
  area: 'Area',
  airport: 'Airport',
  station: 'Railway station',
  border: 'Border crossing',
}

function normalise(s: string) {
  return s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').trim()
}

/** Ranks places for a query: name/code prefix first, then alias prefix, then substring. */
export function searchPlaces(
  places: readonly FareIndexPlace[],
  query: string,
  limit = 8,
): FareIndexPlace[] {
  const q = normalise(query)
  if (!q) return []
  const scored: [number, FareIndexPlace][] = []
  for (const p of places) {
    const names = [p.name, ...(p.nameHi ? [p.nameHi] : [])].map(normalise)
    const aliases = p.aliases.map(normalise)
    const code = p.code?.toLowerCase()
    let score = -1
    if (names.some((n) => n.startsWith(q)) || code === q) score = 0
    else if (aliases.some((a) => a.startsWith(q))) score = 1
    else if ([...names, ...aliases].some((n) => n.includes(q))) score = 2
    if (score >= 0) scored.push([score + (p.type === 'city' ? 0 : 0.5), p])
  }
  return scored
    .sort((a, b) => a[0] - b[0] || a[1].name.localeCompare(b[1].name))
    .slice(0, limit)
    .map(([, p]) => p)
}

/**
 * Accessible place search (ARIA 1.2 combobox with a listbox popup). Keyboard:
 * ↑/↓ to move, Enter to choose, Esc to close. A place we don't know stays as
 * free text — it still becomes a lead ("exact fare on WhatsApp").
 */
export function PlaceCombobox({
  label,
  value,
  onChange,
  places,
  onNeedPlaces,
  placeholder,
  filter,
  name,
}: {
  label: string
  value: PlaceValue
  onChange: (value: PlaceValue) => void
  places: readonly FareIndexPlace[] | null
  onNeedPlaces: () => void
  placeholder?: string
  filter?: (p: FareIndexPlace) => boolean
  name: string
}) {
  const id = useId()
  const listId = `${id}-list`
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)

  const options = useMemo(
    () => (places ? searchPlaces(filter ? places.filter(filter) : places, value.text) : []),
    [places, filter, value.text],
  )
  const expanded = open && options.length > 0

  function choose(p: FareIndexPlace) {
    onChange({ id: p.id, text: p.name })
    setOpen(false)
    setActive(-1)
  }

  return (
    <div className="relative">
      <label htmlFor={id} className="mb-1 block text-sm font-semibold">
        {label}
      </label>
      <input
        ref={inputRef}
        id={id}
        name={name}
        type="text"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={expanded}
        aria-controls={listId}
        aria-activedescendant={expanded && active >= 0 ? `${id}-opt-${active}` : undefined}
        autoComplete="off"
        spellCheck={false}
        placeholder={placeholder}
        value={value.text}
        onFocus={() => {
          onNeedPlaces()
          if (value.text) setOpen(true)
        }}
        onChange={(e) => {
          onNeedPlaces()
          onChange({ id: null, text: e.target.value })
          setOpen(true)
          setActive(-1)
        }}
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault()
            setOpen(true)
            setActive((i) => Math.min(i + 1, options.length - 1))
          } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setActive((i) => Math.max(i - 1, 0))
          } else if (e.key === 'Enter' && expanded && active >= 0) {
            e.preventDefault()
            choose(options[active]!)
          } else if (e.key === 'Escape') {
            setOpen(false)
          }
        }}
        className="border-ink/25 bg-paper rounded-control focus:border-brand min-h-12 w-full border px-3 text-base"
      />
      <ul
        id={listId}
        role="listbox"
        aria-label={label}
        className={cx(
          'border-line bg-paper shadow-lift rounded-control absolute inset-x-0 top-full z-30 mt-1 max-h-72 overflow-auto border py-1',
          !expanded && 'hidden',
        )}
      >
        {options.map((p, i) => (
          <li
            key={p.id}
            id={`${id}-opt-${i}`}
            role="option"
            aria-selected={i === active}
            // mousedown keeps focus in the input so blur doesn't close the list first
            onMouseDown={(e) => {
              e.preventDefault()
              choose(p)
            }}
            className={cx(
              'flex min-h-12 cursor-pointer flex-col justify-center px-3',
              i === active && 'bg-mist',
            )}
          >
            <span className="font-medium">
              {p.name}
              {p.code && <span className="text-muted ml-1 text-sm">({p.code})</span>}
            </span>
            <span className="text-muted text-sm">
              {TYPE_LABEL[p.type]}
              {p.nameHi && (
                <span lang="hi" className="ml-2">
                  {p.nameHi}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
      <p className="sr-only" aria-live="polite">
        {open && value.text
          ? `${options.length} ${options.length === 1 ? 'place' : 'places'} found`
          : ''}
      </p>
    </div>
  )
}
