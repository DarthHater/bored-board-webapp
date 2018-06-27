FROM node:8.9

WORKDIR /code
COPY . .

RUN yarn install --force

RUN webpack --config ./webpack/prod.js

CMD yarn production 

EXPOSE 8080
