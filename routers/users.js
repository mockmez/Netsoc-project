const express = require('express')
const router = express.Router()

const users = []

const userRegisterSchema = require('../model/users')
const userLoginSchema = require('../model/login')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')

router.get('/', (req, res) =>{
    res.render('users/index')
})

router.get('/new', (req, res) =>{
    res.render('users/new', {user: new userRegisterSchema()})
})

router.post('/new', async (req, res) =>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            name: req.body.username,
            password: hashedPassword,
            email: req.body.email
        })
        res.redirect('/')
    }catch{
        res.redirect('/')
    }

    console.log(users[0].password)

})

router.get('/login', (req, res) =>{
    res.render('users/login', {user: new userLoginSchema()})
})

router.post('/login', bodyParser.json(), (req, res) =>{
    res.send('POST called')
    console.log(req.body.username)
    console.log(req.body.password)
})

module.exports = router