#!/usr/bin/env bash

set -e

[ -z "${LIB_VERSION}" ] && usage "LIB_VERSION" ;

echo "Installing lib from npm ${LIB_VERSION} ..."

set +e
ATTEMPT=1
while [  $ATTEMPT -lt 10 ]; do
  echo "Attempt ${ATTEMPT} ..."

  npm install @vgs/api-client@${LIB_VERSION}

  if [[ $? == 0 ]]; then
    echo "Installed ${LIB_VERSION}"
    break
  fi

  ATTEMPT=$((ATTEMPT+1))

  sleep 5
done
set -e

echo "Running tests"
npm run test
