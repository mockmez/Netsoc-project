if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config({path: './.env'})
}

const express = require('express')
const userRegisterSchema = require('../model/users')
const adminRegistrationSchema = require('../model/admin')
const router = express.Router()
const passport = require('passport')


router.get('/', checkNotAuthenticated, (req, res) =>{
    res.render('admin/index', {admin: new adminRegistrationSchema()})
})

router.post('/', checkNotAuthenticated, checkAdmin, passport.authenticate('local', {
    failureRedirect: '/users/',
    successRedirect: '/admin/options/'
}))

router.get('/options', checkAuthenticated, checkAdminSession, (req, res) =>{
    res.render('admin/options')
})

router.get('/new', checkAuthenticated, checkAdminSession, (req, res) =>{
    res.render('admin/new', {user: new userRegisterSchema()})
})

router.get('/edit', checkAuthenticated, checkAdminSession, (req, res) =>{
    res.render('admin/edit')
})

router.post('/logout', checkAuthenticated, (req, res) =>{
    
    req.logout((err) =>{
        if(err)
        console.log('this is the error', err)
        else
        res.redirect('/admin/')
    })

})

router.post('/new', (req, res) =>{
    try{
        userRegisterSchema.findOne({name: req.body.username, email: req.body.email})
        .then((result) =>{
            if(!result){
                var newUser = new userRegisterSchema({
                    name: req.body.username,
                    email: req.body.email,
                    student_number: req.body.student_id,
                    timestamp: Date.now() - (3600 * 1000)
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

function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        next()
    }
    else{
        res.redirect('/admin/')
    }
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('/admin/options')
    }
    else{
        next()
    }
}

function checkAdmin(req, res, next){

    if(req.body.username == process.env.ADMIN_USERNAME && req.body.student_id == process.env.ADMIN_PASSWORD){
        next()
    }
    else{
        return res.redirect('/')
    }
}

function checkAdminSession(req, res, next){
    if(req.user.name === process.env.ADMIN_USERNAME && req.user.student_number === process.env.ADMIN_PASSWORD){
        next()
    }
    else{
        return res.redirect('/')
    }
}

module.exports = router