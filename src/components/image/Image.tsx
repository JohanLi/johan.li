import { useEffect, useState } from 'react'
import NextImage, { StaticImageData } from 'next/future/image'

import calculateZoom from './calculateZoom'
import { classNames } from '../../utils'

/*
  If zoomSrc is provided:
  - after the original, larger image has been loaded, you can click the smaller image to zoom it.
  - when zooming, the larger image is absolutely positioned on top of the smaller image. During the animation,
    its position as well as scale changes as it enlarges to fit the full screen.
 */

type Props = {
  data: StaticImageData
  width: number
  alt: string
  zoomData?: StaticImageData
}

export default function Image({ data, width, alt, zoomData }: Props) {
  const [zoomActive, setZoomActive] = useState(false)
  const [transitionActive, setTransitionActive] = useState(false)
  const [zoomImage, setZoomImage] = useState<HTMLImageElement>()

  const [imageElement, setImageElement] = useState<HTMLImageElement>()

  useEffect(() => {
    if (!zoomData) {
      return
    }

    const preloadZoomImage = document.createElement('img')
    preloadZoomImage.src = zoomData.src
    preloadZoomImage.onload = () => setZoomImage(preloadZoomImage)
    preloadZoomImage.onerror = () => {
      throw Error('Failed to load zoomImage')
    }
  }, [zoomData])

  useEffect(() => {
    if (!zoomActive) {
      return
    }

    setTransitionActive(true)
  }, [zoomActive])

  useEffect(() => {
    if (!transitionActive) {
      return
    }

    const revertTransition = () => {
      setTransitionActive(false)
    }

    const revertTransitionOnEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        revertTransition()
      }
    }

    window.addEventListener('scroll', revertTransition)
    window.addEventListener('resize', revertTransition)

    window.addEventListener('keydown', revertTransitionOnEscape)

    return () => {
      window.removeEventListener('scroll', revertTransition)
      window.removeEventListener('resize', revertTransition)

      window.removeEventListener('keydown', revertTransitionOnEscape)
    }
  }, [transitionActive])

  const paddingBottom = `${(data.height / data.width) * 100}%`

  const image = (
    <div className="-mx-4 md:mx-0 lg:-mx-8 my-12">
      <div
        style={{ width: `${width}px` }}
        className="relative max-w-full mx-auto"
      >
        <div style={{ paddingBottom }}>
          <NextImage
            src={data}
            width={width}
            alt={alt}
            className={classNames(
              'absolute inset-0 md:hidden',
              zoomImage ? 'cursor-zoom-in' : '',
              zoomActive ? 'invisible' : '',
            )}
          />
          <NextImage
            src={data}
            width={width}
            alt={alt}
            className={classNames(
              'absolute inset-0 hidden md:block',
              zoomImage ? 'cursor-zoom-in' : '',
              zoomActive ? 'invisible' : '',
            )}
            onClick={() => {
              if (!zoomImage) {
                return
              }

              setZoomActive(true)
            }}
            onLoadingComplete={(img) => setImageElement(img)}
          />
        </div>
      </div>
      <div className="text-sm text-gray-400 text-center mt-6 mx-4">{alt}</div>
    </div>
  )

  if (!zoomImage || !imageElement || !zoomActive) {
    return image
  }

  const { top, left, scale, translateX, translateY } = calculateZoom(
    imageElement,
    zoomImage,
  )

  const style = {
    top,
    left,
    transform: transitionActive
      ? `scale(${scale}) translate3d(${translateX}px, ${translateY}px, 0)`
      : 'none',
    width: imageElement.width,
    height: imageElement.height,
  }

  const imageTransition = (
    <div>
      <div
        className={classNames(
          'fixed inset-0 z-10 bg-white transition-opacity ease-in-out duration-300',
          transitionActive ? 'opacity-80' : 'opacity-0',
        )}
      />
      <img
        src={zoomImage.src}
        alt={alt}
        style={style}
        className="absolute z-20 transition-transform ease-in-out duration-300 cursor-zoom-out"
        onClick={() => setTransitionActive(false)}
        onTransitionEnd={() => {
          if (transitionActive) {
            return
          }

          setZoomActive(false)
        }}
      />
    </div>
  )

  return (
    <>
      {image}
      {imageTransition}
    </>
  )
}
