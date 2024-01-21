import { ReactNode } from 'react'

import { getSlug } from '../../utils'

type PropsString = {
  children: string
}

type PropsNode = {
  children: ReactNode
}

export function H1({ children }: PropsString) {
  return (
    <h1
      className="text-3xl font-extrabold tracking-tight md:text-5xl"
      id={getSlug(children)}
    >
      {children}
    </h1>
  )
}

export function H2({ children }: PropsString) {
  return (
    <h2
      className="mb-6 mt-12 text-xl font-bold md:text-2xl"
      id={getSlug(children)}
    >
      {children}
    </h2>
  )
}

export function H3({ children }: PropsString) {
  return (
    <h3 className="mb-6 mt-12 text-base font-bold md:text-lg">{children}</h3>
  )
}

export function P({ children }: PropsNode) {
  return <p className="mt-6">{children}</p>
}

export function Ul({ children }: PropsNode) {
  return <ul className="mt-6 list-disc space-y-4 pl-8">{children}</ul>
}

export function UlReferences({ children }: PropsNode) {
  return <ul className="mt-4 list-disc space-y-2 pl-6 text-xs">{children}</ul>
}

export function CodeInline({ children }: PropsString) {
  return <span className="bg-[#f5f2f0] p-0.5">{children}</span>
}

export function BlockQuote({ children }: PropsNode) {
  if (!Array.isArray(children)) {
    return (
      <blockquote className="my-12 border-l-4 border-gray-200 pl-4">
        {children}
      </blockquote>
    )
  }

  return (
    <div className="my-12">
      {children.map((child, i) => (
        <blockquote className="my-6 border-l-4 border-gray-200 pl-4" key={i}>
          {child}
        </blockquote>
      ))}
    </div>
  )
}
