import Link from './components/Link'
import NextImage from 'next/image'
import { unixTimestampToMonthYear } from './utils'
import { getArticles } from './getArticles'

export default async function Home() {
  const articles = await getArticles()

  return (
    <div className="mx-auto max-w-7xl px-4 lg:px-8">
      <div className="pt-6 pb-12 sm:pt-12 sm:pb-24">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
          Articles
        </h2>
        <div className="mt-6 grid gap-12 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <Link
              href={`/${article.slug}`}
              className="flex transform flex-col overflow-hidden rounded-lg shadow-lg transition duration-200 hover:scale-105"
              key={article.slug}
            >
              <NextImage
                src={article.thumbnail}
                alt={article.title}
                className="h-48 w-full object-cover"
                priority={i < 3}
              />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {article.title}
                  </h2>
                  <div className="mt-3 text-gray-500">{article.teaser}</div>
                </div>
                <div className="mt-6 text-sm text-gray-500">
                  {unixTimestampToMonthYear(article.published)} ·{' '}
                  {article.readingTime} min read
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
