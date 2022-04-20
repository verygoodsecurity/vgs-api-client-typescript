#!/bin/bash

set -e

usage() { echo "Required env var '$1' is missing"; exit 1; }

[ -z "${ARTIFACT_REPOSITORY_TOKEN}" ] && usage "ARTIFACT_REPOSITORY_TOKEN" ;
[ -z "${LIB_VERSION}" ] && usage "LIB_VERSION" ;

docker-compose build && \
docker-compose run assemble && \
docker-compose run publish