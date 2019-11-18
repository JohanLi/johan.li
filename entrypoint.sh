#!/bin/bash
cp /tmp/.ssh/id_rsa /id_rsa
chmod 0600 /id_rsa
git clone --depth 1 https://github.com/JohanLi/johan.li.git
cd /tmp/johan.li
npm ci
npm run build
cd /tmp/johan.li/.ansible && ansible-playbook -i hosts --private-key /id_rsa webserver.yml
