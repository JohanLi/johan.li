import NextLink from 'next/link'
import React, { ReactNode } from 'react'

const defaultLinkClass = 'text-indigo-600 hover:text-indigo-900 break-words'

type Props = {
  href: string
  className?: string
  external?: true
  children?: ReactNode
}

export default function Link({ href, className, external, children }: Props) {
  const linkClass = className !== undefined ? className : defaultLinkClass

  if (external) {
    return (
      <a href={href} className={linkClass}>
        {children || href}
      </a>
    )
  }

  return (
    <NextLink href={href} className={linkClass}>
      {children || href}
    </NextLink>
  )
}
