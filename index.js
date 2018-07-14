'use strict'

require('dotenv').config()

const express     = require('express')
const app         = express()
const helmet      = require('helmet')
const bodyParser  = require('body-parser')
const morgan      = require('morgan')
const authRoutes  = require('./lib')
const port        = process.env.PORT || 8080

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(morgan('dev'))

// use security middleware
app.use(helmet())

app.get('/', (req, res)=> {
	res.send(`Hello! The API is at http://localhost:${port}/api`)
})

app.all('/api/*', (req, res, next)=> {
	res.set('Access-Control-Allow-Origin', '*')
	res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT')
	res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
	if (req.method=='OPTIONS') return res.sendStatus(200)
	next()
})

app.get('/api/', (req, res)=> {
	res.send(`Hello! This is the API at http://localhost:${port}/api`)
})

app.use('/api/users', authRoutes)

app.listen(port, ()=> {
	console.log(`API is now running on http://localhost:${port}`)
})
