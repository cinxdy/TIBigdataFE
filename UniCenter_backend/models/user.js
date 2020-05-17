
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    nickname : String,
    auth : String,//google, email, ...
    name : String,
    inst : String,//institution
    email:String,
    password: String,//use only with email
    history : []
    // severity: String
})



module.exports = mongoose.model('user', userSchema, 'users');