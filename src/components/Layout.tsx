import React, { ReactNode } from 'react';
import Head from 'next/head';
import Link from './Link';

// footer with dynamic height fixed at bottom https://stackoverflow.com/a/59865099

const logoColor = '#a675a2';

type Props =
  | {
      title: string;
      isHomePage?: false;
      metaContent?: string;
      children: ReactNode;
    }
  | {
      title?: never;
      isHomePage: true;
      metaContent?: string;
      children: ReactNode;
    };

export default function Layout({
  title,
  isHomePage,
  metaContent,
  children,
}: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>
          {isHomePage
            ? `Johan Li - A software developer’s thoughts`
            : `${title} - Johan Li`}
        </title>
        {Boolean(metaContent) && (
          <meta name="description" content={metaContent} />
        )}
      </Head>
      <nav className="pt-12">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/">
            {Boolean(isHomePage) && (
              <h1
                className="text-4xl md:text-5xl tracking-tight font-extrabold"
                style={{ color: logoColor }}
              >
                Johan Li
              </h1>
            )}
            {!Boolean(isHomePage) && (
              <h2
                className="text-2xl md:text-3xl tracking-tight font-extrabold"
                style={{ color: logoColor }}
              >
                Johan Li
              </h2>
            )}
          </Link>
        </div>
      </nav>
      <div className="mb-auto">
        <div className="max-w-7xl mx-auto px-4">{children}</div>
      </div>
      <footer></footer>
    </div>
  );
}
