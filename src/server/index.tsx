import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { HelmetProvider, FilledContext } from 'react-helmet-async';

import Main from '../components/Main';

const readFileAsync = promisify(fs.readFile);
const app = express();

app.get('*', async (req, res) => {
  const helmetContext = {} as FilledContext;

  const appHtml = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      <HelmetProvider context={helmetContext}>
        <Main />
      </HelmetProvider>
    </StaticRouter>,
  );

  const html = await readFileAsync(
    path.join(__dirname, '../client/index.html'),
    'utf8',
  );

  const { helmet } = helmetContext;

  res.send(
    html
      .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
      .replace('<title></title>', helmet.title.toString()),
  );
});

const port = 8080;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});
