const express = require('express');
const router = express.Router();
const Keywords = require('./models/tfidf');

router.get('/', (req, res) => {
    res.send('tfidfQuery')
})

router.get('/test',(req,res)=>{
    console.log("work!")    
    let id = "5de1134ab53863d63aa55309"
    Keywords.findOne({ docID : id }, (error, val) => {
        if(error){
            console.log(error)
        }
        // console.log(val)
        res.json(val)
    })
})

router.post('/getKeyVal',(req,res)=>{
    let ids = req.body;
    console.log("get req")
    console.log(ids);
    // let id = ids[0]
    let id = "5de1134ab53863d63aa55309"
    Keywords.findOne({ docID : id }, (error, doc) => {
        if(error){
            console.log(error)
        }
        console.log(doc)
        res.json(doc)
    })    
})

module.exports = router;
