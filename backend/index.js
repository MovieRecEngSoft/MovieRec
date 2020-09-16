const cors = require('cors')
const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')

const database = mongoose.connection
const databaseUser = 'movierec'
const databasePassword = 'movierecpassword'
const databaseName = 'movierec'
const databaseUrl = `mongodb+srv://${databaseUser}:${databasePassword}@cluster0.gsuuq.mongodb.net/${databaseName}?retryWrites=true&w=majority`

database.once('open', _ => {
    console.log('Database connected successfully.')
})

database.on('error', error => {
    console.error('connection error:', error)
})

mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(3333)
