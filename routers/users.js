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
                    email: req.body.email,
                    student_number: req.body.student_id
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


router.post('/login', async (req, res) =>{
    try{
        userRegisterSchema.findOne({name: req.body.username, student_number: req.body.student_id})
        .then((result) =>{
            if(result){
                res.redirect('http://localhost:3000/players/')
            }
            else{
                res.redirect('login')
            }
        })
    }
    catch(error){
        console.log(error)
    }
})

router.get('/info', (req, res) =>{
    res.render('users/info')
})

router.get('/contribute', (req, res) =>{
    res.render('users/contribute')
})

module.exports = router