FROM nginx:1.19

RUN apt-get update && apt-get install -y --no-install-recommends certbot && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY local.johan.li.crt local.johan.li.key /tmp/
COPY nginx.conf /etc/nginx/

# built-in function that performs envsubst, see https://hub.docker.com/_/nginx
COPY default.conf.template /etc/nginx/templates/

# see https://github.com/nginxinc/docker-nginx/tree/master/stable/alpine
COPY ssl-certificate.sh /docker-entrypoint.d/
RUN chmod +x /docker-entrypoint.d/ssl-certificate.sh

COPY fingerprint-scanner-simulator/ /usr/src/fingerprint-scanner-simulator/
COPY uncharted-waters-2/ /usr/src/uncharted-waters-2/
