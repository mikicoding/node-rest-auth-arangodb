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

## HTTPS

* [The LetsEncrypt guide for HTTPS on localhost](https://letsencrypt.org/docs/certificates-for-localhost/)
* [Longer explanation here...](https://stackoverflow.com/questions/20433287/node-js-request-cert-has-expired#answer-29397100)
* [Explanation for `certs/new-certs.sh`](https://stackoverflow.com/questions/26759550/how-to-create-own-self-signed-root-certificate-and-intermediate-ca-to-be-importe)

### For macOS...

[steps originally found here](https://www.bounca.org/tutorials/install_root_certificate.html)

To add:
```
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain ./certs/localhost.crt
```
To remove:
```
sudo security delete-certificate -c "localhost"
```

## License

MIT