# node-rest-auth-arangodb

Creating API with JWT user authentication using the following:

* nodejs
* Express
* jwt
* passport
* ArangoDB


## Requirements

0. Install [ArangoDB](https://www.arangodb.com/)
1. Install [Node.js](https://nodejs.org/en/)

## Configure `/include/config.js`

0. Set JWT secret key
1. Set location to ArangoDB 
2. Set database in ArangoDB

## Install

`npm install`

## Run

0. Make sure ArangoDB is running
1. `node server`


## RESTful API endpoints

### POST `/api/users/register`

Register by providing `username` and `password`.

### POST `/api/users/authenticate`

Authenticate by providing `username` and `password`.

### GET `/api/users/memberinfo`

Get user data by providing `token`.

## Credits

Based on https://github.com/clemudensi/nodeJS_backend

## License

MIT