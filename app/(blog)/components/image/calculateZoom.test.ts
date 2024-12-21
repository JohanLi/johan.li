import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import calculateZoom from './calculateZoom'

describe('calculateZoom', () => {
  let documentSpy

  beforeEach(() => {
    documentSpy = vi.spyOn(document, 'documentElement', 'get')
  })

  afterEach(() => {
    documentSpy.mockRestore()
  })

  test('position of image relative to the document', () => {
    documentSpy.mockReturnValue({
      scrollTop: 500,
      scrollLeft: 50,
      clientWidth: 1920,
      clientHeight: 1080,
    })

    const image = {
      width: 100,
      height: 100,
      getBoundingClientRect: () => ({
        top: 100,
        left: 80,
      }),
    } as HTMLImageElement

    expect(
      calculateZoom(image, {
        width: 200,
        height: 200,
      }),
    ).toMatchObject({ top: 600, left: 130 })
  })

  test('scales until zoomImage’s width or height is reached', () => {
    documentSpy.mockReturnValue({
      scrollTop: 0,
      scrollLeft: 0,
      clientWidth: 1920,
      clientHeight: 1080,
    })

    const image = {
      width: 100,
      height: 100,
      getBoundingClientRect: () => ({
        top: 0,
        left: 0,
      }),
    } as HTMLImageElement

    expect(
      calculateZoom(image, {
        width: 200,
        height: 200,
      }).scale,
    ).toEqual(2)

    expect(
      calculateZoom(image, {
        width: 350,
        height: 400,
      }).scale,
    ).toEqual(3.5)

    expect(
      calculateZoom(image, {
        width: 480,
        height: 500,
      }).scale,
    ).toEqual(4.8)
  })

  test('offset of zoomImage when image is centered', () => {
    documentSpy.mockReturnValue({
      scrollTop: 0,
      scrollLeft: 0,
      clientWidth: 1920,
      clientHeight: 1080,
    })

    const image = {
      width: 100,
      height: 100,
      getBoundingClientRect: () => ({
        top: 490,
        left: 910,
      }),
    } as HTMLImageElement

    expect(
      calculateZoom(image, {
        width: 200,
        height: 200,
      }),
    ).toMatchObject({ translateX: 0, translateY: 0 })
  })

  test('offset of zoomImage', () => {
    documentSpy.mockReturnValue({
      scrollTop: 0,
      scrollLeft: 0,
      clientWidth: 1920,
      clientHeight: 1080,
    })

    const image = {
      width: 100,
      height: 100,
      getBoundingClientRect: () => ({
        top: 300,
        left: 600,
      }),
    } as HTMLImageElement

    expect(
      calculateZoom(image, {
        width: 200,
        height: 200,
      }),
    ).toMatchObject({ translateX: 155, translateY: 95 })
  })
})
