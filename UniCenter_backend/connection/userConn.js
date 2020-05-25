const mongoose = require('mongoose');
const userCollection = 'mongodb://localhost:27017/user';

const conn = mongoose.createConnection(userCollection);

module.exports = conn;