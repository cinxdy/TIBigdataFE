import { Component, OnInit } from '@angular/core';
import { EPAuthService } from '../auth.service';
import { Router } from '@angular/router'
import { AuthService, SocialUser,GoogleLoginProvider} from 'angularx-social-login';
import { thresholdSturges } from 'd3-array';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers:[AuthService]
})
export class LoginComponent implements OnInit {
  constructor(private _auth: EPAuthService, private _router: Router, private _gauth: AuthService) { }
  private loginUserData = {}
  
  private user: SocialUser; 

  ngOnInit() {
  }

  // login with email
  eLogIn() {
    this._auth.eLoginUser(this.loginUserData)
    // .subscribe((res) => {
    //   //nickname should be added to identify user using the applicatoin.
    //   localStorage.setItem('token', res.token);
    //   this._router.navigate(['/homes/library'])
    // })
  }

  


  //login with google
  gLogIn(platform :string):void{
    
    this._auth.gLogIn(platform);
  }


  //where do we use this?
  signInWithGoogle(): void { 
    this._gauth.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  //register page
  toRegister(){
    this._router.navigateByUrl("/membership/register");
  }

}
