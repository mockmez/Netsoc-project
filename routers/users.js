const express = require('express')
const router = express.Router()


const userRegisterSchema = require('../model/users')
const userLoginSchema = require('../model/login')
const bodyParser = require('body-parser')

router.get('/', (req, res) =>{
    res.render('users/index')
})

router.get('/new', (req, res) =>{
    res.render('users/new', {user: new userRegisterSchema()})
})

router.post('/new', async (req, res) =>{
    try{
        userRegisterSchema.findOne({name: req.body.username, email: req.body.email})
        .then((result) =>{
            if(!result){
                var newUser = new userRegisterSchema({
                    name: req.body.username,
                    password: req.body.password,
                    email: req.body.email
                })
                newUser.save()
                res.redirect('/')
            }
            else{
                res.redirect('/')
            }
        })
    }catch(error){
        console.log(error)
        res.redirect('/')
    }

})

router.get('/login', (req, res) =>{
    res.render('users/login', {user: new userLoginSchema()})
})

router.post('/login', bodyParser.json(), async (req, res) =>{
    try{
        userRegisterSchema.findOne({name: req.body.username, password: req.body.password})
        .then((result) =>{
            if(result){
                res.send(`Welcome ${result.name}`)
            }
            else{
                res.send('No user found !')
            }
        })
    }
    catch(error){
        console.log(error)
    }
})

module.exports = router