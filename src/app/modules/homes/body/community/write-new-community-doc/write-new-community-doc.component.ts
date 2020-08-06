import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CommunityServiceService } from 'src/app/modules/communications/fe-backend-db/community/community-service.service';
import { EPAuthService } from '../../../../communications/fe-backend-db/membership/auth.service';

@Component({
  selector: 'app-write-new-community-doc',
  templateUrl: './write-new-community-doc.component.html',
  styleUrls: ['./write-new-community-doc.component.less']
})
export class WriteNewCommunityDocComponent implements OnInit {

  constructor( private router: Router, private cm_svs : CommunityServiceService, private auth : EPAuthService) { }
  private title : string;
  private content : string;
  
  ngOnInit() {
    
  }


  /**
   * @description 테스트로 더미 100개
   */
  testSave100(){
    for(var i = 0 ; i < 100 ; i ++){
      let body = {
        user: "user" + i, 
        title : "title" + i,
        content: "content" + i
     }
      this.cm_svs.writeNewDoc(body);

    }
  }

  updateContent($event){
    this.content = $event.target.value;
  }
  updateTitle($event){
    this.title = $event.target.value;
  }

  async saveNewDocument(){
    this.testSave100();
    let userName = this.auth.getUserName();
    let body = {
      user : userName,
      title : this.title,
      content : this.content,
      docId : this.createDocId()
    };

    console.log(body)

    await this.cm_svs.writeNewDoc(body);
    console.log("save new doc end")
    this.toCommunity();
  }

  async createDocId(){
    let res = await this.cm_svs.getDocsNum();
    let numDocs = res.payload.data;
    return numDocs + 1;
  }

  toCommunity(){
  // this.saveNewDocument();
  // this.testSave100();

    this.router.navigateByUrl("/community");
  }

}
