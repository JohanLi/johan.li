import type { AstroComponentFactory } from 'astro/runtime/server/index.js'

import type { ArticleMeta } from './types'

/*
  Each article lives in its own directory, named after its slug:
  - meta.ts exports the article's metadata
  - Body.astro is the article itself
 */

const metas = import.meta.glob<{ article: ArticleMeta }>('./*/meta.ts', {
  eager: true,
})
const bodies = import.meta.glob<{ default: AstroComponentFactory }>(
  './*/Body.astro',
  { eager: true },
)

export function getArticles() {
  return Object.entries(metas)
    .map(([path, { article }]) => {
      const slug = path.split('/')[1]
      const body = bodies[`./${slug}/Body.astro`]

      if (!body) {
        throw new Error(`${slug} is missing Body.astro`)
      }

      return { ...article, slug, Body: body.default }
    })
    .sort((a, b) => b.published - a.published)
}
