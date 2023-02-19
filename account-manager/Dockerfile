FROM node:10.19.0
WORKDIR /account-manager
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "npm", "run", "dev" ]
