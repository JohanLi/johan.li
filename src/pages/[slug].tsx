import { GetStaticProps } from 'next';

import { ArticleLoader, articles } from '../components/article/ArticleLoader';

export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: {
    slug: params.slug,
  },
});

export const getStaticPaths = async () => ({
  paths: Object.keys(articles).map((slug) => ({ params: { slug } })),
  fallback: false,
});

export default ArticleLoader;
