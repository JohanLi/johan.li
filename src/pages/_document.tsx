import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document';

const CLOUDFLARE_WEB_ANALYTICS_TOKEN = process.env.CLOUDFLARE_WEB_ANALYTICS_TOKEN;

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="overflow-y-scroll">
          <Main />
          <NextScript />
          {Boolean(CLOUDFLARE_WEB_ANALYTICS_TOKEN) && (
            <script
              defer
              src='https://static.cloudflareinsights.com/beacon.min.js'
              data-cf-beacon={`{"token": "${CLOUDFLARE_WEB_ANALYTICS_TOKEN}"}`}
            />
          )}
        </body>
      </Html>
    );
  }
}
