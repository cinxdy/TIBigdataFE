import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import {
  AuthService,
  SocialUser,
  GoogleLoginProvider,
} from "angular4-social-login";

import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class EPAuthService {
  private _registerUrl = "http://localhost:4000/api/register"; //mongoDB
  private _loginUrl = "http://localhost:4000/api/login";
  // private _verifyUserUrl = "http://localhost:4000/api/login"
  private isLogIn: boolean = false;
  private logged = "Signed";
  private loginUserData = {};
  private user: SocialUser;

  constructor(
    private http: HttpClient,
    private _router: Router,
    private _gauth: AuthService
  ) {}

  //common feature
  loggedIn() {
    return this.getToken() || this.isLogIn;
  }

  //email login
  emailRegisterUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  emailLoginUser(user) {
    return this.http.post<any>(this._loginUrl, user);
  }

  emailLogIn() {
    this.emailLoginUser(this.loginUserData).subscribe((res) => {
      localStorage.setItem("token", res.token);
      this._router.navigate(["/homes/library"]);
    });
  }

  emailLogoutUser() {
    localStorage.removeItem("token");
    this._router.navigate(["/homes/library"]);
  }

  getToken() {
    return localStorage.getItem("token");
  }


  //google login
  gLonginUser() {
    this.isLogIn = true;
  }

  // getGoogleLog() {
  //   // console.log("getGoogleLog() func init");
  //   // console.log(this.isLogIn);
  //   return this.isLogIn;
  // }



  //login with google
  googleLogIn(platform: string): void {
    platform = GoogleLoginProvider.PROVIDER_ID;
    this._gauth.signIn(platform).then((response) => {
      console.log(platform + "Logged In User Data is = ", response);
      this.logged = "alpha";
      this.user = response;

      this._router.navigate(["/homes"]);
      this.gLonginUser();
    });
  }
  signInWithGoogle(): void {
    this._gauth.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this._gauth.signOut();
  }
}
