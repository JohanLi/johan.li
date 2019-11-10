import React, { useEffect, useState, useRef, ReactElement } from 'react';
import classNames from 'classnames';

import styles from './image.scss';

interface Props {
  src: string;
  srcWidth: number;
  srcHeight: number;
  zoomSrc?: string;
  caption?: string;
}

/*
  three states:
  1. smaller, fitting image. Larger image is loaded in the background, before zoom is available
  2. hides smaller image, and creates a new, absolutely positioned one on top of it
  3. transforms to enlarge the image, fitting the screen. Reacts to scroll, resize and clicking to revert back
 */

const Image = (props: Props): ReactElement => {
  const [active, setActive] = useState(false);
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
    const { matches } = window.matchMedia('(min-width: 768px)');

    if (!matches || !props.zoomSrc) {
      return;
    }

    const image = document.createElement('img');
    image.src = props.zoomSrc;
    image.onload = () => setZoomImage(image);
  }, []);

  useEffect(() => {
    if (!active) {
      return;
    }

    setTransitionActive(true);
  }, [active]);

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

  const imageClass = classNames({
    [styles.image]: true,
    [styles.loaded]: zoomImage,
    [styles.hidden]: active,
  });

  const image = (
    <>
      <img
        src={props.src}
        width={props.srcWidth}
        height={props.srcHeight}
        ref={imageElement}
        className={imageClass}
        onClick={() => {
          if (!zoomImage) {
            return;
          }

          setActive(true);
        }}
      />
      <div className={styles.caption}>{props.caption}</div>
    </>
  );

  if (!zoomImage || !imageElement.current || !active) {
    return image;
  }

  const imageElementClientRect = imageElement.current.getBoundingClientRect();
  const top = imageElementClientRect.top + document.documentElement.scrollTop;
  const left =
    imageElementClientRect.left + document.documentElement.scrollLeft;

  const scaleX =
    Math.min(zoomImage.width, document.documentElement.clientWidth) /
    props.srcWidth;
  const scaleY =
    Math.min(zoomImage.height, document.documentElement.clientHeight) /
    props.srcHeight;
  const scale = Math.min(scaleX, scaleY);

  const translateX =
    ((document.documentElement.clientWidth - props.srcWidth) / 2 -
      imageElementClientRect.left) /
    scale;
  const translateY =
    ((document.documentElement.clientHeight - props.srcHeight) / 2 -
      imageElementClientRect.top) /
    scale;

  const style = {
    top,
    left,
    transform: transitionActive
      ? `scale(${scale}) translate3d(${translateX}px, ${translateY}px, 0)`
      : 'none',
    width: props.srcWidth,
    height: props.srcHeight,
  };

  const imageZoomClass = classNames({
    [styles.active]: transitionActive,
  });

  const imageTransition = (
    <div className={imageZoomClass} onClick={revertTransition}>
      <div className={styles.overlay} />
      <img
        src={zoomImage.src}
        className={styles.absoluteImage}
        style={style}
        onTransitionEnd={() => {
          if (transitionActive) {
            return;
          }

          setActive(false);
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

export default Image;
