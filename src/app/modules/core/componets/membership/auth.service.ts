import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import {
  AuthService,
  SocialUser,
  GoogleLoginProvider,
} from "angularx-social-login";
// import 'rxjs/add/operator/catch';// use to catch exception in http additionally to prevent console message.
// import { catchError } from 'rxjs/operators';
// import { EMPTY } from 'rxjs';

// import { auth, GoogleAuth,OAuth2Client } from "google-auth-library";

import * as moment from "moment";
import { Observable, pipe, throwError } from 'rxjs';

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
  private _verifyTokenUrl = "http://localhost:4000/api/verify";

  private isLogIn : logStat = logStat.unsigned;
  // private isLigIn$ = new Observable<logStat>();

  // private logged = "Signed";
  private loginUserData = {};
  private socUser: SocialUser;
  private schHst : [] = [];//user search history


  // self = this;
  // private client = new OAuth2Client(GoogleLoginProvider.PROVIDER_ID);
  constructor(
    private http: HttpClient,
    private _router: Router,
    private _gauth: AuthService
  ) {}



  /***
   * Check if the google token is verified with npm package google-auth-lib.
   * Unofortunately google-auth-package requires angular 9 which demands latest typescript version.
   * Newset typescript version seems conflict with visualization packages.
   * Alternative : using http connection to auth0 server, which is debuging purpose and is also time taking.
   * 
   */
  //verify google user id toekn
  //with google auth lib in npm package.
  //
  // async gverifyToken(token){
  //   const ticket = await this.client.verifyIdToken({
  //     idToken : token,
  //     audience : GoogleLoginProvider.PROVIDER_ID,

  //   });
  //   console.log(ticket);
  //   const payload = ticket.getPayload();
  //   const userid = payload['sub'];
  // }

  //common login process for all login methods such as email, gmail, ... 
  //check login state
  chckLogIn() {
    return this.isLogIn;
  }

  //logout function for all login methods
  logOut(){
    if (this.isLogIn == logStat.email)
      return this.eLogoutUser()
    else if(this.isLogIn == logStat.google)
      return this.gSignOut();
    return
    
  }

  getToken() {
    return localStorage.getItem("token");
  }

  //check Login state including token check
  // _verifySignIn(tk,func){
  //   // var self = this;
  //   console.log(func);
  //   var gTkRes$ = func(tk).bind(this);
  //   console.log(gTkRes$);
  //   gTkRes$.subscribe(
  //     res=>{
  //       //login stat google
  //       this.isLogIn = logStat.google;
  //       // console.log(res);
  //     },
  //     err=>{
  //       console.log('error occurs! not google user : ${err}');
  //       // return false;
  //       // return new Error("error");
  //     },
  //   );
  // } 

  verifySignIn(){
    var isSignIn : boolean = false;
    var tk = this.getToken();

    //when token exists
    if(tk){
      var gTkRes$ = this.gVerifyToken(tk);
      gTkRes$.subscribe(
        res=>{
          this.isLogIn = logStat.google;
          return this.isLogIn;
        },
        err=>{
          console.log('error occurs! not google user : ${err}');
        },
      );

      var eTkRes$ = this.eVerifyToken(tk);
      eTkRes$.subscribe(
        res =>{
          if(res.res == 200)
           this.isLogIn = logStat.email;
          else
            console.log("email login error.");
        }
      )
      return isSignIn;
    }
    else
      return isSignIn;


  }

  addSrchHst(keyword : string){
    console.log(this.socUser);
    let bundle = {user : this.socUser, key : keyword}
    this.http.post<any>( "http://localhost:4000/api/addHistory",bundle).subscribe((res)=>{
      this.schHst = res.history;
    });
  }

  showSrchHst(){
    var hst;
    return new Promise((resolve)=>{
        this.http.get<any>( "http://localhost:4000/api/showHistory")
        .subscribe((res)=>{
            hst = res.history;
        });
      }
    ) 
    
  }




  //email login functions
  //email registration function
  eRegisterUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  //email sign in function
  eLoginUser(user) {
    var result = this.http.post<any>(this._loginUrl, user);
    if(result){
      // localStorage.setItem('token',result.authToken);
      this.isLogIn = logStat.email;
      // get user name to show on the nav soon.
    }
    return result;
  }

  //email sign out function
  eLogoutUser() {
    localStorage.removeItem("token");
    this.isLogIn = logStat.unsigned;
    this._router.navigate(["/homes/library"]);
  }

  //email verify token
  eVerifyToken(token){
    return this.http.post<any>(this._verifyTokenUrl,token);
  }





  //google login functions
  gLogIn(platform :string) : void{
    platform = GoogleLoginProvider.PROVIDER_ID;
    this._gauth.signIn(platform).then((response)=>{//error branch 추가할 필요성 있음...
      this.socUser = response;

      //check if this user is our user already
      this.gCheckUser(response).subscribe((res)=>{
        
        if(res.exist == false){
          this.gRegisterUser(this.socUser).subscribe((res)=>{
            console.log("This user is not yet our user : need sign up : ",res);
          })
          
        }
        else
          console.log("This user is already our user!");

        localStorage.setItem('token',this.socUser.authToken);
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
    localStorage.removeItem("token");
    this._gauth.signOut();
    this.isLogIn = logStat.unsigned;
  }


  //verify if this token is from google
  gVerifyToken(token : string){
    return this.http
            .get<any>("https://oauth2.googleapis.com/tokeninfo?id_token=" + token)

  }
  
}
