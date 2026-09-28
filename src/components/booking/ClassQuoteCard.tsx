import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Price } from '@/components/ui/Price'
import type { ClassQuote } from '@/lib/pricing/quote'
import { classLabel } from '@/lib/pricing/quote'

/** One vehicle-class result (REBUILD_PLAN §3.4 step 2). At most four facts, one price, one action. */
export function ClassQuoteCard({ item, href }: { item: ClassQuote; href: string }) {
  const { vehicleClass: c, quote } = item
  const facts = [
    c.seats !== null ? `${c.seats} seats` : null,
    c.luggage !== null ? `${c.luggage} bags` : null,
  ].filter(Boolean)
  return (
    <li className="border-line flex flex-col gap-3 border-b py-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h3 className="text-h3 font-bold">{classLabel(c)}</h3>
        {facts.length > 0 && <p className="text-muted mt-1">{facts.join(', ')}</p>}
        {quote.included.length > 0 && (
          <p className="mt-1 text-sm">
            <span className="font-semibold">Included:</span> {quote.included.join(', ')}
          </p>
        )}
        {quote.excluded.length > 0 && (
          <p className="text-muted text-sm">
            <span className="font-semibold">Not included:</span> {quote.excluded.join(', ')}
          </p>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-4 sm:flex-col sm:items-end">
        <div className="text-right">
          {quote.status === 'priced' ? (
            <>
              <Price amount={quote.total} className="text-2xl" />
              {quote.isEstimate && (
                <div className="mt-1">
                  <Badge>Estimated fare</Badge>
                </div>
              )}
            </>
          ) : (
            <>
              <Price amount={null} className="text-lg" />
              <p className="text-muted text-sm">Exact fare on WhatsApp or by phone</p>
            </>
          )}
        </div>
        <Link
          href={href}
          className="bg-brand text-ink rounded-control inline-flex min-h-12 items-center px-5 font-bold"
          aria-label={`Choose ${c.name}`}
        >
          Choose
        </Link>
      </div>
    </li>
  )
}
