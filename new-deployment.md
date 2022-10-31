## Fly

https://fly.io/dashboard

```
fly launch
fly deploy
```

Create A and AAAA records using the IP addresses from `fly ips list` and
make sure they aren’t proxied in Cloudflare.

Then, create an SSL certificate through:

```
fly certs create johan.li
```

## Testing locally

```
docker build -t johan-li-docker .
docker run -p 3000:3000 johan-li-docker
```
