# johan.li

![](https://github.com/JohanLi/johan.li/workflows/Deployment/badge.svg)

Personal website.

## About the stack

- Next.js
- Tailwind
- Prism.js
- GitHub actions
- Ansible

Docker is used during local development to serve the website through HTTPS.

## Installation

1. Install Node
2. Install Docker
3. Pick a domain and map it to localhost (e.g., 127.0.0.1 local.johan.li)
4. Generate an SSL certificate for that domain using [mkcert](https://github.com/FiloSottile/mkcert).
   Move the key pair inside the /data/nginx/cert/ directory (where nginx will read from).
5. docker-compose up -d
   npm install
   npm start

If successful, you should be able to visit your chosen domain through HTTPS. (e.g., https://local.johan.li)

## Deployment

Deployments are made to `dev` on push, through a GitHub action. Deployments to `prod` are done manually through the
GitHub UI (workflow_dispatch).

`DEPLOY_KEY`, `ENV_DEV`, and `ENV_PROD` are secrets that need to be provided.
