FROM node:23.11.0-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3500
CMD [ "npm" , "run" , "dev" ]