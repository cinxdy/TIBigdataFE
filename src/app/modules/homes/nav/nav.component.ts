import { Component, OnInit, Output, EventEmitter, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { EPAuthService } from '../../core/componets/membership/auth.service';
// import { LoginComponent} from '../../core/componets/membership/login/login.component';
import { SocialUser, AuthService} from 'angularx-social-login';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less'],
  // providers:[LoginComponent]
})
export class NavComponent implements OnInit {

  nowUser : SocialUser = null;
  
  constructor(public _router: Router, private auth: EPAuthService, private _gauth:AuthService) {
    
  }
  


  ngOnInit() {
    // console.log("nav");
    // console.log(this.auth.getToken())
  }

  //check if user login status
  chckUserLogIn():boolean{
    return false;
    // return this.auth.verifySignIn()

    //prior version
    // // var isLogIn = this.auth.chckLogIn() as any;
    // var isLogIn = this.auth.getToken() as any;
    // if(isLogIn){
    //   this._gauth.authState.subscribe((user) => { 
    //   this.nowUser = user; });
    // }
    // return isLogIn;
  }

  logOut(){
    this.auth.logOut()
  }


  //routers
  navigateSpecials(){
    this._router.navigateByUrl("/specials");
  }

  navigateParser(){
    this._router.navigateByUrl("/homes/flask");
  }

  navigateLibrary(){
    this._router.navigateByUrl("/library");
  }

  navigateQT(){
    this._router.navigateByUrl("/homes/querytest");
  }

  LineChart(){
    this._router.navigateByUrl("/homes/line-chart");
  }

  toFlask(){
    this._router.navigateByUrl("/homes/flask");
  }

  toLogin(){
    this._router.navigateByUrl("/membership/login");
  }
///../core/componets/membership/login
  toRegister(){
    this._router.navigateByUrl("/membership/register");
  }

  toEvent(){
    this._router.navigateByUrl("/membership/event");
  }

  
  /***
   * user browser token check process
   * 2020.4.17
   * by Baek
   * 
   * nav.component is the always on display component
   * So the user login token checking process is put here to decide 
   * if app shows user name on the nav and enables the profile page.
   * 
   * reference drive : user login senario and logic design. 
   * 
   * 
   * 
   */

}




