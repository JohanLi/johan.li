import { promises as fs } from 'fs';
import { mocked } from 'ts-jest/utils';

import { getCss, inlineCss, webfontFirstRender } from './updateHtml';

jest.mock('fs');
jest.mock('path');
jest.mock('../articles/imports');

describe('getCss', () => {
  test('returns content and hash', async () => {
    const content = 'body {background: #000}';
    const hash = 'qwerty123';

    const html = `
      <head>
        <link href="/styles-${hash}.css" rel="stylesheet">
      </head>
    `;

    mocked(fs.readFile).mockResolvedValue(content);

    expect(await getCss(html)).toEqual({ content, hash });
  });

  test('throws if stylesheet has no hash suffix', async () => {
    const html = `
      <head>
        <link href="/styles.css" rel="stylesheet">
      </head>
    `;

    await expect(getCss(html)).rejects.toThrow();
  });
});

describe('inlineCss', () => {
  const hash = 'qwerty123';

  const css = {
    content: 'body {background: #000}',
    hash,
  };

  const html = `
    <html lang="en">
    <head>
      <link href="/styles-${hash}.css" rel="stylesheet">
    /head>
  `;

  const req = {
    cookies: {},
  } as any;

  const res = {
    cookie: jest.fn(),
  } as any;

  test('inlines css and sets cookie on first visit', () => {
    expect(inlineCss(html, css, req, res)).toEqual(`
    <html lang="en">
    <head>
      <link href="/styles-${hash}.css" rel="stylesheet" media="none"><style>body {background: #000}</style>
    /head>
  `);

    expect(res.cookie).toBeCalledWith('css-loaded', hash, expect.anything());
  });

  test('omits inlined css on subsequent visits', () => {
    const req = {
      cookies: {
        'css-loaded': hash,
      },
    } as any;

    expect(inlineCss(html, css, req, res)).toEqual(html);
  });
});

describe('webfontFirstRender', () => {
  const html = `
    <html lang="en">
    <head></head>
    <body></body>
  `;

  const hash = 'qwerty123';

  const css = {
    content: '',
    hash,
  };

  const req = {
    cookies: {},
  } as any;

  test('leaves HTML untouched on first visit', () => {
    expect(webfontFirstRender(html, css, req as any)).toEqual(html);
  });

  test('returns HTML with "fontLoaded" appended on subsequent visits', () => {
    const req = {
      cookies: {
        'css-loaded': hash,
      },
    };

    expect(webfontFirstRender(html, css, req as any)).toEqual(`
    <html lang="en" class="fontLoaded">
    <head></head>
    <body></body>
  `);
  });
});
