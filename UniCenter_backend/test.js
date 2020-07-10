const mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();
const comDoc = require('./models/community');
const mongoose = require('mongoose')

//describe tests
describe('community module tests', function () {
    before(function(){

    });

    after(function(){
        comDoc.remove({},(err, res)=>{
            if(err)
                console.log("delete failed");
        })
    })

    //create tests
    it('save data test', function (done) {
        var cd = new comDoc({
            user: "username",
            content: "This is long long string contents",
            date: new Date()
        });

        cd.save(done);
    });

    it('remove collection test',function(done){
        comDoc.find({},(err,res)=>{
            if(err)
                done(err);
            console.log(res)
            res.should.have.length(1);
            res = res[0]
            assert.equal(res.user,"username");
            assert.equal(res.content, "This is long long string contents");
            done();
            // assert.equal(res.date : )
        })
    });
});
