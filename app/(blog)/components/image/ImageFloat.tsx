import NextImage, { StaticImageData } from 'next/image'

import { classNames } from '../../utils'
import { Caption } from '../article/Caption'

type Props = {
  data: StaticImageData
  width: number
  alt: string
  left?: true
  right?: true
  priority?: true
}

export default function ImageFloat({
  data,
  width,
  alt,
  left,
  right,
  priority,
}: Props) {
  return (
    <div
      className={classNames(
        '-mx-4 my-6 md:mx-0 lg:-mx-8',
        left ? 'lg:float-left lg:mr-12' : '',
        right ? 'lg:float-right lg:ml-12' : '',
      )}
    >
      <div style={{ maxWidth: `${width}px` }} className="mx-auto">
        <NextImage src={data} width={width} alt={alt} priority={priority} />
        <Caption>{alt}</Caption>
      </div>
    </div>
  )
}
