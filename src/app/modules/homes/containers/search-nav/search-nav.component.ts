import { Component, OnInit ,ChangeDetectorRef, Input} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ElasticsearchService } from '../../service/elasticsearch.service';
import { ArticleSource } from '../shared/article.interface';
import { Subscription } from 'rxjs';
import { Observable, of} from 'rxjs';

@Component({
  selector: 'app-search-nav',
  templateUrl: './search-nav.component.html',
  styleUrls: ['./search-nav.component.less']
})
export class SearchNavComponent implements OnInit {

  //Flask data
 private BASE_URL: string = 'http://localhost:5000/test';
 private headers: Headers = new Headers({'Content-Type': 'application/json'});
 serverData: JSON;


 private static readonly INDEX = 'crawling';
  private static readonly TYPE = 'nkdboard';

  private queryText = '';
 
  private lastKeypress = 0;

  articleSources: ArticleSource[];

  
  isConnected = false;
  status: string;
  subscription: Subscription

  searchKeyword: string;


  constructor(
    public _router: Router,
    private http:HttpClient,
    private es: ElasticsearchService, 
    private cd: ChangeDetectorRef) { 
  }

  ngOnInit() {
    this.queryText= this.es.getKeyword();
    this.es.fullTextSearch(
      SearchNavComponent.INDEX,
      SearchNavComponent.TYPE,
      'bodys', this.queryText).then(
        response=> {
          this.articleSources = response.hits.hits;
          // console.log(this.articleSources);
        }, error => {
          //console.error(error);
        }).then(()=> {
          this.sendResult();
        });
    
  }

  search($event){
    if ($event.timeStamp - this.lastKeypress > 100) {
      this.queryText = $event.target.value;

      this.es.fullTextSearch(
        SearchNavComponent.INDEX,
        SearchNavComponent.TYPE,
        'bodys', this.queryText).then(
          response=> {
            this.articleSources = response.hits.hits;
            // console.log(this.articleSources);
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
  
  }
}
