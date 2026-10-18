/*
  Workers static assets don't support Range requests, which browsers need in
  order to seek in a video. Videos are therefore stored in R2, which does.

  This Worker only runs for the paths in `assets.run_worker_first` in
  wrangler.jsonc. Everything else is served directly from static assets.
 */

/*
  Videos have a hash of their contents in their names (see
  scripts/upload-videos.sh), so a name always refers to the same file.
 */
const CACHE_CONTROL = 'public, max-age=31536000, immutable'

export default {
  async fetch(request, env) {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method Not Allowed', {
        status: 405,
        headers: { allow: 'GET, HEAD' },
      })
    }

    // e.g. /videos/rush-hour.1a2b3c4d.mp4 is stored as videos/rush-hour.1a2b3c4d.mp4
    const key = decodeURIComponent(new URL(request.url).pathname.slice(1))

    if (request.method === 'HEAD') {
      const object = await env.VIDEOS.head(key)

      if (!object) {
        return env.ASSETS.fetch(request)
      }

      const headers = getHeaders(object)
      headers.set('content-length', object.size.toString())
      return new Response(null, { headers })
    }

    let object: R2ObjectBody | R2Object | null

    try {
      object = await env.VIDEOS.get(key, {
        range: request.headers,
        onlyIf: request.headers,
      })
    } catch {
      // R2 throws when the requested range can't be satisfied
      const head = await env.VIDEOS.head(key)

      if (!head) {
        return env.ASSETS.fetch(request)
      }

      return new Response(null, {
        status: 416,
        headers: { 'content-range': `bytes */${head.size}` },
      })
    }

    if (!object) {
      // serves the site's 404 page
      return env.ASSETS.fetch(request)
    }

    const headers = getHeaders(object)

    // a precondition such as If-None-Match failed, so there's no body
    if (!('body' in object)) {
      const notModified =
        request.headers.has('if-none-match') ||
        request.headers.has('if-modified-since')

      return new Response(null, { status: notModified ? 304 : 412, headers })
    }

    const range = request.headers.get('range')

    if (range && object.range) {
      // R2 doesn't consistently reject ranges that start past the end
      if (getRangeStart(range) >= object.size) {
        await object.body.cancel()

        return new Response(null, {
          status: 416,
          headers: { 'content-range': `bytes */${object.size}` },
        })
      }

      const { offset, length } = resolveRange(object.range, object.size)

      headers.set(
        'content-range',
        `bytes ${offset}-${offset + length - 1}/${object.size}`,
      )
      return new Response(object.body, { status: 206, headers })
    }

    return new Response(object.body, { headers })
  },
} satisfies ExportedHandler<Env>

function getHeaders(object: R2Object) {
  const headers = new Headers()
  object.writeHttpMetadata(headers)
  headers.set('etag', object.httpEtag)
  headers.set('accept-ranges', 'bytes')
  headers.set('cache-control', CACHE_CONTROL)
  return headers
}

// e.g. 100 for "bytes=100-199", and -1 for suffix ranges such as "bytes=-500"
export function getRangeStart(range: string) {
  const match = range.match(/^bytes=(\d+)-/)
  return match ? Number(match[1]) : -1
}

// R2 reports the range it returned either as an offset and length, or as a suffix
export function resolveRange(range: R2Range, size: number) {
  if ('suffix' in range && range.suffix !== undefined) {
    const length = Math.min(range.suffix, size)
    return { offset: size - length, length }
  }

  const offset =
    'offset' in range && range.offset !== undefined ? range.offset : 0
  const length =
    'length' in range && range.length !== undefined
      ? range.length
      : size - offset

  return { offset, length }
}
