FROM node:10
WORKDIR /usr/src/app
COPY package*.json  ./
RUN npm ci --only-production
COPY . .
EXPOSE 8080
ENV deepAIKey=21809966-1d3b-44f1-bec8-165fb11f2adc
CMD node start