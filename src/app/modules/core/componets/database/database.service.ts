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


  getTfidfValue(ids:string[]){
    console.log(ids);
    this.http.post<any>(this.GET_KEYWORDS_URL,ids).subscribe(res=>{
      console.log("tfidf val result : ");
      console.log(res);
    });
  }

}
