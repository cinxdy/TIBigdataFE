import { Component, AfterViewChecked,OnInit, OnChanges, Output, EventEmitter, NgModule } from '@angular/core';
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

  private nowUser : String = null;
  private isLogin : boolean = false;
  constructor(public _router: Router, private auth: EPAuthService, private _gauth:AuthService) {
    
  }
  ngOnInit(): void {
    this.auth.chckLogIn().subscribe((res)=>{
      console.log("stat update! ", res);
      this.isLogin = res as any;
      this.auth.setLogStat(res);
      this.nowUser = this.auth.getUserName();
    });
  }
  


  //AfterViewChecked() {
    // console.log("nav");
    // console.log(this.auth.getToken())
  //}

  //check if user login status
  // chckUserLogIn():boolean{
  //   // return false;
  //   if(this.auth.chckLogIn()){
  //     // console.log(this.auth.chckLogIn())
  //     this.nowUser = this.auth.getNowUser();
  //     return true;
  //   }
  //   return false
  //   //prior version
  //   // // var isLogIn = this.auth.chckLogIn() as any;
  //   // var isLogIn = this.auth.getToken() as any;
  //   // if(isLogIn){
  //   //   this._gauth.authState.subscribe((user) => { 
  //   //   this.nowUser = user; });
  //   // }
  //   // return isLogIn;
  // }

  logOut(){
    console.log("logout func init");
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


}




