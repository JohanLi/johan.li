import NextImage, { StaticImageData } from 'next/image'
import { unixTimestampToMonthYear } from './utils'
import Link from './components/Link'

type ArticleCardProps = {
  slug: string
  thumbnail: StaticImageData
  thumbnailPriority?: boolean
  title: string
  teaser: string
  published: number
  readingTime: number
}

export function ArticleCard(props: ArticleCardProps) {
  return (
    <>
      <Link
        href={`/${props.slug}`}
        className="flex transform flex-col overflow-hidden rounded-lg shadow-lg transition duration-200 hover:scale-105"
        key={props.slug}
      >
        <NextImage
          src={props.thumbnail}
          alt={props.title}
          className="h-48 w-full object-cover"
          priority={props.thumbnailPriority}
        />
        <div className="flex flex-1 flex-col p-6">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">
              {props.title}
            </h2>
            <div className="mt-3 text-gray-500">{props.teaser}</div>
          </div>
          <div className="mt-6 text-sm text-gray-500">
            {unixTimestampToMonthYear(props.published)} · {props.readingTime}{' '}
            min read
          </div>
        </div>
      </Link>
    </>
  )
}
