FROM node:10
WORKDIR /usr/src/app
copy package*.json  ./
RUN npm ci --only-production
COPY . .
EXPOSE 8080

CMD node start