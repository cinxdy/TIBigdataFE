import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../article.interface';
import { Router } from "@angular/router";
import { IdControlService } from "../../id-control-service/id-control.service";

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.less']
})
export class ArticleDetailsComponent implements OnInit {

  @Input() article: any;
  docId : string;
  constructor(    public _router: Router ,    private idControl: IdControlService,
    ) { }

  ngOnInit() {
    // console.log(this.article)
    this.docId = this.article._id
    this.article = this.article._source;
  }

  setThisDoc(){
    // console.log(this.docId);
    this.idControl.setIdChosen(this.docId);
    this.navToDocDetail();

    // this.docId = this.article["_id"];
    // console.log(this.docId);
    
  }

  navToDocDetail() {
    this._router.navigateByUrl("search/DocDetail");
  }



}
