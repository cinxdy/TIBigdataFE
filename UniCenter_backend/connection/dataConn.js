const mongoose = require('mongoose');
const db = require('./config')
const userCollection = db+ 'analysis';

const conn = mongoose.createConnection(userCollection);

module.exports = conn;