import { Component, OnInit } from '@angular/core';
import { Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
import { ElasticsearchService } from '../../../homes/service/elasticsearch.service';
import * as CanvasJS from '../../../../../assets/canvasjs.min.js';
import CirclePack from 'circlepack-chart';
import { ConfigService } from './first.service';

import Sunburst from 'sunburst-chart';

import { Observable, of } from 'rxjs';

import { dataSet } from './nodes';
import { _topic } from './nodes';
import { doc } from './nodes';



@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  providers: [ConfigService],
  styleUrls: ['./first.component.less']
})


export class FirstComponent implements OnInit {
  constructor(private http: HttpClient, private es: ElasticsearchService, private configService: ConfigService) { }

  private BASE_URL: string = 'http://localhost:5000/wordrank';
  private TEST_URL: string = 'http://localhost:5000/three';

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

      // class dataSet {
      //   level: string = "root";
      //   name: string;
      //   children: _topic[];
      // }

      // class _topic {
      //   name: string;
      //   level: string = "parent";
      //   order : number;
      //   value: number;
      //   showLabels: boolean = true;
      //   tooltipTitle: string;
      //   color?: string = "DarkSlateGray";
      //   children?: doc[];
      // }

      // class doc{
      //   name: string;
      //   level: string = "child";
      //   url? : string;  //해당 문서의 url 바로 보내주기
      //   color? : string = "DarkGray";
      //   value: number;
      //   keyWords? : string; // 해당 문서에서 높은 단어 빈도 수 띄우기
      // }

      var dataset = new dataSet();
      
      var chds = new Array<_topic>();
      dataset.name = "통일 연구 동향";

      dataset.children = chds;


      for (var i = 0; i < num_topic; i++) {
        dataset.children[i] = new _topic();
        var parentNode = dataset.children[i];
        parentNode.name = "Topic #"+ i;
        parentNode.tooltipTitle = "tooltop?";
        parentNode.order = i;
        // parentNode.showTooltip = true;
        parentNode.value = 30;//data[i].length * 1000000;
        parentNode.children = new Array<doc>();

        var num_doc = data[i].length;
        // this.addChildren(parentNode,num_doc,data,i);
        for(var j = 0; j < num_doc; j++){ //개별 토픽 안에서 각각 문서 선택
          parentNode.children[j] = new doc();
          var node = parentNode.children[j];
          node.url = "To Be Added...";
          node.name = data[i][j][1];  //totalData[[topic1],...,[[문서 이름,문서 내용],...,[문서 이름,문서 내용]]
                                          // i번째 문서, 0은 그 문서 선택, 1이 문서 내용 선택
          node.value = 10;//parentNode.value / num_doc; // 모든 문서들의 크기는 전체 토픽 크기의 N 등분
          node.keyWords = data[i][j][2];
        }
      }


      var myChart = Sunburst();
      myChart.data(dataset)
        // .width(300)
        // .height(300)
        .label('name')
        // .minSliceAngle(0.4)	
        .size('value')
        .showTooltip((d)=>{
          if(d.level != "child")
            return false;
          else
            return true;
        })
        .onClick(myChart.focusOnNode)
        .tooltipTitle((d)=>{
          if(d.level != "child")
            return false;
          else
            return d.name;
        })
        // .showLabels(true)
        .color('color')
        // .onClick((d)=>{
        //   if(d.level == "child")
        //     console.log(d.name+d.keyWords)
        //   else if (d.level == "parent"){
        //     console.log("parent clicked")
        //     var num_doc = data[d.order].length;
        //     this.addChildren(d,num_doc,data,d.order);
        //   }

        // })
        (
          // document.getElementById('chartSun'),
          document.getElementById('chartSun')
        );
        myChart = CirclePack();
        myChart.data(dataset)
        // .width(300)
        // .height(300)
        .label('name')
        // .minSliceAngle(0.4)	
        .size('value')
        .showTooltip((d)=>{
          if(d.level == "root")
            return false;
          else
            return d.name;
        })
        .tooltipTitle((d)=>{
          if(d.level != "root")
            return d.name;
          else
            return false;
        })
        // .showLabels(true)
        .color('color')
        // .onClick((d)=>{
        //   if(d.level == "child")
        //     console.log(d.name+d.keyWords)
        //   else if (d.level == "parent"){
        //     console.log("parent clicked")
        //     var num_doc = data[d.order].length;
        //     this.addChildren(d,num_doc,data,d.order);
        //   }

        // })
        (
          // document.getElementById('chartSun'),
          document.getElementById('chartCircle')
        );


        // myChart()
    }
    );//this.configService.getConfig().subscribe






  }
  addChildren(parentNode, num_doc, data,i){
    for(var j = 0; j < num_doc; j++){ //개별 토픽 안에서 각각 문서 선택
      parentNode.children[j] = new doc();
      var node = parentNode.children[j];
      node.url = "To Be Added...";
      node.name = data[i][j][1];  //totalData[[topic1],...,[[문서 이름,문서 내용],...,[문서 이름,문서 내용]]
                                      // i번째 문서, 0은 그 문서 선택, 1이 문서 내용 선택
      node.value = parentNode.value / num_doc; // 모든 문서들의 크기는 전체 토픽 크기의 N 등분
      node.keyWords = data[i][j][2];
    }
  }


}
