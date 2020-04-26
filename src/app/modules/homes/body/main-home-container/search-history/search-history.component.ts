import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// import { map } from 'rxjs/operators';
import * as CanvasJS from "../../../../../../assets/canvasjs.min.js";
import { IpService } from 'src/app/ip.service'

@Component({
  selector: "app-search-history",
  templateUrl: "./search-history.component.html",
  styleUrls: ["./search-history.component.less"],
})
export class SearchHistoryComponent implements OnInit {
        
  constructor(private http: HttpClient,private ipService : IpService) {}
  private hstReqUrl = this.ipService.getCommonIp() +":4000/hst/getTotalHistory";
  private hstFreq: any[];
  ngOnInit() {
    this.queryTotalHistory().then(() => {
      // console.log(this.hstFreq);
      let chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
          text: "지금까지 HOT 한 검색 결과",
        },
        axisY: {
          title: "검색 수",
          includeZero: false,
        },
        toolTip: {
          shared: true,
        },
        data: [
          {
            dataPoints: 
            this.hstFreq
          },
        ],
      });
      chart.render();
    });
  }

  queryTotalHistory() {
    return new Promise((r) => {
      this.http
        .get<any>(this.hstReqUrl)
        .subscribe((res) => {
          var hst = res.histories;
          var keyArr = hst.map((hstrs) => hstrs.keyword);
          keyArr = keyArr.sort();
          var lenArr = keyArr.length;
          var count = 1;
          var freqTable = [];
          var idxUniq = 0;
          for (var i = 0; i < lenArr - 1; i++) {
            if (keyArr[i] == keyArr[i + 1]) {
              count++;
              continue;
            }
            // freqTable.push(keyArr[i],count);
            freqTable.push({ x: idxUniq, y: count, label : keyArr[i] });
            idxUniq++;
            count = 1;
          }
          this.hstFreq = freqTable;

          r();
        });
    });

    // getTotalHistory
  }
}
