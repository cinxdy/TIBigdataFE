import { Component, OnInit } from "@angular/core";
import { ConfigService } from "../first/first.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.less"]
})
export class CategoryComponent implements OnInit {
  constructor(private configService: ConfigService, public _router: Router ) {}
  private isLoaded: boolean = false;
  private data: any;

  ngOnInit() {
    this.configService.getConfig().subscribe(data => {
      this.data = data as {};

      var num_topic = data.length;

      let i = 0; 
      let j = 0;
      try {
        for (i = 0; i <= num_topic; i++) {
          let topic = data[i]["topic"]["words"];
          // console.log(topic);
          var num_doc = data[i]["doc"].length;
          // for (j = 0; j < num_doc; j++) {
          //   // console.log(data[i]["doc"][j]["title"])
          //   console.log("title " + j);
          // }
        }
      } catch {
        console.log("ERROR : i is " + i + " and j is " + j);
      }
      this.isLoaded = true;
    });
  }

  navToGraph(){
    this._router.navigateByUrl("search/library/graph");
  }
}
