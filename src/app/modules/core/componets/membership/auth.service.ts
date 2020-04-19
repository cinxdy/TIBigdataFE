import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
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
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // self = this;
  // private client = new OAuth2Client(GoogleLoginProvider.PROVIDER_ID);
  constructor(
    private http: HttpClient,
    private _router: Router,
    private _gauth: AuthService,
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




  /**
   * common login process for all login methods such as email, gmail, ...  
   */
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
    return new Error("logStat screwed up. need to be checked");
    
  }

  //get current token in this present browser.
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
      console.log("Token found! : ", tk);

      var gTkRes$ = this.gVerifyToken(tk);
      gTkRes$.subscribe(
        res=>{
          // console.log(res);
          this.isLogIn = logStat.google;
          return this.isLogIn;
        },
        err=>{
          console.log('error occurs! not google user : ',err);
        },
      );

      var eTkRes$ = this.eVerifyToken(tk);
      eTkRes$.subscribe(
        res =>{
          this.isLogIn = logStat.email;
          return isSignIn;
        },
        err =>{
          console.log('error occurs! not email user : ',err);
        }
      )
      
    }
    //when token does not exist.
    else{
      return isSignIn;
    }


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

        localStorage.setItem('token',this.socUser.idToken);
        console.log("login user info saved : ", this.socUser);
        this.isLogIn = logStat.google;
        this._router.navigate(['/homes'])
      }
      );
    })
  }

  gCheckUser(user){
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
    return this.http.post<any>("http://localhost:4000/api/verifyGoogleToken",{token : token, client : "287082486827-0junp0td4ajs1c5p0381topvh168o6l5.apps.googleusercontent.com"});
    // this.http
    // // .post<any>(   "https://oauth2.googleapis.com/tokeninfo?id_token","eyJhbGciOiJSUzI1NiIsImtpZCI6ImY5ZDk3YjRjYWU5MGJjZDc2YWViMjAwMjZmNmI3NzBjYWMyMjE3ODMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMjg3MDgyNDg2ODI3LTBqdW5wMHRkNGFqczFjNXAwMzgxdG9wdmgxNjhvNmw1LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMjg3MDgyNDg2ODI3LTBqdW5wMHRkNGFqczFjNXAwMzgxdG9wdmgxNjhvNmw1LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA3NjQxNjI4NTA2MzIwODE4NzYzIiwiZW1haWwiOiJldGtuYmVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJOUVZwT1cxSkhrN0RnbXFLTHg4aU5nIiwibmFtZSI6Ikpvc2VwaCBCYWVrIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdqT3o4blVHM2p4NnRlZWo5cC1WX050S0tXRjZyUTR5NTZzTW95WFBJcz1zOTYtYyIsImdpdmVuX25hbWUiOiJKb3NlcGgiLCJmYW1pbHlfbmFtZSI6IkJhZWsiLCJsb2NhbGUiOiJlbiIsImlhdCI6MTU4NzIwOTU5MCwiZXhwIjoxNTg3MjEzMTkwLCJqdGkiOiI0ZDM5ZjExNGJmYzQyZmI5MTlkOWI3MTFjNTRhOTBkYTE5NjdhNzMzIn0.GKpCRZwfdLAzUxiKTcny4e91LrbGn2AFYlqOtNI5njesSfq_GMIgy3OfJcXN5IripsezVDAKn01VHfNoGTb43_igDow3OzeduHGTCVPZ4sOUhvzy7OEoNyc8xMkXpYxRYQPG7FLnmcmBWN_fxKRB8bdig4Mf3K4hkM3uonNbRDAKf_koF4doo0sD5ZeV_HIuq1qqMt77Nu4NFxf-OLE98AqbKWPyjgO8_iOetBisKJMDLdwVL8AFNLVb6thwCKEuXX6cc07XlbDWRnswQyrNpbLDmSGm0sWfSTF0E0NhlyE9B0jFhJsT0gSZ4_WICtdOhjLQarPd2BnlgGNyG5EBOw"
    //   // ).subscr ibe(res=>{

    //   .get<any>("https://oauth2.googleapis.com/tokeninfo?id_token=" + token,this.httpOptions).subscribe(res=>{
    //     console.log(res)
    //   },
    //   err=>{
    //     console.log(err)
    //   })
    // return this.http
    //         .get<any>("https://oauth2.googleapis.com/tokeninfo?id_token=" + token)
    //                   // "https://oauth2.googleapis.com/tokeninfo?id_token="

  }
  
}
