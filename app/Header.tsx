'use client'

import { usePathname } from 'next/navigation'
import Link from './components/Link'

export default function Header() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  return (
    <Link href="/">
      {isHomePage && (
        <h1 className="text-4xl font-extrabold tracking-tight text-[#a675a2] md:text-5xl">
          Johan Li
        </h1>
      )}
      {!isHomePage && (
        <h2 className="text-2xl font-extrabold tracking-tight text-[#a675a2] md:text-3xl">
          Johan Li
        </h2>
      )}
    </Link>
  )
}
