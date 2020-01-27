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
  // private static readonly INDEX = "nkdb";
  // private static readonly TYPE = "nkdb";

  // private queryText = "";

  // private lastKeypress = 0;
  private idList: string[] = [];
  private rcmdList : {};

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
    this.subscription = this.es.articleInfo$.subscribe(info => {
      this.articleSources = info;
      
      this.http.post(this.RCMD_URL,{"idList" : this.idList},{headers : this.headers})
      .subscribe(data =>{
        console.log("data : " + data);
        this.rcmdList = data;
        console.log("this.rcmdList : " + this.rcmdList);
        /**
         * 해야 할 것.
         * 받은 rcmdList = { "id" : "abcd", "rcmd" : ["a", ...]}
         * 여기서 받은 id의 순서와 보낸 id의 순서가 일치하는지 확인해야 한다.
         * 그리고 만약 페이지가 2개 이상이 되면...어떻게 바뀌어야 하는지도 생각해보아야 함.
         * 
         * 아무튼...
         * rcdmList에서 하니씩 뽑은 다음에...
         * ngFor = "rcdm in this.rcdmList"
         * rcdm["rcmd"]
         */
        this.showKeyword();
      });


    });

    this.choiceIdList.clearIds();
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

      // let idList = [];

      //   for(var i  in titles){
      // //  for(var i = 0; titles[i];i++){
      //     let j1 : [];
      //     j1 = titles[i];
      //     let j2 = [];
      //     j2 = j1["_id"];
      //     console.log(j2);
      //     idList[i] = j2;
      //   }

      for (var i in titles) {
        //  for(var i = 0; titles[i];i++){
        let j1: string;
        j1 = titles[i]["_id"];
        // let j2 = [];
        // j2 = j1["_id"];
        // console.log(j1);
        this.idList[i] = j1;
      }

      // console.log("TTT");
      // console.log(this.idList); //아이디를 담고있는 배열

      for (var j = 0; j < this.idList.length; j++) {
        let needData = {};
        needData = tfData.find(d => d["docID"] === this.idList[j]);

        try {
          let tfVal = needData["TFIDF"];

          const kws = [] as any;
          let word;
          // console.log(j, " 문서");
          for (var k = 0; k < 3; k++) {
            word = tfVal[k][0];
            kws.push(word);
          }
          // console.log(kws);
          this.keywords.push(kws);
        } catch {
          console.log("error at index " + j);
          console.log("obejct detail : " + needData);
          // console.l
          console.log("looking for : ", tfData[j]["docID"]);
        }
      }
      console.log(this.idList);
    });
  }
}
