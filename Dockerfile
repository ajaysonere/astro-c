FROM node:20.11.0-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:1.23-alpine

WORKDIR /usr/share/nginx/html

COPY --from=build /usr/src/app/dist .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
