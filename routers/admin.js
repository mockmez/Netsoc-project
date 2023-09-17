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

router.get('/options', checkAuthenticated, (req, res) =>{
    res.render('admin/options')
})

router.get('/new', checkAuthenticated, (req, res) =>{
    res.render('admin/new', {user: new userRegisterSchema()})
})

router.get('/edit', checkAuthenticated, (req, res) =>{
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

router.get('/reset', checkAuthenticated, (req, res) =>{
    res.render('admin/reset')
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

router.get('/reset', (req, res) =>{
    
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
    
    console.log(req.body)

    if(req.body.username == 'user-1' && req.body.student_id == '12345'){
        console.log('authenticated')
        next()
    }
    else{
        return res.redirect('/')
    }
}

module.exports = router