#!/bin/bash

set -e

npm install --save-dev --save-exact eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb && \
npm run lint