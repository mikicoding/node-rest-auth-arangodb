# node-rest-auth-arangodb

An API with JWT user authentication. Project works out of the box with Docker, or just localhost.
Be sure to follow the setup instructions so that env vars are passed in.

Made using:
* [Nodejs](https://nodejs.org)
* [Express](https://expressjs.com)
* [jwt-simple](https://www.npmjs.com/package/jwt-simple)
* [Passport](http://www.passportjs.org)
* [ArangoDB](https://www.arangodb.com)

_Only tested with macOS_


## Requirements

* [Docker](https://www.docker.com/get-docker)

### Optional Requirements

* [Node.js](https://nodejs.org/en/)


## Setup

* Update `HOSTNAME=your hostname goes here` in file `.env-example`
* Rename `.env-example` to `.env`
* Rename `env/your hostname here` to match your hostname exactly

You can get the hostname of your machine by running `hostname` in the command terminal.


## To Run

* `docker-compose up -d` (or just `docker-compose up`)

When done, `docker-compose stop` or `docker-compose down`.


## To Run On localhost

If you'd rather run node on localhost, then...

* `yarn install`
	* (Yarn is better than npm, do `npm install -g yarn`)
* Copy `.env` to `localhost-env-vars/<hostname>`
	* (If you don't know your hostname, run `hostname` in the terminal)
* `docker-compose up -d database` to run ArangoDB
* `npm start`

If you're going to run ArangoDB on localhost, see `scripts/boostrap.js`, this runs
automatically when using `docker-compose`.


## When Done

`docker-compose down` will clean up for you.

`docker-compose build api` (or just `docker-compose build`) will build the API image
(so you can deploy to Kubernetes or whatnot).


## RESTful API endpoints

[Postman](https://www.getpostman.com/) is a great tool for using the API. Otherwise, see the
sample cURL command below.


### POST `/api/users/register`

Register by providing `username` and `password`.
```
curl -X POST http://localhost:8686/api/users/register -d 'username=jim&password=password'
```


### POST `/api/users/authenticate`

Authenticate by providing `username` and `password`.
```
curl -X POST http://localhost:8686/api/users/authenticate -d 'username=jim&password=password'
```


### GET `/api/users/memberinfo`

Get user data by providing `token`.
```
curl -X GET http://localhost:8686/api/users/memberinfo -H 'Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImppbSIsImV4cGlyYXRpb24iOjE1MzIyNzMxMjQwODV9.uKTvxRwZbRMF_WYA5EmVKGvGUJc3Wx9TTjWR7I7MLy4'
```


## Credits

Based on https://github.com/clemudensi/nodeJS_backend


## License

MIT
