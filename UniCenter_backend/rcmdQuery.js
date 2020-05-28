const express = require('express');
const router = express.Router();
const Keywords = require('./models/rcmd');

router.get('/', (req, res) => {
    res.send('rcmdQuery')
})

// router.get('/test',(req,res)=>{
//     console.log("work!")    
//     let id = "5de1134ab53863d63aa55309"
//     Keywords.findOne({ docID : id }, (error, val) => {
//         if(error){
//             console.log(error)
//         }
//         // console.log(val)
//         res.json(val)
//     })
// })

router.post('/getRcmdTbl',(req,res)=>{
    let ids = req.body["id"];
    Keywords.find({ docID : {$in :ids} }, (error, doc) => {
        if(error){
            console.log(error)
        }
        console.log(doc)
        res.json(doc)
    })    
})

module.exports = router;
