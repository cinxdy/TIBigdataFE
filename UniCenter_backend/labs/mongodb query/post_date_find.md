/**
 * 생성 근거 : 몽고 db의 post_date의 타입이 모두 시간으로 만들어져있는지 혹은 제각각 타입인지 확인하고자 쿼리
 * find({}).to
 * 
 *  [{ [$match: { post_data: {$exist : true} } }, {  $project: {docID: 1}]
 */

* 결과 값
```
    db.nkdb.aggregate([{ $match: { post_data: { $exist: true } } }, { $project: { post_date: 1 } }])
```
* 결론 : 13000개 문서의 db에도 시간은 제각각이다...
