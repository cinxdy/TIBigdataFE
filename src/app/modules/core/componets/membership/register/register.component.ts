import { Component, OnInit } from '@angular/core';
import { EPAuthService } from '../auth.service';//register user service
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  // when input info(email and password), add data into object.
  registerUserData = {}
  constructor(private _auth: EPAuthService, private _router: Router) { }

  ngOnInit() {
  }

  // when button clicked, this func init.
  registerUser(){
    this._auth.eRegisterUser(this.registerUserData) //_auth : register user service
  }
  
  toSocReg(){
    this._router.navigateByUrl("/membership/socReg");
  }

}
