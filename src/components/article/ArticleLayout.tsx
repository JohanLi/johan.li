import React, { ReactNode } from 'react'
import Layout from '../Layout'
import { unixTimestampToMonthYear } from '../../utils'
import { Article } from './articleTypes'
import InPageNavigation from './InPageNavigation'
import { H1 } from './Common'

type Props = {
  article: Article
  children: ReactNode
}

export default function ArticleLayout({ article, children }: Props) {
  const { title, published, readingTime, headings } = article

  return (
    <Layout title={title}>
      <article className="mx-auto w-full max-w-7xl justify-between px-4 lg:flex lg:px-8">
        <div className="max-w-2xl xl:max-w-3xl">
          <div className="pt-12 pb-6">
            <H1>{title}</H1>
            <p className="mt-3 text-sm text-gray-400">
              {unixTimestampToMonthYear(published)} · {readingTime} min read
            </p>
          </div>
          <div className="-mt-6 pb-24 md:text-lg">{children}</div>
        </div>
        <InPageNavigation title={title} headings={headings} />
      </article>
    </Layout>
  )
}
