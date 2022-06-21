FROM node:16.15-alpine
WORKDIR /client
COPY src ./src
COPY public ./public
COPY package-lock.json ./
COPY package.json ./
RUN npm i
CMD ["npm","start"]