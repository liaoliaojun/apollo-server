FROM node:lts
ADD nginx.conf /etc/nginx/conf.d/default.conf
ADD /app
WORKDIR /app
ADD ./live
COPY ./server ./server
COPY .babelrc .babelrc
COPY package.json package.json
RUN ls live/
RUN  yarn
EXPOSE 3000
ENTRYPOINT ["yarn", "run", "start"]
