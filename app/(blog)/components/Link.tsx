import NextLink from 'next/link'
import React, { ReactNode, forwardRef } from 'react'

const defaultLinkClass = 'text-indigo-600 hover:text-indigo-900 wrap-break-word'

type Props = {
  href: string
  className?: string
  external?: true
  children?: ReactNode
}

const Link = forwardRef<HTMLAnchorElement, Props>(
  ({ href, className, external, children }, ref) => {
    const linkClass = className !== undefined ? className : defaultLinkClass

    if (external) {
      return (
        <a href={href} className={linkClass} ref={ref}>
          {children || href}
        </a>
      )
    }

    return (
      <NextLink href={href} className={linkClass} ref={ref}>
        {children || href}
      </NextLink>
    )
  },
)

Link.displayName = 'Link'

export default Link
