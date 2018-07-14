'use strict'

const { DB_USERNAME, DB_USERPASS } = process.env

const express 	  = require('express')
const apiRoutes 	= express.Router()
const bcrypt      = require('bcryptjs')
const config      = require('./config')
const jwt         = require('jwt-simple')
const auth        = require('./auth')

const second = 1000
const minute = 60 * second
const hour = 60 * minute
const day = 24 * hour

const { Database, aql } = require('arangojs')
const db = new Database(config.db_location)
db.useDatabase(config.db_name)
db.useBasicAuth(DB_USERNAME, DB_USERPASS)

apiRoutes.use(auth.initialize())

apiRoutes.post('/register', (req, res)=> {

  if (!req.body.username || !req.body.password) {
    return res.json({
      success: false,
      msg: 'Please pass username and password.',
    })
  }

  const doc = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
  }

  ;(async ()=> {

    try {
      const { username } = doc
      const cursor = await db.query(aql`FOR x IN users
        FILTER x.username==${String(username)}
        RETURN "true"`)
      const result = await cursor.next()

      if (!result) {
        await db.collection('users').save(doc)
        res.json({ success: true, msg: 'Successful created new user' })
      }

      else {
        res.json({ success: false, msg: 'Username already exists.' })
      }

    } catch (err) {
      console.log(err)
      res.send({ success: false, msg: err.message})
    }

  })()
})

apiRoutes.post('/authenticate', (req, res)=> {

  if (req.body.username && req.body.password) {

    ;(async ()=> {

      try {
        const { username } = req.body
        const cursor = await db.query(aql`FOR x IN users
          FILTER x.username==${String(username)}
          RETURN { username: x.username, password: x.password }`)
        const result = await cursor.next()

        // if user is found and password is correct return a token with payload
        if (result && bcrypt.compareSync(req.body.password, result.password)) {

          const payload = {
            username: result.username,
            expiration: Date.now() + 2 * day,
          }

          const token = jwt.encode(payload, config.jwt_secret)
          res.json({
            success: true,
            token: `JWT ${token}`,
            payload: payload
          })
        }

        else {
          res.send({ success: false, msg: 'Authentication failed.' })
        }

      } catch (err) {
        res.send({ success: false, msg: 'Authentication failed.' })
      }

    })()
  }

  else {
    res.send({ success: false, msg: 'Authentication failed.' })
  }
})

// route to a restricted info (GET /api/users/memberinfo)
apiRoutes.get('/memberinfo', auth.authenticate(), (req, res)=> {

  const decoded = jwt.decode(auth.getToken(req.headers), config.jwt_secret)

  if (decoded) {

    db.query(aql`FOR x IN users
      FILTER x.username==${String(decoded.username)}
      RETURN x`, (err, user, fields)=> {

      if (err) throw err

  		else if (user._result[0]) {
        res.json({
          success: true,
          msg: 'Welcome in the member area, this is your data:',
          data: user._result[0],
        })
  		}

      else {
        return res.send({
          success: false,
          msg: 'Authentication failed. User not found.',
        })
  		}
    })
  }

  else {
    return res.send({ success: false, msg: 'No token provided.' })
  }
})

module.exports = apiRoutes
