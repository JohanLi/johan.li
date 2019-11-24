# syntax=docker/dockerfile:experimental

FROM ubuntu:18.04

WORKDIR /tmp

RUN apt-get update && apt-get install -y software-properties-common
RUN apt-add-repository -y -u ppa:ansible/ansible
RUN apt-get install -y ansible git curl

RUN curl -sL https://deb.nodesource.com/setup_13.x | bash -
RUN apt-get install -y nodejs

RUN apt-get install -y rsync

# needed for imagemin-webp (https://github.com/imagemin/imagemin-webp/issues/22)
RUN apt-get install -y libglu1 libxi6 libgconf-2-4
RUN apt-get install -y git-lfs
RUN git lfs install

RUN apt-get install -y openssh-client
RUN mkdir -p -m 0600 ~/.ssh && ssh-keyscan -H 178.62.252.132 >> ~/.ssh/known_hosts

COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

RUN --mount=type=ssh cd .ansible && ansible-playbook -i production site.yml
