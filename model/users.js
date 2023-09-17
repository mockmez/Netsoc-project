const mongoose = require('mongoose')

const userRegisterSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    student_number:{
        type: String,
        required: true
    },
    timestamp:{
        type: Date,
        required: true
    }

})


module.exports = mongoose.model("Users", userRegisterSchema);