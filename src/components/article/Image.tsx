import React, { useEffect, useState, useRef } from 'react';

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
  caption: string;
  zoomSrc?: string;
}

export const Image = (props: Props): JSX.Element => {
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

  useEffect(() => {
    if (!props.zoomSrc) {
      return;
    }

    const image = document.createElement('img');
    image.src = props.zoomSrc;
    image.onload = () => setZoomImage(image);
  }, []);

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

    return () => {
      window.removeEventListener('scroll', revertTransition);
      window.removeEventListener('resize', revertTransition);
    };
  }, [transitionActive]);

  let imageClass = 'absolute inset-0';

  if (zoomImage) {
    imageClass += ' cursor-pointer';
  }

  if (zoomActive) {
    imageClass += ' invisible';
  }

  const paddingBottom = `${(props.height / props.width) * 100}%`;

  const image = (
    <div className="-mx-4 md:mx-0 lg:-mx-8 my-12">
      <div
        style={{ width: `${props.width}px` }}
        className="relative max-w-full mx-auto"
      >
        <div style={{ paddingBottom }}>
          <img
            src={props.src}
            width={props.width}
            height={props.height}
            alt={props.caption}
            className={`${imageClass} md:hidden`}
          />
          <img
            src={props.src}
            width={props.width}
            height={props.height}
            alt={props.caption}
            className={`${imageClass} hidden md:block`}
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
    </div>
  );

  if (!zoomImage || !imageElement.current || !zoomActive) {
    return image;
  }

  const imageElementClientRect = imageElement.current.getBoundingClientRect();
  const top = imageElementClientRect.top + document.documentElement.scrollTop;
  const left = imageElementClientRect.left + document.documentElement.scrollLeft;

  const scaleX = Math.min(zoomImage.width, document.documentElement.clientWidth) / props.width;
  const scaleY = Math.min(zoomImage.height, document.documentElement.clientHeight) / props.height;
  const scale = Math.min(scaleX, scaleY);

  const translateX = ((document.documentElement.clientWidth - props.width) / 2 - imageElementClientRect.left) / scale;
  const translateY = ((document.documentElement.clientHeight - props.height) / 2 - imageElementClientRect.top) / scale;

  const style = {
    top,
    left,
    transform: transitionActive ? `scale(${scale}) translate3d(${translateX}px, ${translateY}px, 0)` : 'none',
    width: props.width,
    height: props.height,
    transitionTimingFunction: 'cubic-bezier(0.2, 0, 0.2, 1)',
  };

  const imageTransition = (
    <div onClick={revertTransition}>
      <div className={`fixed inset-0 z-10 bg-white transition-opacity duration-300 ${transitionActive ? 'opacity-80' : 'opacity-0'}`} />
      <img
        src={zoomImage.src}
        style={style}
        className="absolute z-20 transition-transform duration-300"
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
