import { Component, OnInit, ChangeDetectorRef, Input } from "@angular/core";
import { Router } from "@angular/router";
// import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ElasticsearchService } from "../../service/elasticsearch.service";
import { ArticleSource } from "../shared/article.interface";
import { Subscription } from "rxjs";
// import { Observable, of } from "rxjs";
import { IdListService } from "./id-list-service/id-list.service";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "app-search-result",
  templateUrl: "./search-result.component.html",
  styleUrls: ["./search-result.component.less"]
})
export class SearchResultComponent implements OnInit {
  //Flask data
  private BASE_URL: string = "http://localhost:5000/keywordGraph";
  private fileDir: string = "assets//homes_search_result_wordcloud/tfidfData.json";
  public relatedKeywords = ["북한", "김정은", "북핵", "문재인", "미사일"];
  serverData: JSON;

  // private static readonly INDEX = 'nkdboard';
  // private static readonly TYPE = 'nkdboard';

  // private queryText = '';

  private static readonly INDEX = 'nkdb';
  private static readonly TYPE = 'nkdb';

  private queryText = '';
 
  private lastKeypress = 0;

  articleSources: ArticleSource[];
  
  docId: string;
  isConnected = false;
  status: string;
  subscription: Subscription;

  searchKeyword: string;

  constructor(
    private idList: IdListService,
    public _router: Router,
    // private http: HttpClient,
    private es: ElasticsearchService,
    // private cd: ChangeDetectorRef
  ) {
    this.isConnected = false;
    this.subscription = this.es.articleInfo$.subscribe(info => {
      this.articleSources = info;
    });
  }

  ngOnInit() {
    this.subscription = this.es.articleInfo$.subscribe(info => {
      this.articleSources = info;
    });
    this.idList.clearIds();
    //this.showKeyword();
  }

  //Get result from flask
  getResult() {
    this.searchKeyword = this.es.getKeyword();
    this._router.navigateByUrl("/homes/analysis");
  }

  addList(i) {
    this.idList.setIdList(this.articleSources[i]["_id"]);
  }
 //검색되어 나온 글들의 id 값을 array에 넣어줌 

  navToDataChart() {
    this._router.navigateByUrl("homes/wordcloud");
  }

  
}
