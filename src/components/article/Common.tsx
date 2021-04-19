import { ReactNode } from 'react';

export const H2 = (props: { children: string }): JSX.Element => (
  <h2 className="mt-12 mb-6 text-xl md:text-2xl font-bold">
    {props.children}
  </h2>
);

export const P = (props: { children: ReactNode }): JSX.Element => (
  <p className="mt-6">
    {props.children}
  </p>
);
