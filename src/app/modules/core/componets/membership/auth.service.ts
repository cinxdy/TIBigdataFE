import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import {
  AuthService,
  SocialUser,
  GoogleLoginProvider,
} from "angular4-social-login";

import * as moment from "moment";
import { Observable } from 'rxjs';

enum //enumerate login status
logStat {
  unsigned,
  email,
  google,
}

@Injectable({
  providedIn: "root",
})

export class EPAuthService {
  private _registerUrl = "http://localhost:4000/api/register"; //mongoDB
  private _loginUrl = "http://localhost:4000/api/login";
  // private _verifyUserUrl = "http://localhost:4000/api/login"
  private _gRegUrl = "http://localhost:4000/api/gRegister";
  private _gChckUserUrl = "http://localhost:4000/api/gCheckUser";

  private isLogIn : logStat = logStat.unsigned;
  // private isLigIn$ = new Observable<logStat>();

  // private logged = "Signed";
  private loginUserData = {};
  private socUser: SocialUser;
  private schHst : [] = [];//user search history

  constructor(
    private http: HttpClient,
    private _router: Router,
    private _gauth: AuthService
  ) {}

  //common feature
  chckLogIn() {
    return this.isLogIn;
  }

  logOut(){
    if (this.isLogIn == logStat.email)
      return this.eLogoutUser()
    else if(this.isLogIn == logStat.google)
      return this.gSignOut();
    return
    
  }

  //email login
  eRegisterUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  eLoginUser(user) {
    var result = this.http.post<any>(this._loginUrl, user);
    if(result){
      this.isLogIn = logStat.email;
      //get user name to show on the nav soon.
    }
    return result;
  }

  eLogoutUser() {
    localStorage.removeItem("token");
    this.isLogIn = logStat.unsigned;
    this._router.navigate(["/homes/library"]);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  //google login
  gLogIn(platform :string) : void{
    platform = GoogleLoginProvider.PROVIDER_ID;
    this._gauth.signIn(platform).then((response)=>{//error branch 추가할 필요성 있음...
      // console.log(platform + "Logged In User Data is = ", response);
      this.socUser = response;

      // console.log("gCheckUser result : ")
      this.gCheckUser(response).subscribe((res)=>{
        
        if(res.exist == false){
          console.log("check user : this user is not our user yet!");
          this.gRegisterUser(this.socUser).subscribe((res)=>{
            console.log(res);
          })
          
        }
        
        this.isLogIn = logStat.google;
        
        this._router.navigate(['/homes'])
      }
      );
    })
  }

  gCheckUser(user){
    console.log("ang : gCheckUser init");
    return this.http.post<any>(this._gChckUserUrl,user);
  }

  gRegisterUser(user){
    return this.http.post<any>(this._gRegUrl,user);
  }
  
  gSignOut(): void {
    this._gauth.signOut();
    this.isLogIn = logStat.unsigned;
  }

  addSrchHst(keyword : string){
    // this.schHst = keyword;
    console.log(this.socUser);
    let bundle = {user : this.socUser, key : keyword}
    this.http.post<any>( "http://localhost:4000/api/addHistory",bundle).subscribe((res)=>{
      // console.log("add srch hst in angular ok")
      // console.log(res);
      console.log("auth service history test");
      console.log(res.history);
      this.schHst = res.history;
    });
  }

  showSrchHst(){
    var hst;
    return new Promise((resolve)=>{
        this.http.get<any>( "http://localhost:4000/api/showHistory")
        .subscribe((res)=>{
          // console.log("add srch hst in angular ok")
          // console.log(res);
            hst = res.history;
          // console.log(hst);
          // return hst;
        });
      }
    ) 
    
  }
  
}
