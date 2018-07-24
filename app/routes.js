'use strict'

const JWT = require('./jwt')
const express = require('express')
const apiRoutes = express.Router()


apiRoutes.use(JWT.initialize())
apiRoutes.post('/register', require('./controllers/register'))
apiRoutes.post('/authenticate', require('./controllers/authenticate'))
apiRoutes.get('/memberinfo', JWT.authenticate, require('./controllers/memberinfo'))


module.exports = apiRoutes
