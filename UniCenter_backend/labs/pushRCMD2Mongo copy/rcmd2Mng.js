const fs = require('fs');
const rcmd = require('../../models/rcmd');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const mongoose = require('mongoose'); //mongose 서버와 백엔드 연결 


const PORT = 4000;

const db = 'mongodb://localhost:27017/user';
let rawData = fs.readFileSync('./rcmdCombData.json')
app.use(cors());
app.use(bodyParser.json());
let data = JSON.parse(rawData)

let rawDocInOrderData = fs.readFileSync('./doc_id_in_order.json')
let docInOrder = JSON.parse(rawDocInOrderData)["id"]

mongoose.connect(db, {
    server: {
        socketOptions: {
            socketTimeoutMS: 0,
            connectTimeoutMS: 0
        }
    }
},
    err => {
        if (err) {
            console.error('Error!' + err)
        } else {
            console.log('Connected to mongodb');
        }
    });


//root dir
// app.get('/', function (req, res) {
//     res.send('Hello from server');
//     send();

// })

send()

function send() {
    console.log(data)
    // console.log(typeof(data[0]["docID"]))
    for (var i in data) {
        // console.log(data[i][0])
        var rcmdData = data[i][1]["rcmd"]
        for(var j = 0 ; j < rcmdData.length; j++){
            var docNum = rcmdData[j][0];
            rcmdData[j][0] = docInOrder[docNum]
        }
        // console.log(rcmdData);
        newKey = new rcmd({
            docID: data[i][0]["id"],
            rcmd: data[i][1]["rcmd"]
        })
        newKey.save((err, key) => {
            if (err)
                console.log(err)
        })
    }
}

//server listen with no time interval?
app.listen(PORT, function () {
    console.log('Express server running on port ' + PORT)
});

