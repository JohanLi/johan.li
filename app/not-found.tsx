import type { Metadata } from 'next'

import Link from './(blog)/components/Link'
import { H1, Ul } from './(blog)/components/article/Common'

export const metadata: Metadata = {
  title: 'Page not found',
}

export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 pb-12 pt-6 sm:pb-24 sm:pt-12 lg:px-8">
      <div className="pb-2 pt-4">
        <H1>This page could not be found</H1>
      </div>
      Did you perhaps mean to visit:
      <Ul>
        <li>
          <Link href="/gta-online/fingerprint-scanner-simulator">
            Fingerprint Scanner Simulator for GTA Online
          </Link>
        </li>
      </Ul>
    </div>
  )
}
