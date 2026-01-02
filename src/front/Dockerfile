FROM node:20-slim
RUN npm i -g serve
WORKDIR /toolbox-fullstack-challenge/front
COPY . .
RUN rm -rf node_modules package-lock.json
RUN npm install
ARG REACT_APP_API_URL
RUN npm run build