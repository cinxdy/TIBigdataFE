import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { EPAuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor(private _authService: EPAuthService,
              private _router: Router) {}


  canActivate(): boolean {
    if(this._authService.loggedIn()){
      return true
    }else {
      this._router.navigate(['/membership/login'])
      return false
    }
  }
}
