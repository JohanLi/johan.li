import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const urls = new Map<string, string>()

/*
  Videos are served from R2 with a hash of their contents in the file name,
  e.g. videos/rush-hour.mp4 becomes /videos/rush-hour.1a2b3c4d.mp4, so that
  they can be cached forever. scripts/upload-videos.sh uploads them under the
  same names, and has to compute the hash the same way.

  Only runs at build time, as it reads the file from videos/.
 */
export function getVideoUrl(file: string) {
  /*
    `astro dev` doesn't use R2. Instead, Vite's dev server serves the files in
    videos/ directly, under their actual names. import.meta.env is undefined
    outside of Vite, e.g. in the end-to-end tests.
   */
  if (import.meta.env?.DEV) {
    return `/videos/${file}`
  }

  let url = urls.get(file)

  if (!url) {
    const contents = readFileSync(join(process.cwd(), 'videos', file))
    const hash = createHash('sha256').update(contents).digest('hex').slice(0, 8)

    // the hash goes before the first dot, e.g.
    // uncharted-waters-new-horizons.1a2b3c4d.av1.mp4
    const [name, ...extensions] = file.split('.')
    url = `/videos/${[name, hash, ...extensions].join('.')}`
    urls.set(file, url)
  }

  return url
}
