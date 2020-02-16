import { Component, OnInit, ChangeDetectorRef, Input } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ElasticsearchService } from "../service/elasticsearch.service";
import { ArticleSource } from "../../../containers/shared/article.interface";
import { Subscription } from "rxjs";
import { Observable, of } from "rxjs";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.less"]
})
export class SearchBarComponent implements OnInit {
  //Flask data
  //  private BASE_URL: string = 'http://localhost:5000/test';
  //  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  serverData: JSON;

  //  private static readonly INDEX = 'nkdboard';
  // private static readonly TYPE = 'nkdboard';

  private queryText = "";

  private lastKeypress = 0;

  articleSources: ArticleSource[];

  isConnected = false;
  status: string;
  subscription: Subscription;

  searchKeyword: string;

  constructor(
    public _router: Router,
    // private http:HttpClient,
    private es: ElasticsearchService
  ) // private cd: ChangeDetectorRef
  {}

  ngOnInit() {
    this.queryText = this.es.getKeyword();
    this.es
      .fullTextSearch("post_body", this.queryText)
      .then(
        response => {
          this.articleSources = response.hits.hits;
          // console.log(this.articleSources);
        },
        error => {
          //console.error(error);
        }
      )
      .then(() => {
        this.sendResult();
        // console.log("bar comp : ngOnInit");
      });
  }

  updateKeyword($event) {
    this.queryText = $event.target.value;
    console.log("bar comp : keyword accepted : " + this.queryText);
  }

  // search($event) {
  //   if ($event.timeStamp - this.lastKeypress > 100) {
  //     this.queryText = $event.target.value;

  //     this.es
  //       .fullTextSearch("post_body", this.queryText)
  //       .then(
  //         response => {
  //           this.articleSources = response.hits.hits;
  //           console.log("bar comp : in search function...");
  //           // console.log("bar comp : search result test : ")
  //           // console.log(this.articleSources);
  //         },
  //         error => {
  //           //console.error(error);
  //         }
  //       )
  //       .then(() => {
  //         console.log("bar comp : Search Completed!");
  //         // console.log("bar comp : 20200109");
  //       });
  //   }
  //   this.lastKeypress = $event.timeStamp;
  // }

  sendResult() {
    this.es
      .fullTextSearch("post_body", this.queryText)
      .then(
        response => {
          this.articleSources = response.hits.hits;
          console.log("bar comp : search result with key with : " + this.queryText);
          // console.log("bar comp : search result test : ")
          // console.log(this.articleSources);
        },
        error => {
          console.error(error);
        }
      )
      .then(() => {
        console.log("bar comp : Search Completed!");
        // console.log("bar comp : 20200109");
        // this.es.setKeyword(this.queryText);
      });
      this._router.navigateByUrl("search");
    this.es.fillSubscrb(this.articleSources);

  }
}
