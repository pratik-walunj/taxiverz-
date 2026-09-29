import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { formatDate } from '@/components/templates/GuidePage'
import { Section } from '@/components/ui/Section'
import { getPosts, postPath } from '@/lib/content'
import { isPublished } from '@/lib/content/published'
import { buildMetadata, buildTitle } from '@/lib/seo/metadata'

export const metadata = buildMetadata({
  title: buildTitle(['Blog', 'Travel by Road from Gorakhpur']),
  description:
    'Practical articles from Taxiverz on travelling by road from Gorakhpur: pilgrim circuits, Nepal trips and planning cars for weddings and events.',
  path: '/blog/',
})

/** `/blog/` — live only once the owner approves a post (§5). */
export default function BlogHub() {
  if (!isPublished('/blog/')) notFound()
  return (
    <Section className="pt-6 md:pt-10" labelledBy="page-title">
      <Breadcrumbs trail={[{ name: 'Blog', path: '/blog/' }]} />
      <h1 id="page-title" className="text-h1 mt-6 font-extrabold tracking-tight">
        Blog
      </h1>
      <ul className="mt-8 grid max-w-3xl gap-6">
        {getPosts().map((p) => (
          <li key={p.slug}>
            <Link href={postPath(p.slug)} className="group block">
              <h2 className="font-heading group-hover:text-brand-deep text-xl font-bold">
                {p.title}
              </h2>
              {p.summary && <p className="text-muted mt-1">{p.summary}</p>}
              <p className="text-muted mt-1 text-sm">
                <time dateTime={p.date}>{formatDate(p.date)}</time>
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}
