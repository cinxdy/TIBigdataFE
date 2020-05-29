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

router.post('/getRcmdTbl', (req, res) => {
    let ids = req.body["id"];

    // console.log(ids)
    // console.log(typeof(ids))
    let num = req.body["num"]; //could be undefined.
    if (num == undefined)
        num = 5;

    let include_silmilar_value = false;
    if (include_silmilar_value) {
        Keywords.find({ docID: { $in: ids } }, { rcmd: { $slice: num } }, (error, doc) => {
            if (error) {
                console.log(error)
            }
            console.log(doc)
            res.json(doc)
        })
    }

    else if(typeof(ids)=="string"){
        Keywords.aggregate(
            [
                {
                    $match: {
                        docID: ids
                    }
                },
                {
                    $project:{
                        docID : 1,

                        rcmd : {$slice : ["$rcmd", num]}
                    }
                },
                {
                    $unwind: "$rcmd"
                },
                {
                    $project: {
                        docID : 1,

                        rcmd: {
                            $arrayElemAt: ["$rcmd", 0]
                        }
                    }
                },
                {
                    $group:{
                        _id : "$docID",
                        rcmd : {$addToSet : "$rcmd"}
                        
                    }
                }
            ],
            (err,docs)=>{
                if(err)
                    console.error(err)
                console.log(docs);
                res.json(docs)
   
            }
        )
    }

    else {
        Keywords.aggregate(
            [
                {
                    $match: {
                        docID: { $in: ids }
                    }
                },
                {
                    $project:{
                        docID : 1,
                        rcmd : {$slice : ["$rcmd", num]}
                    }
                },
                {
                    $unwind: "$rcmd"
                },
                {
                    $project: {
                        docID : 1,
                        rcmd: {
                            $arrayElemAt: ["$rcmd", 0]
                        }
                    }
                },
                {
                    $group:{
                        _id : "$docID",
                        rcmd : {$addToSet : "$rcmd"}
                        
                    }
                }
            ],
            (err,docs)=>{
                console.log(docs);
                res.json(docs)
   
            }
        )
    }

})

module.exports = router;
