const express = require('express');
const router = express.Router();
const comDoc = require('./models/community');

var assert = require('assert');
describe('writeNewDoc',() =>{
    it('test of test',() =>{
        sample = {body : { user : "user1", content : "content1"}}
        writeNewDoc(sample)
        assert.equal(comDoc, sample)
    })
})

//yet useless dir
router.get('/', (req, res) => {
    res.send('communityDocQuery works!');
})

router.get('/loadFirstDocList',(req,res) => {


});

function writeNewDoc(req, res) {
    let bundle = req.body;
    let user = bundle.user;
    let content = bundle.content;
    let time = new Date();

    let data = {
        user : user,
        content : content,
        year: time.getFullYear(),
        month: time.getMonth(),
        date: time.getDate(),
        hour: time.getHours(),
        min: time.getMinutes(),
        time : time
    }
    newComDoc = new comDoc(data);
    newComDoc.save((err, res) => {
        if(err)
            console.log(err);
        else
            console.log("data saved!");
    })
}

router.post('/writeNewDoc', writeNewDoc)