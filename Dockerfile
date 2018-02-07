FROM node:8

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
RUN npm install

COPY ./tiles /app/tiles
COPY ./*.js /app/

CMD [ "npm", "start" ]
