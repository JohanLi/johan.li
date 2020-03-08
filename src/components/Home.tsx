import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import articles from '../articles/articles';

const Home = (): ReactElement => {
  const links = Object.keys(articles).map(slug => (
    <li key={slug}>
      <Link to={slug}>{articles[slug].title}</Link>
    </li>
  ));

  return <ul>{links}</ul>;
};

export default Home;
