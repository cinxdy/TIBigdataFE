/**
 * 
 * 실험 이유 : 앵귤러 검색 결과 화면에서 문서가 추가된 날짜 확인하는 시각화 그래프에 숫자가 맞지 않았음. 
 * 살펴보니 어떤 문서는 문서가 등록된 날짜의 타입이 object, array이고 날짜 표시 형태도 제각각. 
 * 이 시각화의 데이터를 공급하는 플라스크에서는 이 정보를 일괄적으로 뽑아내서 가공을 하는데, 일정 형식이 아닌 타입은 그냥 적용되지 않음.
 * regrex 적용해서 형태 일관화
 * 
 */
var request = require('request');
var headers = {
    'Content-Type': 'application/json'
};

var dataString = '{"query": {"exists": {"field": "post_date"}}}';

var options = {
    url: 'http://203.252.112.14:9200/frontend_test/_search?&scroll=100m&size=200',
    method: 'GET',
    headers: headers,
    body: dataString
};

function callback(error, response, body) {
    if(error)
        console.log(error)
    if (!error && response.statusCode == 200) {
        body_obj = JSON.parse(body);
        hits_body = body_obj["hits"]["hits"];
        console.log(hits_body.length)
        var regex = /\d+-\d+-\d+/
        for(var i = 0 ; i < hits_body.length; i++){
            let d = hits_body[i]["_source"]["post_date"];
            if(Array.isArray(d))
                console.log(d[0])
            if(!Array.isArray(d)){
                console.log(regex.exec(d)[0])
            }
        }
    }
}

request(options, callback);