import { classNames } from '../../utils'
import NextImage, { StaticImageData } from 'next/future/image'

type Props = {
  data: StaticImageData
  width: number
  alt: string
  left?: true
  right?: true
}

export default function ImageFloat({ data, width, alt, left, right }: Props) {
  return (
    <div
      className={classNames(
        '-mx-4 md:mx-0 lg:-mx-8 my-6',
        left ? 'lg:float-left lg:mr-12' : '',
        right ? 'lg:float-right lg:ml-12' : '',
      )}
    >
      <NextImage src={data} width={width} alt={alt} className="mx-auto" />
      <div className="text-sm text-gray-400 text-center mt-6 mx-4">{alt}</div>
    </div>
  )
}
