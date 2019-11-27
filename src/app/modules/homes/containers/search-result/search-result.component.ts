import { Component, OnInit ,ChangeDetectorRef, Input} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ElasticsearchService } from '../../service/elasticsearch.service';
import { ArticleSource } from '../shared/article.interface';
import { Subscription } from 'rxjs';
import { Observable, of} from 'rxjs';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.less']
})
export class SearchResultComponent implements OnInit {

 //Flask data
 private BASE_URL: string = 'http://localhost:5000/keywordGraph';

 public relatedKeywords = ["북한", "김정은", "북핵", "문재인", "미사일"];
 serverData: JSON;


 private static readonly INDEX = 'nkdboard';
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
    this.isConnected = false;
    this.subscription = this.es.articleInfo$.subscribe( info => {
      this.articleSources=info;
    });
 
  }

  ngOnInit() {
    console.log(this.es.getKeyword());
    this.subscription = this.es.articleInfo$.subscribe( info => {
      this.articleSources=info;
    });
  }

  //Get result from flask
  getResult(){
    this.searchKeyword = this.es.getKeyword();

   

      this._router.navigateByUrl('/homes/analysis');

  }

  

}
