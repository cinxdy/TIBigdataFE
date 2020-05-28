import { Injectable, Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IpService } from 'src/app/ip.service'

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private URL = this.ipService.getUserServerIp();

  private GET_KEYWORDS_URL = this.URL + "/keyword/getKeyVal";
  private GET_RCMD_URL = this.URL + "/rcmd/getRcmdTbl";


  constructor(private ipService: IpService,
    private http: HttpClient,
  ) { }

  async getRcmdTable(id:string | string[]) {
    console.log("in db rcmd : ",id);
    return new Promise(resolve => this.http.post<any>(this.GET_RCMD_URL, {"id":id}).subscribe(rcmd_table => {
      // console.log("tfidf val result : ");
      // console.log(rcmd_table);
      resolve (rcmd_table);
    })
    )
  }

  async getTfidfValue(ids: string[], num? : number) {
    // console.log(ids);

    return new Promise(resolve => this.http.post<any>(this.GET_KEYWORDS_URL, {"id" : ids, "num" : num}).subscribe(tfidf_table => {
      console.log("tfidf val result : ");
      console.log(tfidf_table);
      resolve (tfidf_table);
    })
    )
  }

}
