const express = require('express')
const router = express.Router()

const userRegisterSchema = require('../model/users')

router.get('/', (req, res) =>{
    res.render('users/index')
})

router.get('/new', (req, res) =>{
    res.render('users/new', {user: new userRegisterSchema()})
})

router.post('/', (req, res) =>{
    res.render('users/index')
})

module.exports = router