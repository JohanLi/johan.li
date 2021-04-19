import React from 'react';

import * as theRiseOfJavascriptFrameworks from '../../articles/the-rise-of-javascript-frameworks';
import * as sqlInjectionPrevention from '../../articles/sql-injection-prevention';
import * as beingConsiderate from '../../articles/being-considerate';
import * as cargoCultingInSoftware from '../../articles/cargo-culting-in-software';

import { ArticleMetadata } from './articleTypes';

export const articles: {
  [key in string]: {
    Article: () => JSX.Element;
    metadata: ArticleMetadata;
  };
} = {
  'the-rise-of-javascript-frameworks': { ...theRiseOfJavascriptFrameworks },
  'sql-injection-prevention': { ...sqlInjectionPrevention },
  'being-considerate': { ...beingConsiderate },
  'cargo-culting-in-software': { ...cargoCultingInSoftware },
};

interface Props {
  slug: string;
}

export const ArticleLoader = (props: Props): JSX.Element => {
  const { Article } = articles[props.slug];
  return <Article />;
};
