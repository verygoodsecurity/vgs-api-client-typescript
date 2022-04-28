#!/bin/bash

set -e

docker-compose build lint && \
docker-compose run lint
