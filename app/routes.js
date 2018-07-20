'use strict'

const JWT = require('./jwt')
const passport = require('passport')
const express = require('express')
const apiRoutes = express.Router()

const {
    andify,
    exitIfMissing,
    jwtEncode,
    jwtDecode,
    jsonOkay,
    findUser,
    userRegister,
    okay,
    fail,
    passwordMatch,
} = require('./helpers')

apiRoutes.use(JWT.initialize())
apiRoutes.post('/register', register)
apiRoutes.post('/authenticate', authenticate)
apiRoutes.get('/memberinfo', JWT.authenticate, memberInfo)


async function register(req, res) {
    try {

        const { username, password } = req.body
        if (exitIfMissing(res, username, password)) {
            return
        }

        if (await findUser(username)) {
            return fail(res, 'That username is already taken')
        }

        const regResult = await userRegister(username, password)
        console.log('regResult', regResult)
        return okay(res, 'Registration successful')

    } catch (err) {
        fail(res, err.message)
        console.log(err)
    }
}


async function authenticate(req, res) {
    try {

        const { username, password } = req.body
        if (exitIfMissing(res, username, password)) {
            return
        }

        const user = await findUser(username)
        if (!user) {
            return fail(res, 'Authentication failed, no match')
        }

        if (passwordMatch(user, password)) {
            const { payload, token } = jwtEncode(req, username)
            return jsonOkay(res, { token, payload })
        }
        else {
            return fail(res, 'Invalid credentials')
        }

    } catch (err) {
        fail(res, err.message)
        console.log(err)
    }
}


async function memberInfo(req, res, done) {
    try {

        const { jwt } = req
        if (!jwt || !jwt.username) {
            return fail(res, 'Unknown auth error')
        }

        const user = await findUser(jwt.username)
        return user
        ? jsonOkay(res, { msg:'Welcome', data:user })
        : fail(res, 'Authentication failed. User not found')

    } catch (err) {
        fail(res, err.message)
        console.log(err)
    }
}


module.exports = apiRoutes
