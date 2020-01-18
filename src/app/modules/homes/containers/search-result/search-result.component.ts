import { Component, OnInit ,ChangeDetectorRef, Input} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ElasticsearchService } from '../../service/elasticsearch.service';
import { ArticleSource } from '../shared/article.interface';
import { Subscription } from 'rxjs';
import { Observable, of} from 'rxjs';
import { IdListService } from './id-list-service/id-list.service';

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


  // private static readonly INDEX = 'nkdboard';
  // private static readonly TYPE = 'nkdboard';

  // private queryText = '';
 
  // private lastKeypress = 0;

  articleSources: ArticleSource[];


  docId : string;
  // idList : string[] = [];
  
  isConnected = false;
  status: string;
  subscription: Subscription

  searchKeyword: string;

  constructor(
    private idList : IdListService,
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
    // console.log(this.es.getKeyword());
    this.subscription = this.es.articleInfo$.subscribe( info => {
      this.articleSources=info;
    });
  }

  //Get result from flask
  getResult(){
    this.searchKeyword = this.es.getKeyword();

   

      this._router.navigateByUrl('/homes/analysis');

  }

  getNothing(){
    console.log("button clicked!");
  }

  onSubmit(){
    console.log("summited!");
    console.log(this.idList)
    // console.log(e);
    // console.log(e.target.value)
    // e.preventDefault();
  }

  addList(i){
    this.idList.setIdList(this.articleSources[i]["_id"])
    // console.log(this.articleSources[i]["_id"]);
    // console.log(i);
  }

  navToDataChart(){
    this._router.navigateByUrl('homes/wordcloud');
  }
  

}
