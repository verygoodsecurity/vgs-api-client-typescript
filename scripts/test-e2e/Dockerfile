FROM node:17.9-alpine3.15

RUN apk update && \
    apk add bash

RUN mkdir -p /api-client/

ADD ./scripts/test-e2e /api-client/scripts
ADD ./tests /api-client/tests
ADD ./jest.config.js /api-client/jest.config.js
ADD ./package.test.json /api-client/package.json
ADD ./tsconfig.json /api-client/tsconfig.json

WORKDIR /api-client/

RUN grep -rl 'import { VGS } from "../vgs";' tests | xargs sed -i 's/import { VGS } from \"\.\.\/vgs\";/import { VGS } from \"\@vgs\/api-client\";/g'

ENTRYPOINT ["bash", "./scripts/run.sh"]