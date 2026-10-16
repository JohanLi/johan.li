import { describe, expect, test } from 'vitest'

import { getRangeStart, resolveRange } from './index'

describe('getRangeStart', () => {
  test('start of a range', () => {
    expect(getRangeStart('bytes=100-199')).toEqual(100)
    expect(getRangeStart('bytes=100-')).toEqual(100)
  })

  test('suffix ranges have no start', () => {
    expect(getRangeStart('bytes=-500')).toEqual(-1)
  })
})

describe('resolveRange', () => {
  test('offset and length', () => {
    expect(resolveRange({ offset: 100, length: 50 }, 1000)).toEqual({
      offset: 100,
      length: 50,
    })
  })

  test('offset only, e.g. bytes=100-', () => {
    expect(resolveRange({ offset: 100 }, 1000)).toEqual({
      offset: 100,
      length: 900,
    })
  })

  test('suffix, e.g. bytes=-100', () => {
    expect(resolveRange({ suffix: 100 }, 1000)).toEqual({
      offset: 900,
      length: 100,
    })
  })

  test('suffix larger than the file', () => {
    expect(resolveRange({ suffix: 5000 }, 1000)).toEqual({
      offset: 0,
      length: 1000,
    })
  })
})
