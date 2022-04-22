#!/bin/bash

set -e

export LIB_VERSION=${LIB_VERSION:-0.0.1-alpha.$(date "+%Y%m%d%H%M")}

docker-compose build test-e2e && \
docker-compose run test-e2e