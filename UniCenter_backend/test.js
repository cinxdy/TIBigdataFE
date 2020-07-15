const mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();
const comDoc = require('./models/community');
const mongoose = require('mongoose')

//test methods and modules
const communityModule = require('./communityDocsQuery')
const funcTest = communityModule.writeNewDoc;
const loadFirstDocList = communityModule.loadFirstDocList;
const loadNextDocList = communityModule.loadNextDocList;
const DOC_NUM = communityModule.DOC_NUMBERS;
const TEST_NUM = DOC_NUM * 5;

const Res = require('./models/Res');

function removeCollection() {
    return new Promise((resolve) => {

        comDoc.remove({}, (err, res) => {
            if (err)
                console.log("delete failed");
            else
                resolve();
        })
    })
}

//describe tests
describe('community module tests', function () {
    before(function () {

    });

    // afterEach()
    after(removeCollection)

    //create tests
    it.skip('save data test', function (done) {
        var cd = new comDoc({
            user: "username",
            content: "This is long long string contents",
            date: new Date()
        });

        cd.save().then(function () {


            comDoc.find({}, (err, res) => {
                if (err)
                    done(err);
                // console.log(res)
                res.should.have.length(1);
                res = res[0]
                assert.equal(res.user, "username");
                assert.equal(res.content, "This is long long string contents");
                done();
                // assert.equal(res.date : )
            })
        });
    });

    it.skip('remove collection test', function (done) {
        removeCollection().then(() => {

            comDoc.count({}, (err, res) => {
                assert.equal(res, 0);
            })
            done();
        })
    });

    it('writeNewDoc test', async () => {
        var testCases = [];
        var flag = 0;
        for (var i = 0; i < TEST_NUM; i++) {
            sample = { body: { user: "user" + i, content: "content" + i } }
            // console.log(funcTest);
            r = await funcTest(sample);
            // console.log(r)
            // console.log(i ," : ", r);
            var _res_ = new Res(true, "writeNewDoc ok");
            // console.log(_res_)
            assert.deepEqual(r, _res_);
        }
    })

    it('loadFirstDocList test', async () => {
        r = await loadFirstDocList();
        // console.log(r);
        res_succ = true;
        res_msg = '/loadFirstDocList ok';
        // res_payload_len = DOC_NUM;
        assert.deepEqual(r.succ, res_succ);
        assert.deepEqual(r.msg, res_msg);
        r.payload.should.have.length(DOC_NUM);
        // assert.deepEqual(r.payload.length, res_payload_len);
        for (var i = 0; i < TEST_NUM; i++) {
            if(i < DOC_NUM){
                assert.deepEqual(r.payload[i]["user"],"user" + i);
                assert.deepEqual(r.payload[i]["content"],"content" + i);            
            }     
        }
    })

    it('loadNextDocList test', async () => {
        var req = { body : 
            {
                cur_idx : 10
            }
        }
        r = await loadNextDocList(req);
        data = r.payload.data;
        
    })
});
