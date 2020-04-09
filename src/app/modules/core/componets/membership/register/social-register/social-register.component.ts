import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-social-register',
  templateUrl: './social-register.component.html',
  styleUrls: ['./social-register.component.less']
})
export class SocialRegisterComponent implements OnInit {

  constructor() { }

  private agrEmail : boolean = false;
  private agrAcs : boolean = false;
  private agrSrcHtr : boolean = false;

  ngOnInit() {
  }

}
