import { Component, OnInit } from '@angular/core';
import { EPAuthService } from '../auth.service';
import { Router } from '@angular/router'
import { AuthService, SocialUser,GoogleLoginProvider} from 'angular4-social-login';
import { thresholdSturges } from 'd3-array';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers:[AuthService]
})
export class LoginComponent implements OnInit {
  constructor(private _auth: EPAuthService, private _router: Router, private _gauth: AuthService) { }
  logged = "Signed"

  loginUserData = {}
  
  user: SocialUser; 

  ngOnInit() {
    // this._gauth.authState.subscribe((user) => { 
      // this.user = user; });
  }

  // login with email
  emailLogIn() {
    this._auth.emailLoginUser(this.loginUserData)
    .subscribe((res) => {
      localStorage.setItem('token', res.token);
      this._router.navigate(['/homes/library'])
    })
  }

  


  //login with google
  googleLogIn(platform :string):void{
    platform = GoogleLoginProvider.PROVIDER_ID;
    this._gauth.signIn(platform).then((response)=>{
      console.log(platform + "Logged In User Data is = ", response);
      this.logged = "alpha";
      this.user = response;

      this._router.navigate(['/homes'])
      // this._auth.gLonginUser();

    }
    );
  }


  //where do we use this?
  signInWithGoogle(): void { 
    this._gauth.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

}
