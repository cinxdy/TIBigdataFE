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

function writeNewDoc(req, res) {
    let bundle = req.body;
    console.log("writeNewDoc : ", bundle);
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



    return new Promise((resolve) => {
        newComDoc.save((err, data) => {
            if (err)
                console.log("error occured! : ", err);
            else {
                console.log("data saved!");
                resolve(new Res(true, "writeNewDoc ok"))
                // debug(new Res(true,"writeNewDoc ok"))
                // res.status(200).send(new Res(true,"writeNewDoc ok"));
            }
        })
    })

    // return newComDoc.save();
}

function dumb() {

}

router.post('/writeNewDoc', writeNewDoc)

// exports.writeNewDoc = writeNewDoc;
module.exports = { writeNewDoc, };