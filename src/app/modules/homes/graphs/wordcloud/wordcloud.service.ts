import { Injectable } from "@angular/core";
// import { IdControlService } from "../../";
import { HttpClient } from "@angular/common/http";
import { CloudData, CloudOptions } from "angular-tag-cloud-module";

@Injectable(
//   {
//   providedIn: "root"
// }
)
export class WordcloudService {
  private FILE_DIR: string =
    "assets//homes_search_result_wordcloud/tfidfData.json";
  // private cData: CloudData[] = [];
  // private 
  constructor(private http: HttpClient) {}

  createCloud(id : string){
    return new Promise((resolve)=>{
      let cData = new Array<CloudData>();
      
      this.http.get(this.FILE_DIR).subscribe(data => {
        // console.log("tfidf service tfidf data : " + data);
        // this.cData = [];
        let tfidfData = data as [];
        let needData = tfidfData.find(d => d["docID"] === id);
        let tfIdfVal = needData["TFIDF"] as [];
        // let title = needData["docTitle"];
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
        console.log("service cData : " + cData);
        resolve(cData);
      });

    });
  }

}
