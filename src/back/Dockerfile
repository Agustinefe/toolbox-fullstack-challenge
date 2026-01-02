FROM node:18-slim
WORKDIR /toolbox-fullstack-challenge/back
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .