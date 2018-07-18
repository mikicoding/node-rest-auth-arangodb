#!/usr/bin/arangosh --javascript.execute

// the values here must match with .env

const _user = require('@arangodb/users')

try {
	db._useDatabase('platform')
} catch (err) {
	db._createDatabase('platform')
	db._useDatabase('platform')
}

try {
	_user.save('api_user', 'localhost')
	_user.grantDatabase('api_user', 'platform')
} catch (err) {
	// if error, assume the user already exists
	_user.grantDatabase('api_user', 'platform')
}

try {
	db._create('users')
} catch (err) {
	// if error, the users collection must already exist
}
