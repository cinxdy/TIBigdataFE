const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rcmdSchema = new Schema({
    docID : String,
    rcmd : [],
})  

// module.exports = mongoose.model('rcmd',rcmdSchema);
// module.exports = rcmdSchema;
const conn = require('../connection/userConn');
module.exports = conn.model('rcmd',rcmdSchema)