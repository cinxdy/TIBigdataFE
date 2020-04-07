import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class EPAuthService {

  private _registerUrl = "http://localhost:4000/api/register"; //mongoDB
  private _loginUrl = "http://localhost:4000/api/login"
  // private _verifyUserUrl = "http://localhost:4000/api/login"
  private isGoogleLoggedIn : boolean = false;
  //mongoDB connection 

  constructor(private http: HttpClient, private _router: Router) { }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user)
  }

  gLonginUser(){
    this.isGoogleLoggedIn = true;

  }

  loggedIn(){
    return this.getToken() || this.isGoogleLoggedIn;
  }

  getGoogleLog(){
    console.log("getGoogleLog() func init");
    console.log(this.isGoogleLoggedIn);
    return this.isGoogleLoggedIn;
  }

  logoutUser(){
    localStorage.removeItem('token');
    this._router.navigate(['/homes/library']);
  }

  getToken(){
    return localStorage.getItem('token');
  }



}
