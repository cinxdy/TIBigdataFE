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
    private es: ElasticsearchService // private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.queryText = this.es.getKeyword();
  }

  updateKeyword($event) {
    this.queryText = $event.target.value;
    // console.log("bar comp : keyword accepted : " + this.queryText);
  }

  search() {
    this.es.fullTextSearch("post_body", this.queryText);
    // console.log("search bar : fulltextsearch done with " + this.queryText);
    this._router.navigateByUrl("search");
  }
}
