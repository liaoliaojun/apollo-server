FROM node:lts
ADD nginx.conf /etc/nginx/conf.d/default.conf
COPY ./server ./app/server
COPY ./live ./app/live
COPY .babelrc ./app/.babelrc
COPY package.json ./app/package.json
WORKDIR /app
RUN yarn
EXPOSE 3000
VOLUME ['/app/live/db.json']
ENTRYPOINT ["yarn", "run", "start"]
