import { FC } from 'react'
import { StaticImageData } from 'next/future/image'

export type Article = {
  thumbnail: StaticImageData
  title: string
  teaser: string
  published: number
  readingTime: number
  headings: string[]
  body: FC
}

export type Slug = {
  slug: string
}

export type ArticleWithSlug = Article & Slug
