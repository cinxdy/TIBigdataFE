import { Injectable, Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IpService } from 'src/app/ip.service'

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private URL = this.ipService.getUserServerIp();

  private GET_KEYWORDS_URL = this.URL + ":4000/keyword/getKeyVal";


  constructor(private ipService: IpService,
    private http: HttpClient,
  ) { }


  async getTfidfValue(ids: string[]) {
    // console.log(ids);
    return new Promise(resolve => this.http.post<any>(this.GET_KEYWORDS_URL, ids).subscribe(tfidf_table => {
      // console.log("tfidf val result : ");
      // console.log(res);
      resolve (tfidf_table);
    })
    )
  }

}
