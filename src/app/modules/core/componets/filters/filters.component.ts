import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { SourceMapGenerator } from '@angular/compiler/src/output/source_map';
import { Observable} from 'rxjs'
import {map, filter, switchMap} from 'rxjs/operators';

interface Post{
  "postName" : string;
  "category" : string;
}

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.less']
})
/*export*/ class FiltersComponent implements OnInit {

  public post;

  constructor(public http:HttpClient) { }

  ngOnInit() {
    this.fetchPosts();
  }

  public fetchPosts() {
    return this.http.get("http://203.252.103.123:9200/victolee/blog/1/_source")
        .subscribe((data) => {
          this.post = data;
          console.log(this.post);
        })
  }

 


}
