FROM node:17.9-alpine3.15

RUN apk update && \
    apk add bash

ADD ./scripts/test-e2e /scripts
ADD ./tests /tests

ENTRYPOINT ["bash", "./scripts/run.sh"]