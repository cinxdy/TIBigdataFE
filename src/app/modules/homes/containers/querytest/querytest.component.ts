import { Component, OnInit, ChangeDetectorRef, Input} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ElasticsearchService } from '../../service/elasticsearch.service';
import { ArticleSource } from './article.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-querytest',
  templateUrl: './querytest.component.html',
  styleUrls: ['./querytest.component.less']
})
export class QuerytestComponent implements OnInit {

  isConnected = false;
  status: string;

  subscription: Subscription


  articleSources: ArticleSource[];

  constructor(private es: ElasticsearchService, private cd: ChangeDetectorRef) { 
    this.isConnected = false;
    this.subscription = this.es.articleInfo$.subscribe( info => {
      this.articleSources=info;
    });
 
  }

  ngOnInit() {
   this.es.isAvailable().then(()=> {
     this.status = 'OK';
     this.isConnected = true;
   }, error => {
     this.status = 'ERROR';
     this.isConnected = false;
     console.error('Server is down', error);
   }).then (()=> {
     this.cd.detectChanges();
   })
  }
  
  sources: 

  // url: string = 'http://203.252.103.86:8080/_search?pretty';
  // headers = new HttpHeaders()
  //            .set('content-type', 'application/json')
  // getContext(){
  //   const body = {
  //     "_source": ["titles","writers"],
  //     "query":{
  //        "match":{
  //           "numbers":"86"
  //        }
  //     }
  //  }
  //    return this.http
  //               .get(this.url,{ headers: this.headers })
  //               .subscribe(res => {
               

  //                 console.log(res);
  //               });
  // }
}
