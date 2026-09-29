import { ShieldCheck } from 'lucide-react'
import { business } from '@/config/business'
import { formatIndianPhone } from '@/lib/phone'

/**
 * Payment-safety notice (REBUILD_PLAN §7 Phase 6): the only official accounts
 * payments go to. Renders nothing until the owner configures them (H1).
 */
export function PaymentNotice() {
  if (business.paymentAccounts.length === 0) return null
  return (
    <aside
      aria-labelledby="payment-notice-title"
      className="border-brand/40 bg-brand/5 rounded-panel mt-6 max-w-3xl border p-4"
    >
      <h2 id="payment-notice-title" className="flex items-center gap-2 font-bold">
        <ShieldCheck aria-hidden="true" className="text-brand-deep size-5" /> Pay only to our
        official accounts
      </h2>
      <p className="mt-2">We only take payment to:</p>
      <ul className="mt-2 list-disc pl-5">
        {business.paymentAccounts.map((a) => (
          <li key={a.value}>
            {a.label}: <strong className="tabular">{a.value}</strong>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-sm">
        If anyone asks you to pay somewhere else in our name, don&rsquo;t pay — call us on{' '}
        {formatIndianPhone(business.phone)}.
      </p>
    </aside>
  )
}
