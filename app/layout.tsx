import React, { ReactNode } from 'react'
import { Roboto_Flex } from 'next/font/google'
import { Metadata } from 'next'
import Footer from '../src/components/footer/Footer'
import Header from './Header'

import './globals.css'
import './prism.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Johan Li',
    default: 'Johan Li - A software developer’s thoughts',
  },
}

const robotoFlex = Roboto_Flex({ subsets: ['latin'], display: 'swap' })

const CLOUDFLARE_WEB_ANALYTICS_TOKEN =
  process.env.CLOUDFLARE_WEB_ANALYTICS_TOKEN

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={robotoFlex.className}>
      <body className="overflow-y-scroll flex min-h-screen flex-col">
        <nav className="pt-12">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <Header />
          </div>
        </nav>
        <div>{children}</div>
        <Footer />
      </body>
      {Boolean(CLOUDFLARE_WEB_ANALYTICS_TOKEN) && (
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={`{"token": "${CLOUDFLARE_WEB_ANALYTICS_TOKEN}"}`}
        />
      )}
    </html>
  )
}
