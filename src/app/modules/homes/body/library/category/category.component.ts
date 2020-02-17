import { Component, OnInit } from "@angular/core";
import { ConfigService } from "../category-graph/category-graph.service";
import { Router } from "@angular/router";

import { IdControlService } from "../../search/search-result/id-control-service/id-control.service";


@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.less"]
})
export class CategoryComponent implements OnInit {
  constructor(private configService: ConfigService, 
              private idControl: IdControlService,
              public _router: Router ) {}
  private isLoaded: boolean = false;
  private data: any;
  private toggleTopics : boolean[];

  ngOnInit() {
    this.configService.getConfig().subscribe(data => {
      this.data = data as {};
      this.toggleTopics = [];

      var num_topic = data.length;
      for (let i = 0; i < num_topic; i++) {
        this.toggleTopics.push(false);
      }

      // let i = 0; 
      // let j = 0;
      // try {
      //   for (i = 0; i <= num_topic; i++) {
      //     let topic = data[i]["topic"];
      //     // console.log(topic);
      //     var num_doc = data[i]["doc"].length;
      //     // for (j = 0; j < num_doc; j++) {
      //     //   // console.log(data[i]["doc"][j]["title"])
      //     //   console.log("title " + j);
      //     // }
      //   }
      // } catch {
      //   console.log("ERROR : i is " + i + " and j is " + j);
      // }
      this.isLoaded = true;
    });
  }

  // navToGraph(){
  //   this._router.navigateByUrl("search/library/graph");
  // }

  toggleTopic(i){
    this.toggleTopics[i] = ! this.toggleTopics[i];
  }

  navToDetail(doc){
    // console.log(doc);
    let id = doc["idList"];
    this.idControl.setIdChosen(id);
    this._router.navigateByUrl("search/DocDetail");

  }
}
