import { getArticles } from './getArticles'
import Intro from './components/intro/Intro'
import { ArticleCard } from './ArticleCard'

export default async function Home() {
  const articles = await getArticles()

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 pb-12 pt-6 sm:pb-24 sm:pt-12 lg:px-8">
      <Intro />
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
          Articles (projects)
        </h2>
        <div className="mt-6 max-w-4xl">
          I became an independent developer in 2022. As part of this change, I
          created my own accounting solution to manage my Swedish AB company.
          These are my learnings, and how I approached my solution.
        </div>
        <div className="mb-12 mt-6 grid gap-12 sm:mb-24 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {articles.accounting.map((article, i) => (
            <ArticleCard
              key={article.slug}
              thumbnailPriority={i < 3}
              {...article}
            />
          ))}
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
          Articles (general)
        </h2>
        <div className="mb-12 mt-6 grid gap-12 sm:mb-24 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {articles.general.map((article) => (
            <ArticleCard key={article.slug} {...article} />
          ))}
        </div>
      </div>
    </div>
  )
}
