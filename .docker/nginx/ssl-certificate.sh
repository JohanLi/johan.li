#!/bin/bash

DIR=/etc/letsencrypt/live/$SERVER_NAME/

if [ -d "$DIR" ]; then
  echo "Certificate is already installed"
  exit 0
fi

echo "Setting up the self-signed certificate"

mkdir -p /var/www/certbot
mkdir -p $DIR
cp /tmp/local.johan.li.crt ${DIR}chain.pem
mv /tmp/local.johan.li.crt ${DIR}fullchain.pem
mv /tmp/local.johan.li.key ${DIR}privkey.pem

if [ "$SERVER_NAME" = "local.johan.li" ]; then
  echo "Skipping Let's Encrypt for local development"
  exit 0
fi

echo "Requesting a certificate for $SERVER_NAME from Let's Encrypt"

nginx
rm -rf ${DIR}
certbot certonly --webroot -w /var/www/certbot --agree-tos --email johan@johanli.com --domain $SERVER_NAME --force-renewal --noninteractive
nginx -s stop
