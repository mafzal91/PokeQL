FROM node:12-alpine
ARG env
WORKDIR /pokeql
ENV NODE_ENV=$env
COPY package.json .
RUN npm install --production --quiet --no-audit
COPY . .
RUN npm install pm2 @babel/runtime@latest -g
CMD ["pm2-runtime", "/pokeql/server.js"]