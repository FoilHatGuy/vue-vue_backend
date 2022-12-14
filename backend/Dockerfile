# syntax=docker/dockerfile:1
FROM node:latest
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .
#COPY ["./bin/", "./controller/", "./oauth-passport/", "./routes/", "./app.js", "/app/"]
EXPOSE 3000
CMD [ "npm", "start" ]