FROM node:8.9 AS build

WORKDIR /code
COPY . .

RUN yarn install --force
RUN yarn global add webpack
RUN yarn add webpack-cli

RUN webpack --config ./webpack/prod.js

FROM nginx:latest 
COPY --from=build /code/ /www/vivalavinyl/

COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY nginx.conf /etc/nginx/nginx.conf

CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
