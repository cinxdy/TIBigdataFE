import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../article.interface';
import { Router } from "@angular/router";
import { IdControlService } from "../../../search/service/id-control-service/id-control.service";
import { AnalysisDatabaseService } from "../../../../../communications/fe-backend-db/analysis-db/analysisDatabase.service";

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.less']
})
export class ArticleDetailsComponent implements OnInit {

  @Input() article: any;
  docId : string;
  constructor(    private db: AnalysisDatabaseService, public _router: Router ,    private idControl: IdControlService,
    ) { }


  ngOnInit() {
    // console.log(this.article)
    this.docId = this.article._id
    this.article = this.article._source;
    this.loadKeywords();
  }

  setThisDoc(){
    // console.log(this.docId);
    this.idControl.setIdChosen(this.docId);
    this.navToDocDetail();

    // this.docId = this.article["_id"];
    // console.log(this.docId);
    
  }

    //각 문서마다 들어갈 상위 키워드를 저장할 array
    private keywords: any[] = [];

    loadKeywords() {
      // console.log("loadKeywords : " ,this.searchResultIdList)
      this.db.getTfidfValue(this.docId).then(res => {
        // console.log(res)
        let data = res as []
        // console.log("loadkeywords : ", data)
        
        for (let n = 0; n < data.length; n++) {
          let tfVal = data[n]["tfidf"];
          // console.log(tfVal[0])
          this.keywords.push(tfVal)//각 문서에 상위 키워드 배열을 담는다.
  
          // if(this.relatedKeywords.length < 10)
          //   this.relatedKeywords.push(tfVal[0])//현재 검색어의 연관검색어를 각 문서의 상위 키워드로 저장
        }
      })
      // console.log("article detail : keywords : ",this.keywords)
      // this.isKeyLoaded = true;  
    }



  navToDocDetail() {
    this._router.navigateByUrl("search/DocDetail");
  }



}
