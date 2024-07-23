## Requirements:

Node 20 or Docker installed

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Run app in docker

Add your openAI api key to docker compose file

```bash
#build
docker-compose build

#Run the app
docker-compose up -d
```

## Running the app locally

Create an `.env` file using the example.env template

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test (Not finished, lang chain hard to debug for jest)

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
