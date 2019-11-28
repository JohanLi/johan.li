import { promises as fs } from 'fs';
import { mocked } from 'ts-jest/utils';
import { getCss } from './updateHtml';

jest.mock('fs');
jest.mock('path');

describe('updateHtml', () => {
  it('getCss returns content and hash', async () => {
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
});
