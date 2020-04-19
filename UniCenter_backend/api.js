const express = require('express');
const jwt = require('jsonwebtoken');//javscript with token lib
var secret = 'harrypotter';//???? no use?
const router = express.Router();
const User = require('./models/user');
const gUser = require('./models/gUser');
const hst = require('./models/history');

//for future. user model.
const userModel = {
    name : String,
    email : String,
    history : []
};

//google token verify code template
const {OAuth2Client} = require('google-auth-library');

function verifyGoogleToken(req,res){
    var token = req.body.token;
    var CLIENT_ID = req.body.client;

    const client = new OAuth2Client(CLIENT_ID);
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        // console.log("get ticket : ",ticket);
        const payload = ticket.getPayload();
        const userInfo = {
            name : payload.name, 
            email : payload.email
        }
        // const userid = payload['sub'];
        // If request specified a G Suite domain:
        //const domain = payload['hd'];
        
        return res.status(200).send({status : true, user : userInfo});
    }

    return verify().catch((err)=>{
        console.error(err);
        console.log("error");
        return res.status(200).send({status : false, err : err});
    })
}


//email verify code
function verifyToken(req, res, next) {
    console.log("verifyToken func has been inited!");

    try{
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
        try{
            let payload = jwt.verify(token, 'secretKey')//'secret key' is specific syntax of jwt. decoded.
        }
        catch(err){
            console.log("jwt verify error!");
            return res.status(401).send("token unverified!");
        }
        //if decoded is not wrong? invalid? how invalid then?
        if(!payload) {
            return res.status(401).send('Unauthorized request')
        }

        
        req.userId = payload.subject//need to know how the req is formed first....
        //why do they again set value of req? not res?
        next()//where does this function come from?
        return res.status(200).send("OK");
    }
    catch{
        console.log("server error!");
        return res.status(500).send("server error");
    }
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
            res.json({succ : "fail"})
        }
        else{
            console.log("api : gmail register : save ok");
            res.json({succ : true});
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
                // console.log("api gchecker : post false")
                // console.log(user);
                res.json({exist : false});
            }
            else{
                // console.log("api gchecker : post true")
                // console.log(user);

                res.json({exit : true});
            }    
        }
    })
})


router.post('/verifyGoogleToken',verifyGoogleToken);

router.post('/addHistory',(req,res)=>{
    console.log("add history init");
    let bundle = req.body;
    let userData = bundle.user;
    let time = new Date();

    let keyword = {keyword : bundle.key, 
        year : time.getFullYear(),
        month : time.getMonth(),
        date : time.getDate(),
        hour : time.getHours(),
        min :  time.getMinutes()
    };
    newHst = new hst(keyword);
    /***
     * 
     * 
     * 그... history을 어떻게 저장해야 하는가? 문서 1개에 다 저장해야 하나?
     */
    // hst.update()
    newHst.save((err, keyword)=>{
        if(err){
            console.log("add history fail. error : " + err);
        }
    });

    gUser.findOneAndUpdate({email: userData.email},{ $push : { history : keyword}},(err, doc)=>{
        if(err){
            console.log(err);
        }
        else{
            if(!doc) {
                // console.log("api gchecker : post false")
                // console.log(doc);
                res.json({add : false});
            }
            else{
                // console.log("api gchecker : post true")
                // console.log(doc);

                res.json({history : doc.history});
            }    
        }
        
    });
    // console.log("add history done");
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

router.post('/verify',verifyToken)


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