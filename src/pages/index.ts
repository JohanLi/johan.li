import { GetStaticProps } from 'next'

import Home, { HomeProps } from '../components/Home'
import { articles } from '../components/article/ArticleLoader'

export const getStaticProps: GetStaticProps<HomeProps> = async () => ({
  props: {
    articles: articles.map(({ body, ...rest }) => rest),
  },
})

export default Home
