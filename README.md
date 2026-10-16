# johan.li

![](https://github.com/JohanLi/johan.li/workflows/Tests/badge.svg)

## About the stack

- Astro, with Preact for the interactive parts
- Cloudflare Workers (static assets)
- GitHub Actions

## Getting started

```
pnpm install
pnpm dev
```

Visit http://localhost:4321.

## How it's built

The site is fully static. `astro build` outputs HTML, along with optimized images, fonts, CSS and JS, to `dist/`.
There's no Worker script — Cloudflare Workers serves `dist/` as static assets:

- `wrangler.jsonc` configures URLs to have no trailing slash, and `dist/404.html` to be served for pages that
  don't exist.
- `public/_headers` sets the cache headers. Astro's output has hashed file names and is cached for a year.
  HTML is revalidated using ETags.

Interactive components are Preact islands, e.g. `<InPageNavigation client:load />`. Everything else ships no JS.

### Articles

Each article is a directory in `src/articles/`, named after its slug:

- `meta.ts` – title, teaser, thumbnail, etc.
- `Body.astro` – the article itself

### Uncharted Waters 2

`/uncharted-waters-2` is the build output of https://github.com/JohanLi/uncharted-waters-2.
`scripts/build-uncharted-waters-2.sh` clones and builds it in `.cache/`, then copies the output into
`dist/uncharted-waters-2`. It's only rebuilt when there are new commits. git-lfs needs to be installed,
as that repository uses Git LFS for its assets.

## Deployment

```
pnpm wrangler login
pnpm run deploy
```

This builds the site and Uncharted Waters 2, and deploys them using `wrangler deploy`. The `routes` in
`wrangler.jsonc` make the Worker serve `johan.li` as a custom domain, which also manages its DNS record.

`johan.li` is the only place the site is served. The `workers.dev` URL and preview URLs are disabled in
`wrangler.jsonc`, so there's no public copy of the site elsewhere. To test a build before deploying it, use
`pnpm test:e2e`, which runs against the production build served by `wrangler dev` with the same
configuration.

## Testing

```
pnpm test
pnpm test:e2e
```

The end-to-end tests run against the production build, served by `wrangler dev`.

Some tests are for the deployed site only, e.g. checking cache headers and compression:

```
PRODUCTION_URL=https://johan.li/ pnpm test:e2e
```

## Why isn't a CMS or a database used for the articles?

If I use a CMS or database, I either have to use existing content models or create/maintain my own.

Since I don't publish articles frequently, the flexibility of "expressing" articles directly using JSX-like
Astro components is well worth the manual overhead for publishing each article.

The workflow will likely be:

- Write articles in Google Docs
- Use a script (`scripts/importFromGoogleDocs.ts`) that converts it to `meta.ts` and `Body.astro`
- Make modifications as necessary
