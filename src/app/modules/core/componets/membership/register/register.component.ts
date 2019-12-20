import { Component, OnInit } from '@angular/core';
import { EPAuthService } from '../auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  registerUserData = {}
  constructor(private _auth: EPAuthService, private _router: Router) { }

  ngOnInit() {
  }

  registerUser(){
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res=> {
        console.log(res)
        localStorage.setItem('token', res.token)
        this._router.navigate(['/homes/library']);
      },
      err=> console.log(err)

      )
  }

}
