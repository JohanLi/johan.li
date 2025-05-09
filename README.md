# johan.li

![](https://github.com/JohanLi/johan.li/workflows/Tests/badge.svg)

## About the stack

- Next.js
- GitHub Actions
- Terraform
- Fly.io
- Cloudflare

## Getting started

```
pnpm install
pnpm dev
```

Visit http://localhost:3000.

Note: git-lfs needs to be installed. `git lfs install` also needs to be run once – images will otherwise not
be handled by Git LFS.

## Provisioning and deployment

Provisioning is done manually using the `infra/setup.sh` script:

1. Based on the Dockerfile, `flyctl` launches a new app and assigns it a shared IPv4 and a dedicated IPv6.
2. These ip addresses are then used to create a proxied AAAA record in Cloudflare using Terraform.
   - Cloudflare automatically proxies the A record as well — explicitly proxying the A record won't work well with the shared IPv4.

Deployments are done through `flyctl deploy`.

## Testing Dockerfile locally

```
docker build -t johan-li-docker .
docker run -p 3000:3000 johan-li-docker
```

## Why isn't a CMS or a database used for the articles?

If I use a CMS or database, I either have to use existing content models or create/maintain my own.

Since I don't publish articles frequently, the flexibility of "expressing" articles directly using JSX is
well worth the manual overhead for publishing each article.

The workflow will likely be:

- Write articles in Google Docs
- Use a script that converts it to JSX
- Make modifications as necessary

## Notes

`sharp` has been downgraded to 0.32.6 (https://github.com/vercel/next.js/issues/59346). Otherwise, the following
happens:

```
Error: 'sharp' is required to be installed in standalone mode for the image optimization to function correctly
```
