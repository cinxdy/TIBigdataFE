const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tfidfSchema = new Schema({
    docID : String,
    docTitle : Number,
    tfidf : [[String, Number]],
    lastUpdate : Date
})  

module.exports = mongoose.model('tfidf',tfidfSchema);