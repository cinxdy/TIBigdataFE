import { Injectable } from '@angular/core';
// import { dataJson } from '\assets\special_first\file.json';

import { HttpClient } from '@angular/common/http';



@Injectable({
    providedIn: 'root',
  })
export class ConfigService {
    constructor(private http: HttpClient) { }
    // data = dataJson;
    // constructor(){}

    configUrl = 'assets\special_first\file.json';
    

    getConfig() {
        return this.http.get(this.configUrl);
    }
    // getConfig(){
    //     return this.data;
    // }
}