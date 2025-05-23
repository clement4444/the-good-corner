FROM node:lts-alpine
WORKDIR /app

COPY *.json .
RUN npm install

COPY index.html .
COPY vite.config.ts .
COPY codegenConfig.ts .
COPY public public
COPY src src


CMD npm run dev