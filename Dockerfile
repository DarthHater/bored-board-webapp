FROM node:8.9

WORKDIR /code
COPY . .

RUN yarn install --force

RUN yarn global add gulp

EXPOSE 9999
