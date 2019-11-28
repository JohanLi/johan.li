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

app.get('*', async (req: Request, res: Response) => {
  try {
    let html = await fs.readFile(
      path.join(__dirname, '../client/index.html'),
      'utf8',
    );

    html = titleAndApp(html, req.url);

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
