import { Metadata } from 'next'

import { Article } from '../components/article/Article'
import { article } from './article'

export const metadata: Metadata = {
  title: article.title,
  description: article.teaser,
}

export default function Page() {
  return <Article {...article} />
}
