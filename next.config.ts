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
    {
      source: '/gta-online/fingerprint-scanner-simulator',
      destination: '/gta-online/fingerprint-scanner-simulator/index.html',
    },
  ],
} satisfies NextConfig
