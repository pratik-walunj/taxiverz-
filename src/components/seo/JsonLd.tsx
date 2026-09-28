import type { JsonLdObject } from '@/lib/seo/jsonld'

/** The only way JSON-LD reaches the page. `<` is escaped so data can't close the script tag. */
export function JsonLd({ data }: { data: JsonLdObject | readonly JsonLdObject[] }) {
  const json = JSON.stringify(data).replace(/</g, '\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
