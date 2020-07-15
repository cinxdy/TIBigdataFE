const mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();
const comDoc = require('./models/community');
const mongoose = require('mongoose')
const communityModule = require('./communityDocsQuery')
const funcTest = communityModule.writeNewDoc;

const Res = require('./models/Res');

function removeCollection(){
    return new Promise((resolve)=>{

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

        cd.save().then(function(){

            
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
        removeCollection().then(()=>{

            comDoc.count({},(err,res)=>{
                assert.equal(res,0);
            })
            done();
        })
    });

    it('writeNewDoc test',  async () => {
        var testCases = [];
        var flag = 0;
        for (var i = 0; i < 10; i++) {
            sample = { body: { user: "user"+i, content: "content"+i } }
            // console.log(funcTest);
            r = await funcTest(sample);
            console.log(r)
            // console.log(i ," : ", r);
            var _res_ = new Res(true,"writeNewDoc ok");
            // console.log(_res_)
            assert.deepEqual(r,_res_);
        
        
            
        }
    })
});
