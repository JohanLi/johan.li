import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

/*
  Each article is a directory in src/articles/, named after its slug, with
  the article in index.mdx and its images next to it.
 */
const articles = defineCollection({
  loader: glob({
    base: './src/articles',
    pattern: '*/index.mdx',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      teaser: z.string(),
      // Unix timestamp, in seconds
      published: z.number().int(),
      // in minutes
      readingTime: z.number().int().positive(),
      thumbnail: image(),
    }),
})

export const collections = { articles }
