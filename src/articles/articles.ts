import { FunctionComponent } from 'react';

// Haven't found a way to obtain keys when using dynamic imports
const imports = require.context('./', true, /\.tsx$/);

export interface Metadata {
  title: string;
  published: number;
  readingTime: number;
}

interface Article extends Metadata {
  slug: string;
  component: FunctionComponent;
}

const articles = imports
  .keys()
  .map(
    (key): Article => {
      const slug = key.split('./')[1].split('/Index.tsx')[0];

      return {
        slug,
        component: imports(key).default,
        ...imports(key).metadata,
      };
    },
  )
  .sort((a, b) => b.published - a.published);

export default articles;
