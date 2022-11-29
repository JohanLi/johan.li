import { InferGetStaticPropsType } from 'next'
import theStoreThatKeptOnGiving from '../../articles/the-store-that-kept-on-giving'
import howNotToDesignAnSDK from '../../articles/how-not-to-design-an-sdk'
import becomingAnIndependentConsultant from '../../articles/becoming-an-independent-consultant'
import theGoldExploitOfDiabloIII from '../../articles/the-gold-exploit-of-diablo-iii'
import theRiseOfJavascriptFrameworks from '../../articles/the-rise-of-javascript-frameworks'
import sqlInjectionPrevention from '../../articles/sql-injection-prevention'
import beingConsiderate from '../../articles/being-considerate'
import cargoCultingInSoftware from '../../articles/cargo-culting-in-software'
import { getStaticProps } from '../../pages/[slug]'
import { ArticleWithSlug } from './articleTypes'
import { getSlug } from '../../utils'
import ArticleLayout from './ArticleLayout'

export const articles: ArticleWithSlug[] = [
  theStoreThatKeptOnGiving,
  howNotToDesignAnSDK,
  becomingAnIndependentConsultant,
  theGoldExploitOfDiabloIII,
  theRiseOfJavascriptFrameworks,
  sqlInjectionPrevention,
  beingConsiderate,
  cargoCultingInSoftware,
]
  .map((article) => ({
    ...article,
    slug: getSlug(article.title),
  }))
  .sort((a, b) => b.published - a.published)

export default function ArticleLoader({
  slug,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const article = articles.find((article) => article.slug === slug)
  const Body = article.body

  return (
    <ArticleLayout article={article}>
      <Body />
    </ArticleLayout>
  )
}
