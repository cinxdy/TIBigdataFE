import { ArticleSource } from '../../article/article.interface';
import { Injectable } from '@angular/core';
// import { HomesModule } from '../../../homes.module'

@Injectable()
export class IdControlService {
  private idChosen : string = "";
  private idList : string[] = new Array<string>();
  private article : ArticleSource
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

  getIdChoen(){
    return this.idChosen;
  }

  clearIdChosen(){
    this.idChosen = "";
  }

  getArticle(){
    return this.article;
  }

  setArticle(art:ArticleSource){
    this.article = art;
  }

  

}
