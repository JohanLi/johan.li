interface MockArticle {
  default: string;
  metadata: {
    title: string;
    published: number;
  };
}

const mockArticles: { [key: string]: MockArticle } = {
  './slug1/Index.tsx': {
    default: 'component1',
    metadata: {
      title: 'title1',
      published: 1580515200,
    },
  },
  './slug2/Index.tsx': {
    default: 'component2',
    metadata: {
      title: 'title2',
      published: 1580515200,
    },
  },
  './slug3/Index.tsx': {
    default: 'component3',
    metadata: {
      title: 'title3',
      published: 1580515300,
    },
  },
};

const imports = (slug: string): MockArticle => mockArticles[slug];
imports.keys = () => Object.keys(mockArticles);

export default imports;
