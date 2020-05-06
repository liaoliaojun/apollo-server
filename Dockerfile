FROM node:lts
COPY ./server
COPY package.json
RUN  yarn --prod
EXPOSE 3000
ENTRYPOINT ["yarn", "run", "start"]
