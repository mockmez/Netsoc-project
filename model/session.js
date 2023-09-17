const mongoose = require('mongoose')

require('dotenv').config()

const UserSchema = new mongoose.Schema({
    username: String,
    student_number: String,
    admin: Boolean
})