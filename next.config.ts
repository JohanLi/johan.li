import type { NextConfig } from 'next'

export default {
  reactStrictMode: true,
  output: 'standalone',
  headers: async () => [
    {
      source: '/:all*(js|wasm|css|jpg|png|webp|ogg|mp3|woff2)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000',
        },
      ],
    },
  ],
  rewrites: async () => [
    {
      source: '/uncharted-waters-2',
      destination: '/uncharted-waters-2/index.html',
    },
  ],
  poweredByHeader: false,
  /*
   For pages that Next.js deems static, an s-maxage of 1 year and ETag are set. However, I've been unable to
   get ETags to properly work with Cloudflare in front.

   As a workaround, I'm overriding s-maxage to 1 hour by exporting `revalidate = 1800`.
   Next.js also sets a stale-while-revalidate of 1 year, but to my best knowledge, Cloudflare doesn't respect this/or
   it serves stale content already by default.
   */
  generateEtags: false,
  images: {
    qualities: [1, 75],
  },
} satisfies NextConfig
