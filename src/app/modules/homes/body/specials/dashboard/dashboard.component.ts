import { Component, OnInit, ViewChild, QueryList } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label, BaseChartDirective } from 'ng2-charts';
import { MultiDataSet } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { IpService } from 'src/app/ip.service';
import { EPAuthService } from '../../../../core/componets/membership/auth.service';
import { ElasticsearchService } from "../../search/service/elasticsearch-service/elasticsearch.service";
import { IdControlService } from "../../search/service/id-control-service/id-control.service";
import { RecomandationService } from "../../search/service/recommandation-service/recommandation.service";
import { DatabaseService } from "../../../../core/componets/database/database.service";



import { CloudData, CloudOptions } from "angular-tag-cloud-module";

import { thresholdSturges } from 'd3-array';
import { map } from "rxjs/operators";
import { ReturnStatement, viewClassName } from '@angular/compiler';
import { doc } from '../../library/category-graph/nodes';
import { inject } from '@angular/core/testing';
import { FormControl, FormGroup } from "@angular/forms";
import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { keyframes } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})

export class DashboardComponent implements OnInit {

  @ViewChild(BaseChartDirective, { static: false }) charts: QueryList<BaseChartDirective>;;

  constructor(
    private db: DatabaseService,
    private auth: EPAuthService,
    private http: HttpClient,
    private ipService: IpService,
    private es: ElasticsearchService,
    private idSvs: IdControlService,
    private rcmd: RecomandationService
  ) { }

  analysisList: string[] = ["TFIDF", "LDA", "Related Doc", "RNN"];
  graphList: string[] = ["Dounut", "Word-Cloud", "Bar", "Line"];
  idList1: string[] = [
    "5de110274b79a29a5f987f1d",
    "5de1107f4b79a29a5f988202",
    "5de1109d582a23c9693cbec9",
    "5de110946669d72bad076d51",
    "5de113f4b53863d63aa55369"
  ]



  docTitleList = [];

  private tfidfDir: string = "../../../../../../assets/entire_tfidf/data.json";


  private hstReqUrl = this.ipService.getUserServerIp() + ":4000/hst/getTotalHistory";
  private hstFreq: any[];

  // private hstReqUrl = this.ipService.getCommonIp() +":4000/hst/getTotalHistory";
  // private hstFreq : any[];

  private graphXData = [];
  private graphYData = [];
  private graphData = [];

  private ES_URL = "localhost:9200/nkdb";
  private myDocsTitles: string[] = [];
  private idList: string[] = [];
  private chosenList: string[] = [];
  private search_history = [];
  private chosenCount: number = 0;

  private choiceComplete = false;
  private userDataChoice = [];
  private userDocChoice = [];
  private userAnalysisChoice: string;
  private userGraphChoice: string;
  private userNumChoice = 0;

  ngOnInit() {
    if (!this.auth.getLogInStat())
      console.log("wow");
    //alert("로그인이 필요한 서비스 입니다. 로그인 해주세요.");
    else {
      this.chosenCount = 0;
      // this.idSvs.clearAll();
      console.log("dash board - page");
      this.getMyKeepDoc();
    }
  }

  async getKeywords(ids) {
    return await this.db.getTfidfValue(ids);
  }

  getMyKeepDoc() {
    this.idSvs.convertID2Title().then(titles => {
      this.docTitleList = titles as [];
      this.idList = this.idSvs.getIdList();
    })
  }

  addList(i) {
    this.chosenList.push(this.idList[i])
    this.chosenCount++;
    console.log(this.chosenList)
  }

  removeList(i) {
    this.idSvs.popIdList();
    this.chosenCount--;
  }
  private filter = [];
  private checkArr = [];

  boxChange(i) {
    if (this.filter[i]) {
      this.addList(i);
      console.log(i + "넣음");
    } else {
      this.removeList(i);
      console.log(i + "빠짐");
    }
  }

  private TfTable = [];


  makeTf() {
    // var docNum = this.idList.length;
    this.getKeywords(this.chosenList).then(tfidf_table => {
      // this.http.get(this.tfidfDir).subscribe(docData1 => {
      let oneDoc = tfidf_table as []
      console.log(oneDoc)
      var temp;
      var sampleID;
      var sampleTitle;

      const tempArr = [] as any;
      let tWord, tVal;
      var tJson = new Object();

      for (var i = 0; i < oneDoc.length; i++) {
        var docData = oneDoc[i]["tfidf"];
        for (var t = 0; t < this.userNumChoice; t++) {
          var tData = docData[t];
          if (tData) {
            tWord = tData[0];
            tVal = tData[1];
            tJson = { word: tWord, value: tVal };
            tempArr.push(tJson);
          }
        }
      }
      // // var docData = docData1 as [];
      // for (var j = 0; j<docNum;j++){
      //   sampleID = this.idList[j];

      //   for(var i = 0; i<docData.length;i++){
      //     temp = docData[i]["docID"];

      //     if(temp==sampleID){
      //       sampleTitle = docData[i]["docTitle"];
      //       this.docTitleList[j]=sampleTitle;
      //       //console.log(this.docTitleList[j]);

      //       let tfVal = docData[i]["TFIDF"];


      //       let tWord, tVal;
      //       var tJson = new Object();

      //       for(var t = 0;t<5;t++){
      //         var tData = tfVal[t];
      //           if(tData)  {
      //             tWord = tData[0];
      //             tVal = tData[1];
      //             tJson = {word: tWord, value : tVal};
      //             tempArr.push(tJson);
      //         }
      //       }
      //       this.TfTable.push({No : j, title : this.docTitleList[j], tfidf : tempArr});
      //     }
      //   }
      // }

      tempArr.sort(function (a, b) {
        return b["value"] - a["value"];
      });

      this.findTextData(tempArr);
      this.findCountData(tempArr);
    })

  }

