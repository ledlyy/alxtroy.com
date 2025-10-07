import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'

type AnchorProps = ComponentPropsWithoutRef<'a'>
type PreProps = ComponentPropsWithoutRef<'pre'>
type CodeProps = ComponentPropsWithoutRef<'code'>

const externalLinkPattern = /^(https?:)?\/\//

const Anchor = ({ href, children, ...rest }: AnchorProps) => {
  const safeHref = href ?? '#'
  if (externalLinkPattern.test(safeHref)) {
    return (
      <a
        {...rest}
        href={safeHref}
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="underline underline-offset-2"
      >
        {children}
      </a>
    )
  }
  return (
    <Link href={safeHref} className="underline underline-offset-2" {...rest}>
      {children}
    </Link>
  )
}

const Pre = ({ className, ...rest }: PreProps) => (
  <pre
    {...rest}
    className={[
      'overflow-x-auto rounded-md border',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
  />
)

const InlineCode = ({ className, ...rest }: CodeProps) => (
  <code
    {...rest}
    className={[
      'rounded bg-neutral-100 px-1 py-0.5 dark:bg-neutral-800',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
  />
)

// Minimal MDX components mapping to keep styling consistent with Tailwind Typography
export const mdxComponents: MDXComponents = {
  a: Anchor,
  pre: Pre,
  code: InlineCode,
}
