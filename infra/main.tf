variable "CLOUDFLARE_API_TOKEN" {
  type = string
}

variable "domain" {
  type = string
}

variable "ipv6" {
  type = string
}

terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }
}

provider "cloudflare" {
  api_token = var.CLOUDFLARE_API_TOKEN
}

resource "cloudflare_record" "ipv6" {
  zone_id = "ded41ca1db294e8d374c62a06068148f"
  name    = var.domain
  value   = var.ipv6
  type    = "AAAA"
  proxied = true
}
