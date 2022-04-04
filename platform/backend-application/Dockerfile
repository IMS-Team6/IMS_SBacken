FROM node:16.14.2

EXPOSE 8080

WORKDIR /backend-application

COPY package*.json ./

RUN npm install

COPY src src

CMD ["npm", "run", "start"]