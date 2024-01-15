While `dev.johan.li` is used to test the provisioning as well as the deployment,
it is not intended to be long-lived. This is because I'm trying to keep myself
within the free tier of Fly.io as much as possible.

For this reason, provisioning will be triggered manually.

```
brew install flyctl
brew install terraform
flyctl auth login
```

From the project root, run:

```
sh infra/setup.sh
```

Once the DNS records have propagated, run:

```
flyctl certs create dev.johan.li
```

You should now be able to visit `https://dev.johan.li`

## Fly.io Terraform and IPv4

Fly.io's [Terraform provider](https://github.com/fly-apps/terraform-provider-fly) is no longer maintained.
I also found it rather limited. For instance, while Fly.io now charges for a dedicated IPv4,
you can use a shared IPv4 for free. However, the Terraform provider does not support this.

A consequence of shared IPv4 is that it doesn't work with Cloudflare's proxying
("DNS only" vs. "Proxied"). It makes putting my current setup in CI/CD troublesome,
because you need to wait for DNS propagation.

## End-to-end tests

```
PRODUCTION_URL=https://dev.johan.li/ pnpm run test:e2e
```
