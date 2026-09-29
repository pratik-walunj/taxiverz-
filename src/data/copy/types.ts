import type { Faq } from '@/lib/schemas/content'

/** Copy for one page. `publish: true` sets the entity's status; its §5 gate still applies. */
export interface PageCopy {
  publish: boolean
  summary: string
  intro: string
  faqs: Faq[]
}
