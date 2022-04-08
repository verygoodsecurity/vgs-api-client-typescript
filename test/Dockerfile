FROM node:17-alpine

ADD . /src

# set version valid version
RUN grep -lr XXX.YYY.ZZZ ./src | xargs sed -i "s/XXX.YYY.ZZZ/0.0.1/g"

WORKDIR /src

RUN npm i -D jest

#ENTRYPOINT ["npm", "test"]
ENTRYPOINT ["echo", "TODO: run node tests"]