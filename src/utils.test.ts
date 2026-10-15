import { describe, expect, test } from 'vitest'

import {
  classNames,
  getSlug,
  htmlToText,
  unixTimestampToMonthYear,
} from './utils'

test('classNames', () => {
  expect(classNames('')).toEqual('')

  expect(classNames('a', '', 'b')).toEqual('a b')
})

test('unixTimestampToMonthYear', () => {
  expect(unixTimestampToMonthYear(0)).toEqual('January, 1970')
  expect(unixTimestampToMonthYear(1640991599)).toEqual('December, 2021')
  expect(unixTimestampToMonthYear(1645392706)).toEqual('February, 2022')
})

describe('getSlug', () => {
  test('applies lowercase', () => {
    expect(getSlug('HelloWorld')).toEqual('helloworld')
  })

  test('replaces spaces with hyphens', () => {
    expect(getSlug('hello world good morning')).toEqual(
      'hello-world-good-morning',
    )
  })

  test('removes non-alphanumeric characters, except hyphens', () => {
    expect(getSlug('Hello, World!-')).toEqual('hello-world-')
  })
})

describe('htmlToText', () => {
  test('removes tags', () => {
    expect(htmlToText('Hello <strong>World</strong>')).toEqual('Hello World')
  })

  test('decodes entities', () => {
    expect(htmlToText('Don&#39;t &amp; won&#x27;t &quot;go&quot;')).toEqual(
      'Don\'t & won\'t "go"',
    )
  })

  test('the slug of a heading containing an apostrophe', () => {
    expect(getSlug(htmlToText('Here&#39;s why'))).toEqual('heres-why')
  })
})
