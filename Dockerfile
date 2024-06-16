FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g vite
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
