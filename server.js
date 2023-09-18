if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config({path: './.env'})
}

const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server)
const bodyParser = require('body-parser')
const path = require('path')

const userRegisterSchema = require('./model/users')

const session = require('express-session')
const passport = require('./passport-config')

const mongoose = require('mongoose')
const mongoStore = require('connect-mongo')

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

const store = new mongoStore({
    mongoUrl: process.env.DATABASE_URI,
    collectionName: 'user_sess'
})

const admin_store = new mongoStore({
    mongoUrl: process.env.DATABASE_URI,
    collectionName: 'admin_sess'
})

store.on('error', (error) =>{
    console.log('Store errror: ', error)
})

store.once('open', () =>{
    console.log('Connected store for sessions')
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}))

app.use(passport.initialize())
app.use(passport.session())


//Setting views
const expressLayouts = require('express-ejs-layouts')
app.use(expressLayouts)

app.set('view engine', 'ejs')
app.set('layout', 'layouts/layout')
app.set('views', __dirname + '/views')

app.use(express.static(__dirname + '/public'))

//Importing and using routers
const indexRouter = require('./routers/index')
const userRouter = require('./routers/users')
const playerRouter = require('./routers/players')(io)
const adminRouter = require('./routers/admin')

app.use('/', indexRouter)
app.use('/users', userRouter)
app.use('/players', playerRouter)
app.use('/admin', adminRouter)

server.listen(process.env.PORT || 3000, () =>{
    console.log(`Process listening on 3000`)
})