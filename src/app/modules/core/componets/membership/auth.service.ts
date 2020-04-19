import { Injectable, Injector } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import {
  AuthService,
  SocialUser,
  GoogleLoginProvider,
} from "angularx-social-login";

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
  private _gRegUrl = "http://localhost:4000/api/gRegister";
  private _gChckUserUrl = "http://localhost:4000/api/gCheckUser";
  private _verifyTokenUrl = "http://localhost:4000/api/verify";

  private isLogIn : logStat = logStat.unsigned;
  private loginUserData = {};
  private socUser: SocialUser;
  private schHst : [] = [];//user search history
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private injector : Injector,
    private http: HttpClient,
    private _router: Router,
    private _gauth: AuthService,
  ) {}

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
    return new Error("logStat screwed up. need to be checked.");
    
  }

  //get current token in this present browser.
  getToken() {
    return localStorage.getItem("token");
  }


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

  addSrchHst(keyword : string) : void{
    console.log(this.socUser);
    let bundle = {user : this.socUser, key : keyword}
    this.http.post<any>( "http://localhost:4000/api/addHistory",bundle).subscribe((res)=>{
      this.schHst = res.history;
    });
  }

  showSrchHst() : Promise<any>{
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
  eRegisterUser(user): Observable<any> {
    return this.http.post<any>(this._registerUrl, user);
  }

  //email sign in function
  eLoginUser(user):void {
    var result$ = this.http.post<any>(this._loginUrl, user);
    result$.subscribe(
      res=>{
        this.isLogIn = logStat.email;
      // localStorage.setItem('token',{type : "email", token : result.authToken});
      // get user name to show on the nav soon.
      },
      err =>{
        console.log(err)
      }
      )
  }

  //email sign out function
  eLogoutUser():void {
    localStorage.removeItem("token");
    this.isLogIn = logStat.unsigned;
    this._router.navigate(["/homes/library"]);
  }

  //email verify token
  eVerifyToken(token) : Observable<any>{
    return this.http.post<any>(this._verifyTokenUrl,token);
  }




  /**
   * Google login features.
   * Functions : login, checkUSer, register, signout, verify token 
   */
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

  /**
   * @function gCheckUser 
   * @param user
   * @description
   * check if this user is already our user. check out from the DB. 
   */
  gCheckUser(user : {}) : Observable<any>{
    return this.http.post<any>(this._gChckUserUrl,user);
  }

  gRegisterUser(user : {}) : Observable<any>{
    return this.http.post<any>(this._gRegUrl,user);
  }
  
  gSignOut(): void {
    localStorage.removeItem("token");
    this._gauth.signOut();
    this.isLogIn = logStat.unsigned;
  }

  //verify if this token is from google
  gVerifyToken(token : string) : Observable<any>{
    var client = this.injector.get("GOOGLE PROVIDER ID");//get google api client id from angular injector
    // console.log(client);
    return this.http.post<any>("http://localhost:4000/api/verifyGoogleToken",{token : token, client : client });
  }
  
}
