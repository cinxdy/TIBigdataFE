const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rcmdSchema = new Schema({
    id : String,
    relatedDoc : [],
    lastUpdate : Date
})  

module.exports = mongoose.model('rcmd',rcmdSchema);