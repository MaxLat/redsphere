FROM node:16.15-alpine
WORKDIR /server
COPY src ./src
COPY .env ./
COPY application.ts ./
COPY index.ts ./
COPY package-lock.json ./
COPY package.json ./
COPY tsconfig.json ./
RUN npm i
RUN npm run build
CMD ["npm","run","start"]