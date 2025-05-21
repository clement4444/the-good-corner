FROM node:lts-alpine
WORKDIR /app

COPY src src
COPY *.json .
RUN npm install

CMD npm run dev