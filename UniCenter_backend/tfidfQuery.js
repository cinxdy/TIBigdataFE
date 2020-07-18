const express = require("express");
const router = express.Router();
const Keywords = require("./models/tfidf");

router.get("/", (req, res) => {
    res.send("tfidfQuery");
});

router.get("/test", (req, res) => {
    // console.log("work!");
    let id = "5de1134ab53863d63aa55309";
    Keywords.findOne({ docID: id }, (error, val) => {
        if (error) {
            console.log(error);
        }
        // console.log(val)
        res.json(val);
    });
});

/**
 * @description 받은 id 혹은 id list에 대해 
 */
function getKeyVal(req, res) {
    // console.log(req.body);
    let ids = req.body["id"];

    if (typeof (ids) == "string")//only send one string 
        matchQuery = { docID: ids }

    else //when send string array
        matchQuery = { docID: { $in: ids } }

    let num = req.body["num"]; //could be undefined.
    let isVal = req.body["isVal"];
    // console.log("get req");
    // console.log(ids);
    if (num == undefined)
        num = 5;
    else
        num = parseInt(num);


    //use aggragation
    Keywords.aggregate(
        [
            { $match: matchQuery },
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
                        $cond: {
                            if: isVal,
                            then: "$tfidf",
                            else: { $arrayElemAt: ["$tfidf", 0] }

                        }
                    }
                }
            },
            {
                $group: {
                    _id: "$_id",
                    tfidf: { $addToSet: "$tfidf" }

                }
            }



        ],
        (err, docs) => {
            // console.log("aggragation result: ")
            if (err)
                console.log(err)
            // console.log(docs)
            res.json(docs);
        }
    )


}


router.post("/getKeyVal", getKeyVal);

module.exports = router;
