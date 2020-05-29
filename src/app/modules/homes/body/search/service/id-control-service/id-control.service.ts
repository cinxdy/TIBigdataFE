import { ArticleSource } from '../../article/article.interface';
import { Injectable } from '@angular/core';
import { EPAuthService } from '../../../../../core/componets/membership/auth.service';
import { ElasticsearchService } from "../../../search/service/elasticsearch-service/elasticsearch.service";

// import { HomesModule } from '../../../homes.module'

@Injectable()
export class IdControlService {
  private idChosen: string = "";
  private idList: string[] = [];
  private article: ArticleSource;
  private myDocsTitles: string[] = [];

  constructor(private auth: EPAuthService, private es: ElasticsearchService,
  ) { }

  clearAll() {
    this.idChosen = "";
    this.idList = [];
    this.idChosen = "";
  }

  setIdList(id: string) {
    this.idList.push(id);
  }

  popIdList() {
    this.idList.pop();
  }

  clearIdList() {
    this.idList = [];
  }

  getIdList() {
    return this.idList;
  }

  clearIds() {
    this.idList = [];
  }

  setIdChosen(id: string) {
    this.idChosen = id;
    // console.log(this.idChosen);
  }

  getIdChosen() {
    return this.idChosen;
  }

  clearIdChosen() {
    this.idChosen = "";
  }

  getArticle() {
    return this.article;
  }

  setArticle(art: ArticleSource) {
    this.article = art;
  }

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
