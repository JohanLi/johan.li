import { article } from './article'
import { Metadata } from 'next'
import { Article } from '../../src/components/article/Article'

export const metadata: Metadata = {
  title: article.title,
  description: article.teaser,
}

export default function Page() {
  return <Article {...article} />
}
