FROM node:lts-alpine
WORKDIR /app

COPY src src
COPY public public
COPY *.json .
COPY codegenConfig.ts .
COPY vite.config.ts .
COPY index.html .

RUN npm install

CMD npm run dev