# Build Stage
FROM node:14-alpine3.10 as BUILD

WORKDIR /app

COPY . /app

RUN yarn install
RUN yarn build

# Publish Stage
FROM nginx:1.19-alpine

COPY nginx/default.conf /etc/nginx/conf.d/
COPY --from=BUILD /app/build /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]