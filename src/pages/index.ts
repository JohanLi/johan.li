import { GetStaticProps } from 'next';

import Home from '../components/Home';
import { articles } from '../components/article/ArticleLoader';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      articles: articles.map(({ body, ...rest }) => rest),
    },
  };
};

export default Home;
