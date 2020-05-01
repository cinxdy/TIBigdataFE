const express = require('express');
const router = express.Router();
// const User = require('./models/user');
const gUser = require('./models/gUser');
const eUser = require('./models/user');
const hst = require('./models/history');
const Res = require('./models/Res');
//for future. user model.
const userModel = {
    name: String,
    email: String,
    history: []
};



/**
 * @CommonFunctions
 * 
 * 
 * 
 */

//yet useless dir
router.get('/', (req, res) => {
    res.send('From API route')
})

/***
 * @SearchHistoryFunctions
 * 
 * 
 */
router.post('/addHistory', (req, res) => {
    // console.log("add history init");
    let bundle = req.body;
    // console.log(bundle);

    let time = new Date();

    let keyword = {
        keyword: bundle.key,
        year: time.getFullYear(),
        month: time.getMonth(),
        date: time.getDate(),
        hour: time.getHours(),
        min: time.getMinutes()
    };

    //add total search history from all users
    //new history keyword that is goona be added soon.
    newHst = new hst(keyword);
    newHst.save((err, keyword) => {
        if (err) {
            console.log("add history fail. error : " + err);
        }
        else {
            console.log("add total history ok")
        }
    });


    var userHst;
    var anyUser;
    //record user own history for each user
    var isLogin = bundle.login;
    if (isLogin) {
        /**
         * //enumerate login status
            enum logStat {
                unsigned,//0
                SUPERUSER,//1
                email,//2
                google,//3
            }
         */
        if (isLogin >= 3) {//social user
            anyUser = gUser;
        }
        else {//email or super user
            anyUser = eUser;
        }

        let userData = bundle.user;
        anyUser.findOneAndUpdate({ email: userData.email }, { $push: { history: keyword } }, (err, doc) => {
            if (err) {
                console.log("user personal history add failed!", err);
            }
            else {
                if (!doc) {
                    console.log("doc not found")
                    // console.log(doc);
                    res.status(401).send({ add: false });
                }
                else {
                    console.log("doc found!")
                    console.log(doc);
                    userHst = doc.history;
                    userHst.push(keyword);
                    console.log(userHst);
                    res.json({ history: userHst });
                }
            }

        });
    }

    console.log("add history done");
})

router.get('/showHistory', (req, res) => {
    console.log("add history init");
    let userData = req.body;
    gUser.findOne({ email: userData.email }, (err, doc) => {
        if (err) {
            console.log(err);
        }
        else {
            if (!doc) {
                // console.log("api gchecker : post false")
                console.log(doc);
                res.json({ result: false });
            }
            else {
                // console.log("api gchecker : post true")
                console.log(doc);

                res.json({ history: doc.history });
            }
        }

    });
})

router.get('/getHistoryCount', (req, res) => {
    hst.count(null, (err, count) => {
        if (err) {
            console.log("get history count error");
            res.status(401);
        }
        else
            res.json({ count: count });
    })
})

router.post('/getTotalHistory', (req, res) => {
    var payload = req.body;
    var idx = payload.idx;
    var n = payload.num;

    // console.log("get total history func init");
    // var query = 
    hst.find({})
        .skip(idx)
        .limit(n)
        .exec(
            (err, hstrs) => {
                if (err)
                    console.log("post : get total history err")
                // console.log(hstrs);
                console.log("post total history ok")
                res.send({ histories: hstrs })
            });
});

router.get('/getTotalHistory', (req, res) => {
    // var result = hst.find({});
    // console.log(result);
    var hstResult = hst.find({})
        .limit(30)
    // console.log(hstResult);
    hstResult.exec(
        (err, hstrs) => {
            if (err)
                console.log("post : get total history err")
            console.log(hstrs);
            res.send({ histories: hstrs })
        }

    )

});

//debug
countByMonth()

function countByMonth() {
    /**
     * each month
     * each time
     * 
     * found if people search specific words.
     * 
     * top 3 keywords by each month
     */

    hst.distinct("month", (err, months) => {
        console.log(months);
        let keyInMth = [];
        len = months.length;
        new Promise((resolve) => {
            let idx = 0;
            for (var i = 0; i < len; i++) {
                //asyncronous
                let m = months[i];//must be let. let use independent object var.
                // useful for asyncronous method.
                let keyFreq = [];
                hst.find({ month: m })
                    .exec((err, keys) => {
                        // console.log(keys);
                        for(var j = 0 ; j < keys.length; j++){
                            // console.log(keys[j]);
                            keyFreq.push(keys[j].keyword);
                            
                            // if(j > 10)
                            // break;
                        }
                        keyInMth.push([m,keyFreq]);

                        //guarantee all months data stored fin.
                        // console.log(m,"th month : ", keyFreq);
                        idx++
                        if (idx >= len) {
                            console.log("\n----------- len : ", len, ", idx check : ", idx,"-----------\n");
                            resolve()
                        }
                    })
            }//for
        }).then(() => {
            console.log("\n-----------sort?-----------\n")
            for (var i = 0; i < len; i++) {
                // console.log(keyInMth[i][1])
                let s = Date.now()
                keyInMth[i][1] = keyInMth[i][1].sort();
                let e = Date.now()
                let elapse = e - s;
                var tmp;
                var sec = Math.floor(elapse % 60);
                tmp = elapse / 60;
                var min = Math.floor(tmp % 60);
                tmp = tmp / 60;
                var hour = Math.floor(tmp % 60);
                // console.log(keyInMth[i][1])
                console.log(i+1, "th month sort fin!");
                console.log("time taken : ", hour, "hour ", min, " min ", sec, " sec\n\n");
            }//for
            
            //check if sort work for each month
            // console.log(keyInMth[11]);




            // for (var i = 0; i < len; i++) {
            //     // console.log(keyFreq[i])
            //     if (i > len) break;
            // }//for

            // for (var i = 0; i < topX; i++) {
            //     topKey.push(keyFreq[i]);
            // }
            // console.log("top key ", topX)
            // console.log(topKey);
            // return res.status(200).json(topKey)
        })//then
    })
}

