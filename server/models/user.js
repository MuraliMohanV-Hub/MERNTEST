const mongoose  = require('mongoose')

const userSchema = new mongoose.Schema({
    userID:String,
    email:{
        type:String,
        unique:true,
    },
    createdAt:Date,
});
const user = mongoose.model('User', userSchema);
module.exports = user