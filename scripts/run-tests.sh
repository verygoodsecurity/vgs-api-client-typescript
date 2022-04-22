#!/bin/bash

set -e

docker-compose build test && \
docker-compose run test