const mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();
const comDoc = require('./models/community');
const mongoose = require('mongoose')

//test methods and modules
const communityModule = require('./communityDocsQuery')
const writeNewDoc = communityModule.writeNewDoc;
const loadFirstDocList = communityModule.loadFirstDocList;
const loadNextDocList = communityModule.loadNextDocList;
const loadPriorDocList = communityModule.loadPriorDocList;
const DOC_NUM = communityModule.DOC_NUMBERS; // 한 페이지 당 문서의 수
const ITERATION = 10; // 몇 페이지의 문서를 생성할 것인지 결정
const TEST_NUM = DOC_NUM * ITERATION;


const Res = require('./models/Res');
const { skip } = require('rxjs-compat/operator/skip');

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
    it('save data test', function (done) {
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

    it('remove collection test', function (done) {
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
            // console.log(writeNewDoc);
            r = await writeNewDoc(sample);
            // console.log(r)
            // console.log(i ," : ", r);
            var _res_ = new Res(true, "writeNewDoc ok");
            // console.log(_res_)
            assert.deepEqual(r, _res_);
        }
    })

    it.skip('loadFirstDocList test', async () => {
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
            if (i < DOC_NUM) {
                assert.deepEqual(r.payload[i]["user"], "user" + i);
                assert.deepEqual(r.payload[i]["content"], "content" + i);
            }
        }
    })

    it.skip('loadNextDocList test', async () => {
        let cur_start_idx = 0;
        for (var j = 0; j < ITERATION -1 ; j++) { //전체 페이지 테스트. 맨 처음 페이지는 loadFirstDocList에서 한번 추출했다. 그래서 start_idx가 0에서 시작.
            var req = {
                body:
                {
                    cur_start_idx: cur_start_idx
                }
            }
            r = await loadNextDocList(req);
            data = r.payload.data;
            assert.deepEqual(r.succ, true);
            assert.deepEqual(r.msg, "/loadNextDocList ok");
            data.should.have.length(DOC_NUM);
            new_idx = r.payload.next_start_idx;//새 페이지의 시작하는 index
            // console.log(new_idx);
            assert.deepEqual(new_idx, cur_start_idx + DOC_NUM); //다음 페이지의 문서를 가져왔으니 idx 는 start_idx + 10이 됨.
            for (var i = 0; i < data.length; i++) {
                // console.log(data[i])
                var idx = i + new_idx;
                assert.deepEqual(data[i]["user"], "user" + idx);
                assert.deepEqual(data[i]["content"], "content" + idx);
            }
            cur_start_idx = new_idx;
        }
    })

    it.skip('loadPriorDocList test', async() => {
        let cur_start_idx = ITERATION * DOC_NUM;
        for (var j = 0; j < ITERATION -1 ; j++) { //전체 페이지 테스트. 맨 처음 페이지는 loadFirstDocList에서 한번 추출했다. 그래서 start_idx가 0에서 시작.
            var req = {
                body:
                {
                    cur_start_idx: cur_start_idx
                }
            }
            r = await loadPriorDocList(req);
            data = r.payload.data;
            assert.deepEqual(r.succ, true);
            assert.deepEqual(r.msg, "/loadPriorDocList ok");
            data.should.have.length(DOC_NUM);
            new_idx = r.payload.next_start_idx;//새 페이지의 시작하는 index
            // console.log(new_idx);
            assert.deepEqual(new_idx, cur_start_idx - DOC_NUM); //다음 페이지의 문서를 가져왔으니 idx 는 start_idx + 10이 됨.
            for (var i = 0; i < data.length; i++) {
                // console.log(data[i])
                var idx = i + new_idx;
                assert.deepEqual(data[i]["user"], "user" + idx);
                assert.deepEqual(data[i]["content"], "content" + idx);
            }
            cur_start_idx = new_idx;
        }
    })
});
