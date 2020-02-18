// import { Injectable } from '@angular/core';
import { IdControlService } from '../id-control-service/id-control.service';
import { Article } from "../article/article.interface";
import { ElasticsearchService } from '../service/elasticsearch.service';
import { Component, OnInit, Inject } from '@angular/core';
// import { Article } from '../article/article.interface';
import { WordcloudService } from '../../../graphs/wordcloud/wordcloud.service';
import { CloudData, CloudOptions } from "angular-tag-cloud-module";

@Component({
  selector: 'app-search-detail',
  templateUrl: './search-detail.component.html',
  styleUrls: ['./search-detail.component.less']
})
export class SearchDetailComponent implements OnInit {
  
  private article : Article;
  private cData: CloudData[];
  private isLoaded : boolean = false;
  constructor(
    private idControl: IdControlService,
    private wordcloud : WordcloudService,
    private es: ElasticsearchService,
    ) { }

  ngOnInit() {
    this.isLoaded = false;
    // this.article = this.idControl.getArticle()["_source"];
    let id = this.idControl.getIdChosen();
    // console.log("id : " + id)
    // this.es.idSearch(id).then((r) =>{
    //   this.article = r;
    // });
    this.es.searchById(id).then((res)=>{
      // this.article = res.hits.hits._source
      // console.log(res);
      this.article = res["hits"]["hits"][0]["_source"];
      // console.log(this.article)
      this.wordcloud.createCloud(id)
      .then((data)=>{
        this.cData = data as  CloudData[]
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
