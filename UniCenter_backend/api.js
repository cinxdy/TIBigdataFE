const express = require('express');
const jwt = require('jsonwebtoken');//javscript with token lib
var secret = 'harrypotter';//???? no use?
const router = express.Router();
const User = require('./models/user');
const gUser = require('./models/gUser');
// const mongoose = require('mongoose');//mongo db database communication tool
//need to know how to connect here. seems like the db dir is on the mongodb server. not local.
// const db='mongodb+srv://Admin:Dptnsla94!@kubic-adbnl.mongodb.net/user';
// const mongoose = require('mongoose'); //mongose 서버와 백엔드 연결 
// const db2 = 'mongodb+srv://Admin:Dptnsla94!@kubic-adbnl.mongodb.net/user';
// const db = 'mongodb://localhost:27017/user';

// //connect to db


function verifyToken(req, res, next) {
    console.log("verifyToken func has been inited!");


    //if req header is not valid
    if(!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }

    //parse
    let token = req.headers.authorization.split(' ')[1]
    
    //parser result is null => invalid
    if(token === 'null'){
        return res.status(401).send('Unauthorized request')
    }

    //js with token.
    let payload = jwt.verify(token, 'secretKey')//'secret key' is specific syntax of jwt. decoded.

    //if decoded is not wrong? invalid? how invalid then?
    if(!payload) {
        return res.status(401).send('Unauthorized request')
    }

    
    req.userId = payload.subject//need to know how the req is formed first....
    //why do they again set value of req? not res?
    next()//where does this function come from?
}

//yet useless dir
router.get('/', (req, res) => {
    res.send('From API route')
})

//at register dir
router.post('/register', (req, res) => {
    let userData = req.body;//req.body. what is req form?
    let user = new User(userData);
    user.save((error, registeredUser) => {//save new user data account
        if(error) {
            console.log(error)
        } else {
            console.log("api : email register : save ok");
            let payload = { subject : registeredUser._id};//new user id : subject => payload. create token.
            var token = jwt.sign(payload, secret, { expiresIn: '24h'});//secret harry poter usage check required. //토큰 발급.
            res.json({success: true, message: 'User registered!', token: token});//토큰 전송.
        }
    })

})

router.post('/gRegister',(req,res)=>{
    console.log("api : gRegister init.");
    let userData = req.body;
    let user = new gUser(userData);
    user.save((error, registeredUser)=>{
        if(error){
            console.log("google social user register data save error : " + error);
        }
        else{
            console.log("api : gmail register : save ok");
        }
    })
})

router.post('/gCheckUser',(req,res)=>{
    console.log("api : gChecker init.");
    let userData = req.body;
    gUser.findOne({email : userData.email}, (error, user)=>{
        if(error){
            console.log("gCheckUSer error : " + error);
        }
        else{
            if(!user) {
                console.log("api gchecker : post false")
                res.json({exist : false});
            }
            else{
                console.log("api gchecker : post true")
                res.json({exit : true});
            }    
        }
    })
})

// router.post('/verify',(req,res)=>)


// http://localhost:4000/api/login
router.post('/login', (req, res) => {
    let userData = req.body;

    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if( !user) {
                res.json({success: false, message: 'Could not authenticate user'});
            }else {
                if( user.password !== userData.password){
                    res.json({success: false, message: 'Could not authenticate password'});
                }else {
                    let payload = { subject : user._id};//토큰에 오고 갈 정보 : id
                    var token = jwt.sign(payload, secret, { expiresIn: '24h'});//토큰 발급.
                    res.json({success: true, message: 'User authenticated!', token: token});//토큰 전송
        
                }
            }
        }
    })
})

router.get('/events', verifyToken, (req, res) => {
    let events = [{
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        }
    ]

    res.json(events)
})

router.get('/special', (req, res) => {
    let events = [{
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        }
    ]

    res.json(events)
})





module.exports = router;