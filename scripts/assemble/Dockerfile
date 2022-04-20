FROM node:17.9-alpine3.15

RUN apk update && \
    apk add bash && \
    npm install typescript -g

WORKDIR /vgs-api-client/

ENTRYPOINT ["bash", "scripts/assemble/run.sh"]
