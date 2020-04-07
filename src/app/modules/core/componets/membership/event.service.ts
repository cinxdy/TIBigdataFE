import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _eventsUrl = "http://localhost:4000/api/events";
  private _srchHstUrl = "http://localhost:4000/api/searchHistory";
  private srchHst : string[] = [];


  constructor(private http: HttpClient) { }

  getEvents(){
    return this.http.get<any>(this._eventsUrl);
  }

  addSrchHst(hst:string){
    this.srchHst.push(hst);
  }

  getSrchHst(){
    return this.srchHst;
  }
}
