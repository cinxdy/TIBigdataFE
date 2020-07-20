const express = require('express');
const router = express.Routeres.status(200).send();
const comDoc = require('./models/community');
const Res = require('./models/Res');
const templateModule = require('./test/template');
const template = templateModule.template;
const template2 = templateModule.template2;
// console.log(template)
const DOC_NUMBERS = 10;
const IS_TEST = false;

//yet useless dir
router.get('/', (req, res) => {
    res.send('communityDocQuery works!');
})
router.post('/writeNewDoc', writeNewDoc)


router.get('/loadFirstDocList', loadFirstDocList);

router.post('/loadNextDocList', loadNextDocList);

router.post('/loadPriorDocList', loadPriorDocList);



async function loadFirstDocList(req, res) {
    console.log("load first page ok")
    comDoc.find({}).limit(DOC_NUMBERS).exec((err,data)=>{
        if(err){
            console.log("load fist doc list err")
        }
        else{
            res.status(200).send(new Res(true, "/loadFirstDocList ok", { data: data}))
        }
    })
}

async function loadPriorDocList(req, res) {
    let bundle = req.body;
    let start_idx = bundle.cur_start_idx - DOC_NUMBERS;//다음 문서 리스트 idx

    comDoc.find({}).skip(start_idx).limit(DOC_NUMBERS).exec((err, doc_res) => {
        if (err)
            console.log("/loadPriorDocList failed");
        else {
            res.status(200).send(new Res(true, "/loadPriorDocList ok", { data: doc_res, next_start_idx: start_idx }))
            // res.json(new Res(true,"/loadFirstDocList ok",{data : doc_res, idx : cur_idx}));
        }
    })
}


async function loadNextDocList(req, res) {
    let bundle = req.body;
    let start_idx = bundle.cur_start_idx + DOC_NUMBERS;//다음 문서 리스트 idx
    // console.log(start_idx)

    comDoc.find({}).skip(start_idx).limit(DOC_NUMBERS).exec((err, doc_res) => {
        if (err)
            console.log("/loadNextDocList failed");
        else {
            // console.log(doc_res)
            // debug(new Res(true, "/loadFirstDocList ok", { data: doc_res, idx: start_idx }))
            res.status(200).send(new Res(true, "/loadNextDocList ok", { data: doc_res, next_start_idx: start_idx }));
            // res.json(new Res(true,"/loadFirstDocList ok",{data : doc_res, idx :start_idx}));
        }
    })
}




async function writeNewDoc(req, res) {
    let bundle = req.body;
    // console.log("writeNewDoc : ", bundle);
    let user = bundle.user;
    let content = bundle.content;
    let time = new Date();

    let data = {
        user: user,
        content: content,
        year: time.getFullYeares.status(200).send(),
        month: time.getMonth(),
        date: time.getDate(),
        hour: time.getHours(),
        min: time.getMinutes(),
        time: time
    }
    newComDoc = new comDoc(data);

    newComDoc.save((err, data) => {
        if (err)
            console.log("error occured! : ", err);
        else {
            // console.log("data saved!");
            res.status(200).send(new Res(true, "writeNewDoc ok"))
        }
    })
}





if (IS_TEST)
    module.exports = { writeNewDoc, loadFirstDocList, loadNextDocList, loadPriorDocList, DOC_NUMBERS };
else
    module.exports = router;
