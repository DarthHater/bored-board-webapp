FROM node:10.15 AS build

WORKDIR /code
COPY . .

RUN rm -rf node_modules/

RUN yarn install --force
RUN yarn global add webpack@^4.15.1
RUN yarn global add webpack-cli

RUN webpack --config ./webpack/prod.js

FROM nginx:latest
COPY --from=build /code/dist/ /www/vivalavinyl/

COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY nginx.conf /etc/nginx/nginx.conf

CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
