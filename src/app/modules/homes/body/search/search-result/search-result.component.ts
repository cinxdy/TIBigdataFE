import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Input,
  Inject,
  Output
} from "@angular/core";
import { Router } from "@angular/router";
import { ElasticsearchService } from "../service/elasticsearch.service";
import { ArticleSource } from "../article/article.interface";
import { Subscription } from "rxjs";
// import { Observable, of } from "rxjs";
import { IdControlService } from "../id-control-service/id-control.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IpService } from "src/app/ip.service";

@Component({
  selector: "app-search-result",
  templateUrl: "./search-result.component.html",
  styleUrls: ["./search-result.component.less"]
})
export class SearchResultComponent implements OnInit {
  //Flask data
  // private BASE_URL: string = "http://localhost:5000/keywordGraph";
  // serverData: JSON;
  // private RCMD_URL: string = "http://localhost:5000/rcmd";
  // private static readonly INDEX = "nkdb";
  // private static readonly TYPE = "nkdb";
  // private queryText = "";
  // private lastKeypress = 0;
  // private thisURL: string = "http://localhost:4200/homes/searchResult";

  private fileDir: string =
    "assets//homes_search_result_wordcloud/tfidfData.json";
  public relatedKeywords = ["북한", "김정은", "북핵", "문재인", "미사일"];
  private RCMD_URL: string = IpService.getCommonIp() + ":5000/rcmd";
  private idList: string[] = [];
  private rcmdList: {};
  private isSearchLoaded: boolean = false;
  private isInfoLoaded: boolean = false;
  private headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });
  private articleSources: ArticleSource[]; //이친구를 포문돌려서
  private docId: string;
  private isConnected = false;
  private status: string;
  private subscription: Subscription;
  private searchKeyword: string;

  queryText : string;

  constructor(
    private idControl: IdControlService,
    public _router: Router,
    private http: HttpClient,
    private es: ElasticsearchService //private cd: ChangeDetectorRef
  ) {
    this.isConnected = false;
    this.subscription = this.es.articleInfo$.subscribe(info => {
      this.articleSources = info;
      // console.log(info)
    });
  }

  ngOnInit() {
    if (IpService.getCommonIp()==IpService.getDevIp()) {
      if(this.es.getKeyword() == undefined){
        this.es.setKeyword("북한산");
        this.queryText = "북한산"
      }
    }

    this.loadResultPage();
  }

  getRcmd() {
    this.http
      .post(this.RCMD_URL, { idList: this.idList }, { headers: this.headers })
      .subscribe(data => {
        this.rcmdList = data;
        // console.log(data);
        this.isInfoLoaded = true;
        console.log("isInfoLoaded is true");

        // console.log("isSearchLoaded is true");

        // console.log("getRcmd() done. loading done!");
      });
  }

  //Get result from flask
  getResult() {
    this.searchKeyword = this.es.getKeyword();
    this._router.navigateByUrl("search/freqAnalysis");
  }

  addList(i) {
    this.idControl.setIdList( this.idList[i] );
    // console.log("new id added to list! : " +     this.idList[i]  );
  }
  //검색되어 나온 글들의 id 값을 array에 넣어줌

  navToDataChart() {
    console.log("cumulative id list so far : ");
    let v = this.idControl.getIdList();
    console.log(v);
    this._router.navigateByUrl("search/ChosenDocAnalysis");
  }

  navToDocDetail() {
    this._router.navigateByUrl("search/DocDetail");
  }

  chooseDoc(i) {
    // this.idControl.clearIdChosen();
    // this.idControl.setArticle(this.articleSources[i]);
    this.idControl.setIdChosen(this.articleSources[i]["_id"]);
    this.navToDocDetail();
  }

  private keywords: any[];

  showKeyword() {
    // console.log("result comp : showKeyword() start");
    this.http.get(this.fileDir).subscribe(data => {
      this.keywords = [];
      let tfData = data as []; //전체 자료 불러오고
      console.log("tfidf table is loaded")
      // console.log(data);
      let titles = this.articleSources as []; //검색된 데이터들을 받음

      for (var i in titles) {
        this.idList[i] = titles[i]["_id"];
      }

      for (var j = 0; j < this.idList.length; j++) {
        let needData = {};
        needData = tfData.find(d => d["docID"] === this.idList[j]);

        try {
          let tfVal = needData["TFIDF"];

          const kwd = [] as any;
          let word;
          for (var k = 0; k < 3; k++) {
            word = tfVal[k][0];
            kwd.push(word);
          }
          this.keywords.push(kwd);
        } catch {
          console.log("error at index " + j);
          console.log("obejct detail : " + needData);
          console.log("looking for : ", tfData[j]["docID"]);
        }
      }
      // console.log("showKeyword() done...");
      this.getRcmd();
      this.relatedKeywords = [];

      let keys = this.keywords;
      let count = 0;
      for (let i = 0; i < keys.length; i++){
        // console.log(this.keywords[i])
        for(let j = 0 ; j < keys[i].length; j++){
          this.relatedKeywords.push(keys[i][j]);
          count ++;
          if(count > 5) break;
        }
        if(count > 5) break;
      }
      this.relatedKeywords = Array.from(new Set(this.relatedKeywords));
      // console.log(this.relatedKeywords);
    });
  }

  relatedSearch(keyword : string){
    this.es.setKeyword(keyword);
    this.queryText = keyword;

    // this.es.fullTextSearch("post_body", keyword);
    // this.isSearchLoaded = false;
    // this.isInfoLoaded = false;
    // console.log("isInfoLoaded is false");
    this.loadResultPage()
    // console.log("search bar : fulltextsearch done with " + this.queryText);
    // this._router.navigateByUrl("search");  }
  }

  loadResultPage(){
    console.log("loadResultPage started")
    this.isSearchLoaded = false;
    this.isInfoLoaded = false;
    console.log("isInfoLoaded is false");
    // console.log(this.es.getKeyword());

    let queryText = this.es.getKeyword();
    this.es.fullTextSearch("post_body", queryText);
    // console.log("search bar : fulltextsearch done with " + queryText);

    this.idControl.clearIdList();
    // console.log("isSearchLoaded is false");
    this.idList = [];
    // console.log(this.es.articleSource);
    // console.log("result comp : subscribe from es start!");
    this.es.articleInfo$.subscribe(articles => {
      // console.log("result comp : pomise start!");
      new Promise(r => {
        this.articleSources = articles;
        // console.log("result comp : recieved search result article sources");
        // console.log(articles);
        this.isSearchLoaded = true;

        r();
      }).then(() => {
        // console.log("result comp : showKeyword() start");
        this.showKeyword();
      });
    });
  }
}

