import { Component, OnInit } from '@angular/core';
import { SocialUser, AuthService} from 'angularx-social-login';
import { Router } from '@angular/router';
import { EPAuthService } from '../auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.less'],
  providers:[LoginComponent]
})
export class UserpageComponent implements OnInit {

  nowUser : SocialUser;

  constructor(
    public _router: Router, private _auth: EPAuthService, private _login: LoginComponent, private _gauth:AuthService
  ) { 

  }

    ngOnInit() {
      this._gauth.authState.subscribe((user) => { 
        this.nowUser = user; });
    }

}
