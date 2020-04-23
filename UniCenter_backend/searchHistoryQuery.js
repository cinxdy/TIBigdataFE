const express = require('express');
const router = express.Router();
// const User = require('./models/user');
const gUser = require('./models/gUser');
const hst = require('./models/history');

//for future. user model.
const userModel = {
    name : String,
    email : String,
    history : []
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
router.post('/addHistory',(req,res)=>{
    // console.log("add history init");
    let bundle = req.body;
    // console.log(bundle);
   
    let time = new Date();

    let keyword = {
        keyword : bundle.key, 
        year : time.getFullYear(),
        month : time.getMonth(),
        date : time.getDate(),
        hour : time.getHours(),
        min :  time.getMinutes()
    };

    //total search history from all users
    //new history keyword that is goona be added soon.
    newHst = new hst(keyword);
    newHst.save((err, keyword)=>{
        if(err){
            console.log("add history fail. error : " + err);
        }
        else{
            console.log("add total history ok")
        }
    });


    var userHst;
    //my user search history for each user
    if(bundle.login){
        let userData = bundle.user;
        
        gUser.findOneAndUpdate({email: userData.email},{ $push : { history : keyword}},(err, doc)=>{
            if(err){
                console.log("user personal history add failed!", err);
            }
            else{
                if(!doc) {
                    console.log("doc not found")
                    // console.log(doc);
                    res.status(401).send({add : false});
                }
                else{
                    console.log("doc found!")
                    console.log(doc);
                    userHst = doc.history;
                    userHst.push(keyword);
                    console.log(userHst);
                    res.json({history : userHst});
                }    
            }
            
        });
    }
    
    console.log("add history done");
})

router.get('/showHistory',(req,res)=>{
    console.log("add history init");
    let userData = req.body;
    gUser.findOne({email: userData.email},(err, doc)=>{
        if(err){
            console.log(err);
        }
        else{
            if(!doc) {
                // console.log("api gchecker : post false")
                console.log(doc);
                res.json({result : false});
            }
            else{
                // console.log("api gchecker : post true")
                console.log(doc);

                res.json({history : doc.history});
            }    
        }
        
    });
})

router.get('/getTotalHistory',(req,res)=>{
    // console.log("get total history func init");
    hst.find({},(err, hstrs)=>{
        if(err)
            console.log("get total history err")
        // console.log(hstrs);
        res.send({histories : hstrs})
    });
});

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