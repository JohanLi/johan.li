import React from 'react';

import { Link } from './Link';
import { unixTimestampToMonthYear } from '../utils';
import { Layout } from './Layout';
import { ArticleMetadata } from './article/articleTypes';

import johanLi from '../../public/johan-li.jpg';

interface Article extends ArticleMetadata {
  slug: string;
}

interface Props {
  articles: Article[];
}

export const Home = (props: Props): JSX.Element => {
  return (
    <Layout isHomePage>
      <div className="grid sm:grid-cols-12 gap-12 py-6 sm:py-12">
        <div className="sm:col-span-4 lg:col-span-3">
          <img
            src={johanLi}
            width={728}
            height={728}
            alt="Johan Li"
            className="w-full shadow-lg rounded-lg"
          />
        </div>
        <div className="sm:col-span-8 lg:col-span-9">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Hi there!
            </h2>
            <p className="text-xl text-gray-500 mt-6">
              My name’s Johan. I began my career in software development building modest campaign sites.
              Ten years later, having climbed the corporate ladder, I became a tech lead, rolling out integrations
              for enterprise clients.
            </p>
            <p className="text-xl text-gray-500 mt-6">
              In 2021, I took a leap of faith, solo-founding my own company in Sweden to create a
              software as a service application. While we all enjoy new challenges and a change of scenery,
              I’m trying to ask myself an important question: Am I <i>just</i> a developer, or can I run a
              small-scale business as well?
            </p>
          </div>
        </div>
      </div>
      <div className="pt-6 sm:pt-12 pb-12 sm:pb-24">
        <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
          Articles
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-6 sm:mt-12">
          {props.articles.map((article) => (
            <Link
              href={`/${article.slug}`}
              className="flex flex-col rounded-lg shadow-lg overflow-hidden transform transition duration-200 hover:scale-105"
              key={article.slug}
            >
              <img src={article.image} className="h-48 w-full object-cover" />
              <div className="flex flex-col p-6 flex-1">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {article.title}
                  </h2>
                  <div className="mt-3 text-gray-500">
                    {article.teaser}
                  </div>
                </div>
                <div className="text-sm text-gray-500 mt-6">
                  {unixTimestampToMonthYear(article.published)} · {article.readingTime} min read
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};
