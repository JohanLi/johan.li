import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Main from '../components/Main';

const readFileAsync = promisify(fs.readFile);
const app = express();

app.get('/', async (_req, res) => {
  const appHtml = ReactDOMServer.renderToString(<Main />);

  const html = await readFileAsync(
    path.join(__dirname, '../client/index.html'),
    'utf8',
  );

  res.send(
    html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`),
  );
});

app.use(
  express.static(path.join(__dirname, '../client'), {
    setHeaders: res => {
      res.set('cache-control', 'max-age=31557600, public');
      res.set(
        'strict-transport-security',
        'max-age=31557600; includeSubDomains; preload',
      );
    },
  }),
);

app.listen(8080);
