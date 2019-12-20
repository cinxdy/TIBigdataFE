const express = require('express');
const jwt = require('jsonwebtoken');
var secret = 'harrypotter';
const router = express.Router();
const User = require('./models/user');
const mongoose = require('mongoose');
const db='mongodb+srv://Admin:Dptnsla94!@kubic-adbnl.mongodb.net/user';

mongoose.connect(db, err => {
    if(err) {
        console.error('Error!' + err)
    }else {
        console.log('Connected to mongodb');
    }
});

function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }

    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send('Unauthorized request')
    }

    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}


router.get('/', (req, res) => {
    res.send('From API route')
})

router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((error, registeredUser) => {
        if(error) {
            console.log(error)
        } else {
            let payload = { subject : registeredUser._id};
            var token = jwt.sign(payload, secret, { expiresIn: '24h'});
            res.json({success: true, message: 'User registered!', token: token});
        }
    })
    
})


// http://localhost:4000/api/login
router.post('/login', (req, res) =>  {
    let userData = req.body;

    User.findOne({email: userData.email}, (error, user) => {
        if(error) {
            console.log(error)
        } else {
            if( !user) {
                res.json({success: false, message: 'Could not authenticate user'});
            }else {
                if( user.password !== userData.password){
                    res.json({success: false, message: 'Could not authenticate password'});
                }else {
                    let payload = { subject : user._id};
                    var token = jwt.sign(payload, secret, { expiresIn: '24h'});
                    res.json({success: true, message: 'User authenticated!', token: token});
        
                }
            }
        }
    })
})

router.get('/events',  verifyToken, (req, res) => {
    let events = [
        {
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
    let events = [
        {
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