const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const communityDocSchema = new Schema({
    user : String,
    content : String,
    date : Date
})

const conn = require('../connection/userConn');
module.exports = conn.model('communityDoc',communityDocSchema)