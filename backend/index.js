const cors = require('cors')
const express = require('express')
const connection = require('./database/connection')
const routes = require('./routes')

connection.connect().then(_ => {
    const app = express()

    app.use(cors())
    app.use(express.json())
    app.use(routes)

    app.listen(3333)
}).catch(error => {
    console.error('Database connection error:', error)
})
