import { Injectable } from "@angular/core";
// import { IdControlService } from "../../";
import { HttpClient } from "@angular/common/http";
import { CloudData, CloudOptions } from "angular-tag-cloud-module";
import { DatabaseService } from "../../../core/componets/database/database.service";

@Injectable({
  providedIn: "root"
})
export class WordcloudService {
  private FILE_DIR: string =
    "assets//homes_search_result_wordcloud/tfidfData.json";
  // private cData: CloudData[] = [];
  // private
  constructor(private http: HttpClient, private db: DatabaseService) { }

  createCloud(id: string) {
    return new Promise(resolve => {
      let cData = new Array<CloudData>();
      this.db.getTfidfValue(id, 30, true).then(data => {
        console.log("wordClud res : ", data);

        let tfidfData = data[0] as [];
        let tfIdfVal = tfidfData["tfidf"] as [];
        for (var k = 0; k < tfIdfVal.length; k++) {
          try {
            cData.push({
              text: tfIdfVal[k][0],
              weight: tfIdfVal[k][1]
            });
          } catch {
            console.log("index " + k + " has an error");
          }
        }
        // console.log("service cData : " + cData);
        resolve(cData);
      });
    });
  }
}
