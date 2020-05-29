// import { Injectable } from '@angular/core';
import { IdControlService } from '../service/id-control-service/id-control.service';
import { Article } from "../article/article.interface";
import { ElasticsearchService } from '../service/elasticsearch-service/elasticsearch.service';
import { Component, OnInit, Inject } from '@angular/core';
// import { Article } from '../article/article.interface';
import { WordcloudService } from '../../../graphs/wordcloud/wordcloud.service';
import { CloudData, CloudOptions } from "angular-tag-cloud-module";
import { RecomandationService } from '../service/recommandation-service/recommandation.service';
import { DatabaseService } from "../../../../core/componets/database/database.service";

@Component({
  selector: 'app-search-detail',
  templateUrl: './search-detail.component.html',
  styleUrls: ['./search-detail.component.less']
})
export class SearchDetailComponent implements OnInit {

  private article: Article;
  private cData: CloudData[];
  private isLoaded: boolean = false;
  private rcmdList: Array<string>;
  private relateToggle: boolean = false;
  constructor(
    private rcmd: RecomandationService,
    private idControl: IdControlService,
    private wordcloud: WordcloudService,
    private es: ElasticsearchService,
    private db: DatabaseService
  ) { }

  ngOnInit() {
    this.loadPage();


  }
  goToDoc(r) {
    // console.log(r)
    this.idControl.setIdChosen(this.rcmdList[0]["id"][r]);
    this.loadPage();
    // this.rcmd.goToDoc(r);
  }

  loadPage() {
    this.isLoaded = false;
    this.relateToggle = false;
    // this.article = this.idControl.getArticle()["_source"];
    let id = this.idControl.getIdChosen();
    // console.log("id : " + id)
    // this.es.idSearch(id).then((r) =>{
    //   this.article = r;
    // });
    this.db.getRelatedDocs(id).then(res => {
      this.rcmdList = res as [];
      console.log("from db : ",res)
      this.relateToggle = true;
    });
    // this.rcmd.getRcmd([id]).then((data)=>{
    //   // console.log(data);
    //   this.rcmdList = data as [];
    //   console.log("from rcmd : ", data)
    // })

    this.es.searchById(id).then((res) => {
      // this.article = res.hits.hits._source
      // console.log(res);
      this.article = res["hits"]["hits"][0]["_source"];
      // console.log(this.article)
      this.wordcloud.createCloud(id)
        .then((data) => {
          this.cData = data as CloudData[]
          this.isLoaded = true;

          // console.log("detail comp data store test : " + this.cData);
        });
    })
    // let id = this.idControl.getArticle()["_id"];

    // console.log(this.article);
  }

  // cldData: CloudData;
  options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value
    width: 600,
    height: 300,
    overflow: false
  };



}
