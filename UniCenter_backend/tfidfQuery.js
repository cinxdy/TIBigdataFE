const express = require("express");
const router = express.Router();
const Keywords = require("./models/tfidf");

router.get("/", (req, res) => {
    res.send("tfidfQuery");
});

router.get("/test", (req, res) => {
    console.log("work!");
    let id = "5de1134ab53863d63aa55309";
    Keywords.findOne({ docID: id }, (error, val) => {
        if (error) {
            console.log(error);
        }
        // console.log(val)
        res.json(val);
    });
});

router.post("/getKeyVal", (req, res) => {
    // console.log(req.body);
    let ids = req.body["id"];
    let num = req.body["num"]; //could be undefined.
    // console.log("get req");
    // console.log(ids);
    if(num == undefined)
        num = 3;
    // let id = ids[0]
    // let id = "5de1134ab53863d63aa55309"

    //use aggragation
    Keywords.aggregate(
        [
            { $match: { docID: { $in: ids } } },
            // { $addFields : { keywords : }},
            {
                $project: {
                    tfidf: {
                        $slice: ["$tfidf", num, num],//3번째 elemnt(왼쪽 param)까지 3개만큼(right param)
                    },
                }
            },
            {
                $unwind: "$tfidf"
            },
            {
                $project: {
                    tfidf: {
                        $arrayElemAt: ["$tfidf", 0]
                    }
                }
            },
            {
                $group:{
                    _id : "$_id",
                    tfidf : {$addToSet : "$tfidf"}
                    
                }
            }

            // {
            //     $project: {
            //         // $limit : tfidf
            //         // tfidf: { $slice: 3 },
            //         // docID: 0,
            //         // docTitle: 0,
            //         // _id: 0,
            //     }
            // },
            // { $addFields: { tfidfTable: "$tfidf" } },
            // { $arrayElemAt: ["$tfidf", 0] }

        ],
        (err, docs) => {
            console.log("aggragation result: ")
            if (err)
                console.log(err)
            res.json(docs);
        }
    )

    //method to find with doc id array and exclude docID, docTitle, _id
    // Keywords.find(
    //     {
    //         docID: { $in: ids },
    //     },
    //     {
    //         tfidf: { $slice: 3 },
    //         docID: 0,
    //         docTitle: 0,
    //         _id: 0,
    //     },
    //     (error, doc) => {
    //         // Keywords.find( {docID : {$in :ids}}, (error, doc) => {
    //         if (error) {
    //             console.log(error);
    //         }
    //         // console.log(doc);
    //         res.json(doc);
    //     }
    // );



});

module.exports = router;
