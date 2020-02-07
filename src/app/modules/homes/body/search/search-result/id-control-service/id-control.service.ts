import { Injectable } from '@angular/core';
// import { HomesModule } from '../../../homes.module'

@Injectable({
  providedIn: 'root'
})
export class IdControlService {
  private idChosen : string = "";
  private idList : string[] = new Array<string>();
  constructor() { }

  setIdList(id:string){
    this.idList.push(id);
  }

  getIdList(){
    return this.idList;
  }

  clearIds(){
    this.idList = [];
  }

  setIdChosen(id : string){
    this.idChosen = id;
  }

  clearIdChosen(){
    this.idChosen = "";
  }

}
