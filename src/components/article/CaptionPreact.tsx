import type { ComponentChildren } from 'preact'

// the same as Caption.astro, for use within Preact islands
export function CaptionPreact({ children }: { children: ComponentChildren }) {
  return (
    <div className="mx-4 mt-6 text-center">
      <span className="inline-block text-left text-sm text-gray-400">
        {children}
      </span>
    </div>
  )
}
