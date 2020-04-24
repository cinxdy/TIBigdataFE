
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id : String,
    name : String,
    institution : String,
    email:String,
    password: String,
    severity: String
})



module.exports = mongoose.model('user', userSchema, 'users');