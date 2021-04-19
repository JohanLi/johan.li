import React from 'react';

import { Link } from './Link';
import { unixTimestampToMonthYear } from '../utils';
import { Layout } from './Layout';

interface Article {
  title: string;
  published: number;
  readingTime: number;
  slug: string;
}

interface Props {
  articles: Article[];
}

export const Home = (props: Props): JSX.Element => {
  return (
    <Layout isHomePage>
      <div className="pt-12 space-y-8">
        {props.articles.map((article) => (
          <div key={article.slug}>
            <Link href={`/${article.slug}`} className="">
              <h2 className="text-2xl md:text-3xl font-extrabold text-lg">
                {article.title}
              </h2>
            </Link>
            <div className="text-sm text-gray-400 mt-1">
              {unixTimestampToMonthYear(article.published)} · {article.readingTime} min read
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};
