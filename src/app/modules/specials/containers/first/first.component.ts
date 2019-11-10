import { Component, OnInit } from '@angular/core';
import { Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
import { ElasticsearchService } from '../../../homes/service/elasticsearch.service';
import * as CanvasJS from '../../../../../assets/canvasjs.min.js';
import CirclePack from 'circlepack-chart';
import { ConfigService } from './first.service';

import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  providers: [ ConfigService ],
  styleUrls: ['./first.component.less']
})
export class FirstComponent implements OnInit {
  constructor(private http: HttpClient, private es: ElasticsearchService, private configService: ConfigService) {}
  data : any[] = new Array();
  getConfig(){
    this.data.push(1);
    // alert(this.data);
    alert(this.configService.getConfig());
    // this.data = this.configService.getConfig()["data"];
    
    // alert(this.data);
  }
  // ddata = json;

  // showConfig() {
  //   this.configService.getConfig()
  //     .subscribe((data) => this.config = {
        
  //       classification : data["data"]
        
  //     });
  //   alert(this.config.classification);
  // }

  options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value 
    width: 500,
    height: 400,
    overflow: true,
  };

  cData: CloudData[] = [];


  private BASE_URL: string = 'http://localhost:5000/wordrank';
  private TEST_URL: string = 'http://localhost:5000/two';


  private headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  serverData: JSON;
  employeeData: JSON;
  searchKeyword;




  ngOnInit() {
    this.getConfig();
    alert(this.ddata);
    // this.showConfig();
    // console.log(this.showConfig());
    this.http.get(this.TEST_URL, { headers: this.headers }).subscribe((data: any[]) => {

      console.log(data);

      console.log(data.length);
      var num_topic = data.length;

      /**
       * data의 길이를 구한다.
       * data는 similar documents으로 구성되어 있다.
       * array의 길이를 구하면 topic의 수를 알 수 있다.
       * 
       * 각각의 토픽에는 문서별로 정리되어 있다.
       * 문서의 수를 구하면 그 토픽의 크기를 알 수 있다.
       * 문서의 수로 원의 크기를 만든다.
       * 
       data의 구조
       [ { "similar documents": [ { "documents #0": [ "호", ... ,"하"]},
                                   ... ,
                                  {"documents #x" : ["하",..."호"]}
         },
         ...,
         { "similar documents": [ { "documents #y": [ "호", ... ,"하"]},
                                   ... ,
                                  {"documents #z" : ["하",..."호"]}
         }
       ]

       data[0] = { "similar documents": [ { "documents #0": [ "호", ... ,"하"]},
                                   ... ,
                                  {"documents #x" : ["하",..."호"]}
                 }
       data[i] = ...

       num_docs = data[i]["similar documents"].length //이 값을 angular에서 시각화
       
       * 
       */
      console.log(data[0]["similar documents"]);

      class dataSet {
        name: string;
        children: chdNode[];
      }

      class chdNode {
        name: string;
        value: number;
        color?: string;
      }

      var dataset = new dataSet();
      console.log("dataset");
      /**
       * 토픽의 수 만큼 for문으로 반복문을 돈다.
       * for i = 0 -> num_topic
       * 각각의 토픽에서 array를 뚫고서 접근한다. 
       * num_docs = data[i]["similar documents"].length 
       * 각 토픽에서 array의 수를 찾는다 = 토픽에 속해 있는 문서의 수
       * 각 토픽은 childNode가 된다.
       * dataset.name = "root";
       * dataset.children : chdNode = <any>[];
       * 
       * 
       * 
       * dataset.children[i].name = i
       * dataset.children[i].value = num_docs;
       * 각 토픽에서 문서의 수를 childNode의 value으로 둔다.
       * name은 각 토픽의 index으로 하면 될 것 같다.
       * 
       * 
       */
      var chds = new Array<chdNode>();
      console.log("chdNode[]")
      dataset.name = "root";

      console.log("dataset.name");

      dataset.children = chds;

      console.log(dataset.children);

      for (var i = 0; i < num_topic; i++) {
        dataset.children[i] = new chdNode();
        dataset.children[i].name = "" + i;
        dataset.children[i].value = data[i].length;
        // toColor()
      }

      console.log(dataset);

      var data_sample = {
        name: "root",
        children: [
          {
            name: "leafA",
            value: 3,
            color: "magenta"
          },
          {
            name: "nodeB",
            children: [
              {
                name: "leafBA",
                value: 5,
                color: "rgba(165,42,42,1)"
              },
              {
                name: "leafBB",
                value: 1,
                color: "blue"
              }
            ]
          }
        ]
      }
      var myChart = CirclePack();
      myChart.data(dataset)
        .size('value')
        .color('color')
        (document.getElementById('chart'));
      //Retrieve data from flask.
      /*
      const changedData$: Observable<CloudData[]> = of([]);
      changedData$.subscribe(res => this.cData = res);

      //Convert data as JSON format.
      this.serverData = data as JSON;


      //Push data for WordCloud.
      for(let i in data){
        this.cData.push({text:data[i]["label"], weight:data[i]["y"]})
      }
      // console.log(this.cData);


      //Push data for Bar Chart.
      let barChart = new CanvasJS.Chart("chartContainer",  {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "The Number of posts in 2004/11"
        },
        data: [{
          type: "column",
          dataPoints: this.serverData
        }]
      });


      // let pieChart = new CanvasJS.Chart("chartContainer", {
      //   theme: "light2",
      //   animationEnabled: true,
      //   exportEnabled: true,
      //   title:{
      //     text: "Monthly Expense"
      //   },
      //   data: [{
      //     type: "pie",
      //     showInLegend: true,
      //     toolTipContent: "<b>{label}</b>: ${y} (#percent%)",
      //     indexLabel: "{label} - #percent%",
      //     dataPoints: this.serverData
          
      //   }]
      // });
      
        
      
  
      barChart.render();
      */
    })




  }
  getResult() {
    this.searchKeyword = "flask test"
    let body =
      { "keyword": this.searchKeyword }

    this.http.post(this.TEST_URL,
      body)
      .subscribe(
        (data) => {
          console.log(data);
        }
      )
  }

  toColor(num) {
    num >>>= 0;
    var b = num & 0xFF,
      g = (num & 0xFF00) >>> 8,
      r = (num & 0xFF0000) >>> 16,
      a = ((num & 0xFF000000) >>> 24) / 255;
    return "rgba(" + [r, g, b, a].join(",") + ")";
  }

}
