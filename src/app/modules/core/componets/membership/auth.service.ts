import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import {
  AuthService,
  SocialUser,
  GoogleLoginProvider,
} from "angular4-social-login";

import * as moment from "moment";

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
  // private logged = "Signed";
  private loginUserData = {};
  private socUser: SocialUser;

  constructor(
    private http: HttpClient,
    private _router: Router,
    private _gauth: AuthService
  ) {}

  //common feature
  chckLogIn() {
    return this.isLogIn;
  }

  //email login
  eRegisterUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  eLoginUser(user) {
    var result = this.http.post<any>(this._loginUrl, user);
    if(result)
      this.isLogIn = logStat.email;
    return 
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
  gLogIn(platform :string):void{
    platform = GoogleLoginProvider.PROVIDER_ID;
    this._gauth.signIn(platform).then((response)=>{//error branch 추가할 필요성 있음...
      // console.log(platform + "Logged In User Data is = ", response);
      this.socUser = response;

      if(!this.gCheckUser(response)){
        console.log("check user : this user is not our user yet!");
        this.gRegisterUser(this.socUser.email);

      }
      this.isLogIn = logStat.google;
      // console.log("log stat has changed.");
      this._router.navigate(['/homes'])
    }
    );
  }

  gCheckUser(user){
    return this.http.post<any>(this._gChckUserUrl,user);
  }

  gRegisterUser(user){
    return this.http.post<any>(this._gRegUrl,user);
  }
  
  gSignOut(): void {
    this._gauth.signOut();
    this.isLogIn = logStat.unsigned;
  }
}
