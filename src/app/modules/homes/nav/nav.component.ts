import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { EPAuthService } from '../../core/componets/membership/auth.service'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent implements OnInit {

  constructor(public _router: Router, private _auth: EPAuthService) {

   }

  ngOnInit() {
    
  }

  
  navigateSpecials(){
    this._router.navigateByUrl("/specials/first");
  }

  navigateParser(){
    this._router.navigateByUrl("/homes/flask");
  }

  navigateLibrary(){
    this._router.navigateByUrl("/homes/library");
  }

  navigateQT(){
    this._router.navigateByUrl("/homes/querytest");
  }

  LineChart(){
    this._router.navigateByUrl("/homes/line-chart");
  }

  toFlask(){
    this._router.navigateByUrl("/homes/flask");
  }

  toLogin(){
    this._router.navigateByUrl("/membership/login");
  }

  toRegister(){
    this._router.navigateByUrl("/membership/register");
  }

  toEvent(){
    this._router.navigateByUrl("/membership/event");
  }
  // 페이지 이동


}




