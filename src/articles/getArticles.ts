import { getCollection } from 'astro:content'

// newest first
export async function getArticles() {
  const articles = await getCollection('articles')

  return articles.sort((a, b) => b.data.published - a.data.published)
}
