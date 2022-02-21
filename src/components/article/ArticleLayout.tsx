import React, { ReactNode } from 'react';

import Layout from '../Layout';
import { unixTimestampToMonthYear } from '../../utils';
import { ArticleMetadata } from './articleTypes';

type Props = {
  metadata: ArticleMetadata;
  children: ReactNode;
};

export default function ArticleLayout({ metadata, children }: Props) {
  const { title, published, readingTime } = metadata;

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
        <div className="-mt-6 pb-24 md:text-lg">{children}</div>
      </div>
    </Layout>
  );
}
