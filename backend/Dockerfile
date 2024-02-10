FROM node:slim
RUN mkdir -p /minigame/backend
WORKDIR /minigame/backend
COPY ./package*.json ./
COPY ./src ./src
COPY ./tsconfig.json ./
RUN npm install
RUN npm run build