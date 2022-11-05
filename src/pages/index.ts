import Home from '../components/Home'
import { articles } from '../components/article/ArticleLoader'

export const getStaticProps = async () => ({
  props: {
    articles: articles.map(({ body, ...rest }) => rest),
  },
})

export default Home
