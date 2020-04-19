import { Component, OnInit } from '@angular/core';
import { EPAuthService } from '../../auth.service';

@Component({
  selector: 'app-social-register',
  templateUrl: './social-register.component.html',
  styleUrls: ['./social-register.component.less']
})
export class SocialRegisterComponent implements OnInit {

  constructor(private auth : EPAuthService) { }

  private agrEmail : boolean = false;
  private agrAcs : boolean = false;
  private agrSrcHtr : boolean = false;

  ngOnInit() {
  }

  gLogIn(platform :string):void{
    this.auth.gLogIn(platform);
  }

}
