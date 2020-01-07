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

  options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value 
    width: 500,
    height: 400,
    overflow: true,
  };

  cData: CloudData[] = [];


  private BASE_URL: string = 'http://localhost:5000/wordrank';
  private TEST_URL: string = 'http://localhost:5000/three';


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
       */
      console.log(data);
      
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
        color?: string = "DarkSlateGray";
        children?: doc[];
      }

      class doc{
        name: string;
        url? : string;  //해당 문서의 url 바로 보내주기
        color? : string = "DarkGray";
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
        parentNode.value = data[i].length * 1000000;
        parentNode.children = new Array<doc>();

        var num_doc = data[i].length;
        for(var j = 0; j < num_doc; j++){ //개별 토픽 안에서 각각 문서 선택
          parentNode.children[j] = new doc();
          var node = parentNode.children[j];
          node.url = "To Be Added...";
          node.name = data[i][j][1];  //totalData[[topic1],...,[[문서 이름,문서 내용],...,[문서 이름,문서 내용]]
                                          // i번째 문서, 0은 그 문서 선택, 1이 문서 내용 선택
          node.value = parentNode.value / num_doc; // 모든 문서들의 크기는 전체 토픽 크기의 N 등분
        }
      }


      var myChart = CirclePack();
      myChart.data(dataset)
        .label('name')
        .size('value')
        .color('color')
        (document.getElementById('chart'));
    }
    );//this.configService.getConfig().subscribe






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
