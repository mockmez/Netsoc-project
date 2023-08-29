const express = require('express')
const router = express.Router()

router.get('/', (req, res) =>{
    res.render('index')
})

router.get('css-files', (req, res) =>{
    res.setHeader('Content-Type', 'text/css')
    res.sendFile(path.join(__dirname, '../..public/assets/css/', 'style.css'))
})

module.exports = router