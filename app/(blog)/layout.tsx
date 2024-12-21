import { Metadata } from 'next'
import React, { ReactNode } from 'react'

import Header from './Header'
import './prism.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Johan Li',
    default: 'Johan Li - A software developer’s thoughts',
  },
  description:
    'The reflections of a software developer in the fast-changing field of web development',
}

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <nav className="pt-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Header />
        </div>
      </nav>
      <div>{children}</div>
    </>
  )
}
