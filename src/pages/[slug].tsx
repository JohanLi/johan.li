import { GetStaticPaths, GetStaticProps } from 'next';

import ArticleLoader, {
  ArticleLoaderProps,
  articles,
} from '../components/article/ArticleLoader';
import { Slug } from '../components/article/articleTypes';

export const getStaticProps: GetStaticProps<ArticleLoaderProps, Slug> = async ({ params }) => ({
  props: {
    slug: params.slug,
  },
});

export const getStaticPaths: GetStaticPaths<Slug> = async () => ({
  paths: articles.map(({ slug }) => ({ params: { slug } })),
  fallback: false,
});

export default ArticleLoader;
