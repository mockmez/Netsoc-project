const mongoose = require('mongoose')

const userLoginSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    student_number:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("_", userLoginSchema);