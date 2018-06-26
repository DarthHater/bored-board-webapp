FROM node:8.9

WORKDIR /code
COPY . .

RUN yarn install --force

CMD yarn start 

EXPOSE 8080
