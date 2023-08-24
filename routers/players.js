const express = require('express')
const router = express.Router()

router.get('/', (req, res) =>{
    
    const io = req.app.get('io')

    res.render('players/index', {page: 'players'})

    io.on('connection', (socket) =>{
        console.log('User has connected to socket')

        socket.on('chat message', (arg) =>{
            console.log(`Chat message: ${arg}`)
        })

    })

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

module.exports = router