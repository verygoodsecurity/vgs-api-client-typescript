#!/usr/bin/env bash

set -e

if [[ -n "${LIB_VERSION}" ]]; then
  echo "Installing lib from npm ${LIB_VERSION} ..."

  set +e
  ATTEMPT=1
  while [  $ATTEMPT -lt 60 ]; do
    echo "Attempt ${ATTEMPT} ..."

    npm install vgs_api_client -v ${LIB_VERSION}

    if [[ $? == 0 ]]; then
      echo "Installed ${LIB_VERSION}"
      break
    fi

    ATTEMPT=$((ATTEMPT+1))

    sleep 5
  done
  set -e
else
  echo "Installing lib from local sources"
  npm install
fi

npm test
