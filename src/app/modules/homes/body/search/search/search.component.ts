import { Component, OnInit } from '@angular/core';
import { ElasticsearchService } from '../service/elasticsearch.service';
import { Router } from '@angular/router';
import { ArticleSource } from '../article/article.interface';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {

  private static readonly INDEX = 'nkdboard';
  private static readonly TYPE = 'nkdboard';

  private queryText = '';
 
  private lastKeypress = 0;

  articleSources: ArticleSource[];

  constructor(public _router: Router, private es: ElasticsearchService) {
    this.queryText='';
   }

  ngOnInit() {
    
  }


  onKey($event){
    this.queryText=$event.target.value;
  }
  sendResult(){

    this.es.getResult(this.articleSources);
    this.es.setKeyword(this.queryText);
    this.toResultPage();
  }

  toResultPage(){
    this._router.navigateByUrl("/homes/searchResult");
  }


}
