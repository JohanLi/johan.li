import { FunctionComponent } from 'react';

// Haven't found a way to obtain keys when using dynamic imports
const imports = require.context('./articles/', true, /\.tsx$/);

const articles: {
  [slug: string]: {
    title: string;
    component: FunctionComponent;
  };
} = {};

imports.keys().forEach(key => {
  const slug = key.split('./')[1].split('/Index.tsx')[0];

  articles[slug] = {
    title: imports(key).title,
    component: imports(key).default,
  };
});

export default articles;
