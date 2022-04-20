#!/bin/bash

set -e

docker-compose build && \
docker-compose run assemble && \
docker-compose run test