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

  ngOnInit() {
    
  }

  async saveNewDocument(){
    for(var i = 0 ; i < 100 ; i ++){
      let body = {
        user: "user" + i, 
        content: "content" + i
     }
      this.cm_svs.writeNewDoc(body);

    }
    // alert("새글쓰기")
  }

  toCommunity(){
  this.saveNewDocument();

    this.router.navigateByUrl("/community");
  }

}
