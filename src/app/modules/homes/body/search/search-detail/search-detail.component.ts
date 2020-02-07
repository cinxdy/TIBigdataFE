// import { Injectable } from '@angular/core';
import { IdControlService } from '../search-result/id-control-service/id-control.service';
import { ArticleSource } from "../article/article.interface";
// import { ElasticsearchService } from '../service/elasticsearch.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Article } from '../article/article.interface';

@Component({
  selector: 'app-search-detail',
  templateUrl: './search-detail.component.html',
  styleUrls: ['./search-detail.component.less']
})
export class SearchDetailComponent implements OnInit {
  
  private article : ArticleSource;
  
  constructor(
    private idControl: IdControlService,
    // private es: ElasticsearchService,
    ) { }

  ngOnInit() {
    this.article = this.idControl.getArticle()["_source"];
    console.log(this.article);
  }

}
