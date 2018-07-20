#!/usr/bin/arangosh --javascript.execute


const _user = require('@arangodb/users')

// v must match with your env vars!
const dbname = 'platform'
const dbuser = 'apiuser'
const passwd = 'localhost'
const collectionName = 'users'
// ^ must match with your env vars!

const attempts = 5
let status = null

for (let i=1; i <= attempts && status !== 'success'; i++) {

	try {
		bootstrap()
	} catch (err) {
		//
	}
	try {
		status = verify()
	} catch (err) {
		//
	}

	console.log(`Attempt ${i} of ${attempts}: Bootstrap status: ${status}`)
}

console.log('Bootstrapping complete')

function bootstrap() {

	try {
		db._createDatabase(dbname)
	} catch (err) {}

	try {
		db._useDatabase(dbname)
	} catch (err) {}

	try {
		_user.save(dbuser, passwd)
	} catch (err) {}

	try {
		_user.grantDatabase(dbuser, dbname)
	} catch (err) {}

	try {
		db._create(collectionName)
	} catch (err) {}

	return 'all done'
}

function verify() {

	if (db._name() !== dbname) {
		return 'failure'
	}

	if (db._collection(collectionName) === null) {
		return 'failure'
	}

	if (!_user.isValid(dbuser, passwd)) {
		return 'failure'
	}

	if (_user.permission(dbuser, dbname) !== 'rw') {
		return 'failure'
	}

	return 'success'
}
