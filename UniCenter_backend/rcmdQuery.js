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
    let num = req.body["num"]; //could be undefined if does not request specific num.
    if (num == undefined)
        num = 5;
    else
        num = parseInt(num);
    let isSim = req.body["sim"]
    let matchQuery = undefined;

    if (typeof (ids) == "string")//only send one string 
        matchQuery = { docID: ids }

    else //when send string array
        matchQuery = { docID: { $in: ids } }

    Keywords.aggregate(
        [
            {
                $match: matchQuery
            },
            {
                $project: {
                    docID: 1,
                    rcmd: { $slice: ["$rcmd", num] }
                }
            },
            {
                $unwind: "$rcmd"
            },
            {
                $project: {
                    docID: 1,
                    rcmd: {
                        $cond: {
                            if: isSim,
                            then:"$rcmd",
                            else:  { $arrayElemAt: ["$rcmd", 0] }


                        }
                    }
                }
            },
            {
                $group: {
                    _id: "$docID",
                    rcmd: { $addToSet: "$rcmd" }
                }
            }
        ],
        (err, docs) => {
            if (err)
                console.error(err)
            console.log(docs);
            res.json(docs)

        }
    )

})

module.exports = router;
