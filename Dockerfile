FROM node:8.9

WORKDIR /code
COPY . .

RUN yarn install --force

CMD yarn production 

EXPOSE 8080
