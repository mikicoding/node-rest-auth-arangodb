FROM node:9
WORKDIR /home/node
COPY package.json /home/node
COPY yarn.lock /home/node
COPY app /home/node/app
RUN yarn install --pure-lockfile
CMD npm run start:containerized
