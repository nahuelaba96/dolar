FROM node:alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli

RUN npm install

RUN npm run build

CMD [ "node", "server.js" ]

# Exposing server port
EXPOSE 8080