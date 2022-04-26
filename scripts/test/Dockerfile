FROM node:17.9-alpine3.15

RUN apk update && \
    apk add bash

ADD . /vgs-api-client

WORKDIR /vgs-api-client/

ENTRYPOINT ["bash", "./scripts/test/run.sh"]