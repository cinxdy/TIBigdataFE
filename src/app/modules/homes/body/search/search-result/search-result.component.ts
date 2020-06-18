import {
  Component,
  OnInit,
  // ChangeDetectorRef,
  // Input,
  // Inject,
  // Output
} from "@angular/core";
import { Router } from "@angular/router";
import { ElasticsearchService } from 'src/app/modules/communications/elasticsearch-service/elasticsearch.service';
import { ArticleSource } from "../article/article.interface";
import { Subscription } from "rxjs";
// import { Observable, of } from "rxjs";
import { IdControlService } from "../service/id-control-service/id-control.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DocumentService } from "../service/document/document.service";

import { IpService } from "src/app/ip.service";
import { RecomandationService } from "../service/recommandation-service/recommandation.service";
import { EPAuthService } from '../../../../communications/fe-backend-db/membership/auth.service';
import { EventService } from "../../../../communications/fe-backend-db/membership/event.service";
import { AnalysisDatabaseService } from "../../../../communications/fe-backend-db/analysis-db/database.service";


@Component({
  selector: "app-search-result",
  templateUrl: "./search-result.component.html",
  styleUrls: ["./search-result.component.less"]
})
export class SearchResultComponent implements OnInit {
  
  public relatedKeywords = [];
  private RCMD_URL: string = this.ipService.get_FE_DB_ServerIp() + ":5000/rcmd";
  private searchResultIdList: string[] = [];
  private keepIdList : string [] = [];
  private relatedDocs: {}[] = [];
  private userSearchHistory: string[];
  private isSearchLoaded: boolean = false;
  private isRelatedLoaded: boolean = true;//going to be removed
  private isKeyLoaded: boolean = false;
  private headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });
  private articleSources: ArticleSource[];
  private subscription: Subscription;
  private searchKeyword: string;
  // private isToggleRelated: boolean
  private relateToggle: Array<boolean>;
  private isLogStat: Number = 0;

  queryText: string;

  constructor(
    private auth: EPAuthService,
    private evtSvs: EventService,
    private rcmd: RecomandationService,
    private ipService: IpService,
    private idControl: IdControlService,
    public _router: Router,
    private http: HttpClient,
    private es: ElasticsearchService, //private cd: ChangeDetectorRef.
    private db: AnalysisDatabaseService,
    private docControl : DocumentService
  ) {
    // this.isConnected = false;
    this.subscription = this.es.articleInfo$.subscribe(info => {
      this.articleSources = info;
      // //console.log(info)
    });
  }

  ngOnInit() {
    if (this.ipService.get_FE_DB_ServerIp() == this.ipService.getDevIp()) {
      if (this.es.getKeyword() == undefined) {
        this.es.setKeyword("북한산");
        this.queryText = "북한산";
      }
    }
    // this.idControl.clearAll();
    //console.log(this.evtSvs.getSrchHst());
    this.loadResultPage();
    this.isLogStat = this.auth.getLogInStat()
  }


  async loadResultPage() {
    this.isSearchLoaded = false;
    this.isKeyLoaded = false;
    this.isRelatedLoaded = true;//plan to be removed

    this.idControl.clearIdList();
    this.userSearchHistory = [];
    this.searchResultIdList = [];
    this.keepIdList = [];
    let queryText = this.es.getKeyword();
    this.es.fullTextSearch("post_body", queryText); //검색 후 articlesource에 저장되어 있다.

    this.getUserSearchHistory()
    //검색한 결과 호출하는 함수를 따로 만들어도 괜찮을 듯.
    await this.loadSearchResult();
    this.createIdTable();
    this.loadKeywords();
  }


  
  //Get result from flask
  freqAnalysis() {
    this.searchKeyword = this.es.getKeyword();
    this._router.navigateByUrl("search/freqAnalysis");
  }

  // private flags = []
  boxChange(i){
    let idx = this.keepIdList.indexOf(this.searchResultIdList[i]);
    idx != undefined ? 
      this.keepIdList.push(this.searchResultIdList[i]) : 
      this.keepIdList.splice(idx,1);
  }

  keepMyDoc() {
    ////console.log("id lists: ", this.searchResultIdList);
    this.auth.addMyDoc(this.keepIdList).then(()=>{
      alert("문서가 나의 문서함에 저장되었어요.")
    });
    // this.idControl.clearAll();

  }


  navToDocDetail() {
    this._router.navigateByUrl("search/DocDetail");
  }

  setThisDoc(idx: number) {
    this.idControl.setIdChosen(this.relatedDocs[idx]["id"]);
    this.navToDocDetail();
  }
  tgglRelated(i: number) {
    //console.log("tgglRelated")
    this.loadRelatedDocs(i); //load from flask
    this.relateToggle[i] = !this.relateToggle[i];
  }


  loadRelatedDocs(idx: number) {
    
    this.db.getRelatedDocs(this.searchResultIdList[idx]).then(res => {
      this.relatedDocs = res as [];
      // console.log("from db : ",res)
    });
   
  }

  private keywords: any[] = [];

  loadKeywords() {
    // console.log("loadKeywords : " ,this.searchResultIdList)
    this.db.getTfidfValue(this.searchResultIdList).then(res => {
      // console.log(res)
      let data = res as []
      // console.log("loadkeywords : ", data)
      
      for (let n = 0; n < data.length; n++) {
        let tfVal = data[n]["tfidf"];
        // console.log(tfVal[0])
        this.keywords.push(tfVal)
        this.relatedKeywords.push(tfVal[0])
      }
    })
    // //console.log("keywords : ",this.keywords)
    this.isKeyLoaded = true;
  }



  relatedSearch(keyword: string) {
    this.es.setKeyword(keyword);
    this.queryText = keyword;
    this.auth.addSrchHst(this.queryText);

    this.loadResultPage();
  }

  loadSearchResult() {
    // //console.log("loadSearchResult");

    return new Promise(resolve => {
      this.es.articleInfo$.subscribe(articles => {
        this.articleSources = articles;
        this.isSearchLoaded = true;
        resolve();
      });
    });
  }

  createIdTable() {
    // let temp = this.articleSources as []; //검색된 데이터들을 받음
    this.relateToggle = []; //연관 문서 여닫는 버튼 토글 초기화
    for (var i in this.articleSources) {
      this.searchResultIdList[i] = this.articleSources[i]["_id"];
      this.relateToggle.push(false);
    }
  }

  async getUserSearchHistory(){
    this.userSearchHistory = await this.auth.showSrchHst();
    console.log("userSearch history" + this.userSearchHistory)
  }


}
