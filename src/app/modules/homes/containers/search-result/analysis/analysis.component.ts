import { Component, OnInit } from '@angular/core';
import { ElasticsearchService } from '../../../service/elasticsearch.service';
import * as CanvasJS from '../../../../../../assets/canvasjs.min.js';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.less']
})
export class AnalysisComponent implements OnInit {

  private searchKeyword;
  private TEST_URL: string = 'http://localhost:5000/keywordGraph';
  private BASE_URL: string = 'http://203.252.103.123:5000/keywordGraph';
  private currURL = this.BASE_URL;

  private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(
    private http:HttpClient,
    private es : ElasticsearchService) { }

  ngOnInit() {
    this.searchKeyword = this.es.getKeyword();
    console.log(this.searchKeyword);

    let body= 
    {"keyword":this.searchKeyword}
  
  this.http.post(this.currURL, 
    body, {headers:this.headers})
    .subscribe(
      (data) => {
        
    let chart = new CanvasJS.Chart("chartContainer", {
			animationEnabled: true,	
			title:{
				text: "키워드 [" +this.searchKeyword+"] 에 대한 자료 수"
			},
			axisY : {
				title: "자료 수",
				includeZero: false
			},
			toolTip: {
				shared: true
			},
			data: [{
				type: "spline",
				name: "전체 자료 수",
				showInLegend: true,
				dataPoints: data[0]
			},
			{
				type: "spline",
				name: "검색 자료 수",
				showInLegend: true,
				dataPoints: data[1]
			}]
		});
		
	chart.render();
      }
    )


  }

}
