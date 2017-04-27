FROM node:boron

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
RUN npm install

COPY ./*.js /app/

CMD [ "npm", "start" ]
