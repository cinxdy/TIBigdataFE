const express = require('express');
const router = express.Router();
const comDoc = require('./models/community');
const Res = require('./models/Res');

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

router.get('/loadFirstDocList',(req,res) => {
    comDoc.find({}).skip(10).exec((err,res)=>{
        if(err)
            console.log("/loadFirstDocList failed");
        else{
            res.json(new Res(true,"/loadFirstDocList ok",res));
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
    newComDoc.save((err, data) => {
        if(err)
            console.log(err);
        else{

            console.log("data saved!");
            // res.json("ok")
            res.status(200).send(new Res(true,"writeNewDoc ok"));
        }
    })
}

function dumb(){

}

router.post('/writeNewDoc', writeNewDoc)

exports.writeNewDoc = writeNewDoc;