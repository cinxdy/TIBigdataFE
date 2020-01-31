import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IpService {

  private SERVER_IP = "203.252.103.123:4200/";
  private DEV_IP = "localhost:4200/";
  private curIP = "";


  constructor() { }

  checkLoc(){
    let ip = window.location.origin;
    // ip = 
    if (ip != this.SERVER_IP){
      this.curIP = this.DEV_IP;
    }
  }
}
