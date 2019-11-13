import { Injectable } from '@angular/core';
// import { dataJson } from '\assets\special_first\file.json';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({
    providedIn: 'root',
  })
export class ConfigService {
    constructor(private http: HttpClient) { }
    // data = dataJson;
    // constructor(){}

    configUrl = 'assets/special_first/data.json';
    

    getConfig() : Observable<any>{
        // console.log("from first.service\n")
        // console.log(this.http.get(this.configUrl));
        return this.http.get(this.configUrl);
    }
    // getConfig(){
    //     return this.data;
    // }
}