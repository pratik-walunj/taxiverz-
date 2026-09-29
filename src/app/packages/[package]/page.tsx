import { notFound } from 'next/navigation'
import { PackagePage } from '@/components/templates/PackagePage'
import { getPackage, getPackages, packagePath } from '@/lib/content'
import { buildMetadata, buildTitle } from '@/lib/seo/metadata'

export const dynamicParams = false

export function generateStaticParams() {
  return getPackages().map((p) => ({ package: p.slug }))
}

type Params = Promise<{ package: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const pkg = getPackage((await params).package)
  if (!pkg?.summary) return {}
  return buildMetadata({
    title: buildTitle([pkg.name, 'Package']),
    description: pkg.summary,
    path: packagePath(pkg.slug),
  })
}

export default async function PackageRoutePage({ params }: { params: Params }) {
  const pkg = getPackage((await params).package)
  if (!pkg) notFound()
  return <PackagePage pkg={pkg} />
}
