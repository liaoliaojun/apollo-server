FROM node:lts
RUN timedatectl set-timezone Asia/Shanghai
ADD nginx.conf /etc/nginx/conf.d/default.conf
COPY ./server ./app/server
COPY .babelrc ./app/.babelrc
COPY package.json ./app/package.json
WORKDIR /app
RUN yarn
EXPOSE 3000
VOLUME ['/app/live/db.json']
ENTRYPOINT ["yarn", "run", "start"]
