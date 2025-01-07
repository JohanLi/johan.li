import { ArticleCard } from './ArticleCard'
import Intro from './components/intro/Intro'
import { getArticles } from './getArticles'

export const revalidate = 3600

export default async function Home() {
  const articles = await getArticles()

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 pb-12 pt-6 sm:pb-24 sm:pt-12 lg:px-8">
      <Intro />
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
          Articles
        </h2>
        <div className="mb-12 mt-6 grid gap-12 sm:mb-24 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} {...article} />
          ))}
        </div>
      </div>
    </div>
  )
}
