'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Header() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  if (isHomePage) {
    return (
      <Link
        href="/"
        className="inline-block text-4xl font-extrabold tracking-tight text-[#a675a2] md:text-5xl"
      >
        <h1>Johan Li</h1>
      </Link>
    )
  }

  return (
    <Link
      href="/"
      className="text-2xl font-extrabold tracking-tight text-[#a675a2] md:text-3xl"
    >
      <h2>Johan Li</h2>
    </Link>
  )
}
