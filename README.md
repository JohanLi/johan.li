# johan.li
![](https://github.com/JohanLi/johan.li/workflows/Tests/badge.svg) ![](https://github.com/JohanLi/johan.li/workflows/Deployment/badge.svg)

Personal website. React app with server-side rendering. Uses GitHub Actions and Docker for deployment.

## Development

Having installed Node, run the following:

```
npm install
npm start
```

This starts the client app using webpack-dev-server. The server app is light, and excluded to keep the
hot reloading setup simple.

## Deployment

### To localhost

1. Install Docker.
2. Generate a self-signed certificate, which is needed to serve the website through HTTPS.
Taken from https://letsencrypt.org/sv/docs/certificates-for-localhost/#making-and-trusting-your-own-certificates,
run:

        openssl req -x509 -out .docker/nginx/local.johan.li.crt -keyout .docker/nginx/local.johan.li.key \
          -newkey rsa:2048 -nodes -sha256 \
          -subj '/CN=local.johan.li' -extensions EXT -config <( \
           printf "[dn]\nCN=local.johan.li\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:local.johan.li\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")

3. Install `local.johan.li.crt` as a locally trusted root.
4. Map `local.johan.li` to `127.0.0.1` in your hosts file.
5.
        npm run build
        npm run up

### To a remote host

1. Make sure the self-signed certificate is in place. It's needed in order for nginx to start, so certbox
can then obtain a "real" one.
2. Set the environment variable `DOCKER_HOST`.
3. Ensure the remote host has Docker installed (https://get.docker.com/).
4. Increase `MaxSessions` in `/etc/ssh/sshd_config`, see https://github.com/docker/compose/issues/6463.
5.
        npm run build
        npm run up:prod