router.get('/getSortFreqHistory', countByFreq);


//debug
//run node server.js
// sortAndCountFreq();

//sort search history data
function countByFreq(req, res) {

    let LIM = 1500;
    let topX = 20;

    hst.distinct("keyword", (err, key) => {
        console.log(key.length, "unique words");
        var keyFreq = [];
        //top topX frequent keyword container
        var topKey = [];
        //find the top topX frequent
        new Promise((resolve) => {


            for (var i = 0; i < LIM; i++) {
                //asyncronous
                let k = key[i];//must be let. let use independent object var.
                // useful for asyncronous method.
                let idx = i;
                hst.countDocuments({ keyword: k })
                    .exec((err, count) => {
                        // console.log(k, " : ");
                        // console.log(count);
                        keyFreq.push([k, count]);

                        //must guarantee all keywords freq is stored fin.
                        if (idx >= LIM - 1) {
                            resolve()
                        }
                    })

                //hybrid
                // should maintain until the value is passed...
                // new Promise((resolve) => {
                //     hst.count({ keyword: key[i] }, (err, count) => {
                //         let k = key[i];
                //         resolve();
                //         console.log(k, " : ");
                //         console.log(count);
                //     })
                // })



                //syncronous
                // new Promise((resolve)=>{
                //     var k = key[i];
                //     var v = hst.count({keyword : k})
                //      v.exec( (err, count) => {
                //         console.log(k, " : ", );
                //         console.log(count);
                //         resolve();
                //     })
                // })
            }//for
        }).then(() => {
            console.log("sort?")
            for (var i = 0; i < LIM; i++) {
                // console.log(keyFreq[i])
                if (i > LIM) break;
            }//for
            let s = Date.now()
            keyFreq = keyFreq.sort((a, b) => b[1] - a[1]);
            let e = Date.now()
            let elapse = e - s;
            var tmp;
            var sec = Math.floor(elapse % 60);
            tmp = elapse / 60;
            var min = Math.floor(tmp % 60);
            tmp = tmp / 60;
            var hour = Math.floor(tmp % 60);
            console.log("sort!")
            console.log("time taken : ", hour, "hour ", min, " min ", sec, " sec");
            for (var i = 0; i < LIM; i++) {
                // console.log(keyFreq[i])
                if (i > LIM) break;
            }//for

            for (var i = 0; i < topX; i++) {
                topKey.push(keyFreq[i]);
            }
            console.log("top key ", topX)
            console.log(topKey);
            return res.status(200).json(topKey)
        })//then
    })//distinct
}

const User = require('./models/user');






// 상원이가 해두고 감. 어떤 용도인지 잘 모르겠음...
// router.get('/events', verifyToken, (req, res) => {
//     let events = [{
//             "_id": "1",
//             "name": "Auto Expo",
//             "description": "lorem ipsum",
//             "date": "2012-04-23T18:25:43.511Z"
//         },
//         {
//             "_id": "2",
//             "name": "Auto Expo",
//             "description": "lorem ipsum",
//             "date": "2012-04-23T18:25:43.511Z"
//         },
//         {
//             "_id": "3",
//             "name": "Auto Expo",
//             "description": "lorem ipsum",
//             "date": "2012-04-23T18:25:43.511Z"
//         },
//         {
//             "_id": "4",
//             "name": "Auto Expo",
//             "description": "lorem ipsum",
//             "date": "2012-04-23T18:25:43.511Z"
//         },
//         {
//             "_id": "5",
//             "name": "Auto Expo",
//             "description": "lorem ipsum",
//             "date": "2012-04-23T18:25:43.511Z"
//         },
//         {
//             "_id": "6",
//             "name": "Auto Expo",
//             "description": "lorem ipsum",
//             "date": "2012-04-23T18:25:43.511Z"
//         }
//     ]

//     res.json(events)
// })

// router.get('/special', (req, res) => {
//     let events = [{
//             "_id": "1",
//             "name": "Auto Expo",
//             "description": "lorem ipsum",
//             "date": "2012-04-23T18:25:43.511Z"
//         },
//         {
//             "_id": "2",
//             "name": "Auto Expo",
//             "description": "lorem ipsum",
//             "date": "2012-04-23T18:25:43.511Z"
//         },
//         {
//             "_id": "3",
//             "name": "Auto Expo",
//             "description": "lorem ipsum",
//             "date": "2012-04-23T18:25:43.511Z"
//         },
//         {
//             "_id": "4",
//             "name": "Auto Expo",
//             "description": "lorem ipsum",
//             "date": "2012-04-23T18:25:43.511Z"
//         },
//         {
//             "_id": "5",
//             "name": "Auto Expo",
//             "description": "lorem ipsum",
//             "date": "2012-04-23T18:25:43.511Z"
//         },
//         {
//             "_id": "6",
//             "name": "Auto Expo",
//             "description": "lorem ipsum",
//             "date": "2012-04-23T18:25:43.511Z"
//         }
//     ]

//     res.json(events)
// })





module.exports = router;