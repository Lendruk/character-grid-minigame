FROM node:18.16.1-alpine3.18
# RUN mkdir -p /minigame/frontend
COPY ./package*.json ./
COPY ./src ./
RUN npm install
CMD ["npm run", "build"]
WORKDIR /var/www/html/
COPY ./dist ./
