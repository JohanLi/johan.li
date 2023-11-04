import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Roboto_Flex } from 'next/font/google'

import './globals.css'
import './prism.css'

const robotoFlex = Roboto_Flex({ subsets: ['latin'] })

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon-7b2b909ae59ca59d32fae4656050a4bc.ico" />
        <style jsx global>{`
          html {
            font-family: ${robotoFlex.style.fontFamily};
          }
        `}</style>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
