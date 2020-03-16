import articles from './articles';

jest.mock('./imports');

test('Extracts slugs from articles and sorts by latest first', () => {
  expect(articles).toEqual([
    {
      slug: 'slug3',
      component: 'component3',
      title: 'title3',
      published: 1580515300,
    },
    {
      slug: 'slug1',
      component: 'component1',
      title: 'title1',
      published: 1580515200,
    },
    {
      slug: 'slug2',
      component: 'component2',
      title: 'title2',
      published: 1580515200,
    },
  ]);
});
