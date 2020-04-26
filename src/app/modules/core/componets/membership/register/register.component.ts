import { Component, OnInit } from '@angular/core';
import { EPAuthService } from '../auth.service';//register user service
import { Router } from '@angular/router'
class userProfile{
  nickName : String;
  name : String;
  inst : String;//institution
  email : String;
  password : String;
}



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})

export class RegisterComponent implements OnInit {

  // when input info(email and password), add data into object.
  registerUserData = new userProfile();
  private pw1;
  private pw2;
  constructor(private _auth: EPAuthService, private _router: Router) { }

  ngOnInit() {
  }

  checkIfValid(){
    // console.log(this.pw1)
    // console.log(this.pw2)
    return this.pw1 == this.pw2;
  }

  // when button clicked, this func init.
  registerUser(){
    if(this.pw1 == this.pw2)//check for sure
      this.registerUserData.password = this.pw1;
    console.log(this.registerUserData);
    this._auth.eRegisterUser(this.registerUserData) //_auth : register user service
  }
  
  toSocReg(){
    this._router.navigateByUrl("/membership/socReg");
  }

}
