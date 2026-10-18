import { useEffect, useState } from 'preact/hooks'

import { classNames } from '../../utils'
import { CaptionPreact } from '../article/CaptionPreact'
import calculateZoom from './calculateZoom'

/*
  Rendered by Image.astro when zoomSrc is provided:
  - after the original, larger image has been loaded, you can click the smaller image to zoom it.
  - when zooming, the larger image is absolutely positioned on top of the smaller image. During the animation,
    its position as well as scale changes as it enlarges to fit the full screen.
 */

type Props = {
  src: string
  srcSet?: string
  width: number
  height: number
  alt: string
  zoomSrc: string
  priority?: boolean
}

export default function ZoomableImage({
  src,
  srcSet,
  width,
  height,
  alt,
  zoomSrc,
  priority,
}: Props) {
  const [zoomActive, setZoomActive] = useState(false)
  const [transitionActive, setTransitionActive] = useState(false)
  const [zoomImage, setZoomImage] = useState<HTMLImageElement>()

  const [imageElement, setImageElement] = useState<HTMLImageElement>()

  useEffect(() => {
    const preloadZoomImage = document.createElement('img')
    preloadZoomImage.src = zoomSrc
    preloadZoomImage.onload = () => setZoomImage(preloadZoomImage)
    preloadZoomImage.onerror = () => {
      throw Error('Failed to load zoomImage')
    }
  }, [zoomSrc])

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

  const paddingBottom = `${(height / width) * 100}%`

  const imageProps = {
    src,
    srcSet,
    width,
    height,
    alt,
    loading: priority ? 'eager' : 'lazy',
    decoding: priority ? 'sync' : 'async',
    fetchPriority: priority ? 'high' : 'auto',
  } as const

  const image = (
    <div className="-mx-4 my-12 md:mx-0 lg:-mx-8">
      <div
        style={{ width: `${width}px` }}
        className="relative mx-auto max-w-full"
      >
        <div style={{ paddingBottom }}>
          <img
            {...imageProps}
            className={classNames(
              'absolute inset-0 md:hidden',
              zoomImage ? 'cursor-zoom-in' : '',
              zoomActive ? 'invisible' : '',
            )}
          />
          <img
            {...imageProps}
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

              requestAnimationFrame(() => {
                setTransitionActive(true)
              })
            }}
            /*
              The image may have finished loading before hydration, in which
              case onLoad never fires.
             */
            ref={(element) => {
              if (element?.complete) {
                setImageElement(element)
              }
            }}
            onLoad={(e) => setImageElement(e.target as HTMLImageElement)}
          />
        </div>
      </div>
      <CaptionPreact>{alt}</CaptionPreact>
    </div>
  )

  if (!zoomImage || !imageElement || !zoomActive) {
    return image
  }

  const { top, left, scale, translateX, translateY } = calculateZoom(
    imageElement,
    zoomImage,
  )

  // Preact 11 no longer adds px to numbers, which browsers then ignore
  const style = {
    top: `${top}px`,
    left: `${left}px`,
    transform: transitionActive
      ? `scale(${scale}) translate3d(${translateX}px, ${translateY}px, 0)`
      : 'none',
    width: `${imageElement.width}px`,
    height: `${imageElement.height}px`,
  }

  const imageTransition = (
    <div>
      <div
        className={classNames(
          'fixed inset-0 z-10 bg-white transition-opacity duration-300 ease-in-out',
          transitionActive ? 'opacity-80' : 'opacity-0',
        )}
      />
      <img
        src={zoomImage.src}
        alt={alt}
        style={style}
        className="absolute z-20 cursor-zoom-out transition-transform duration-300 ease-in-out"
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
