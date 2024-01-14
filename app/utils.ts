import { readdir, stat } from 'fs/promises'
import path from 'path'

const ARTICLES_DIRECTORY = path.join(process.cwd(), 'app')

export async function getArticles() {
  const slugs: string[] = []

  async function readDirectory(dir) {
    const entries = await readdir(dir)

    for (const entry of entries) {
      const entryPath = path.join(dir, entry)

      if ((await stat(entryPath)).isDirectory()) {
        slugs.push(entry)
      }
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

  return articles.sort((a, b) => b.published - a.published)
}
