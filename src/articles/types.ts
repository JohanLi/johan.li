import type { ImageMetadata } from 'astro'

export type ArticleMeta = {
  thumbnail: ImageMetadata
  title: string
  teaser: string
  published: number
  readingTime: number
  headings: string[]
}
