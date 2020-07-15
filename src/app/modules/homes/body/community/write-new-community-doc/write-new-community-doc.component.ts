import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-write-new-community-doc',
  templateUrl: './write-new-community-doc.component.html',
  styleUrls: ['./write-new-community-doc.component.less']
})
export class WriteNewCommunityDocComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
    
  }

  saveNewDocument(){
    
  }

  toCommunity(){
    this.router.navigateByUrl("/community");
  }

}
