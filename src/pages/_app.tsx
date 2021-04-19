import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import 'tailwindcss/tailwind.css';
import './prism.css';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon-7b2b909ae59ca59d32fae4656050a4bc.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
