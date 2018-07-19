'use strict'

const { ENABLE_HTTPS, API_PORT } = process.env

const fs          = require('fs')
const https       = require('https')
const http        = require('http')
const helmet      = require('helmet')
const bodyParser  = require('body-parser')
const morgan      = require('morgan')
const authRoutes  = require('./routes')
const express     = require('express')
const app         = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(morgan('dev'))

// use security middleware
app.use(helmet())

app.get('/', (req, res)=> {
	res.send(`Hello from API`)
})

app.all('/api/*', (req, res, next)=> {
	res.set('Access-Control-Allow-Origin', '*')
	res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT')
	res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
	if (req.method == 'OPTIONS') return res.sendStatus(200)
	next()
})

app.get('/api/', (req, res)=> {
	res.send(`Hello from API`)
})

app.use('/api/users', authRoutes)


if (JSON.parse(ENABLE_HTTPS)) {
	const ssl = {
		key: fs.readFileSync('./certs/1.key'),
		cert: fs.readFileSync('./certs/root-ca.crt'),
		ca: fs.readFileSync('./certs/intermediate.crt'),
	}
	https.createServer(ssl, app).listen(API_PORT, ()=> {
		console.log('Using HTTPS')
		console.log(`API is now running on port ${API_PORT}`)
	})
}
else {
	app.listen(API_PORT, ()=> {
		console.log('Using HTTP')
		console.log(`API is now running on port ${API_PORT}`)
	})
}

