import React from 'react';
import { classNames } from '../../utils';

type Props = {
  src: string;
  width: number;
  height: number;
  alt: string;
  left?: true;
  right?: true;
};

export default function ImageFloat({
  src,
  width,
  height,
  alt,
  left,
  right,
}: Props) {
  return (
    <div
      className={classNames(
        '-mx-4 md:mx-0 lg:-mx-8 my-6',
        left ? 'lg:float-left lg:mr-12' : '',
        right ? 'lg:float-right lg:ml-12' : '',
      )}
    >
      <img src={src} width={width} height={height} alt={alt} className="mx-auto" />
      <div className="text-sm text-gray-400 text-center mt-6 mx-4">{alt}</div>
    </div>
  );
}
