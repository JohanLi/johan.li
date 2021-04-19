import { GetStaticProps } from 'next';

import { Home } from '../components/Home';
import { articles } from '../components/article/ArticleLoader';

export const getStaticProps: GetStaticProps = async () => {
  const articlesMetadata = Object.keys(articles).map((slug) => ({ slug, ...articles[slug].metadata }));

  return {
    props: {
      articles: articlesMetadata.sort((a, b) => b.published - a.published),
    },
  };
}

export default Home;
