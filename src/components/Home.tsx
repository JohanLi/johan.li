import Link from './Link'
import { unixTimestampToMonthYear } from '../utils'
import Layout from './Layout'
import { ArticleWithSlug } from './article/articleTypes'

export type HomeProps = {
  articles: Omit<ArticleWithSlug, 'body'>[]
}

export default function Home({ articles }: HomeProps) {
  return (
    <Layout isHomePage>
      <div className="max-w-7xl px-4 lg:px-8 mx-auto">
        <div className="pt-6 sm:pt-12 pb-12 sm:pb-24">
          <h2 className="text-2xl md:text-3xl tracking-tight font-extrabold text-gray-900">
            Articles
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-6 sm:mt-12">
            {articles.map((article) => (
              <Link
                href={`/${article.slug}`}
                className="flex flex-col rounded-lg shadow-lg overflow-hidden transform transition duration-200 hover:scale-105"
                key={article.slug}
              >
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="h-48 w-full object-cover"
                />
                <div className="flex flex-col p-6 flex-1">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {article.title}
                    </h2>
                    <div className="mt-3 text-gray-500">{article.teaser}</div>
                  </div>
                  <div className="text-sm text-gray-500 mt-6">
                    {unixTimestampToMonthYear(article.published)} ·{' '}
                    {article.readingTime} min read
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
