import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Article } from '../components/article/Article'
import { getArticle } from '../utils'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug

  try {
    const article = await getArticle(slug)

    return {
      title: article.title,
      description: article.teaser,
    }
  } catch {
    notFound()
  }
}

export default async function Page({ params }: Props) {
  const slug = (await params).slug

  try {
    const article = await getArticle(slug)

    return <Article {...article} />
  } catch {
    notFound()
  }
}
