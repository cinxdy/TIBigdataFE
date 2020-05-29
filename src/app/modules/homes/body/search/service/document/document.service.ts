import { Injectable } from '@angular/core';
// import { EPAuthService } from '../../../../../core/componets/membership/auth.service';
import { ElasticsearchService } from "../../../search/service/elasticsearch-service/elasticsearch.service";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private myDocsTitles: string[] = [];

  constructor( private es: ElasticsearchService,
    ) { }

   //user page ts에도 동일한 함수 있음. 차후 idList ts으로 이동하여 합침.
  /**
   * @description id string array을 받아서 해당 id을 문서 제목에 매핑하는 함수
   * @param ids 가 없으면 현재 유저의 myDoc을 받아온다. ids가 있으면 param으로 받은 문서 가져옴
   */ 
  async convertID2Title(ids : string[]) {
    console.log(ids)

    return new Promise((resolve) => {
      this.es.searchByManyId(ids).then(res => {
        let articles = res["hits"]["hits"];
        console.log(articles)
        console.log("article len" + articles.length);
        for (let i = 0; i < articles.length; i++) {
          this.myDocsTitles[i] = articles[i]["_source"]["post_title"][0]
        }
        console.log("id control service get id done");
        resolve(this.myDocsTitles);
      })
      // this.http.post<any>()
    })
  }
}
