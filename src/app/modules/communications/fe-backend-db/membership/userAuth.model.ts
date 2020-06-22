import { UserProfile, logStat } from "./user.model"
import { Router } from '@angular/router'


/**
 * Token stored in front end browser.
 * check login type among email, google, facebook, etc...
 * check token value.
 */
class storeToken {
  //property coverage should be considered more... use private?
  type: logStat;
  token: string;

  constructor(type: logStat, token: string) {
    this.type = type;
    this.token = token
  }
}

export abstract class Auth {
  r : Router ;
  constructor(router: Router) {
     this.r = router;
   }

  abstract verifyToken(tk): Promise<any>;
  abstract isOurUser(user): Promise<any>;
  

  /**
   * 
   * @param user 로그인하는 유저. 구글의 경우 undefined
   * @return 로그인 성공 했을 때 email인지 구글인지 어느 방식인지 반환
   */
  // abstract logIn(user?): Promise<any>;

  // logIn():Promise<any>;
  abstract logOut(): void;
  // abstract getProfile(user);
  // register():Promise<any>;
  abstract getInstance();
  abstract register(user : any):void

  /**
   * 
   * @param stat 
   * @param user 로그인 확정할 유저 정보. user = { token : 토큰 string, name : string, email : string}
   */
  confirmUser(profile: UserProfile): void {
    console.log("user auth model : confirmUser : ",profile);
    // this.isLogIn = profile.registerStat;
    localStorage.setItem('token', JSON.stringify(new storeToken(profile.registerStat, profile.token)));
    // this.userProfile = profile;
    // else { }//user for google. coupling for flexibility.
    this.r.navigate(['/homes']);
  }
}