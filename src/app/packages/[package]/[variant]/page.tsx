import { notFound } from 'next/navigation'
import { PackagePage } from '@/components/templates/PackagePage'
import {
  getCity,
  getPackage,
  getPackageVariants,
  getPackages,
  packageVariantPath,
} from '@/lib/content'
import { buildMetadata, buildTitle } from '@/lib/seo/metadata'

/** `/packages/{package}/from-{city}/` — only variants with their own verified price. */
export const dynamicParams = false

export function generateStaticParams() {
  return getPackages().flatMap((p) =>
    getPackageVariants(p).map((v) => ({ package: p.slug, variant: `from-${v.origin}` })),
  )
}

type Params = Promise<{ package: string; variant: string }>

async function load(params: Params) {
  const { package: slug, variant } = await params
  const pkg = getPackage(slug)
  const v = pkg && getPackageVariants(pkg).find((x) => `from-${x.origin}` === variant)
  return pkg && v ? { pkg, v } : null
}

export async function generateMetadata({ params }: { params: Params }) {
  const page = await load(params)
  if (!page?.pkg.summary) return {}
  const city = getCity(page.v.origin)?.name ?? page.v.origin
  return buildMetadata({
    title: buildTitle([`${page.pkg.name} from ${city}`]),
    description: page.pkg.summary,
    path: packageVariantPath(page.pkg.slug, page.v.origin),
  })
}

export default async function PackageVariantPage({ params }: { params: Params }) {
  const page = await load(params)
  if (!page) notFound()
  return <PackagePage pkg={page.pkg} variant={page.v} />
}
