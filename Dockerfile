FROM node:lts
ADD nginx.conf /etc/nginx/conf.d/default.conf
COPY ./server ./app/server
COPY .babelrc ./app/babelrc
COPY package.json ./app/package.json
VOLUME ['/app/live']
WORKDIR /app
RUN yarn
EXPOSE 3000
ENTRYPOINT ["yarn", "run", "start"]
