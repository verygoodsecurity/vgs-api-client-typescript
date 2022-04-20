#!/bin/bash

set -e

usage() { echo "Required env var '$1' is missing"; exit 1; }

[ -z "${LIB_VERSION}" ] && usage "LIB_VERSION" ;

docker-compose build && \
docker-compose run test