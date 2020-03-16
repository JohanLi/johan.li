import React from 'react';
import { create } from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import Header from './Header';

test('logo on the homepage contains an h1 element', () => {
  const tree = create(
    <MemoryRouter initialEntries={['/']}>
      <Header />
    </MemoryRouter>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('logo is not an h1 element outside the homepage', () => {
  const tree = create(
    <MemoryRouter initialEntries={['/some-article']}>
      <Header />
    </MemoryRouter>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
