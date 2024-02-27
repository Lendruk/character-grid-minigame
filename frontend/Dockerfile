FROM node:18.16.1-alpine3.18 as build
WORKDIR /app
COPY ./package*.json ./
COPY ./src ./src
COPY ./vite.config.ts ./
COPY ./index.html ./
COPY ./tsconfig.json ./
COPY ./tailwind.config.js ./
COPY ./tsconfig.node.json ./
COPY ./svelte.config.js ./
COPY ./postcss.config.js ./
RUN npm install
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist /var/www/html
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./mime.types /etc/nginx/mime.types
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
