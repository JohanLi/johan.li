import { promises as fs } from 'fs';
import path from 'path';
import { Request, Response } from 'express';

const linkRegexp = /<link href="\/styles-([\s\S]*?).css" rel="stylesheet">/;

const inlineCss = async (
  req: Request,
  res: Response,
  html: string,
): Promise<string> => {
  const match = html.match(linkRegexp);

  if (!match) {
    return html;
  }

  if (req.cookies['css-loaded'] === match[1]) {
    return html.replace(
      '<html lang="en">',
      '<html lang="en" class="fontLoaded">',
    );
  }

  const month = 1000 * 60 * 60 * 24 * 30;

  res.cookie('css-loaded', match[1], {
    maxAge: month,
    httpOnly: true,
    secure: true,
  });

  const css = await fs.readFile(
    path.resolve(__dirname, `../client/styles-${match[1]}.css`),
    'utf8',
  );

  return html.replace(
    match[0],
    `
      <link href="/styles-${match[1]}.css" rel="stylesheet" media="none">
      <style>${css}</style>
    `,
  );
};

export default inlineCss;
