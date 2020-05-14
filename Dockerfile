FROM node:lts
ADD nginx.conf /etc/nginx/conf.d/default.conf
COPY ./server ./server
COPY .babelrc .babelrc
COPY package.json package.json
RUN  yarn
EXPOSE 3000
ENTRYPOINT ["yarn", "run", "start"]
