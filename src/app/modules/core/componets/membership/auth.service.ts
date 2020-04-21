import { Injectable, Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import {
  AuthService,
  SocialUser,
  GoogleLoginProvider,
} from "angularx-social-login";

//enumerate login status
enum logStat {
  unsigned,
  email,
  google,
}


/**
 * Token stored in front end browser.
 * check login type among email, google, facebook, etc...
 * check token value.
 */
class storeToken{
  //property coverage should be considered more... use private?
  type : logStat;
  token : string;

  constructor(type : logStat, token : string){
    this.type = type;
    this.token = token
  }
}

@Injectable({
  providedIn: "root",
})
export class EPAuthService {
  private EMAIL_REG_URL = "http://localhost:4000/api/register"; //mongoDB
  private EMAIL_LOGIN_URL = "http://localhost:4000/api/login";
  private GOOGLE_REG_URL = "http://localhost:4000/api/gRegister";
  private GOOGLE_CHECK_OUR_USER_URL = "http://localhost:4000/api/gCheckUser";
  private EMAIL_VERIFY_TOKEN = "http://localhost:4000/api/verify";
  private GOOGLE_VERIFY_TOKEN_URL = "http://localhost:4000/api/verifyGoogleToken";
  private ADD_SEARCH_HISTORY_URL = "http://localhost:4000/api/addHistory";
  private SHOW_SEARCH_HISTORY_URL = "http://localhost:4000/api/showHistory"

  private isLogIn : logStat = logStat.unsigned;//for static, inactive, passive use
  private isLogInObs$ : BehaviorSubject<logStat> = new BehaviorSubject(logStat.unsigned);//to stream to subscribers
  private loginUserData = {};
  private socUser: SocialUser = null;//for social login
  private profile : {//for user profile
    name : String,
    email : String,
    history? : []
  };
  private schHst : [] = [];//user search history

  constructor(
    private injector : Injector,
    private http: HttpClient,
    private router: Router,
    private gauth: AuthService,
  ) {
    // this.isLogInObs$.next(logStat.unsigned);
  }

  /**
   * @CommonUserLoginFunctions
   * @description common login process for all login methods such as email, gmail, ...  
   */
  //check login state
  getLogInObs() : Observable<logStat>{
    return this.isLogInObs$;
  }

  getLogInStat():logStat{
    return this.isLogIn;
  }
  setLogStat(stat){
    this.isLogIn = stat as logStat;
  }

  getUserName() : String{
    return this.profile.name;
  }

  getLogInStatObs() {//return type be logStat
    // var stat;
    return new Promise((resolve)=>{
      this.isLogInObs$.subscribe((res)=>{
        resolve(res)
      })
    })//그리고 나서 then((r)=>this.stat = r; if(this.stat == ... ){ ...})
    // return this.isLogInObs$.toPromise().then((res)=>res as logStat);
    // return
    // console.log(stat)
    // return this.isLogIn;
  }

  async logOutObs(){
    var stat = await this.getLogInStatObs();
      if (stat == logStat.email)
      this.eLogoutUser()
      else if(stat == logStat.google)
      this.gSignOut();
      
      if(stat == logStat.unsigned)
      new Error("logStat screwed up. need to be checked.");//in case of screwed up
      this.isLogInObs$.next(logStat.unsigned)
      this.router.navigate(["/homes"]);
  }




  //get current token in this present browser.
  getToken() {
    return localStorage.getItem("token");
  }

  getNowUser() : SocialUser{
    return this.socUser;
  }

    //logout function for all login methods
  logOut(){
    
    if (this.isLogIn == logStat.email)
    this.eLogoutUser()
    else if(this.isLogIn == logStat.google)
    this.gSignOut();
    
    if(this.isLogIn == logStat.unsigned)
    new Error("logStat screwed up. need to be checked.");//in case of screwed up
    this.isLogInObs$.next(logStat.unsigned)
    this.router.navigate(["/homes"]);
  }


  verifySignIn(){
    var isSignIn : boolean = false;
    var tk_with_type = JSON.parse(this.getToken());
    
    if(tk_with_type){//when token exists
      var tk = tk_with_type.token;
      var type = tk_with_type.type;
      console.log("Token found! : ", tk_with_type);

      if(type == logStat.google){
        console.log("token is from google");
        var gTkRes$ = this.gVerifyToken(tk);
        gTkRes$.subscribe(
          res=>{
            console.log(res);
            if(res.status){
              
              this.socUser = res.user;
              var n = this.socUser.name;
              var e = this.socUser.email;
              this.profile = {name : n,email : e};
              console.log("token verify succ");
              this.isLogIn = logStat.google;
              this.isLogInObs$.next(this.isLogIn);
            }
            else{
              console.log("token verify fail");
            }
            return this.isLogIn;
          },
          err=>{
            console.log('error occurs! not google user : ',err);
          },
        );
      }

      else if(type == logStat.email){
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
    }
    
    else{//when token does not exist.
      console.log("token is not found. Hello, newbie!");
      console.log("check the login stat as well : ",this.isLogIn);
      return isSignIn;
    }
  }

  addSrchHst(keyword : string) : void{
    // console.log(this.socUser);
    let bundle;
    if(this.isLogIn)
      bundle = {login : true, user : this.socUser, key : keyword}
    else
      bundle = {login : false, key : keyword}
    this.http.post<any>( this.ADD_SEARCH_HISTORY_URL,bundle).subscribe((res)=>{
      this.schHst = res.history;
      console.log("personal history : ", this.schHst);
    });
  }

  showSrchHst() : Promise<any>{
    var hst;
    return new Promise((resolve)=>{
        this.http.get<any>( this.SHOW_SEARCH_HISTORY_URL)
        .subscribe((res)=>{
            hst = res.history;
        });
      }
    ) 
    
  }




  /***
   * @EmailUserLoginFunctinos
   * @description email login functions
   *  functions:
   */

   //email registration function
  eRegisterUser(user): Observable<any> {
    return this.http.post<any>(this.EMAIL_REG_URL, user);
  }

  //email sign in function
  eLoginUser(user):void {
    var result$ = this.http.post<any>(this.EMAIL_LOGIN_URL, user);
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
    // this.isLogIn = logStat.unsigned;
    // this.isLogInObs$.next(logStat.unsigned)
    // this.router.navigate(["/homes/library"]);
  }

  //email verify token
  eVerifyToken(token) : Observable<any>{
    return this.http.post<any>(this.EMAIL_VERIFY_TOKEN,token);
  }




  /**
   * @GoogleSocialLogin
   * Google Social Login functions
   * Functions : login, checkUSer, register, signout, verify token
   */

   /**
    * @function gLogIn
    * @param platform 
    * @description user login with google social login
    */
  gLogIn(platform :string) : void{
    platform = GoogleLoginProvider.PROVIDER_ID;
    this.gauth.signIn(platform).then((response)=>{//error branch 추가할 필요성 있음...
      this.socUser = response;
      console.log(this.socUser);

      //check if this user is our user already
      this.gCheckUser(response).subscribe((res)=>{
        
        if(res.exist == false){
          this.gRegisterUser(this.socUser).subscribe((res)=>{
            if(!res.exist){
              console.log("This user is not yet our user : need sign up : ",res);
              alert("아직 KUBiC 회원이 아니시군요?\n 반갑습니다!\n 회원가입 페이지로 이동합니다. :)");
              this.router.navigateByUrl("/membership/register");

            }
          })
          
        }
        else
          console.log("This user is already our user!");
        localStorage.setItem('token',JSON.stringify(new storeToken(logStat.google,this.socUser.idToken)));

        // localStorage.setItem('token',this.socUser.idToken);
        console.log("login user info saved : ", this.socUser);
        this.isLogIn = logStat.google;
        this.router.navigate(['/homes'])
      }
      );
    })
  }

  /**
   * @function gCheckUser 
   * @param user
   * @description check if this user is already our user. check out from the DB. 
   */
  gCheckUser(user : {}) : Observable<any>{
    return this.http.post<any>(this.GOOGLE_CHECK_OUR_USER_URL,user);
  }

  gRegisterUser(user : {}) : Observable<any>{
    return this.http.post<any>(this.GOOGLE_REG_URL,user);
  }
  
  gSignOut(): void {
    localStorage.removeItem("token");
    this.gauth.signOut();
    // this.isLogIn = logStat.unsigned;
  }

  //verify if this token is from google
  gVerifyToken(token : string) : Observable<any>{
    var client = this.injector.get("GOOGLE PROVIDER ID");//get google api client id from angular injector
    // console.log(client);
    return this.http.post<any>(this.GOOGLE_VERIFY_TOKEN_URL,{token : token, client : client });
  }
  
}
