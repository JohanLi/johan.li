import React, { ReactNode } from 'react';
import NextLink from 'next/link';

const defaultLinkClass = 'text-indigo-600 hover:text-indigo-900 break-words';

interface Props {
  href: string;
  className?: string;
  external?: boolean;
  children?: ReactNode;
}

export const Link = (props: Props): JSX.Element => {
  const { href, className, external = false, children } = props;

  const linkClass = className !== undefined ? className : defaultLinkClass;

  if (external) {
    return (
      <a href={href} className={linkClass}>
        {children || href}
      </a>
    );
  }

  return (
    <NextLink href={href}>
      <a className={linkClass}>
        {children || href}
      </a>
    </NextLink>
  );
}
