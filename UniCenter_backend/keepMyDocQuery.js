const express = require('express');
const router = express.Router();
const User = require('./models/user');
const KeepDoc = require('./models/myDoc');
const Res = require('./models/Res');

router.post('/keepMyDoc',(req,res)=>{
    console.log("keep Doc init");
    let data = req.body;
    let userEmail = data.userEmail;
    let docs = data.docs
    console.log("user : ", userEmail, ", doc ids : ", docs);
    var userDocs;
    User.findOneAndUpdate({email : userEmail}, {$push : {myDoc : docs}},(err,doc)=>{
        if(err){
            console.err(err);
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
                userDocs = doc.myDoc;
                userDocs.push(docs);
                console.log(userDocs);
                res.json({ myDoc: userDocs });
            }
        }
    
    
    
    })

    // KeepDoc.
})

module.exports = router;