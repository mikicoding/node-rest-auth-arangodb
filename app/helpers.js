'use strict'

// DB_PORT_INTERNAL = 8529

const {
	JWT_SECRET,
	ARANGODB_DOCKER_NAME,
	DB_USERNAME,
	DB_USERPASS,
	DB_NAME,
} = process.env

const jwtSimple = require('jwt-simple') // <-- I suspect this is a hack
const bcrypt = require('bcryptjs')

const { Database, aql } = require('arangojs')
const db = new Database(`http://${ARANGODB_DOCKER_NAME}:8529`)
db.useDatabase(DB_NAME)
db.useBasicAuth(DB_USERNAME, DB_USERPASS)

const salt = bcrypt.genSaltSync(10)
const second = 1000
const minute = 60 * second
const hour = 60 * minute
const day = 24 * hour


async function userRegister(username, password) {

	const hash = bcrypt.hashSync(password, salt)

	return await db.collection('users').save({ username, password: hash })
}

async function findUser(username) {

    const cursor = await db.query(aql`FOR user IN users
      FILTER user.username==${String(username)}
      RETURN user`)

    return await cursor.next()
}

const passwordMatch = (user, plaintext)=> bcrypt.compareSync(plaintext, user.password)

const okay = (res, message)=> jsonMessage(res, true, message)

const fail = (res, message)=> jsonMessage(res, false, message)

const jsonOkay = (res, json)=> res.json({ success: true, ...json })

const jsonMessage = (res, status, message)=> res.json({ success: status, msg: message })

const jwtDecode = headers=>
	headers && headers.authorization
	? jwtSimple.decode(headers.authorization.replace(/^JWT\s/,''), JWT_SECRET)
	: null

const jwtEncode = (req, username)=> {

	// using data from req is not yet implemented
	const payload = {
		username,
		expiration: Date.now() + 2 * day,
	}

	return { payload, token: `JWT ${jwtSimple.encode(payload, JWT_SECRET)}` }
}

function exitIfMissing(res, username, password) {

    if (!username || !password) {

        fail(res, `Missing ${
        	andify([[!username, 'username'], [!password, 'password']])
        }`)

        return true
    }
    return false
}

function andify(words) {
    const missing = []
    words.forEach(word=> word[0] ? missing.push(word[1]) : 0)

	return missing.join(' and ')
}

module.exports = { andify, exitIfMissing, jwtEncode, jwtDecode, jsonOkay, fail, okay, findUser, userRegister, passwordMatch }
