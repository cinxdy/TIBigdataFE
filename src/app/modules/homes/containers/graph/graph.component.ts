import { Component, OnInit } from '@angular/core';
import { Headers } from '@angular/http';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
import { ElasticsearchService } from '../../service/elasticsearch.service';
import * as CanvasJS from '../../../../../assets/canvasjs.min.js';

import { Observable, of} from 'rxjs';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.less']
})
export class GraphComponent implements OnInit {




  // 2020 0103 TEXTRANK
  private BASE_URL: string = 'http://203.252.103.123:5000/wordrank';
  private TEST_URL: string = 'http://localhost:5000/textrank';
  private data : any;
  private fileDir : string = 'assets/homes_graph/data.json';
  private topics = {
    WHO : "전체",
    POL : "정치",
    ECO : "경제",
    SOC : "사회",
    CUL : "문화",
    INT : "국제",
    REG : "지역",
    SPO : "스포츠"
  }

  options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value 
    width: 1000,
    height: 250,
    overflow: true,
  };
  serverData: JSON;
  cData: CloudData[] = [];
  constructor(private http:HttpClient, private es: ElasticsearchService) { }
  
   dData: CloudData[] = [
      {text: '한국어가 문제?', weight: 8, link: 'https://google.com', color: '#ffaaee'},
      {text: '한국어?', weight: 10, link: 'https://google.com', tooltip: 'display a tooltip', color: '#ffaaee'},
      {text: '국뽕!!', weight: 8, link: 'https://google.com', color: '#ffaaee'},
    {text: '한국어?', weight: 10, link: 'https://google.com', tooltip: 'display a tooltip'},{text: '국뽕!!', weight: 8, link: 'https://google.com', color: '#ffaaee'},
    {text: '한국어?', weight: 10, link: 'https://google.com', tooltip: 'display a tooltip'},{text: '국뽕!!', weight: 8, link: 'https://google.com', color: '#ffaaee'},
    {text: '한국어?', weight: 10, link: 'https://google.com', tooltip: 'display a tooltip'},{text: '국뽕!!', weight: 8, link: 'https://google.com', color: '#ffaaee'},
    {text: '한국어?', weight: 10, link: 'https://google.com', tooltip: 'display a tooltip'}
    ];

  ngOnInit() {
    this.getWordCloud("전체");
  }



  getWordCloud(topic){
      // console.log(this.http.get(this.fileDir));
      this.http.get(this.fileDir).subscribe(data => {
        // console.log(data)
        // this.data = data;  

        // Retrieve data from flask.
        const changedData$: Observable<CloudData[]> = of([]);
        changedData$.subscribe(res => this.cData = res);
  
        // //Convert data as JSON format.
        // this.serverData = data as unknown as JSON;
        // for(let i in data){
        //   // data[i][1] = Math.round(data[i][1]* 10);
        // }
        //Push data for WordCloud.
        for(let i in data){
          this.cData.push({text:data[i][0], weight: data[i][1] , color: 'lightblue'})
        }
        
      });


  }

  getTopic(event){
    var topic = event.target.id;
    this.getWordCloud(topic);
   }


  // Original Version Below
  // private BASE_URL: string = 'http://203.252.103.123:5000/wordrank';
  // private TEST_URL: string = 'http://localhost:5000/wordrank';

  // private topics = {
  //   WHO : "전체",
  //   POL : "정치",
  //   ECO : "경제",
  //   SOC : "사회",
  //   CUL : "문화",
  //   INT : "국제",
  //   REG : "지역",
  //   SPO : "스포츠"
  // }

  // options: CloudOptions = {
  //   // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value 
  //   width: 1000,
  //   height: 250,
  //   overflow: true,
  // };
  // serverData: JSON;
  // cData: CloudData[] = [];
  // constructor(private http:HttpClient, private es: ElasticsearchService) { }

  // ngOnInit() {
  //   this.getWordCloud("전체");
  // }

  // getWordCloud(topic){
  //   this.http.get(this.BASE_URL).subscribe(data => {

  //     //Retrieve data from flask.
  //     const changedData$: Observable<CloudData[]> = of([]);
  //     changedData$.subscribe(res => this.cData = res);
 
  //     //Convert data as JSON format.
  //     this.serverData = data as JSON;
 
 
  //     //Push data for WordCloud.
  //     for(let i in data){
  //       this.cData.push({text:data[i]["label"], weight:data[i]["y"]})
  //     }
  //     //console.log(this.cData);
  //   })

  // }

  // getTopic(event){
  //   var topic = event.target.id;
  //   this.getWordCloud(topic);
  //  }

  }
  


 

  
