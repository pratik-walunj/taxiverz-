import { notFound } from 'next/navigation'
import { GuidePage } from '@/components/templates/GuidePage'
import { getGuide, getGuides, guidePath } from '@/lib/content'
import { buildMetadata, buildTitle } from '@/lib/seo/metadata'

/** `/destinations/{place}/{guide}/` — body from content/destinations/{place}/{guide}.mdx. */
export const dynamicParams = false

export function generateStaticParams() {
  return getGuides().map((g) => ({ place: g.place, guide: g.guide }))
}

type Params = Promise<{ place: string; guide: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const { place, guide } = await params
  const g = getGuide(place, guide)
  if (!g?.summary) return {}
  return buildMetadata({ title: buildTitle([g.title]), description: g.summary, path: guidePath(g) })
}

export default async function GuideRoutePage({ params }: { params: Params }) {
  const { place, guide } = await params
  const g = getGuide(place, guide)
  if (!g) notFound()
  const { default: Body } = await import(`@content/destinations/${g.place}/${g.guide}.mdx`)
  return (
    <GuidePage guide={g}>
      <Body />
    </GuidePage>
  )
}
