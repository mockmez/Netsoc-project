if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config({path: './.env'})
}

const express = require('express')
const router = express.Router()
const fs = require('fs')
const session = require('express-session')
const mongoStore = require('connect-mongo')
const passport = require('../passport-config');
const userRegisterSchema = require('../model/users')

router.get('/', checkAuthenticated, (req, res) =>{
    
    console.log(req.user)
    res.render('players/index', {page: 'players'})

})

router.post('/', checkAuthenticated, async (req, res) =>{
            
    res.redirect('/players')

})

router.get('js-files', (req, res) =>{
    res.setHeader('Content-Type', 'application/javascript')
    res.sendFile(path.join(__dirname, '../..public', 'players-socket.js'))
    res.sendFile(path.join(__dirname, '../..public', 'renderer.js'))
    res.sendFile(path.join(__dirname, '../public', 'Tile-canvas.js'))
    res.sendFile(path.join(__dirname, '../public', 'Color-palette.js'))
    res.sendFile(path.join(__dirname, '../public', 'index.js'))
    
})

router.get('css-files', (req, res) =>{
    res.setHeader('Content-Type', 'text/css')
    res.sendFile(path.join(__dirname, '../..public', 'styles.css'))
})

router.get('image.json', (req, res) =>{
    res.setHeader('Content-Type', 'application/json')
    res.sendFile(path.join(__dirname, '../..public', 'image-json.json'))
})

function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        next()
    }
    else{
        res.redirect('/users/login')
    }
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('/users/')
    }
    else{
        next()
    }
}

module.exports = (io) =>{
    
    const routerNameSpace = io.of('/players')

    const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
    
    io.engine.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: new mongoStore({
            mongoUrl: process.env.DATABASE_URI,
            collectionName: 'user_sess'
        }),
        cookie: {
            maxAge: 1000 * 60 * 60
        }
    }))

    io.use(wrap(passport.initialize()))
    io.use(wrap(passport.session()))

    routerNameSpace.on('connection', (socket) =>{
    
        socket.on('color-change', (arg) =>{
            
            if(socket.request.session && socket.request.session.passport){
                const userId = socket.request.session.passport.user

                var current_date = Date.now()

                passport.deserializeUser(userId, async(err, user) =>{
                    if(err){
                        console.log(err)
                        return;
                    }

                    console.log('debug time', socket.request.session.passport.user)

                    if(user){
                        
                        if(((current_date - user.timestamp) < 0) || (user.name === process.env.ADMIN_USERNAME && user.student_number === process.env.ADMIN_PASSWORD)){
                            if(!(user.name === process.env.ADMIN_USERNAME && user.student_number === process.env.ADMIN_PASSWORD)){
                                console.log('it has been an hour yet', current_date - user.timestamp)
                                user.timestamp = current_date
                                socket.request.session.passport.user = user;

                                socket.request.session.save((err) =>{
                                    if(err){
                                        console.log(err)
                                        return;
                                    }

                                    console.log('updated user time', user)
                                    console.log('this is the current time')
                                    console.log(new Date(Date.now()))

                                })

                                try{
                                    
                                    userRegisterSchema.findByIdAndUpdate(userId,
                                        {timestamp: current_date},
                                        {new: true}).
                                        then(() => console.log('user updated time')).
                                        catch((error) =>{
                                            console.log(error)
                                        })
                                    userRegisterSchema.findById(userId).then((user) =>{
                                        console.log('this user time', user)
                                    })

                                }
                                catch(err){
                                    console.log(err)
                                }

                            }

                            console.log(arg)
                            console.log('Test point 2')
                            let data = JSON.parse(fs.readFileSync('./public/image.json', {encoding: 'utf-8'}))
                            console.log('Data reached backend')
                            data['Image'][arg['index']]['red'] = arg['color']['red']
                            data['Image'][arg['index']]['blue'] = arg['color']['blue']
                            data['Image'][arg['index']]['green'] = arg['color']['green']
                            fs.writeFileSync('./public/image.json', JSON.stringify(data))
                    
                            routerNameSpace.emit('client-change', arg)

                                
                        }
                        else{
                            console.log('it has not been an hour', (current_date - user.timestamp))
                        }


                    }

                })

            }
            else{
                console.log('error')
            }
    
        })
    
        socket.on('disconnect', () =>{
            console.log('A user has disconnected')
        })
    
    })
    
    
    return router;
}