const mongoose = require('mongoose')
const studentSchema = mongoose.Schema({
    ID:{
        type:String,
        unique:true,
        required:true,
    },
    Name:{
        type:String,
        required:true,
    },
    mobilenumber:{
        type:String,
        required:true,
    },
    mail:{
        type:String,
        required:true,
    }
})
const studentmodel = mongoose.model("student",studentSchema)
module.exports = studentmodel