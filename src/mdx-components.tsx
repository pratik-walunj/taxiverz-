import Link from 'next/link'
import type { MDXComponents } from 'mdx/types'
import type { ComponentPropsWithoutRef } from 'react'

/**
 * How MDX guides and posts render (required by @next/mdx in the App Router).
 * Headings start at h2 (the page template owns the h1); internal links use
 * next/link; external links open safely in a new tab.
 */
const components: MDXComponents = {
  h1: (props) => <h2 className="text-h2 mt-10 font-bold" {...props} />,
  h2: (props) => <h2 className="text-h2 mt-10 font-bold" {...props} />,
  h3: (props) => <h3 className="text-h3 mt-8 font-semibold" {...props} />,
  p: (props) => <p className="mt-4" {...props} />,
  ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-5" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-5" {...props} />,
  strong: (props) => <strong className="font-semibold" {...props} />,
  a: ({ href = '', ...props }: ComponentPropsWithoutRef<'a'>) =>
    href.startsWith('/') ? (
      <Link href={href} className="text-brand-deep font-semibold underline" {...props} />
    ) : (
      <a
        href={href}
        target="_blank"
        rel="noopener"
        className="text-brand-deep font-semibold underline"
        {...props}
      />
    ),
}

export function useMDXComponents(): MDXComponents {
  return components
}
