const cors = require('cors')
const express = require('express')
const connection = require('./database/connection')
const session = require('express-session')
const authenticator = require('./authenticator.js')
const routes = require('./routes')

const SESSION_SECTRET = 'my secret'

connection.connect().then(_ => {
    const app = express()

    app.use(cors())
    app.use(express.json())
    app.use(session({
        secret: SESSION_SECTRET,
        resave: false,
        saveUninitialized: false
    }))
    app.use(authenticator.initialize())
    app.use(authenticator.session())
    app.use(routes)

    app.listen(3333)
}).catch(error => {
    console.error('Database connection error:', error)
})
