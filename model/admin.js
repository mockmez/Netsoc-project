const mongoose = require('mongoose')

const adminLoginSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("db_admin", adminLoginSchema);