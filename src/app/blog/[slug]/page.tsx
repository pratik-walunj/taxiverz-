import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { CtaBand } from '@/components/sections/CtaBand'
import { JsonLd } from '@/components/seo/JsonLd'
import { formatDate } from '@/components/templates/GuidePage'
import { Section } from '@/components/ui/Section'
import { getPost, getPosts, postPath } from '@/lib/content'
import { isPublished } from '@/lib/content/published'
import { absoluteUrl, buildMetadata, buildTitle } from '@/lib/seo/metadata'

/** `/blog/{slug}/` — body from content/blog/{slug}.mdx; owner-approved posts only. */
export const dynamicParams = false

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }))
}

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const p = getPost((await params).slug)
  if (!p?.summary) return {}
  return buildMetadata({
    title: buildTitle([p.title]),
    description: p.summary,
    path: postPath(p.slug),
  })
}

export default async function PostPage({ params }: { params: Params }) {
  const p = getPost((await params).slug)
  if (!p) notFound()
  const { default: Body } = await import(`@content/blog/${p.slug}.mdx`)
  const related = p.related.filter(isPublished)
  return (
    <>
      <Section className="pt-6 md:pt-10" labelledBy="page-title">
        <Breadcrumbs
          trail={[
            { name: 'Blog', path: '/blog/' },
            { name: p.title, path: postPath(p.slug) },
          ]}
        />
        <h1 id="page-title" className="text-h1 mt-6 max-w-3xl font-extrabold tracking-tight">
          {p.title}
        </h1>
        <p className="text-muted mt-2 text-sm">
          <time dateTime={p.date}>{formatDate(p.date)}</time>
        </p>
        <article className="mt-6 max-w-3xl text-lg">
          <Body />
        </article>
        {related.length > 0 && (
          <ul className="mt-8 space-y-2">
            {related.map((href) => (
              <li key={href}>
                <Link href={href} className="text-brand-deep font-semibold underline">
                  {href}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Section>
      <CtaBand
        title="Plan your trip with us"
        text="Check the fare online, send your trip on WhatsApp, or call us."
        whatsappMessage="Hi Taxiverz, I'd like help planning a trip."
        placement="blog-cta"
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: p.title,
          description: p.summary,
          datePublished: p.date,
          mainEntityOfPage: absoluteUrl(postPath(p.slug)),
          publisher: { '@id': 'https://taxiverz.com/#organization' },
        }}
      />
    </>
  )
}
