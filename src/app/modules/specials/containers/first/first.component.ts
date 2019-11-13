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
  providers: [ConfigService],
  styleUrls: ['./first.component.less']
})
export class FirstComponent implements OnInit {
  constructor(private http: HttpClient, private es: ElasticsearchService, private configService: ConfigService) { }
  // data: any[] = new Array();
  // getConfig(){
  //   this.data.push(1);
  //   // alert(this.data);
  //   alert(this.configService.getConfig());
  //   // this.data = this.configService.getConfig()["data"];

  //   // alert(this.data);
  // }
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
    this.configService.getConfig().subscribe(data => {
      /**
       * 플라스크는 업데이트가 있을 때마다 static file을 업데이트 해서 asset 폴더에 넣어준다.
       * 
       * 마지막 static file update 시간을 local에서 불러온다
       * 가지고 온 data 파일에서 마지막 업데이트 시간을 읽는다.
       * 같으면 그대로 진행.
       * 다르면 일단 출력하고, 플라스크로 통신... 뭐가 먼저이지? 그냥 읽으면 되는거 아닌가... 
       */
      // console.log(data);
      
      var num_topic = data.length;

      class dataSet {
        name: string;
        children: _topic[];
      }

      class _topic {
        name: string;
        value: number;
        showLabels: boolean = true;
        tooltipTitle: string;
        color?: string;
        children?: doc[];
      }

      class doc{
        name: string;
        url? : string;  //해당 문서의 url 바로 보내주기
        color? : string;
        value: number;
        keyWords? : string; // 해당 문서에서 높은 단어 빈도 수 띄우기
      }

      var dataset = new dataSet();
      
      var chds = new Array<_topic>();
      dataset.name = "통일 연구 동향";

      dataset.children = chds;


      for (var i = 0; i < num_topic; i++) {
        dataset.children[i] = new _topic();
        var parentNode = dataset.children[i];
        parentNode.name = "Topic #"+ i;
        parentNode.tooltipTitle = "tooltop?";
        // parentNode.showTooltip = true;
        parentNode.value = data[i].length * 100;
        parentNode.children = new Array<doc>();

        var num_doc = data[i].length;
        for(var j = 0; j < num_doc; j++){ //개별 토픽 안에서 각각 문서 선택
          parentNode.children[j] = new doc();
          var node = parentNode.children[j];
          node.url = "To Be Added...";
          node.name = data[i][0][1] + j;  //totalData[[topic1],...,[[문서 이름,문서 내용],...,[문서 이름,문서 내용]]
                                          // i번째 문서, 0은 그 문서 선택, 1이 문서 내용 선택
          node.value = parentNode.value / num_doc; // 모든 문서들의 크기는 전체 토픽 크기의 N 등분
        }
      }

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
        .label('name')
        .size('value')
        .color('color')
        (document.getElementById('chart'));
    }
    );//this.configService.getConfig().subscribe

    this.http.get(this.TEST_URL, { headers: this.headers }).subscribe((data: any[]) => {


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
