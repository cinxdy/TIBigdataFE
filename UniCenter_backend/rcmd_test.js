const mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();
const Rcmd = require('./models/rcmd');

const mongoose = require('mongoose')
const communityModule = require('./communityDocsQuery')
const funcTest = communityModule.writeNewDoc;
//test methods and modules
const rcmdModule = require('./rcmdQuery')
const getRcmdTbl = rcmdModule.getRcmdTbl;
console.log(getRcmdTbl)
console.log(funcTest)
// const ITERATION = 10; // 몇 페이지의 문서를 생성할 것인지 결정
// const TEST_NUM = DOC_NUM * ITERATION;


const Res = require('./models/Res');
const { TIMEOUT } = require('dns');
const rcmd = require('./models/rcmd');

var request = require('request');
var headers = {
    'Content-Type': 'application/json'
};

var dataString = '{"query" :{"match" :{ "post_body" : "백두산" }}} '


var options = {
    url: 'http://203.252.112.14:9200/capstone/_search?&scroll=100m&size=200',
    method: 'POST',
    headers: headers,
    body: dataString
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
    console.log("ummm...well...")
}

// request(options, callback);

function removeCollection() {
    // return new Promise((resolve) => {

    //     comDoc.remove({}, (err, res) => {
    //         if (err)
    //             console.log("delete failed");
    //         else
    //             resolve();
    //     })
    // })
}

//describe tests
// describe('rcmd module tests', function () {
//     before(function () {

//     });

//     // afterEach()
//     after(removeCollection)
//     it('rcmd test', async () => {
//         body = {
//             "id": "5de111aab53863d63aa55229",
//             "num" : 10
//         }
//         // getRcmdTbl(body);
//         // "5de111aab53863d63aa55229"
//     })

// })