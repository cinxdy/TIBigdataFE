import { Component, OnInit } from '@angular/core';
import { EPAuthService } from '../../../core/componets/membership/auth.service';
import {AuthService} from 'angularx-social-login'

@Component({
  selector: 'app-main-home-container',
  templateUrl: './main-home-container.component.html',
  styleUrls: ['./main-home-container.component.less']
})
export class MainHomeContainerComponent implements OnInit {

  constructor(private auth : EPAuthService, private gAuth : AuthService ) { }

  ngOnInit() {
    // console.log("main home : init verifySignIn");
    // this.gAuth.authState.subscribe((user)=>{
    //   var state = user;
    //   console.log(state);
    // })
    this.auth.verifySignIn();
  }

}
