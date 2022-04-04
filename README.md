# johan.li

![](https://github.com/JohanLi/johan.li/workflows/Deployment/badge.svg)

## About the stack

- Next.js
- Tailwind
- Prism.js
- GitHub actions
- Ansible
- DigitalOcean
- Cloudflare

## Getting started

1. Install Node
2. Install Docker
3. `npm install`, `npm start`, and visit http://localhost:3000

To serve the website through HTTPS during local development: (optional)

1. Pick a domain and map it to localhost (e.g., 127.0.0.1 local.johan.li)
2. Generate an SSL certificate for that domain using [mkcert](https://github.com/FiloSottile/mkcert).
   Move the key pair inside the /data/nginx/cert/ directory (where nginx will read from).
3. `docker-compose up -d` and visit your chosen domain through HTTPS.

## Deployment

Deployments are made to `dev` on push through a GitHub Action. Deployments to
`prod` are manually triggered through the Actions UI.

Three secrets need to be added to this repository:

- `DEPLOY_KEY` — the private key of a user with access to the server
- `ENV_DEV` and `ENV_PROD` — containing the contents of `.env.example`

To avoid unnecessary costs, both dev and prod share a server.
