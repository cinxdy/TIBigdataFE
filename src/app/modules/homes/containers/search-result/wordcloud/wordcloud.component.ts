import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CloudData, CloudOptions } from "angular-tag-cloud-module";
import { IdListService } from "../id-list-service/id-list.service";

@Component({
  selector: "app-wordcloud",
  templateUrl: "./wordcloud.component.html",
  styleUrls: ["./wordcloud.component.less"]
})
export class WordcloudComponent implements OnInit {
  constructor(private http: HttpClient, private _idList: IdListService) {}
  private fileDir: string =
    "assets//homes_search_result_wordcloud/tfidfData.json";
  private cDatas: any[] = new Array();
  private titles: string[] = new Array<string>();

  ngOnInit() {
    this.http.get(this.fileDir).subscribe(data => {
      let tfidfData = data as [];
      /**
         * 
          service에서 받은 idlist으로 for
          각각의 id와 tfidfdata의 doc id을 비교
          error가 나는 것은 제외한다.
          찾으면 tf-idf값을 빼낸다.
          cData에 저장.
        */
      let idList = this._idList.getIdList(); // service에서 선택한 문서 id 받아온다.

      for (var i = 0; i <= idList.length; i++) {
        let needData = {};
        needData = tfidfData.find(d => d["docID"] === idList[i]);
        try {
          let tfIdfVal = needData["TFIDF"];
          this.titles.push(needData["docTitle"]);

          //gen word cloud with kwList
          let cData = new Array<CloudData>();
          for (var k = 0; k <= tfIdfVal.length; k++) {
            if (k > 30) {
              break;
            }
            try {
              cData.push({
                text: tfIdfVal[k][0],
                weight: tfIdfVal[k][1]
              });
            } catch {
              console.log("index " + k + " has an error");
            }
          }
          this.cDatas.push(cData);
        } catch {
          console.log("error in " + i);
          console.log("object detail : " + tfidfData[i]["docID"]);
        }
      }

      // console.log(this.cDatas);
    });
  }

  cldData: CloudData;
  options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value
    width: 600,
    height: 300,
    overflow: false
  };
}
