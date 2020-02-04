import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../article.interface';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.less']
})
export class ArticleDetailsComponent implements OnInit {

  @Input() article: Article;
  constructor() { }

  ngOnInit() {
  }

}
