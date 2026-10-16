import debounce from 'lodash.debounce'
import { useEffect, useRef, useState } from 'preact/hooks'

import { classNames, getSlug } from '../../utils'

// without this, checks can fail by fractions of a pixel
const SCROLL_POSITION_THRESHOLD_PX = 2
const DEBOUNCE_MS = 100

type Props = {
  slug: string
  title: string
  headings: string[]
}

export default function InPageNavigation({ slug, title, headings }: Props) {
  const headingsRef = useRef<HTMLElement[]>([])
  const anchorsRef = useRef<HTMLAnchorElement[]>([])

  const [section, setSection] = useState(0)
  const [thumb, setThumb] = useState({ y: 0, height: 0 })

  useEffect(() => {
    const articleElement = document.querySelector('article')!

    if (!articleElement) {
      console.error('<article> not found')
      return
    }

    const h1 = articleElement.querySelector('h1')

    if (!h1) {
      console.error('<h1> not found')
      return
    }

    headingsRef.current = [
      h1,
      ...Array.from(articleElement.querySelectorAll('h2')),
    ]
  }, [])

  useEffect(() => {
    if (!headingsRef.current.length || !anchorsRef.current.length) {
      return
    }

    const updateThumb = debounce(
      () => {
        setThumb({
          y:
            anchorsRef.current[section].getBoundingClientRect().top -
            anchorsRef.current[0].getBoundingClientRect().top,
          height: anchorsRef.current[section].offsetHeight + 4,
        })
      },
      DEBOUNCE_MS,
      { maxWait: DEBOUNCE_MS },
    )

    updateThumb()

    window.addEventListener('resize', updateThumb)

    return () => {
      window.removeEventListener('resize', updateThumb)
    }
  }, [section])

  useEffect(() => {
    const onScroll = debounce(
      () => {
        if (!headingsRef.current.length || !anchorsRef.current.length) {
          return
        }

        let section = 0

        for (let i = 0; i < headingsRef.current.length; i += 1) {
          if (
            headingsRef.current[i].getBoundingClientRect().top <=
              SCROLL_POSITION_THRESHOLD_PX &&
            !(
              headingsRef.current[i + 1]?.getBoundingClientRect().top <=
              SCROLL_POSITION_THRESHOLD_PX
            )
          ) {
            section = i
            break
          }
        }

        const atBottom =
          window.scrollY + window.innerHeight >=
          document.body.scrollHeight - SCROLL_POSITION_THRESHOLD_PX

        if (atBottom) {
          setSection(headingsRef.current.length - 1)
        } else {
          setSection(section)
        }
      },
      DEBOUNCE_MS,
      { maxWait: DEBOUNCE_MS },
    )

    onScroll()

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="hidden pt-12 pl-12 lg:block lg:pl-24">
      <nav className="sticky top-12 left-0 border-l-2 border-gray-200 pl-4">
        <a
          ref={(element) => {
            anchorsRef.current[0] = element
          }}
          href={`/${slug}`}
          className={classNames(
            'font-medium transition-colors duration-300',
            section === 0
              ? 'text-purple-800'
              : 'text-gray-500 hover:text-gray-800',
          )}
        >
          {title}
        </a>
        <ul className="mt-2 ml-2 space-y-2">
          {headings.map((heading, i) => (
            <li key={heading}>
              <a
                ref={(element) => {
                  anchorsRef.current[i + 1] = element
                }}
                href={`#${getSlug(heading)}`}
                className={classNames(
                  'text-sm transition-colors duration-300',
                  section === i + 1
                    ? 'text-purple-800'
                    : 'text-gray-500 hover:text-gray-800',
                )}
              >
                {heading}
              </a>
            </li>
          ))}
        </ul>
        <div
          className={classNames(
            'absolute top-0 -left-0.5 h-px w-0.5 origin-top bg-purple-800 transition-transform duration-300',
          )}
          style={{
            transform: `translateY(${thumb.y}px) scaleY(${thumb.height})`,
          }}
        />
      </nav>
    </div>
  )
}
