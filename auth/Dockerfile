FROM node:10.19.0
WORKDIR /auth
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 2000
CMD [ "npm", "run", "dev" ]

