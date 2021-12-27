FROM node:14.17.0-alpine

WORKDIR /app

COPY package.json .
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN npm install
RUN npm build

COPY . .

EXPOSE 3000

CMD ["npm", "start"]