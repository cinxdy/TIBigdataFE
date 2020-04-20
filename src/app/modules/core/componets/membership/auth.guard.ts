import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad, UrlSegment } from '@angular/router';
import { EPAuthService } from './auth.service';

class UserToken{}
class Permissions{
  canLoadCond(isLogin, routeId : import("@angular/router").Route, segments : UrlSegment[]):boolean{
    if(isLogin)
      return false;
    return true
    // if(!isLogin && )
      // return true;
  }
}


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
 
  constructor(private _authService: EPAuthService,
              private _router: Router,
              private permissions : Permissions) {}
  canLoad(route: import("@angular/router").Route, segments: UrlSegment[]): boolean | import("rxjs").Observable<boolean> | Promise<boolean> {
    // throw new Error("Method not implemented.");
    return this.permissions.canLoadCond(this._authService.getLogInStat(),route,segments);
  }

/**
 * scenario
 * 
 * user : not log in -> membership/mypage : deny with alert("log in first plz"). go to login page first?
 * user : log in -> membership/login : already login. aleart(you have already login. redirect page to main.)
 * 
 */
  //

  // canActivate(): boolean {
  //   if(this._authService.getLogInStat()){//user stat is "login"
  //     console.log(true)
  //     return true
  //   }else {//user stat : not login
  //     console.log(false)
  //     this._router.navigate(['/membership/login'])
  //     return false
  //   }
  // }
}
