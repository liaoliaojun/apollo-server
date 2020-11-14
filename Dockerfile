FROM node:lts
COPY ./src ./app/src
COPY ./live ./app/live
COPY package.json ./app/package.json
COPY tsconfig.json ./app/tsconfig.json
COPY yarn.lock ./app/yarn.lock
WORKDIR /app
RUN yarn
EXPOSE 3000
ENTRYPOINT ["yarn", "run", "start"]
