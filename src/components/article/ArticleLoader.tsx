import React from 'react';

import * as theGoldExploitOfDiabloIII from '../../articles/the-gold-exploit-of-diablo-iii';
import * as theRiseOfJavascriptFrameworks from '../../articles/the-rise-of-javascript-frameworks';
import * as sqlInjectionPrevention from '../../articles/sql-injection-prevention';
import * as beingConsiderate from '../../articles/being-considerate';
import * as cargoCultingInSoftware from '../../articles/cargo-culting-in-software';

import { ArticleMetadata } from './articleTypes';

export const articles: {
  [key in string]: {
    default: () => JSX.Element;
    metadata: ArticleMetadata;
  };
} = {
  'the-gold-exploit-of-diablo-iii': { ...theGoldExploitOfDiabloIII },
  'the-rise-of-javascript-frameworks': { ...theRiseOfJavascriptFrameworks },
  'sql-injection-prevention': { ...sqlInjectionPrevention },
  'being-considerate': { ...beingConsiderate },
  'cargo-culting-in-software': { ...cargoCultingInSoftware },
};

type Props = {
  slug: string;
};

export default function ArticleLoader({ slug }: Props) {
  const { default: Article } = articles[slug];
  return <Article />;
}
