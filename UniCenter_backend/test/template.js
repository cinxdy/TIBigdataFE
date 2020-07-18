const Res = require('../models/Res');

/**
 * 
 * @param hook : hook function
 */
function template(hook,is_test) {
    return new Promise(async (resolve) => {
        _res_ = await hook()
        // console.log("_res_ : ", _res_);
        resolve(_res_);
    })

}

/**
 * 
 */
function template2(hook,res, is_test){
    console.log(hook)
    return new Promise(async (resolve)=>{
        hook.exec((err, data) => {
            console.log("hook data : ", data)
            if (err)
                console.log("/loadFirstDocList failed");
            else {
                resolve(new Res(true, "/loadFirstDocList ok", data))
            }
        })
    }).then((rtrn)=>{
        console.log("rtrn done : ", rtrn)
        // console.log
        if (is_test) {
            return rtrn;
        }
        else {
            res.status(200).send(rtrn);
            // return rtrn;
        }
    })
}

/**
 *     testHook = function () {
        return new Promise(r => {
            comDoc.find({}).limit(DOC_NUMBERS).exec((err, data) => {
                if (err)
                    console.log("/loadFirstDocList failed");
                else {
                    r(new Res(true, "/loadFirstDocList ok", data))
                }
            })

        })
    }


    res_tmp = await template(testHook, IS_TEST);
    if (IS_TEST) {
        return res_tmp;
    }
    else {
        res.status(200).send(res_tmp);
    }
 * 
 * 
 */

module.exports = {template, template2};
