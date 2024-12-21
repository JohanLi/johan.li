import { readdir, stat } from 'fs/promises'
import path from 'path'

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

  const articles = await Promise.all(
    slugs.map((slug) =>
      import(`./${slug}/article`).then((m) => ({
        ...m.article,
        slug,
      })),
    ),
  )

  const accounting = articles
    .filter((article) => article.category === 'accounting')
    .sort((a, b) => a.published - b.published)

  const general = articles
    .filter((article) => article.category !== 'accounting')
    .sort((a, b) => b.published - a.published)

  return { accounting, general }
}
