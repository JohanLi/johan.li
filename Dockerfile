FROM ubuntu:18.04

WORKDIR /tmp

RUN apt-get update && apt-get install -y software-properties-common
RUN apt-add-repository -y -u ppa:ansible/ansible
RUN apt-get install -y ansible git curl

RUN curl -sL https://deb.nodesource.com/setup_13.x | bash -
RUN apt-get install -y nodejs

RUN apt-get install -y rsync

COPY ./entrypoint.sh /
ENTRYPOINT ["/entrypoint.sh"]
