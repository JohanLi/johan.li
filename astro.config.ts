import mdx from '@astrojs/mdx'
import preact from '@astrojs/preact'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, envField, fontProviders } from 'astro/config'

export default defineConfig({
  /*
    URLs have no trailing slash, e.g. /cargo-culting-in-software.
    This matches `html_handling: "drop-trailing-slash"` in wrangler.jsonc.
   */
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  integrations: [mdx(), preact()],
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Roboto Flex',
      cssVariable: '--font-roboto-flex',
      weights: ['100 1000'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
  ],
  env: {
    schema: {
      CLOUDFLARE_WEB_ANALYTICS_TOKEN: envField.string({
        context: 'server',
        access: 'public',
      }),
    },
  },
})
