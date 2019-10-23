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
    this.searchKeyword = "flask test"
    let body= 
      {"keyword":this.searchKeyword}
    
    this.http.post(this.BASE_URL, 
      body)
      .subscribe(
        (data) => {
          console.log(data);
        }
      )
  }

  

}
