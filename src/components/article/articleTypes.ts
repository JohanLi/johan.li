import { FC } from 'react';

export type Article = {
  thumbnail: string;
  title: string;
  teaser: string;
  published: number;
  readingTime: number;
  headings: string[];
  body: FC,
};

export type Slug = {
  slug: string;
}

export type ArticleWithSlug = Article & Slug;
