require('dotenv').config({path: './.env'})

const express = require('express')
const router = express.Router()
const fs = require('fs')

const adminLoginSchema = require('../model/admin')

router.get('/', (req, res) =>{
    
    const io = req.app.get('io')

    res.render('players/index', {page: 'players'})

    io.on('connection', (socket) =>{
        console.log('User has connected to socket')

        socket.on('chat message', (arg) =>{
            console.log(`Chat message: ${arg}`)
        })

        socket.on('color-change', (arg) =>{
            console.log(arg)
            console.log('Test point 2')
            let data = JSON.parse(fs.readFileSync('./public/image.json', {encoding: 'utf-8'}))
            console.log('Data reached backend')
            data['Image'][arg['index']]['red'] = arg['color']['red']
            data['Image'][arg['index']]['blue'] = arg['color']['blue']
            data['Image'][arg['index']]['green'] = arg['color']['green']
            fs.writeFileSync('./public/image.json', JSON.stringify(data))

            io.emit('client-change', arg)

        })

    })

    

})

router.get('/auth', (req, res) =>{
    res.render('players/auth', {admin: new adminLoginSchema()})
})

router.post('/auth', (req, res) =>{
    if(req.body.name === process.env.ADMIN_USERNAME && req.body.password === process.env.ADMIN_PASSWORD){
        res.render(process.env.ADMIN_URL)
    }
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
    res.sendFile(path.join(__dirname, '../..public', 'image.json'))
})

router.post('/changeCanvas', (req, res) =>{
    const newData = req.body
    fs.writeFileSync('./public/image-json', JSON.stringify(newData))
    res.json({message: 'Data overwritten succesfully'})
})

module.exports = router