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

  private static readonly INDEX = 'crawling';
  private static readonly TYPE = 'nkdboard';

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
            console.log(this.articleSources);
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
    this.es.setKeyword(this.queryText);
    // console.log('Sent!!');
    // console.log(this.articleSources);
  }

  navigateParser(){
    this._router.navigateByUrl("/homes/flask");
  }

  navigateLibrary(){
    this._router.navigateByUrl("/homes/library");
  }

  navigateQT(){
    this._router.navigateByUrl("/homes/querytest");
  }

  LineChart(){
    this._router.navigateByUrl("/homes/line-chart");
  }

  toFlask(){
    this._router.navigateByUrl("/homes/flask");
  }
  // 페이지 이동


}




