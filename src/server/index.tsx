import { promises as fs } from 'fs';
import path from 'path';
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';

import {
  titleAndApp,
  getCss,
  inlineCss,
  webfontFirstRender,
} from './updateHtml';

const app = express();

app.use(cookieParser());

app.use(
  express.static(path.join(__dirname, '../client'), {
    index: false,
    setHeaders: (res) => {
      res.setHeader('Cache-Control', 'max-age=31536000');
      res.setHeader(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains; preload',
      );
    },
  }),
);

app.get('*', async (req: Request, res: Response) => {
  res.setHeader(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload',
  );
  res.setHeader('Cache-Control', 'no-cache');

  try {
    let html = await fs.readFile(
      path.join(__dirname, '../client/index.html'),
      'utf8',
    );

    html = titleAndApp(html, req.url);

    if (!html) {
      res.sendStatus(404);
      return;
    }

    const css = await getCss(html);
    html = await inlineCss(html, css, req, res);
    html = webfontFirstRender(html, css, req);
    res.send(html);
  } catch (error) {
    res.sendStatus(500);
  }
});

const port = 8080;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});
