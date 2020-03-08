import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import articles from '../articles/articles';

const Home = (): ReactElement => {
  const links = articles.map(article => (
    <li key={article.slug}>
      <Link to={article.slug}>{article.title}</Link>
    </li>
  ));

  return <ul>{links}</ul>;
};

export default Home;
