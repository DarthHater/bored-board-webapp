FROM node:8.9 AS build

WORKDIR /code
COPY . .

RUN yarn install --force
RUN yarn global add webpack

RUN webpack --config ./webpack/prod.js

FROM nginx 
COPY --from=build /code/**/* /usr/share/nginx/html
