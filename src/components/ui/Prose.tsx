import { cx } from '@/lib/cx'

/** Plain text from data, split into paragraphs on blank lines. No HTML or markdown is interpreted. */
export function Prose({ text, className }: { text: string; className?: string }) {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
  return (
    <div className={cx('max-w-3xl space-y-4', className)}>
      {paragraphs.map((p) => (
        <p key={p.slice(0, 40)}>{p}</p>
      ))}
    </div>
  )
}
