#!/bin/bash

set -e

usage() { echo "Required env var '$1' is missing"; exit 1; }

[ -z "${ARTIFACT_REPOSITORY_TOKEN}" ] && usage "ARTIFACT_REPOSITORY_TOKEN" ;

export LIB_VERSION=${LIB_VERSION:-0.0.1-alpha.$(date "+%Y%m%d%H%M")}

docker-compose build && \
docker-compose run assemble && \
docker-compose run publish