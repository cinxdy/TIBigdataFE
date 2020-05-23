import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { MultiDataSet } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { IpService } from 'src/app/ip.service';
import { EPAuthService } from '../../../../core/componets/membership/auth.service';
import { ElasticsearchService } from "../../search/service/elasticsearch-service/elasticsearch.service";
import { IdControlService } from "../../search/service/id-control-service/id-control.service";
import { RecomandationService } from "../../search/service/recommandation-service/recommandation.service";
import { DatabaseService } from "../../../../core/componets/database/database.service";


import { thresholdSturges } from 'd3-array';
import { map } from "rxjs/operators";
import { ReturnStatement } from '@angular/compiler';
import { doc } from '../../library/category-graph/nodes';
import { inject } from '@angular/core/testing';
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})

export class DashboardComponent implements OnInit {


  constructor(
    private db : DatabaseService,
    private auth: EPAuthService,
    private http: HttpClient,
    private ipService: IpService,
    private es: ElasticsearchService,
    private idSvs : IdControlService,
    private rcmd : RecomandationService
  ) { }

  analysisList: string[] = ["TFIDF", "LDA", "Related Doc", "RNN"];
  graphList: string[] = ["Dounut", "Word-Cloud", "Bar", "Line"];

  private hstReqUrl = this.ipService.getUserServerIp() + ":4000/hst/getTotalHistory";
  private hstFreq: any[];

  private barXData = [];
  private barYData = [];
  private barData = [];

  private ES_URL = "localhost:9200/nkdb";
  private myDocsTitles: string[] = [];
  private idList : string[] = [];
  private chosenList : string[] = [];
  private search_history = [];
  private chosenCount : number = 0;

  private choiceComplete = false;
  private userDataChoice = [];
  private userAnalysisChoice: string;
  private userGraphChoice: string;

  ngOnInit() {
    if (!this.auth.getLogInStat())
      alert("로그인이 필요한 서비스 입니다. 로그인 해주세요.");
    else {
      this.chosenCount = 0;
      // this.idSvs.clearAll();
      console.log("dash board - page");
      this.getMyKeepDoc().then(() => {
        this.idList = this.idSvs.getIdList();
        console.log(this.idList);
        console.log(this.myDocsTitles)
      })
    }
  }

  getKeywords(ids){
    this.db.getTfidfValue(ids);
  }

  async getMyKeepDoc(){
    this.myDocsTitles= await this.idSvs.convertID2Title() as [];
  }

  addList(i){
    this.chosenList.push(this.idList[i])
    this.chosenCount ++;
    console.log(this.chosenList)
  }

  removeList(i){
    this.idSvs.popIdList();
    this.chosenCount --;
  }


  queryHistory() {
    return new Promise((r) => {
      this.http.get<any>(this.hstReqUrl)
        .subscribe((res) => {
          var hst = res.histories;
          var keyArr = hst.map((hstrs) => hstrs.keyword);
          var dateArr = hst.map((hstrs) => { hstrs.year, hstrs.month, hstrs.date });
          keyArr = keyArr.sort();
          //console.log("날짜 : " + dateArr);
          var lenArr = keyArr.length;
          var count = 1;
          var freqTable = [];
          var idxUniq = 0;
          for (var i = 0; i < lenArr - 1; i++) {
            if (keyArr[i] == keyArr[i + 1]) {
              count++; //빈도수 증가
              continue;
            }

            freqTable.push({ No: idxUniq, count: count, text: keyArr[i] });
            idxUniq++;
            count = 1;
          }
          this.hstFreq = freqTable;

          r();
        });
    });
  }


  ///// bar chart /////
  findTextData(textArr) {
    for (var i = 0; i < this.barData.length; i++) {
      textArr[i] = this.barData[i].text;
    }
  }

  findCountData(countArr) {
    for (var i = 0; i < this.barData.length; i++) {
      countArr[i] = this.barData[i].count;
    }
  }

  getUserChoice() {
    this.userDataChoice = this.search_history;
    //this.userAnalysisChoice = "";
    //this.userGraphChoice  = document.getElementById("g1");
  }

  showResult() {
    this.getUserChoice();
    this.choiceComplete = true;
    console.log("분석 : " + this.userAnalysisChoice + " 그래프 : " + this.userGraphChoice);

    this.rcmd.getRcmd(this.idList).then(data => {
      this.getKeywords(this.chosenList)

    });
  }


  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          max: 10,
          min: 0
        }
      }]
    }
  };

  barChartLabels: Label[] = this.barXData;

  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: this.barYData, label: 'User Search History' }
  ];
  /////////////



  ///////// line chart /// 

  lineChartData: ChartDataSets[] = [
    { data: this.barYData, label: '검색 추이' },
  ];

  lineChartLabels: Label[] = this.barXData;

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
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
  doughnutChartLabels: Label[] = this.barXData;
  doughnutChartData: MultiDataSet = [
    this.barYData
  ];
  doughnutChartType: ChartType = 'doughnut';
  public doughnutChartColors = [
    {
      backgroundColor: [
        'rgba(255,0,0,0.3)',
        'rgba(0,255,0,0.3)',
        'rgba(0,0,255,0.3)'
      ]
    }
  ];



  //////////






}
