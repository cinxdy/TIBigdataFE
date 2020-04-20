import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { EPAuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor(private _authService: EPAuthService,
              private _router: Router) {}

/**
 * scenario
 * 
 * user : not log in -> membership/mypage : deny with alert("log in first plz"). go to login page first?
 * user : log in -> membership/login : already login. aleart(you have already login. redirect page to main.)
 * 
 */
  //

  canActivate(): boolean {
    if(this._authService.getLogInStat()){//user stat is "login"
      console.log(true)
      return true
    }else {//user stat : not login
      console.log(false)
      this._router.navigate(['/membership/login'])
      return false
    }
  }
}
