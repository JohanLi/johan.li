import { StaticImageData } from 'next/image'
import { ReactNode } from 'react'
import { H1 } from './Common'
import { unixTimestampToMonthYear } from '../../utils'
import InPageNavigation from './InPageNavigation'

type Props = {
  thumbnail: StaticImageData
  title: string
  teaser: string
  published: number
  readingTime: number
  headings: string[]
  body: ReactNode
}

export function Article(props: Props) {
  return (
    <article className="mx-auto w-full max-w-7xl justify-between px-4 lg:flex lg:px-8">
      <div className="max-w-2xl xl:max-w-3xl">
        <div className="pt-12 pb-6">
          <H1>{props.title}</H1>
          <p className="mt-3 text-sm text-gray-400">
            {unixTimestampToMonthYear(props.published)} · {props.readingTime}{' '}
            min read
          </p>
        </div>
        <div className="-mt-6 pb-24 md:text-lg">{props.body}</div>
      </div>
      <InPageNavigation title={props.title} headings={props.headings} />
    </article>
  )
}
