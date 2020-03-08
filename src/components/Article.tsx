import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import articles from '../articles/articles';

export interface StaticContext {
  statusCode: number;
}

interface Props {
  staticContext?: StaticContext;
}

const Article = (props: Props): ReactElement | null => {
  const { slug } = useParams<{ slug: string }>();

  if (articles[slug]) {
    const { title, component: Component } = articles[slug];

    return (
      <>
        <Helmet title={title} />
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
