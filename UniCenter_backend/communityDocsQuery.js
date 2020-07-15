const express = require('express');
const router = express.Router();
const comDoc = require('./models/community');
const Res = require('./models/Res');

const DOC_NUMBERS = 10;


function debug(result) {
    // let isTest = false;
    // func = undefined;
    // if(isTest){
    //     func = function(){
    //         res.json(result)
    //     }
    // }
    // else{
    func = function () {
        return new Promise((resolve) => {
            resolve(result)
        })
    }
    // }

    return func;
}

//test community server file
// var assert = require('assert');
// describe('writeNewDoc',() =>{
//     it('writeNewDoc test',() =>{
//         for(var i = 0 ; i < 10; i++){
//             sample = {body : { user : "user1", content : "content1"}}
//             writeNewDoc(sample)
//         }
//         assert.equal(comDoc, sample)
//     })


// })



//yet useless dir
router.get('/', (req, res) => {
    res.send('communityDocQuery works!');
})

router.get('/loadFirstDocList', (req, res) => {
    comDoc.find({}).limit(DOC_NUMBERS).exec((err, res) => {
        if (err)
            console.log("/loadFirstDocList failed");
        else {
            debug(new Res(true, "/loadFirstDocList ok", res))
            // res.json(new Res(true,"/loadFirstDocList ok",res));
        }
    })

    // hst.aggregate([
    //     {
    //         $group: { _id: { keyword: '$keyword' }, count: { $sum: 1} }
    //     },
    //     {
    //         $sort: { count : -1}
    //     },
    //     {
    //         $limit: 30 
    //     }
    //     ],(err,docs) =>{
    //         // console.log(docs)
    //         if(err)
    //             console.log("error in get total history in get")
    //         else    
    //             res.json(new Res(true, "response of get of get total data .",docs))
    //     });

});

router.get('/loadNextDocList', (req, res) => {
    let bundle = req.body;
    let cur_idx = bundle.cur_idx + DOC_NUMBERS;//다음 문서 리스트 idx

    comDoc.find({}).skip(cur_idx).limit(cur_idx + DOC_NUMBERS).exec((err, doc_res) => {
        if (err)
            console.log("/loadFirstDocList failed");
        else {
            debug(new Res(true, "/loadFirstDocList ok", { data: doc_res, idx: cur_idx }))

            // res.json(new Res(true,"/loadFirstDocList ok",{data : doc_res, idx :cur_idx}));
        }
    })
})

router.get('/loadPriorDocList', (req, res) => {
    let bundle = req.body;
    let cur_idx = bundle.cur_idx - DOC_NUMBERS;//다음 문서 리스트 idx

    comDoc.find({}).skip(cur_idx).limit(cur_idx + DOC_NUMBERS).exec((err, doc_res) => {
        if (err)
            console.log("/loadFirstDocList failed");
        else {
            debug(new Res(true, "/loadFirstDocList ok", { data: doc_res, idx: cur_idx }))
            // res.json(new Res(true,"/loadFirstDocList ok",{data : doc_res, idx : cur_idx}));
        }
    })
})

async function writeNewDoc(req, res) {
    let bundle = req.body;
    // console.log("writeNewDoc : ", bundle);
    let user = bundle.user;
    let content = bundle.content;
    let time = new Date();

    let data = {
        user: user,
        content: content,
        year: time.getFullYear(),
        month: time.getMonth(),
        date: time.getDate(),
        hour: time.getHours(),
        min: time.getMinutes(),
        time: time
    }
    newComDoc = new comDoc(data);


    /**
     * real working operation
     */
    // newComDoc.save((err, data) => {
    //     if (err)
    //         console.log("error occured! : ", err);
    //     else {
    //         // console.log("data saved!");
    //         // debug(new Res(true,"writeNewDoc ok"))
    //         res.status(200).send(new Res(true,"writeNewDoc ok"));
    //     }
    // })

    /**
     * test operation
     */
    // return new Promise((resolve) => {
    //     newComDoc.save((err, data) => {
    //         if (err)
    //             console.log("error occured! : ", err);
    //         else {
    //             // console.log("data saved!");
    //             // debug(new Res(true,"writeNewDoc ok"))
    //             resolve(new Res(true, "writeNewDoc ok"))
    //         }
    //     })
    // })
    testhook = function () {
        console.log("texthook init!")
        return new Promise(r => {

            newComDoc.save((err, data) => {

                if (err)
                    console.log("error occured! : ", err);
                else {
                    console.log("data saved!");
                    // debug(new Res(true,"writeNewDoc ok"))
                    r(new Res(true, "writeNewDoc ok"))
                    // resolve(new Res(true, "writeNewDoc ok"));
                }
            })
        })
    }

    realHook = function () {
        newComDoc.save((err, data) => {
            if (err)
                console.log("error occured! : ", err);
            else {
                // console.log("data saved!");
                // debug(new Res(true,"writeNewDoc ok"))
                res.status(200).send(new Res(true, "writeNewDoc ok"));
            }
        })
    }
    return await template(realHook, false);







}

/**
 * template method
 */
function template(hook, isTest) {
    // console.log("template func init")
    /**
     * if test
     */
    if (isTest) {
        return new Promise(async (resolve) => {
            // console.log("in promise")
            _res_ = await hook()
            // console.log("promise almost done! r : ", _res_)
            resolve(_res_);

        })
    }
    // console.log("isTest part fin.")

    /**
     * if real operation
     */
    else {
        hook();
    }
}

/**
 * hook method
 */

//  function hook(resolve){
//     newComDoc.save((err, data) => {
//         if (err)
//             console.log("error occured! : ", err);
//         else {
//             // console.log("data saved!");
//             // debug(new Res(true,"writeNewDoc ok"))
//             resolve(new Res(true,"writeNewDoc ok"))
//         }
//     })
//  }

router.post('/writeNewDoc', writeNewDoc)

// exports.writeNewDoc = writeNewDoc;
module.exports = { writeNewDoc, };