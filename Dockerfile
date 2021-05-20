FROM node:14.5.0-slim

MAINTAINER YOUR_NAME "YOUR@EMAIL.COM"

# Perform image upgrades to satisfy security policy
RUN apt-get -y update && apt-get -y upgrade

RUN mkdir -p /app
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY public ./public
COPY src ./src
COPY .env* .
COPY jsconfig.json .
COPY next.config.js .

COPY .babelrc .
COPY jest.config.js .
COPY tests ./tests

RUN npm run telemetry-optout
