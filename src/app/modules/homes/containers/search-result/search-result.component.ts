import { Component, OnInit, ChangeDetectorRef, Input } from "@angular/core";
import { Router } from "@angular/router";
// import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ElasticsearchService } from "../../service/elasticsearch.service";
import { ArticleSource } from "../shared/article.interface";
import { Subscription } from "rxjs";
// import { Observable, of } from "rxjs";
import { IdListService } from "./id-list-service/id-list.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Component({
  selector: "app-search-result",
  templateUrl: "./search-result.component.html",
  styleUrls: ["./search-result.component.less"]
})
export class SearchResultComponent implements OnInit {
  //Flask data
  // private BASE_URL: string = "http://localhost:5000/keywordGraph";
  private fileDir: string =
    "assets//homes_search_result_wordcloud/tfidfData.json";
  public relatedKeywords = ["북한", "김정은", "북핵", "문재인", "미사일"];
  serverData: JSON;
  private RCMD_URL: string = "http://localhost:5000/rcmd";
  // private RCMD_URL: string = "http://203.252.103.123:5000/rcmd";

  // private static readonly INDEX = "nkdb";
  // private static readonly TYPE = "nkdb";

  // private queryText = "";

  // private lastKeypress = 0;
  private idList: string[] = [];
  private rcmdList: {};
  private loaded: boolean = false;

  articleSources: ArticleSource[]; //이친구를 포문돌려서
  docId: string;
  isConnected = false;
  status: string;
  subscription: Subscription;
  searchKeyword: string;

  constructor(
    private choiceIdList: IdListService,
    public _router: Router,
    private http: HttpClient,
    private es: ElasticsearchService //private cd: ChangeDetectorRef
  ) {
    this.isConnected = false;
    this.subscription = this.es.articleInfo$.subscribe(info => {
      this.articleSources = info;
    });
  }

  // private thisURL: string = "http://localhost:4200/homes/searchResult";
  private headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  ngOnInit() {
    this.loaded = false;
    this.idList = [];

    // let searchRst = new Promise(resolve =>
    // resolve(() => {
    this.es.articleInfo$.subscribe(articles => {
      new Promise(r => {
        // console.log("1st entered");
        this.articleSources = articles;
        r();
      }).then(() => {
        // console.log("2nd entered");
        this.showKeyword();
      /***
           * 받아와서 해야 할 세가지 일이 있다.
           * id을 딴다.
           * TF-IDF 테이블을 받아온다.
           * 비교한다.
           * flask에 요청해서 받아온다.

           */

      // this.articleSources = info;

      // this.loaded = true;
    });
    // })
    // );

    // searchRst.then(() => {
    // console.log("idList : " + this.idList);
    // console.log("airticles : " + this.articleSources);
    // this.getRcmd();
    // });

    /***


    this.subscription = this.es.articleInfo$.subscribe(info => {
      this.articleSources = info;





      this.showKeyword().then(() => {
        console.log("showKeyword done");
        console.log("after show keywords this idList " + this.idList);


        

            console.log("load done!");
            this.loaded = true;
          });
      });
    });

    this.choiceIdList.clearIds();
    */
  })
}

  getRcmd() {
    this.http
      .post(this.RCMD_URL, { idList: this.idList }, { headers: this.headers })
      .subscribe(data => {
        // console.log("data : " + data);
        this.rcmdList = data;
        this.loaded = true;
        // console.log("this.rcmdList : " + this.rcmdList);
      });
  }

  //Get result from flask
  getResult() {
    this.searchKeyword = this.es.getKeyword();
    this._router.navigateByUrl("/homes/analysis");
  }

  addList(i) {
    this.choiceIdList.setIdList(this.articleSources[i]["_id"]);
  }
  //검색되어 나온 글들의 id 값을 array에 넣어줌

  navToDataChart() {
    this._router.navigateByUrl("homes/wordcloud");
  }

  private keywords: any[] = [];

  showKeyword() {
    this.http.get(this.fileDir).subscribe(data => {
      let tfData = data as []; //전체 자료 불러오고

      let titles = this.articleSources as []; //검색된 데이터들을 받음

      for (var i in titles) {
        let j1: string;
        j1 = titles[i]["_id"];
        this.idList[i] = j1;
      }

      for (var j = 0; j < this.idList.length; j++) {
        let needData = {};
        needData = tfData.find(d => d["docID"] === this.idList[j]);

        try {
          let tfVal = needData["TFIDF"];

          const kws = [] as any;
          let word;
          for (var k = 0; k < 3; k++) {
            word = tfVal[k][0];
            kws.push(word);
          }
          this.keywords.push(kws);
        } catch {
          console.log("error at index " + j);
          console.log("obejct detail : " + needData);
          console.log("looking for : ", tfData[j]["docID"]);
        }
      }

      // console.log("in http this.idlist" + this.idList);
      this.getRcmd();
    });
    // console.log("outer http this.idList" + this.idList);
  }
}
