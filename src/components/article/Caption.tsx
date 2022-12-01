import React from 'react'

type Props = {
  children: string
}

export function Caption({ children }: Props) {
  return (
    <div className="mx-4 mt-6 text-center">
      <span className="inline-block text-left text-sm text-gray-400">
        {children}
      </span>
    </div>
  )
}
