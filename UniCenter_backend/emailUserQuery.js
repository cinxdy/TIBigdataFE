const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');//javscript with token lib
var secret = 'harrypotter';//???? no use?

const User = require('./models/user');


//email verify code
function verifyToken(req, res) {
    console.log("verifyToken func has been inited!");
    // console.log(req.headers);
    // console.log(req.body);
    try{
        //if req header is not valid
        if(!req.headers.authorization) {
            return res.status(401).send('Unauthorized request')
        }

        //parse
        let token = JSON.parse(req.headers.authorization.split(' ')[1]).token;
        console.log(token);
        //parser result is null => invalid
        if(token === 'null'){
            return res.status(401).send('Unauthorized request')
        }
        let payload;
        //js with token.
        try{
            payload = jwt.verify(token, secret)
            console.log(payload)
        }
        catch(err){
            console.log("jwt verify error!");
            return res.status(401).send("token unverified!");
        }
        //if decoded is not wrong? invalid? how invalid then?
        if(!payload) {
            return res.status(401).send('Unauthorized request')
        }

        console.log(payload.subject);
        var userId = payload.subject//need to know how the req is formed first....
        //why do they again set value of req? not res?
        // next()//where does this function come from?
        return res.status(200).send({message : "OK", info : userId});
    }
    catch(err){
        console.log("server error! : ",err);
        return res.status(500).send("server error");
    }
}

//check if this email user is aleady our user?
function eCheckUser(email){
    // user.email
    User.findOne({email : email},(error,user)=>{
        if(error){
            console.log("user already exist check failed!");
        }
        else{
            if(!user){//when this user is not our list
                return false;
            }
            else{//when this user is already our user
                return true;
            }
        }
    })
}


/**
 * @EmailLoginFunctions
 * 
 * 
 * 
 * 
 * 
 * 
 */
//at register dir
router.post('/register', (req, res) => {
    let userData = req.body;//req.body. what is req form?

    //if this user is already our user, deny re-registration
    if(eCheckUser(userData.email)){
        res.json({success : false, message:"this user is already our user"});
    }

    //if this user is new, allow to register.
    var pw = jwt.sign(registeredUser.password);
    // userData.password = pw;//hide password
    let user = new User(userData);
    user.save((error, registeredUser) => {//save new user data account
        if(error) {
            console.log(error)
        } else {
            console.log("api : email register : save ok, user info : ", registeredUser);
            let payload = { subject : registeredUser._id};//new user id : subject => payload. create token.
            var token = jwt.sign(payload, secret, { expiresIn: '24h'});//secret harry poter usage check required. //토큰 발급.
            res.json({success: true, message: 'User registered!', info : registeredUser, token: token});//토큰 전송.
        }
    })

})


// http://localhost:4000/api/login
router.post('/login', (req, res) => {
    let userData = req.body;
    if(!eCheckUser(userData.email)){//when this user is not on our user list, deny login, and lead to register
        res.json({success : false, message:"this user is not our user"});
    }

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


router.post('/verify',verifyToken);
module.exports = router;
