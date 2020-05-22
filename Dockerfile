FROM node:lts
ADD nginx.conf /etc/nginx/conf.d/default.conf
RUN mkdir app
COPY ./server ./app/server
COPY .babelrc ./app/babelrc
COPY package.json ./app/package.json
RUN mkdir ./app/live/
VOLUME ['/app/live']
WORKDIR /app
RUN yarn
EXPOSE 3000
ENTRYPOINT ["yarn", "run", "start"]
