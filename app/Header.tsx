'use client'

import { usePathname } from 'next/navigation'
import Link from '../src/components/Link'

export default function Header() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  return (
    <Link href="/">
      {isHomePage && (
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl text-[#a675a2]">
          Johan Li
        </h1>
      )}
      {!isHomePage && (
        <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl text-[#a675a2]">
          Johan Li
        </h2>
      )}
    </Link>
  )
}
