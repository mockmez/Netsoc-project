const express = require('express')
const router = express.Router()
const passport = require('passport')
const methodOverride = require('method-override')

const userRegisterSchema = require('../model/users')
const userLoginSchema = require('../model/login')
const bodyParser = require('body-parser')

router.get('/', checkAuthenticated, (req, res) =>{
    res.render('users/index')
})

router.get('/login', checkNotAuthenticated, (req, res) =>{
    res.render('users/login', {user: new userLoginSchema()})
})


router.post('/login', checkNotAuthenticated, passport.authenticate('local',{
    failureRedirect: '/users/login',
    successRedirect: '/users/'
}))

router.post('/logout', checkAuthenticated, (req, res) =>{
    req.logout((err) =>{
        if(err)
        console.log('here is an error', err)
    })
    res.redirect('/')
})

router.get('/info', (req, res) =>{
    res.render('users/info')
})

router.get('/contribute', (req, res) =>{
    res.render('users/contribute')
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

module.exports = router