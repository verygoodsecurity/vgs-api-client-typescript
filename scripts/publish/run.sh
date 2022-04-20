#!/bin/bash

set -e

usage() { echo "Required env var '$1' is missing"; exit 1; }

[ -z "${ARTIFACT_REPOSITORY_TOKEN}" ] && usage "ARTIFACT_REPOSITORY_TOKEN" ;

LIB_VERSION=${LIB_VERSION:-0.0.1-alpha.$(date "+%Y%m%d%H%M")}

mkdir -p dist/

# Publish
cp package.json dist/

pushd dist
  echo "//registry.npmjs.org/:_authToken=${ARTIFACT_REPOSITORY_TOKEN}" > .npmrc
  npm version "${LIB_VERSION}" || true
  npm publish --access public --loglevel verbose
popd
