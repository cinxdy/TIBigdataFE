const mocha = require('mocha');
const sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();
const Rcmd = require('./models/rcmd');

const rcmdModule = require('./rcmdQuery')
const getRcmdTbl = rcmdModule.getRcmdTbl;
// console.log(getRcmdTbl)
// console.log(funcTest)
// const ITERATION = 10; // 몇 페이지의 문서를 생성할 것인지 결정
// const TEST_NUM = DOC_NUM * ITERATION;
const mockRequest = (req_body) => {
    return { body: req_body }
}

const mockResponse = () => {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    return res;
};

const Res = require('./models/Res');
const rcmd = require('./models/rcmd');

var request = require('request');
var headers = {
    'Content-Type': 'application/json'
};

var dataString = '{"query" :{"match" :{ "post_body" : "백두산" }}} '


var options = {
    url: 'http://203.252.112.14:9200/frontend_test/_search?&scroll=100m&size=200',
    method: 'POST',
    headers: headers,
    body: dataString
};

function callback(error, response, body) {
    if(error)
        console.log(error)
    if (!error && response.statusCode == 200) {
        body_obj = JSON.parse(body);
        id_body = body_obj["hits"]["hits"];
        for(var i = 0 ; i < id_body.length; i++){
            console.log(id_body[i]["_id"]);
        }
    }
}

// request(options, callback);


//describe tests
describe('rcmd module tests', function () {

    it('rcmd test', async () => {
        let req = mockRequest(
            {
                "id": "5de111aab53863d63aa55229",
                "num" : 20
            }
        )

        let res = mockResponse()

        // '5de11418b53863d63aa5537c',
        // '5de11441b53863d63aa55395',
        // '5de111d8b53863d63aa55245',
        // '5de1116fb53863d63aa55206',
        // '5de11282b53863d63aa5529c',
        // '5de113d8b53863d63aa55359',
        // '5de1102a4b79a29a5f987f35',
        // '5de111dab53863d63aa55246',
        // '5de1138fb53863d63aa5532d',
        // '5de113ffb53863d63aa5536f',
        // '5de11236b53863d63aa55270',
        // '5de1142fb53863d63aa5538a',
        // '5de113ceb53863d63aa55353',
        // '5de111bfb53863d63aa55236',
        // '5de111c9b53863d63aa5523c',
        // '5de113b6b53863d63aa55345',
        // '5de111ddb53863d63aa55247',
        // '5de1102c4b79a29a5f987f42',
        // '5de113dbb53863d63aa5535b',
        // '5de110274b79a29a5f987f1d'
        
        await getRcmdTbl(req, res);
        // "5de111aab53863d63aa55229"
    })

})