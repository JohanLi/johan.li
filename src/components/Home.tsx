import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import articles from '../articles/articles';
import { unixTimestampToMonthYear } from '../articles/utils';

import styles from './home.scss';

const Home = (): ReactElement => {
  const links = articles.map(article => {
    const { title, published, readingTime } = article;

    return (
      <li key={article.slug} className={styles.article}>
        <Link to={article.slug} className={styles.title}>
          <h2>{title}</h2>
        </Link>
        <p className={styles.published}>
          {unixTimestampToMonthYear(published)} · {readingTime} min read
        </p>
      </li>
    );
  });

  return <ul className={styles.articles}>{links}</ul>;
};

export default Home;
