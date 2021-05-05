FROM node:14-alpine as builder
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

RUN npm run build

FROM nginx:alpine
EXPOSE 3000
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html