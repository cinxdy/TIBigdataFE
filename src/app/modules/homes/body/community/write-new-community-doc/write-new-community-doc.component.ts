import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CommunityServiceService } from 'src/app/modules/communications/fe-backend-db/community/community-service.service';

@Component({
  selector: 'app-write-new-community-doc',
  templateUrl: './write-new-community-doc.component.html',
  styleUrls: ['./write-new-community-doc.component.less']
})
export class WriteNewCommunityDocComponent implements OnInit {

  constructor( private router: Router, private cm_svs : CommunityServiceService) { }
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
    let body = {
      user : this.title,
      content : this.content
    };

    console.log(body)

    await this.cm_svs.writeNewDoc(body);
    console.log("save new doc end")
    this.toCommunity();
  }

  toCommunity(){
  // this.saveNewDocument();
  // this.testSave100();

    this.router.navigateByUrl("/community");
  }

}
