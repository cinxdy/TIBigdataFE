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

  private isLogIn: logStat = logStat.unsigned;
  // private logged = "Signed";
  private loginUserData = {};
  private socUser: SocialUser;

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

  emailLogoutUser() {
    localStorage.removeItem("token");
    this._router.navigate(["/homes/library"]);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  googleSignOut(): void {
    this._gauth.signOut();
  }
}
