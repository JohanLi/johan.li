import { classNames, getSlug, unixTimestampToMonthYear } from './utils';

test('classNames', () => {
  expect(classNames('')).toEqual('');

  expect(classNames('a', '', 'b')).toEqual('a b');
});

test('unixTimestampToMonthYear', () => {
  expect(unixTimestampToMonthYear(0)).toEqual('January, 1970');
  expect(unixTimestampToMonthYear(1640991599)).toEqual('December, 2021');
  expect(unixTimestampToMonthYear(1645392706)).toEqual('February, 2022');
});

describe('getSlug', () => {
  it('applies lowercase', () => {
    expect(getSlug('HelloWorld')).toEqual('helloworld');
  });

  it('replaces spaces with hyphens', () => {
    expect(getSlug('hello world good morning')).toEqual('hello-world-good-morning');
  });

  it('removes non-alphanumeric characters, except hyphens', () => {
    expect(getSlug('Hello, World!-')).toEqual('hello-world-');
  })
});
