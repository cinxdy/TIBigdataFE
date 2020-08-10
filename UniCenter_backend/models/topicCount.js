const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const topicCountSchema = new Schema({
    topic : String,
    count : Number
})  
const conn = require('../connection/dataConn');
module.exports = conn.model('topicCount',topicCountSchema);
