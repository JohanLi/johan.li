const calculateZoom = (
  image: HTMLImageElement,
  zoomImage: Pick<HTMLImageElement, 'width' | 'height'>,
) => {
  const { width, height } = image;

  const imageElementClientRect = image.getBoundingClientRect();
  const top = imageElementClientRect.top + document.documentElement.scrollTop;
  const left =
    imageElementClientRect.left + document.documentElement.scrollLeft;

  const scaleX =
    Math.min(zoomImage.width, document.documentElement.clientWidth) / width;
  const scaleY =
    Math.min(zoomImage.height, document.documentElement.clientHeight) / height;
  const scale = Math.min(scaleX, scaleY);

  const translateX =
    ((document.documentElement.clientWidth - width) / 2 -
      imageElementClientRect.left) /
    scale;
  const translateY =
    ((document.documentElement.clientHeight - height) / 2 -
      imageElementClientRect.top) /
    scale;

  return {
    top,
    left,
    scale,
    translateX,
    translateY,
  };
};

export default calculateZoom;
