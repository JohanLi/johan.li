import React, { ReactNode } from 'react'
import Head from 'next/head'
import Link from './Link'
import Footer from './footer/Footer'

const logoColor = '#a675a2'

type Props =
  | {
      title: string
      isHomePage?: false
      metaDescription?: string
      children: ReactNode
    }
  | {
      title?: never
      isHomePage: true
      metaDescription?: string
      children: ReactNode
    }

export default function Layout({
  title,
  isHomePage,
  metaDescription,
  children,
}: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>
          {isHomePage
            ? `Johan Li - A software developer’s thoughts`
            : `${title} - Johan Li`}
        </title>
        {Boolean(metaDescription) && (
          <meta name="description" content={metaDescription} />
        )}
      </Head>
      <nav className="pt-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Link href="/">
            {Boolean(isHomePage) && (
              <h1
                className="text-4xl font-extrabold tracking-tight md:text-5xl"
                style={{ color: logoColor }}
              >
                Johan Li
              </h1>
            )}
            {!Boolean(isHomePage) && (
              <h2
                className="text-2xl font-extrabold tracking-tight md:text-3xl"
                style={{ color: logoColor }}
              >
                Johan Li
              </h2>
            )}
          </Link>
        </div>
      </nav>
      <div>{children}</div>
      <Footer />
    </div>
  )
}
