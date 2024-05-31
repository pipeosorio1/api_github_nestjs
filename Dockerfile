FROM node:20.11-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm install

ENTRYPOINT [ "npm", "run", "start:dev" ]

COPY . .

#############################################################
FROM node:20.11-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run test

RUN npm run build


#############################################################
FROM node:20.11-alpine AS production

WORKDIR /app

COPY package*.json ./

ENV NODE_ENV=production

RUN npm install --only=production

COPY --from=build /app/dist /app/dist

ENTRYPOINT [ "npm", "run" "start:prod" ]

COPY . .