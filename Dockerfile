FROM node:20.15.0-alpine

ENV TZ=America/Phoenix

WORKDIR /tmp

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

# Run it
ENTRYPOINT ["node", "/tmp/dist/main"]

#debug mode
# ENTRYPOINT ["npm","run","start:debug"]
