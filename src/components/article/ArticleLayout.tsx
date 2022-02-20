import React, { ReactNode } from 'react';

import { Layout } from '../Layout';
import { unixTimestampToMonthYear } from '../../utils';
import { ArticleMetadata } from './articleTypes';

interface Props {
  metadata: ArticleMetadata;
  children: ReactNode;
}

export const ArticleLayout = (props: Props): JSX.Element => {
  const { title, published, readingTime } = props.metadata;

  return (
    <Layout title={title}>
      <div className="max-w-3xl">
        <div className="pt-12 pb-6">
          <h1 className="text-3xl md:text-5xl tracking-tight font-extrabold">
            {title}
          </h1>
          <p className="text-sm text-gray-400 mt-3">
            {unixTimestampToMonthYear(published)} · {readingTime} min read
          </p>
        </div>
        <div className="-mt-6 pb-24 md:text-lg">{props.children}</div>
      </div>
    </Layout>
  );
};
