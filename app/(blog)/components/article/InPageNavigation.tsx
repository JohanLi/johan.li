'use client'

import debounce from 'lodash.debounce'
import React, { useEffect, useRef, useState } from 'react'

import { classNames, getSlug } from '../../utils'
import Link from '../Link'

// without this, checks can fail by fractions of a pixel
const SCROLL_POSITION_THRESHOLD_PX = 2
const DEBOUNCE_MS = 100

type Props = {
  title: string
  headings: string[]
}

export default function InPageNavigation({ title, headings }: Props) {
  const headingRefs = useRef<HTMLElement[]>([])
  const anchorRefs = useRef<HTMLAnchorElement[]>([])

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

    headingRefs.current = [
      h1,
      ...Array.from(articleElement.querySelectorAll('h2')),
    ]
  }, [])

  useEffect(() => {
    if (!headingRefs.current.length || !anchorRefs.current.length) {
      return
    }

    const updateThumb = debounce(
      () => {
        setThumb({
          y:
            anchorRefs.current[section].getBoundingClientRect().top -
            anchorRefs.current[0].getBoundingClientRect().top,
          height: anchorRefs.current[section].offsetHeight + 4,
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
        if (!headingRefs.current.length || !anchorRefs.current.length) {
          return
        }

        let section = 0

        for (let i = 0; i < headingRefs.current.length; i += 1) {
          if (
            headingRefs.current[i].getBoundingClientRect().top <=
              SCROLL_POSITION_THRESHOLD_PX &&
            !(
              headingRefs.current[i + 1]?.getBoundingClientRect().top <=
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
          setSection(headingRefs.current.length - 1)
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
    <div className="hidden pl-12 pt-12 lg:block lg:pl-24">
      <nav className="sticky left-0 top-12 border-l-2 border-gray-200 pl-4">
        <Link
          ref={(element) => {
            anchorRefs.current[0] = element
          }}
          href={`/${getSlug(title)}`}
          className={classNames(
            'font-medium transition-colors duration-300',
            section === 0
              ? 'text-purple-800'
              : 'text-gray-500 hover:text-gray-800',
          )}
        >
          {title}
        </Link>
        <ul className="ml-2 mt-2 space-y-2">
          {headings.map((heading, i) => (
            <li key={heading}>
              <Link
                ref={(element) => {
                  anchorRefs.current[i + 1] = element
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
              </Link>
            </li>
          ))}
        </ul>
        <div
          className={classNames(
            'absolute -left-0.5 top-0 h-px w-0.5 origin-top bg-purple-800 transition-transform duration-300',
          )}
          style={{
            transform: `translateY(${thumb.y}px) scaleY(${thumb.height})`,
          }}
        />
      </nav>
    </div>
  )
}
