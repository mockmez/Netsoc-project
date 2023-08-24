const express = require('express')
const router = express.Router()

router.get('/', (req, res) =>{
    
    const io = req.app.get('io')

    res.render('players/index')

    io.on('connection', (socket) =>{
        console.log('User has connected to socket')

        socket.on('chat message', (arg) =>{
            console.log(`Chat message: ${arg}`)
        })

    })

})

router.get('players-socket.js', (req, res) =>{
    res.setHeader('Content-Type', 'application/javascript')
    res.sendFile(path.join(__dirname, '../..public', 'players-socket.js'))
    
})

router.get('image.json', (req, res) =>{
    res.setHeader('Content-Type', 'application/json')
    res.sendFile(path.join(__dirname, '../..public', 'image.json'))
})

router.get('renderer.js', (req, res) =>{
    res.setHeader('Content-Type', 'application/javascript')
    res.sendFile(path.join(__dirname, '../..public', 'renderer.js'))
})

module.exports = router