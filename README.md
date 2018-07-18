# node-rest-auth-arangodb

An API with JWT user authentication.

Built with:
* [Nodejs](https://nodejs.org)
* [Express](https://expressjs.com)
* [jwt-simple](https://www.npmjs.com/package/jwt-simple)
* [Passport](http://www.passportjs.org)
* [ArangoDB](https://www.arangodb.com)

FYI: I've only run this project on macOS.


## Requirements

[Node.js](https://nodejs.org/en/).

If you have [Docker](https://www.docker.com/), you can simply run `docker-compose up`
and both the Nodejs app and ArangoDB will be launched in separate containers and ready to use.

You can install ArangoDB on localhost if you prefer, but using docker is really the faster/easier
and more correct way to run it.


## Setup

* `npm install` or `yarn install` (yarn is faster)
* Rename `.example-env` to `.env`, this file sets ENV vars for both the API and docker-compose.

If you're running ArangoDB on localhost, you can manually run the bootstrap script to setup
the database, user, and users collection. Simply run `./scripts/bootstrap.js`, assuming
arangodb is running and arangosh is accessible. If needed, set exec permissions on the file
like `chmod +x scripts/bootstrap.js` (or whatever it is you do on Windows).


## Run

`docker-compose up` or `npm start` if you have ArangoDB running on localhost.

If you pass `-d` to docker-compose (`docker-compose up -d`) it will run in detached mode,
meaning it gives you the terminal back once things have started. After that, you can use either
`docker-compose stop` or `docker-compose down`. The latter will do more cleanup work for you.


## RESTful API endpoints

[Postman](https://www.getpostman.com/) is a great tool for using the API. Otherwise, see the
sample cURL command below.


### POST `/api/users/register`

Register by providing `username` and `password`.

### POST `/api/users/authenticate`

Authenticate by providing `username` and `password`.

### GET `/api/users/memberinfo`

Get user data by providing `token`.

### Using cURL to register a new user
```
curl -X POST \
  http://localhost:8080/api/users/register \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'username=jwoods&password=password'
```

## Credits

Based on https://github.com/clemudensi/nodeJS_backend


## License

MIT
