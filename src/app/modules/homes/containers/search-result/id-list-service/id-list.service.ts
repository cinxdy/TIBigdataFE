import { Injectable } from '@angular/core';
// import { HomesModule } from '../../../homes.module'

@Injectable({
  providedIn: 'root'
})
export class IdListService {
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

}
