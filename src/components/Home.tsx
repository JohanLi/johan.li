import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import articles from '../articles/articles';

import styles from './home.scss';

const Home = (): ReactElement => {
  const links = articles.map(article => {
    const { title, published, readingTime } = article;

    const date = new Date(published * 1000);
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
      date,
    );
    const year = date.getFullYear();

    return (
      <li key={article.slug} className={styles.article}>
        <Link to={article.slug} className={styles.title}>
          {title}
        </Link>
        <p className={styles.published}>
          {month}, {year} · {readingTime} min read
        </p>
        <p>{article.teaser}</p>
      </li>
    );
  });

  return <ul className={styles.articles}>{links}</ul>;
};

export default Home;
