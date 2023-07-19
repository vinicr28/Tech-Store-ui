FROM node AS builder

WORKDIR /app

COPY . .

RUN npm install -g @angular/cli

RUN npm i && ng build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist/rampup .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
