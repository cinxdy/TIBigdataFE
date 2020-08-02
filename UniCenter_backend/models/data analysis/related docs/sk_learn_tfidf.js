const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sk_tfidfSchema = new Schema({
    docID : String,
    docTitle : Number,
    tfidf : [[String, Number]],
    lastUpdate : Date
})  

module.exports = mongoose.model('sk_tfidf',sk_tfidfSchema);