#!/bin/bash

set -e

usage() { echo "Required env var '$1' is missing"; exit 1; }

[ -z "${ARTIFACT_REPOSITORY_TOKEN}" ] && usage "ARTIFACT_REPOSITORY_TOKEN" ;
[ -z "${LIB_VERSION}" ] && usage "LIB_VERSION" ;

# Building
npm run build

# Publish
cp package.json dist/
cp jest.config.js dist/
cp tsconfig.json dist/
cp LICENSE dist/
cp README.md dist/

pushd dist
  echo "//registry.npmjs.org/:_authToken=${ARTIFACT_REPOSITORY_TOKEN}" > .npmrc
  npm version "${LIB_VERSION}" || true
  npm publish --access public --loglevel verbose
popd
