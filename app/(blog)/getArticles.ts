import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { getArticle } from './utils'

const ARTICLES_DIRECTORY = path.join(process.cwd(), 'app', '(blog)')

export async function getArticles() {
  const slugs: string[] = []

  async function readDirectory(dir) {
    const entries = await readdir(dir)

    for (const entry of entries) {
      const entryPath = path.join(dir, entry)

      if (!(await stat(entryPath)).isDirectory()) {
        continue
      }

      try {
        await stat(path.join(entryPath, 'article.tsx'))
      } catch {
        continue
      }

      slugs.push(entry)
    }
  }

  await readDirectory(ARTICLES_DIRECTORY)

  return (
    await Promise.all(
      slugs.map((slug) =>
        getArticle(slug).then((article) => ({
          ...article,
          slug,
        })),
      ),
    )
  ).sort((a, b) => b.published - a.published)
}
