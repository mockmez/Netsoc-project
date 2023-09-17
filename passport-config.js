const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
const UserSchema = require('./model/users')

const customFields = {
    usernameField: 'username',
    passwordField: 'student_id'
}

const verificationCallback = (username, password, done) =>{
    UserSchema.findOne({name: username, student_number: password})
    .then((user) =>{
        if(!user){
            return done(null, false)
        }
        else if(user){
            return done(null, user)
        }
    })
    .catch((err) =>{
        done(err)
    })
}

const strategy = new LocalStrategy(customFields, verificationCallback)

passport.use(strategy)

passport.serializeUser((user, done) =>{
    done(null, user.id)
})

passport.deserializeUser((userID, done) =>{
    UserSchema.findById(userID)
    .then((user) =>{
        done(null, user)
    })
    .catch(err => done(err))
})

module.exports = passport