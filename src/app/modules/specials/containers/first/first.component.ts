import { Component, OnInit } from '@angular/core';
import { Headers } from '@angular/http';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
import { ElasticsearchService } from '../../../homes/service/elasticsearch.service';
import * as CanvasJS from '../../../../../assets/canvasjs.min.js';

import { Observable, of} from 'rxjs';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.less']
})
export class FirstComponent implements OnInit {




  options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value 
    width: 500,
    height: 400,
    overflow: true,
  };

  cData: CloudData[] = [];
  
  
  private BASE_URL: string = 'http://localhost:5000/wordrank';
  private TEST_URL: string = 'http://localhost:5000/test';


  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  serverData: JSON;
  employeeData: JSON;
  searchKeyword;

  constructor(private http:HttpClient, private es: ElasticsearchService) { }

 
  ngOnInit() {

    this.http.get(this.TEST_URL).subscribe(data => {
      
       console.log(data);
      //Retrieve data from flask.
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


      let pieChart = new CanvasJS.Chart("chartContainer", {
        theme: "light2",
        animationEnabled: true,
        exportEnabled: true,
        title:{
          text: "Monthly Expense"
        },
        data: [{
          type: "pie",
          showInLegend: true,
          toolTipContent: "<b>{label}</b>: ${y} (#percent%)",
          indexLabel: "{label} - #percent%",
          dataPoints: this.serverData
          
        }]
      });
        
      
  
      pieChart.render();
      barChart.render();
      
    })



    
  }
  getResult(){
    this.searchKeyword = "flask test"
    let body= 
      {"keyword":this.searchKeyword}
    
    this.http.post(this.TEST_URL, 
      body)
      .subscribe(
        (data) => {
          console.log(data);
        }
      )
  }

}
