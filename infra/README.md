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

You should now be able to visit `https://dev.johan.li`

## End-to-end tests

```
PRODUCTION_URL=https://dev.johan.li/ pnpm test:e2e
```
