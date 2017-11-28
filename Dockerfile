FROM node:8.9

WORKDIR /code
COPY . .

RUN yarn install --force

EXPOSE 8080
