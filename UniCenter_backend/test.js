const mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();
const comDoc = require('./models/community');
const mongoose = require('mongoose')
const communityModule = require('./communityDocsQuery')
const funcTest = communityModule.writeNewDoc;

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
    it('save data test', function (done) {
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

    it('remove collection test', function (done) {
        removeCollection().then(()=>{

            comDoc.count({},(err,res)=>{
                assert.equal(res,0);
            })
            done();
        })
    });

    it('writeNewDoc test', (done) => {
        var testCases = [];

        for (var i = 0; i < 10; i++) {
            sample = { body: { user: "user1", content: "content1" } }
            testCases.push(sample);
            funcTest(sample).then((res)=>{
                assert.equal(res.user ,sample.body.user);
                assert.equal(res.content, sample.body.content);

                if(i == 10)
                    done();
            });
        }

        // comDoc.find({},(err, res)=>{
        //     console.log(res)
        //     for(var j = 0 ; j < 10; j++){
        //         console.log("j val : " + res[j])
        //         assert.equal(res[j].user ,testCases[j].body.user);
        //         assert.equal(res[j].content, testCases[j].body.content);

        //     }
        //     done();
        // })
    })
});
