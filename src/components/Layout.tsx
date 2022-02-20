import React, { ReactNode } from 'react';
import Head from 'next/head';
import { Link } from './Link';

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

export const Layout = (props: Props) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>
          {props.isHomePage
            ? `Johan Li - A software developer’s thoughts`
            : `${props.title} - Johan Li`}
        </title>
        {Boolean(props.metaContent) && (
          <meta name="description" content={props.metaContent} />
        )}
      </Head>
      <nav className="pt-12">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/">
            {Boolean(props.isHomePage) && (
              <h1
                className="text-4xl md:text-5xl tracking-tight font-extrabold"
                style={{ color: logoColor }}
              >
                Johan Li
              </h1>
            )}
            {!Boolean(props.isHomePage) && (
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
        <div className="max-w-7xl mx-auto px-4">{props.children}</div>
      </div>
      <footer></footer>
    </div>
  );
};
