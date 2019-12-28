import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { HelmetProvider, FilledContext } from 'react-helmet-async';
import { promises as fs } from 'fs';
import { resolve } from 'path';
import { Request, Response } from 'express';

import Main from '../components/Main';
import { StaticContext } from '../components/NotFound';

interface Css {
  content: string;
  hash: string;
}

export const titleAndApp = (html: string, url: string): string => {
  const context = {} as StaticContext;
  const helmetContext = {} as FilledContext;

  const appHtml = ReactDOMServer.renderToString(
    <StaticRouter location={url} context={context}>
      <HelmetProvider context={helmetContext}>
        <Main />
      </HelmetProvider>
    </StaticRouter>,
  );

  if (context.statusCode === 404) {
    return '';
  }

  return html
    .replace('<title></title>', helmetContext.helmet.title.toString())
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
};

const linkRegexp = /<link href="\/styles-([\s\S]*?).css" rel="stylesheet">/;

export const getCss = async (html: string): Promise<Css> => {
  const match = html.match(linkRegexp);

  if (!match) {
    throw Error('HTML doesn´t contain stylesheet with hash suffix!');
  }

  const content = await fs.readFile(
    resolve(__dirname, `../client/styles-${match[1]}.css`),
    'utf8',
  );

  return {
    content,
    hash: match[1],
  };
};

export const inlineCss = (
  html: string,
  css: Css,
  req: Request,
  res: Response,
): string => {
  const { content, hash } = css;

  if (req.cookies['css-loaded'] !== hash) {
    return html;
  }

  res.cookie('css-loaded', hash, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
    secure: true,
  });

  return html.replace(
    `<link href="/styles-${hash}.css" rel="stylesheet">`,
    `<link href="/styles-${hash}.css" rel="stylesheet" media="none"><style>${content}</style>`,
  );
};

export const webfontFirstRender = (
  html: string,
  css: Css,
  req: Request,
): string => {
  if (req.cookies['css-loaded'] !== css.hash) {
    return html;
  }

  return html.replace(
    '<html lang="en">',
    '<html lang="en" class="fontLoaded">',
  );
};