  //   findDocName(){
  //     //var docNum = this.idList.length;
  //     var docNum = this.chosenCount;

  //    // console.log(this.idList);

  //     this.http.get(this.tfidfDir).subscribe(docData1 => {
  //        var temp;
  //        var sampleID;
  //        var sampleTitle;
  //        var docData = docData1 as []
  //        for (var j = 0; j<docNum;j++){
  //          sampleID = this.idList[j];

  //          for(var i = 0; i<docData.length;i++){
  //            temp = docData[i]["docID"];

  //            if(temp==sampleID){
  //              sampleTitle = docData[i]["docTitle"];
  //              this.docTitleList[j]=sampleTitle;
  //            }
  //          }
  //        }

  //        //console.log("야호"+this.docTitleList);
  //     })
  //  }


  ///// put datas into GraphData /////
  findTextData(textArr) {
    // console.log(textArr)
    var nums = textArr.length;
    //nums = this.userNumChoice;
    //this.graphXData = [];
    if (nums > this.userNumChoice) {
      nums = this.userNumChoice;
    }
    for (var i = 0; i < nums; i++) {
      this.graphXData[i] = textArr[i]["word"];
    }
    console.log("X : " + this.graphXData);
  }

  findCountData(countArr) {
    var nums = countArr.length;
    // nums = this.userNumChoice;
    //this.graphYData = [];
    if (nums > this.userNumChoice) {
      nums = this.userNumChoice;
    }
    for (var i = 0; i < nums; i++) {
      this.graphYData[i] = countArr[i]["value"];
    }
    console.log("Y : " + this.graphYData);
  }

  getUserChoice() {
    this.userDataChoice = this.search_history;
    //this.userAnalysisChoice = "";
    //this.userGraphChoice  = document.getElementById("g1");
  }


  onChange(value) {
    this.userNumChoice = value;
  }

  clearResult() {
    this.barChartData = [];
    this.barChartLabels = [];

    this.lineChartData = [];
    this.lineChartLabels = [];

    this.doughnutChartData = [];
    this.doughnutChartLabels = [];

    this.userAnalysisChoice = "";
    this.userGraphChoice = '';
    this.userNumChoice = 0;
    console.log("CLEAR");
  }


  showResult() {
    console.clear();
    this.getUserChoice();
    this.choiceComplete = true;
    // this.charts.forEach((child) => {
    //   child.chart.update()
    // });

    // this.rcmd.getRcmd(this.idList).then(data => {
    //   console.log(data);
    // });


    if (this.userAnalysisChoice == "TFIDF") {
      console.log("분석 : " + this.userAnalysisChoice + " 그래프 : " + this.userGraphChoice);
      this.makeTf();
    }
    else if (this.userAnalysisChoice == "LDA") {
      console.log("분석 : " + this.userAnalysisChoice + " 그래프 : " + this.userGraphChoice);

    }
    else if (this.userAnalysisChoice == "Related Doc") {
      console.log("분석 : " + this.userAnalysisChoice + " 그래프 : " + this.userGraphChoice);

    }
    else if (this.userAnalysisChoice == "RNN") {
      console.log("분석 : " + this.userAnalysisChoice + " 그래프 : " + this.userGraphChoice);
    }
    // console.log(this.userNumChoice);
    // console.log("분석 : " + this.userAnalysisChoice + " 그래프 : " + this.userGraphChoice);

    this.rcmd.getRcmd(this.idList).then(data => {
      this.getKeywords(this.chosenList)

    });
  }


  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          max: 1,
          min: 0
        }
      }]
    }
  };

  barChartLabels: Label[] = this.graphXData;

  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];


  barChartColors: Color[] = [
    { backgroundColor: 'rgba(000,153,255,0.5)' },
  ]


  barChartData: ChartDataSets[] = [
    { data: this.graphYData, label: this.userAnalysisChoice + " Analysis" }
  ];
  /////////////



  ///////// line chart /// 

  lineChartData: ChartDataSets[] = [
    { data: this.graphYData, label: this.userAnalysisChoice + " Analysis" },
  ];
  lineChartLabels: Label[] = this.graphXData;
  lineChartOptions = {
    responsive: true,
  };
  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(000,153,255,0.5)',
    },
  ];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  //////dounet chart ///
  doughnutChartOptions: ChartOptions = {
    responsive: true
  };
  public doughnutChartPlugins = [];
  doughnutChartLabels: Label[] = this.graphXData;
  doughnutChartData: MultiDataSet = [
    this.graphYData
  ];
  doughnutChartType: ChartType = 'doughnut';
  public doughnutChartColors = [
    {
      backgroundColor: [
        'rgba(255,0,0,0.3)',
        'rgba(255,153,0,0.3)',
        'rgba(255,255,0,0.3)',
        'rgba(0,255,0,0.3)',
        'rgba(0,0,255,0.3)',

      ]
    }
  ];



  //////////word
  options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value
    width: 1000,
    height: 250,
    overflow: true
  };

  cData: CloudData[] = [];



  makeWordCloud() {
    var sample = this.graphData;


    for (let i in sample) {
      if (Number(i) >= 30) break;
      else if (Number(i) <= 4) {
        this.cData.push({
          text: sample[i][0],
          weight: sample[i][1],
          color: "blue"
        });
        // console.log(sample[i][
      } else
        this.cData.push({
          text: sample[i][0],
          weight: sample[i][1],
          color: "gray"
        });
    }


  }









}
