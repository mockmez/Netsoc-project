require('dotenv').config({path: './.env'})

const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server)
const bodyParser = require('body-parser')

const mongoose = require('mongoose')

app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

//Connecting to Database
mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', (error) =>{
    console.error(error)
})

db.once('open', () =>{
    console.log('Connected to MongoDB')
})


//Setting views
const expressLayouts = require('express-ejs-layouts')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.set('io', io)

app.use(expressLayouts)
app.use(express.static('public'))

//Importing and using routers
const indexRouter = require('./routers/index')
const userRouter = require('./routers/users')
const playerRouter = require('./routers/players')

app.use('/', indexRouter)
app.use('/users', userRouter)
app.use('/players', playerRouter)

server.listen(process.env.PORT || 3000, () =>{
    console.log(`Process listening on 3000`)
})