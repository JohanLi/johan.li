import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import articles from '../articles/articles';

import styles from './article.scss';

export interface StaticContext {
  statusCode: number;
}

interface Props {
  staticContext?: StaticContext;
}

const Article = (props: Props): ReactElement | null => {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find(article => article.slug === slug);

  if (article) {
    const { component: Component, title, published, readingTime } = article;

    const date = new Date(published * 1000);
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
      date,
    );
    const year = date.getFullYear();

    return (
      <>
        <Helmet title={title} />
        <div className={styles.heading}>
          <h1>{title}</h1>
          <p className={styles.published}>
            {month}, {year} · {readingTime} min read
          </p>
        </div>
        <Component />
      </>
    );
  }

  // used for server-side rendering
  if (props.staticContext) {
    props.staticContext.statusCode = 404;
  }

  return null;
};

export default Article;
