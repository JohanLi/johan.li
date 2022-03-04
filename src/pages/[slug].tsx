import { GetStaticProps } from 'next';

import ArticleLoader, { articles } from '../components/article/ArticleLoader';

export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: {
    slug: params.slug,
  },
});

export const getStaticPaths = async () => ({
  paths: articles.map(({ slug }) => ({ params: { slug } })),
  fallback: false,
});

export default ArticleLoader;
