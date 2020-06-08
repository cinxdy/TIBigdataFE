const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rcmdSchema = new Schema({
    id : String,
    relatedDoc : [],
    lastUpdate : Date
})  
const conn = require('../connection/dataConn');
module.exports = conn.model('rcmd',rcmdSchema);