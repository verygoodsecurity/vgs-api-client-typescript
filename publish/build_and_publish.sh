#!/bin/sh

# Build
npm run build

# Publish
cp package.json ./dist
cd ./dist
echo "//registry.npmjs.org/:_authToken=${NPM_VGS_PUBLISH_TOKEN}" > .npmrc
npm version "${LIB_VERSION}"
npm publish --access public --loglevel verbose