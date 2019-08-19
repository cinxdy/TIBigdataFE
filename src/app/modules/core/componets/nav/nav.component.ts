import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ElasticsearchService } from '../../../homes/service/elasticsearch.service';
import { ArticleSource } from '../../../homes/containers/querytest/article.interface';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent implements OnInit {

  private static readonly INDEX = 'test';
  private static readonly TYPE = 'ifes';

  private queryText = '';
 
  private lastKeypress = 0;

  articleSources: ArticleSource[];

  constructor(public _router: Router, private es: ElasticsearchService) {
    this.queryText='';
   }

  ngOnInit() {
    
  }

  search($event){
    if ($event.timeStamp - this.lastKeypress > 100) {
      this.queryText = $event.target.value;

      this.es.fullTextSearch(
        NavComponent.INDEX,
        NavComponent.TYPE,
        'bodys', this.queryText).then(
          response=> {
            this.articleSources = response.hits.hits;
          }, error => {
            //console.error(error);
          }).then(()=> {
            console.log('Search Completed!');
          });
        
    }
    this.lastKeypress = $event.timeStamp;
  }

  sendResult(){
    this.es.getResult(this.articleSources);
    console.log('Sent!!');
    console.log(this.articleSources);
  }

  navigateParser(){
    this._router.navigateByUrl("/homes/parser");
  }

  navigateLibrary(){
    this._router.navigateByUrl("/homes/library");
  }

  navigateQT(){
    this._router.navigateByUrl("/homes/querytest");
  }
  // 페이지 이동


}




