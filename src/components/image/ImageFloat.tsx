import NextImage, { StaticImageData } from 'next/image'
import { classNames } from '../../utils'

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
        '-mx-4 my-6 md:mx-0 lg:-mx-8',
        left ? 'lg:float-left lg:mr-12' : '',
        right ? 'lg:float-right lg:ml-12' : '',
      )}
    >
      <NextImage src={data} width={width} alt={alt} className="mx-auto" />
      <div className="mx-4 mt-6 text-center text-sm text-gray-400">{alt}</div>
    </div>
  )
}
