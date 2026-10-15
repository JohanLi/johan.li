import type { ReactNode } from 'react'

// the same as Caption.astro, for use within React islands
export function CaptionReact({ children }: { children: ReactNode }) {
  return (
    <div className="mx-4 mt-6 text-center">
      <span className="inline-block text-left text-sm text-gray-400">
        {children}
      </span>
    </div>
  )
}
