import Document, { Html, Head, Main, NextScript } from 'next/document'
import Fonts from '../components/Fonts'

const CLOUDFLARE_WEB_ANALYTICS_TOKEN =
  process.env.CLOUDFLARE_WEB_ANALYTICS_TOKEN

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <Fonts />
        </Head>
        <body className="overflow-y-scroll">
          <Main />
          <NextScript />
          {Boolean(CLOUDFLARE_WEB_ANALYTICS_TOKEN) && (
            <script
              defer
              src="https://static.cloudflareinsights.com/beacon.min.js"
              data-cf-beacon={`{"token": "${CLOUDFLARE_WEB_ANALYTICS_TOKEN}"}`}
            />
          )}
        </body>
      </Html>
    )
  }
}
