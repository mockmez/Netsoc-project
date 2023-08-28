const express = require('express')
const router = express.Router()


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
        var newUser = new userRegisterSchema({
            name: req.body.username,
            password: hashedPassword,
            email: req.body.email
        })
        newUser.save()
        res.redirect('/')
    }catch{
        res.redirect('/')
    }

})

router.get('/login', (req, res) =>{
    res.render('users/login', {user: new userLoginSchema()})
})

router.post('/login', bodyParser.json(), (req, res) =>{
    userLoginSchema.findOne({name, password}, 'name password', (err, user) =>{
        if(err){
            console.error(error)
            return res.send('Internal Server Error(500)')
        }
        
        if(!user){
            return res.send('Invalid user credentials')
        }
        else{
            return res.send('POST SUCCESSFULLY CALLED!')
        }

    })
    res.send('POST called')
    console.log(req.body.username)
})

module.exports = router