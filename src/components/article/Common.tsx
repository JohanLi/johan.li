import { ReactNode } from 'react';

export const H2 = (props: { children: string }): JSX.Element => (
  <h2 className="mt-12 mb-6 text-xl md:text-2xl font-bold">{props.children}</h2>
);

export const H3 = (props: { children: string }): JSX.Element => (
  <h3 className="mt-12 mb-6 text-base md:text-lg font-bold">
    {props.children}
  </h3>
);

export const P = (props: { children: ReactNode }): JSX.Element => (
  <p className="mt-6">{props.children}</p>
);

export const Ul = (props: { children: ReactNode }): JSX.Element => (
  <ul className="mt-4 list-disc pl-6 space-y-2 text-xs">{props.children}</ul>
);
