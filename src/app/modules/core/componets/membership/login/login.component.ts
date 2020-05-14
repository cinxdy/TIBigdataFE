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
  constructor(private auth: EPAuthService, private _router: Router, private _gauth: AuthService) { }
  private loginUserData = {}
  
  // private user: SocialUser; 

  // private nowUser : String;
  // private isLogin : boolean = false;

  ngOnInit() {
    // this.auth.getLogInObs().subscribe((res)=>{
    //   // console.log("stat update! ", res);
    //   this.isLogin = res as any;
    //   this.auth.setLogStat(res);
    //   this.nowUser = this.auth.getUserName();
    // });
  }

  // login with email
  eLogIn() {
    this.auth.eLoginUser(this.loginUserData)
    // .subscribe((res) => {
    //   //nickname should be added to identify user using the applicatoin.
    //   localStorage.setItem('token', res.token);
    //   this._router.navigate(['/homes/library'])
    // })
  }



  //login with google
  gLogIn(platform :string):void{ 
    this.auth.gLogIn(platform);
  }


  //where do we use this?
  // signInWithGoogle(): void { 
  //   this._gauth.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }

  //register page
  toRegister(){
    this._router.navigateByUrl("/membership/register");
  }

}
