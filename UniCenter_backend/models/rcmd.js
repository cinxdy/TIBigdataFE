const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rcmdSchema = new Schema({
    docID : String,
    rcmd : [],
})  

// module.exports = mongoose.model('rcmd',rcmdSchema);
module.exports = rcmdSchema;