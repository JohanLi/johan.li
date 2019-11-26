import { promises as fs } from 'fs';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { HelmetProvider, FilledContext } from 'react-helmet-async';

import inlineCss from './inlineCss';

import Main from '../components/Main';

const app = express();

app.use(cookieParser());

app.get('*', async (req, res) => {
  const helmetContext = {} as FilledContext;

  const appHtml = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      <HelmetProvider context={helmetContext}>
        <Main />
      </HelmetProvider>
    </StaticRouter>,
  );

  let html = await fs.readFile(
    path.join(__dirname, '../client/index.html'),
    'utf8',
  );

  const { helmet } = helmetContext;

  html = html.replace('<title></title>', helmet.title.toString());
  html = await inlineCss(req, res, html);
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`,
  );

  res.send(html);
});

const port = 8080;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});
