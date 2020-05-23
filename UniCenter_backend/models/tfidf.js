const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tfidfSchema = new Schema({
    docID : String,
    docTitle : String,
    tfidf : [],
    lastUpdate : Date
})  

module.exports = mongoose.model('tfidf',tfidfSchema);