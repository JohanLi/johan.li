import NextImage from 'next/image'
import Link from '../Link'

import johanLi from './johan-li.jpg'

const locationMarkerSolidSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="mr-2 h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
      clipRule="evenodd"
    />
  </svg>
)

const atSymbolSolidSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="mr-2 h-5  w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
      clipRule="evenodd"
    />
  </svg>
)

const linkedInSvg = (
  <svg
    viewBox="0 0 382 382"
    className="h-12 w-12 text-[#2867b2] hover:text-[#20528e]"
    fill="currentColor"
  >
    <path d="M347.445 0H34.555C15.471 0 0 15.471 0 34.555v312.889C0 366.529 15.471 382 34.555 382h312.889C366.529 382 382 366.529 382 347.444V34.555C382 15.471 366.529 0 347.445 0zM118.207 329.844c0 5.554-4.502 10.056-10.056 10.056H65.345c-5.554 0-10.056-4.502-10.056-10.056V150.403c0-5.554 4.502-10.056 10.056-10.056h42.806c5.554 0 10.056 4.502 10.056 10.056v179.441zM86.748 123.432c-22.459 0-40.666-18.207-40.666-40.666S64.289 42.1 86.748 42.1s40.666 18.207 40.666 40.666-18.206 40.666-40.666 40.666zM341.91 330.654a9.247 9.247 0 0 1-9.246 9.246H286.73a9.247 9.247 0 0 1-9.246-9.246v-84.168c0-12.556 3.683-55.021-32.813-55.021-28.309 0-34.051 29.066-35.204 42.11v97.079a9.246 9.246 0 0 1-9.246 9.246h-44.426a9.247 9.247 0 0 1-9.246-9.246V149.593a9.247 9.247 0 0 1 9.246-9.246h44.426a9.247 9.247 0 0 1 9.246 9.246v15.655c10.497-15.753 26.097-27.912 59.312-27.912 73.552 0 73.131 68.716 73.131 106.472v86.846z" />
  </svg>
)

const gitHubSvg = (
  <svg
    viewBox="0 0 16 16"
    className="h-12 w-12 text-gray-700 hover:text-gray-900"
    fill="currentColor"
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
)

export default function Footer() {
  return (
    <footer className="mb-auto pb-12 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="max-w-2xl xl:max-w-3xl">
          <div className="space-y-8 sm:flex sm:space-x-8 sm:space-y-0">
            <NextImage
              src={johanLi}
              className="h-48 w-48 rounded-lg"
              alt="Johan Li"
            />
            <div>
              <h2 className="text-xl font-bold md:text-2xl">About</h2>
              <p className="mt-4">
                I’m Johan Li, a full stack developer. I’ve worked 8 years doing
                web development, 3 of which were at{' '}
                <Link href="https://en.wikipedia.org/wiki/Paradox_Interactive">
                  Paradox Interactive
                </Link>
                .
              </p>
              <p className="mt-4">
                Software development is a complex field. Our nature to think in
                absolutes can lead to disastrous, yet sometimes humorous,
                consequences. I aim to write about the nuances of software while
                sprinkling in facetious remarks.
              </p>
              <p className="mt-4">
                I’m an independent consultant — if you’d like to hire me, reach
                out!
              </p>
              <div className="mt-8 flex items-center justify-between">
                <div className="space-y-2 text-gray-700">
                  <div className="flex">
                    {locationMarkerSolidSvg}
                    <div className="text-sm ">Stockholm, Sweden</div>
                  </div>
                  <div className="flex">
                    {atSymbolSolidSvg}
                    <div className="text-sm ">hi@johan.li</div>
                  </div>
                </div>
                <div className="flex space-x-8">
                  <Link href="https://www.linkedin.com/in/johli/">
                    {linkedInSvg}
                  </Link>
                  <Link href="https://github.com/JohanLi/johan.li">
                    {gitHubSvg}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
