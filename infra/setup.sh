set -e

source .env.local

domain=dev.johan.li
#fly.io doesn't allow dots in app names
name=$(echo "$domain" | tr '.' '-')

#flyctl apps destroy "$name"
flyctl --name "$name" launch --copy-config --yes --ha=false

ips=$(flyctl ips list --app "$name")
ipv6=$(echo "$ips" | awk '$1 == "v6" { print $2 }')

export TF_VAR_ipv6=$ipv6
export TF_VAR_domain=$domain
export TF_VAR_CLOUDFLARE_API_TOKEN=$CLOUDFLARE_API_TOKEN

terraform -chdir=infra/ init
terraform -chdir=infra/ apply -input=false -auto-approve
#terraform -chdir=infra/ destroy -auto-approve
