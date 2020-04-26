const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');//javscript with token lib
var secret = 'harrypotter';//???? no use?

const User = require('./models/user');

class Res{
    //there is no type restriction in typescript.
    constructor(succ, msg, payload){
        this.succ = succ;//try to be booelan //request success or fail!
        this.msg = msg;//try to be string
        this.payload = payload;//try to be object
    }
}

/**
 * Email User Authentification Ware
 * Request : Response : info
 * User login : success. fail(wrong password or eamil) : user info(name, token) or why fail
 * User register : success.
 * Token verification : valid or invalid : name, email
 * User check : already our user or not our user
 * 
 * succ : true or false. 
 * info : 
 * 
 * Communication Format whould be fixed for flexiblility, easy debugging, and maintainance. 
 * request OK
 * request fail
 * 
 * 
 */



//email verify code
async function verifyToken(req, res) {
    console.log("verifyToken func has been inited!");
    // console.log(req.headers);
    // console.log(req.body);
    try {
        //if req header is not valid
        if (!req.headers.authorization) {
            return res.status(401).send(new Res(false,'header authorization issue'));
        }

        //parse
        let token = JSON.parse(req.headers.authorization.split(' ')[1]).token;
        console.log("token : ",token);
        //parser result is null => invalid
        if (!token) {
            return res.status(401).send(new Res(false, 'token null'));
        }
        let payload;
        //js with token.
        try {
            payload = jwt.verify(token, secret)
            console.log("payload : ", payload);
        }
        catch (err) {
            console.log("jwt verify error!");
            return res.status(401).send(new Res(false,"token unverified!"));
        }
        //if decoded is not wrong? invalid? how invalid then?
        if (!payload) {
            return res.status(401).send(new Res(false,'payload undefined'));
        }

        console.log(payload.subject);
        var user_id = payload.subject//need to know how the req is formed first....
        //why do they again set value of req? not res?
        // next()//where does this function come from?
        console.log(user_id);
        let name,email;
        await User.findOne({ _id: user_id }, (error, user) => {
            // console.log(user.name);
            name = user.name;
            email = user.email
        })


        return res.status(200).send(new Res(true, "OK", {name : name, email : email}));
        // name : user.name, email : user.email
    }
    catch (err) {
        console.log("server error! : ", err);
        return res.status(500).send(new Res(false, "server error"));
    }
}

//check if this email user is aleady our user?
router.post('/eCheckUser', (req, res) => {
    let userData = req.body;
    let email = userData.email;
    let user = userData.user;
    // user.email
    User.findOne({ email: email }, (error, user) => {
        if (error) {
            console.log("user already exist check failed!");
        }
        else {
            if (!user) {//when this user is not our list
                console.log("user is not one of us");
                res.json(new Res(false));
            }
            else {//when this user is already our user
                console.log("user one of us");
                res.json(new Res(true));
            }
        }
    })
})


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

    //if this user is new, allow to register.
    var pw = jwt.sign(userData.password);
    // userData.password = pw;//hide password
    let user = new User(userData);
    user.save((error, userData) => {//save new user data account
        if (error) {
            console.log(error)
        } else {
            console.log("api : email register : save ok, user info : ", userData);
            let payload = { subject: userData._id };//new user id : subject => payload. create token.
            var token = jwt.sign(payload, secret, { expiresIn: '24h' });//secret harry poter usage check required. //토큰 발급.
            res.json(new Res(true, 'User registered!', {user: userData, token: token }));//토큰 전송.
        }
    })

})


// http://localhost:4000/api/login
router.post('/login', (req, res) => {
    let userData = req.body;
    console.log(userData);
    // if (!eCheckUser(userData.email)) {//when this user is not on our user list, deny login, and lead to register
    //     console.log("hello?");
    //     res.json({ success: false, message: "this user is not our user" });
    // }
    // else {
    console.log("login process init")
    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log(error)
        }
        else {
            if (!user) {//no user -> serious error since we have already check this user is one of us in FE.
                res.json(new Res (false,'danger'));
            }
            else {
                if (user.password !== userData.password) {
                    res.json(new Res (false,'pw'));
                } else {
                    let payload = { subject: user._id };//토큰에 오고 갈 정보 : id
                    var token = jwt.sign(payload, secret, { expiresIn: '24h' });//토큰 발급.
                    res.json(new Res(true, 'User authenticated!', {token: token, name : user.name, email : user.email}));//토큰 전송
                }
            }
        }
    })
    // }
})


router.post('/verify', verifyToken);
module.exports = router;
