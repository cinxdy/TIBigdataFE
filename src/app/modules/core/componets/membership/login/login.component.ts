import { Component, OnInit } from '@angular/core';
import { EPAuthService } from '../auth.service';
import { Router } from '@angular/router'
import { AuthService, SocialUser,GoogleLoginProvider} from 'angular4-social-login';
import { thresholdSturges } from 'd3-array';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  nowlog = "Signed"

  loginUserData = {}
  constructor(private _auth: EPAuthService, private _router: Router, private _gauth: AuthService) { }

  user: SocialUser; 
  ngOnInit() {
    this._gauth.authState.subscribe((user) => { 
      this.user = user; });
  }

  loginUser() {
    this._auth.loginUser(this.loginUserData)
    .subscribe((res) => {
      console.log(res);
      localStorage.setItem('token', res.token);
      this._router.navigate(['/homes/library'])
    })
  }
  logIn(platform :string):void{
    platform = GoogleLoginProvider.PROVIDER_ID;
    this._gauth.signIn(platform).then((response)=>{
      console.log(platform + "Logged In User Data is = ", response);
      this.nowlog = "signed"
      this.user = response;
      this._router.navigate(['/homes'])
    }
    );
  }
  signInWithGoogle(): void { 
    this._gauth.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  signOut(): void { 
   this._gauth.signOut(); 
  } 

}
