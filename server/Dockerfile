FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN chmod +x ./node_modules/.bin/ts-node-dev
CMD ["npm", "run", "dev"]
EXPOSE 3000