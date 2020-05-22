FROM node:lts
ADD nginx.conf /etc/nginx/conf.d/default.conf
RUN mkdir app
WORKDIR /app
COPY ./server ./server
COPY .babelrc .babelrc
COPY package.json package.json
RUN mkdir live/
RUN ls live/
RUN  yarn
EXPOSE 3000
ENTRYPOINT ["yarn", "run", "start"]
