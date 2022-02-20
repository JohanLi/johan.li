import React, { useEffect, useState, useRef } from 'react';
import calculateZoom from './calculateZoom';
import { classNames } from '../../utils';

/*
  If zoomSrc is provided:
  - after the original, larger image has been loaded, you can click the smaller image to zoom it.
  - when zooming, the larger image is absolutely positioned on top of the smaller image. During the animation,
    its position as well as scale changes as it enlarges to fit the full screen.
 */

interface Props {
  src: string;
  width: number;
  height: number;
  alt: string;
  zoomSrc?: string;
}

export const Image = (props: Props): JSX.Element => {
  const { src, width, height, alt, zoomSrc } = props;

  const [zoomActive, setZoomActive] = useState(false);
  const [transitionActive, setTransitionActive] = useState(false);
  const [zoomImage, setZoomImage] = useState<HTMLImageElement>();

  const imageElement = useRef<HTMLImageElement>(null);

  const revertTransition = (): void => {
    if (!transitionActive) {
      return;
    }

    setTransitionActive(false);
  };

  const revertTransitionOnEscape = (e: KeyboardEvent) => {
    if (e.key !== 'Escape') {
      return;
    }

    revertTransition();
  };

  useEffect(() => {
    if (!zoomSrc) {
      return;
    }

    const image = document.createElement('img');
    image.src = zoomSrc;
    image.onload = () => setZoomImage(image);
  }, [zoomSrc]);

  useEffect(() => {
    if (!zoomActive) {
      return;
    }

    setTransitionActive(true);
  }, [zoomActive]);

  useEffect(() => {
    if (!transitionActive) {
      return;
    }

    window.addEventListener('scroll', revertTransition);
    window.addEventListener('resize', revertTransition);
    window.addEventListener('keyup', revertTransitionOnEscape);

    return () => {
      window.removeEventListener('scroll', revertTransition);
      window.removeEventListener('resize', revertTransition);
      window.removeEventListener('keyup', revertTransitionOnEscape);
    };
  }, [transitionActive]);

  const paddingBottom = `${(height / width) * 100}%`;

  const image = (
    <div className="-mx-4 md:mx-0 lg:-mx-8 my-12">
      <div
        style={{ width: `${width}px` }}
        className="relative max-w-full mx-auto"
      >
        <div style={{ paddingBottom }}>
          <img
            src={src}
            width={width}
            height={height}
            alt={alt}
            className={classNames(
              'absolute inset-0 md:hidden',
              zoomImage ? 'cursor-zoom-in' : '',
              zoomActive ? 'invisible' : '',
            )}
          />
          <img
            src={src}
            width={width}
            height={height}
            alt={alt}
            className={classNames(
              'absolute inset-0 hidden md:block',
              zoomImage ? 'cursor-zoom-in' : '',
              zoomActive ? 'invisible' : '',
            )}
            ref={imageElement}
            onClick={() => {
              if (!zoomImage) {
                return;
              }

              setZoomActive(true);
            }}
          />
        </div>
      </div>
      <div className="text-sm text-gray-400 text-center mt-6 mx-4">{alt}</div>
    </div>
  );

  if (!zoomImage || !imageElement.current || !zoomActive) {
    return image;
  }

  const { top, left, scale, translateX, translateY } = calculateZoom(
    imageElement.current,
    zoomImage,
  );

  const style = {
    top,
    left,
    transform: transitionActive
      ? `scale(${scale}) translate3d(${translateX}px, ${translateY}px, 0)`
      : 'none',
    width,
    height,
  };

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
        onClick={revertTransition}
        onTransitionEnd={() => {
          if (transitionActive) {
            return;
          }

          setZoomActive(false);
        }}
      />
    </div>
  );

  return (
    <>
      {image}
      {imageTransition}
    </>
  );
};
