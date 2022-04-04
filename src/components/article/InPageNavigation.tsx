import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

import { classNames, getSlug } from '../../utils';
import Link from '../Link';

/*
  some hash links, when clicked, result in 0 < getBoundingClientRect().top < 1
  as opposed to always 0.
 */
const SECTION_THRESHOLD = 1;
const DEBOUNCE_MILLISECONDS = 100;

type Props = {
  title: string;
  headings: string[];
};

export default function InPageNavigation({ title, headings }: Props) {
  const [headingElements, setHeadingElements] = useState<HTMLHeadingElement[]>(
    [],
  );
  const [anchorElements, setAnchorElements] = useState<HTMLAnchorElement[]>([]);

  const [section, setSection] = useState(0);
  const [thumb, setThumb] = useState({ y: 0, height: 0 });

  useEffect(() => {
    const articleElement = document.querySelector('article');

    setHeadingElements([
      articleElement.querySelector('h1'),
      ...Array.from(articleElement.querySelectorAll('h2')),
    ]);

    setAnchorElements(
      Array.from(articleElement.querySelector('nav').querySelectorAll('a')),
    );
  }, []);

  useEffect(() => {
    const updateThumb = debounce(
      () => {
        if (!headingElements.length || !anchorElements.length) {
          return;
        }

        setThumb({
          y:
            anchorElements[section].getBoundingClientRect().top -
            anchorElements[0].getBoundingClientRect().top,
          height: anchorElements[section].offsetHeight + 4,
        });
      },
      DEBOUNCE_MILLISECONDS,
      { maxWait: DEBOUNCE_MILLISECONDS },
    );

    updateThumb();

    window.addEventListener('resize', updateThumb);

    return () => {
      window.removeEventListener('resize', updateThumb);
    };
  }, [section, headingElements, anchorElements]);

  useEffect(() => {
    if (!(headingElements.length && anchorElements.length)) {
      return undefined;
    }

    const onScroll = debounce(
      () => {
        let section = 0;

        for (let i = 0; i < headingElements.length; i += 1) {
          if (
            headingElements[i].getBoundingClientRect().top <=
              SECTION_THRESHOLD &&
            !(
              headingElements[i + 1]?.getBoundingClientRect().top <=
              SECTION_THRESHOLD
            )
          ) {
            section = i;
            break;
          }
        }

        const atBottom =
          window.scrollY + window.innerHeight >= document.body.scrollHeight;

        if (atBottom) {
          setSection(headingElements.length - 1);
        } else {
          setSection(section);
        }
      },
      DEBOUNCE_MILLISECONDS,
      { maxWait: DEBOUNCE_MILLISECONDS },
    );

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [headingElements, anchorElements]);

  return (
    <div className="pl-12 lg:pl-24 pt-12 hidden lg:block">
      <nav className="sticky top-12 left-0 border-l-2 border-gray-200 pl-4">
        <Link
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
        <ul className="mt-2 ml-2 space-y-2">
          {headings.map((heading, i) => (
            <li key={heading}>
              <Link
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
            'bg-purple-800 w-0.5 h-px absolute top-0 -left-0.5 transition-transform duration-300 origin-top',
          )}
          style={{
            transform: `translateY(${thumb.y}px) scaleY(${thumb.height})`,
          }}
        />
      </nav>
    </div>
  );
}
