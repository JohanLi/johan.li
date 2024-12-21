import { Roboto_Flex } from 'next/font/google'
import Script from 'next/script'
import React, { ReactNode } from 'react'

import './globals.css'

const robotoFlex = Roboto_Flex({ subsets: ['latin'], display: 'swap' })

const { CLOUDFLARE_WEB_ANALYTICS_TOKEN } = process.env

if (!CLOUDFLARE_WEB_ANALYTICS_TOKEN) {
  throw new Error('CLOUDFLARE_WEB_ANALYTICS_TOKEN is not defined')
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={robotoFlex.className}>
      <body>
        <div className="flex min-h-screen flex-col">{children}</div>
      </body>
      {process.env.NODE_ENV !== 'development' && (
        <Script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={`{"token": "${CLOUDFLARE_WEB_ANALYTICS_TOKEN}"}`}
        />
      )}
    </html>
  )
}
