FROM node:9
RUN npm i -g webpack webpack-cli

WORKDIR /app
COPY . /app
RUN npm i

CMD npm run start
