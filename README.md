# johan.li

![](https://github.com/JohanLi/johan.li/workflows/Tests/badge.svg)

## About the stack

- Astro, with Preact for the interactive parts
- Cloudflare Workers (static assets), with R2 for videos
- GitHub Actions

## Getting started

```
pnpm install
pnpm dev
```

Visit http://localhost:4321.

## How it's built

The site is static. `astro build` outputs HTML, along with optimized images, fonts, CSS and JS, to `dist/`.
Cloudflare Workers serves `dist/` as static assets:

- `wrangler.jsonc` configures URLs to have no trailing slash, and `dist/404.html` to be served for pages that
  don't exist.
- `public/_headers` sets the cache headers. Astro's output has hashed file names and is cached for a year.
  HTML is revalidated using ETags.

Interactive components are Preact islands, e.g. `<InPageNavigation client:load />`. Everything else ships no JS.

### Articles

Each article is a directory in `src/articles/`, named after its slug, containing `index.mdx` and its images.
The frontmatter holds the title, teaser, thumbnail, etc., and is validated by the schema in
`src/content.config.ts`.

The body is Markdown. Paragraphs, headings and links are rendered using the components in
`src/components/article/` — see `src/pages/[slug].astro`. The in-page navigation is generated from the `##`
headings. Anything Markdown can't express, such as an image that can be zoomed or a video, is a component
used directly in the MDX, e.g. `<Image data={agile} width={800} zoomData={agileLarge} alt="…" />`.

### Videos

Workers static assets don't support Range requests, which browsers need in order to seek in a video. Videos are
therefore stored in R2 instead:

- The source files are in `videos/`. Each is served with a hash of its contents in its name, e.g.
  `videos/rush-hour.mp4` at `/videos/rush-hour.1a2b3c4d.mp4`, so that browsers can cache it forever.
- `scripts/upload-videos.sh` uploads them to the `johan-li` bucket under those names. `pnpm preview` and
  `pnpm run deploy` run it, uploading to a local bucket and the actual one respectively. Old versions stay
  in the bucket until they're deleted.
- `worker/index.ts` serves them, with support for Range requests. It's the only Worker code, and only runs
  for `/videos/*`.
- Articles show them using `src/components/video/Video.astro`, which works out the hashed names. It's
  either a clip, which is muted and loops like a GIF, or a video with sound and the browser's controls.

After changing the R2 binding (or anything else in `wrangler.jsonc`), regenerate the Worker's types with
`pnpm types`.

Source material that the encoded videos are made from, such as screen recordings, editor projects and
masters, goes in `raw/`. It's gitignored, so it isn't backed up by git either.

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

This builds the site and Uncharted Waters 2, uploads the videos to R2, and deploys everything using
`wrangler deploy`. The R2 bucket has to be created once, before the first deploy:

```
pnpm wrangler r2 bucket create johan-li
```

The `routes` in `wrangler.jsonc` make the Worker serve `johan.li` as a custom domain, which also manages
its DNS record.

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

Since I don't publish articles frequently, the flexibility of "expressing" articles directly using MDX —
Markdown, with components wherever needed — is well worth the manual overhead for publishing each article.
