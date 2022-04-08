#!/bin/sh

grep -rl XXX.YYY.ZZZ . | xargs sed -i "s/XXX.YYY.ZZZ/${LIB_VERSION}/g"

# Build
npm run build

# Publish
cp package.json ./dist
cd ./dist
echo "//registry.npmjs.org/:_authToken=${NPM_VGS_PUBLISH_TOKEN}" > .npmrc
npm version "${LIB_VERSION}"
npm publish --access public --loglevel verbose
